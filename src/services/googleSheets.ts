import { LearnerProfile, LearnerSubmission } from '../types/induction';
import { getAccessToken } from './googleAuth';
import { markSubmissionsAsSynced } from './submissionRegistry';

export const SHEET_NAME = 'Aprendices_Induccion';
export const DEFAULT_FILE_NAME = 'SENA - Registro de Aprendices Inducción Institucional';

const SPREADSHEET_ID_STORAGE_KEY = 'sena_induction_spreadsheet_id';

export interface SheetRowRecord {
  timestamp: string;
  learnerName: string;
  documentNumber: string;
  program: string;
  ficha: string;
  regional: string;
  center: string;
  status: string;
  examScore: string;
  certificateCode: string;
  completedModulesCount: number;
}

export const getSavedSpreadsheetId = (): string | null => {
  try {
    return localStorage.getItem(SPREADSHEET_ID_STORAGE_KEY);
  } catch {
    return null;
  }
};

export const setSavedSpreadsheetId = (id: string | null) => {
  try {
    if (id) {
      localStorage.setItem(SPREADSHEET_ID_STORAGE_KEY, id);
    } else {
      localStorage.removeItem(SPREADSHEET_ID_STORAGE_KEY);
    }
  } catch {
    // ignore
  }
};

/**
 * Searches for an existing Google Sheets file created by the app in Google Drive.
 */
export const findExistingInductionSpreadsheet = async (): Promise<{ id: string; name: string; webViewLink?: string } | null> => {
  const token = await getAccessToken();
  if (!token) throw new Error('No hay sesión activa de Google.');

  // Check saved ID first
  const savedId = getSavedSpreadsheetId();
  if (savedId) {
    try {
      const checkRes = await fetch(`https://www.googleapis.com/drive/v3/files/${savedId}?fields=id,name,webViewLink,trashed`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (checkRes.ok) {
        const fileData = await checkRes.json();
        if (!fileData.trashed) {
          return {
            id: fileData.id,
            name: fileData.name,
            webViewLink: fileData.webViewLink,
          };
        }
      }
    } catch {
      // fallback to search
    }
  }

  // Search Drive files created with mimeType spreadsheet
  const query = encodeURIComponent("mimeType='application/vnd.google-apps.spreadsheet' and trashed=false");
  const res = await fetch(`https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,webViewLink)&pageSize=20`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error('Error al consultar archivos en Google Drive');
  }

  const data = await res.json();
  const files: Array<{ id: string; name: string; webViewLink?: string }> = data.files || [];
  const matched = files.find((f) => f.name.includes('SENA - Registro de Aprendices') || f.name === DEFAULT_FILE_NAME);

  if (matched) {
    setSavedSpreadsheetId(matched.id);
    return matched;
  }

  return null;
};

/**
 * Creates a brand new Google Spreadsheet with structured headers and styling.
 */
export const createInductionSpreadsheet = async (customTitle?: string): Promise<{ id: string; name: string; webViewLink?: string }> => {
  const token = await getAccessToken();
  if (!token) throw new Error('No hay sesión activa de Google.');

  const title = customTitle?.trim() || DEFAULT_FILE_NAME;

  const createBody = {
    properties: {
      title,
    },
    sheets: [
      {
        properties: {
          title: SHEET_NAME,
          gridProperties: {
            frozenRowCount: 1,
          },
        },
      },
    ],
  };

  const res = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createBody),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Error al crear la hoja de cálculo en Drive: ${errText}`);
  }

  const createdSheet = await res.json();
  const spreadsheetId = createdSheet.spreadsheetId;
  const webViewLink = createdSheet.spreadsheetUrl;

  setSavedSpreadsheetId(spreadsheetId);

  // Initialize Header Row with formatting
  const headers = [
    'Marca Temporal',
    'Nombre del Aprendiz',
    'N° Documento',
    'Programa de Formación',
    'N° Ficha',
    'Regional',
    'Centro de Formación',
    'Estado Inducción',
    'Calificación Evaluación (%)',
    'Puntaje Gamificado & Tiempo',
    'Código Certificado',
    'Módulos Completados',
    'Fecha Inicio',
  ];

  await appendRowToSpreadsheet(spreadsheetId, headers);

  return {
    id: spreadsheetId,
    name: title,
    webViewLink,
  };
};

/**
 * Appends a row of values into the spreadsheet.
 */
export const appendRowToSpreadsheet = async (spreadsheetId: string, rowValues: any[]): Promise<void> => {
  const token = await getAccessToken();
  if (!token) throw new Error('No hay sesión activa de Google.');

  const range = encodeURIComponent(`${SHEET_NAME}!A:L`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      range: `${SHEET_NAME}!A:L`,
      majorDimension: 'ROWS',
      values: [rowValues],
    }),
  });

  if (!res.ok) {
    // If sheet name doesn't match, fallback to appending on first available sheet tab
    const fallbackUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A:L:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
    const fallbackRes = await fetch(fallbackUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [rowValues],
      }),
    });

    if (!fallbackRes.ok) {
      const err = await fallbackRes.text();
      throw new Error(`Error al registrar fila en la hoja de cálculo: ${err}`);
    }
  }
};

/**
 * Records an apprentice profile into Google Sheets in Drive.
 */
export const recordLearnerInDriveSheet = async (
  profile: LearnerProfile,
  existingSpreadsheetId?: string
): Promise<{ spreadsheetId: string; fileUrl: string }> => {
  let targetId = existingSpreadsheetId || getSavedSpreadsheetId();
  let fileUrl = '';

  if (!targetId) {
    const existing = await findExistingInductionSpreadsheet();
    if (existing) {
      targetId = existing.id;
      fileUrl = existing.webViewLink || `https://docs.google.com/spreadsheets/d/${targetId}/edit`;
    } else {
      const created = await createInductionSpreadsheet();
      targetId = created.id;
      fileUrl = created.webViewLink || `https://docs.google.com/spreadsheets/d/${targetId}/edit`;
    }
  } else {
    fileUrl = `https://docs.google.com/spreadsheets/d/${targetId}/edit`;
  }

  const nowString = new Date().toLocaleString('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  });

  const isCompleted =
    profile.completedModules.length >= 5 &&
    profile.examScore !== null &&
    profile.examScore >= 70;

  const status = isCompleted
    ? 'CERTIFICADO / APROBADO'
    : profile.examScore !== null
    ? 'EVALUADO (Pendiente Aprobación)'
    : 'EN PROCESO';

  const row = [
    nowString,
    profile.name,
    profile.documentNumber,
    profile.program,
    profile.ficha,
    profile.regional,
    profile.center,
    status,
    profile.examScore !== null ? `${profile.examScore}%` : 'Sin presentar',
    profile.certificateCode,
    `${profile.completedModules.length} / 6 (${profile.completedModules.join(', ')})`,
    profile.startedAt ? new Date(profile.startedAt).toLocaleDateString('es-CO') : 'N/A',
  ];

  await appendRowToSpreadsheet(targetId, row);

  return {
    spreadsheetId: targetId,
    fileUrl,
  };
};

/**
 * Reads existing registered apprentice rows from the spreadsheet.
 */
export const fetchRegisteredLearners = async (
  spreadsheetId: string
): Promise<{ headers: string[]; rows: string[][] }> => {
  const token = await getAccessToken();
  if (!token) throw new Error('No hay sesión activa de Google.');

  // Try specific sheet name first
  let res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(SHEET_NAME)}!A1:L100`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    // fallback to generic range
    res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:L100`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  if (!res.ok) {
    throw new Error('No se pudieron leer los registros de la hoja de cálculo');
  }

  const data = await res.json();
  const allValues: string[][] = data.values || [];
  if (allValues.length === 0) {
    return { headers: [], rows: [] };
  }

  const headers = allValues[0];
  const rows = allValues.slice(1);
  return { headers, rows };
};

/**
 * Synchronizes a list of apprentice submissions into the Google Sheet in Drive.
 */
export const syncSubmissionsToDriveSheet = async (
  submissions: LearnerSubmission[],
  existingSpreadsheetId?: string
): Promise<{ spreadsheetId: string; fileUrl: string; syncedCount: number }> => {
  if (submissions.length === 0) {
    throw new Error('No hay registros de aprendices para sincronizar.');
  }

  let targetId = existingSpreadsheetId || getSavedSpreadsheetId();
  let fileUrl = '';

  if (!targetId) {
    const existing = await findExistingInductionSpreadsheet();
    if (existing) {
      targetId = existing.id;
      fileUrl = existing.webViewLink || `https://docs.google.com/spreadsheets/d/${targetId}/edit`;
    } else {
      const created = await createInductionSpreadsheet();
      targetId = created.id;
      fileUrl = created.webViewLink || `https://docs.google.com/spreadsheets/d/${targetId}/edit`;
    }
  } else {
    fileUrl = `https://docs.google.com/spreadsheets/d/${targetId}/edit`;
  }

  const token = await getAccessToken();
  if (!token) throw new Error('No hay sesión activa de Google.');

  // Prepare batch of rows
  const rowsToInsert = submissions.map((sub) => {
    const correctCount = sub.answers.filter((a) => a.isCorrect).length;
    const timeFormatted = sub.formattedDuration || (sub.timeTakenSeconds ? `${Math.floor(sub.timeTakenSeconds / 60)}m ${sub.timeTakenSeconds % 60}s` : 'N/A');
    const gamifiedSummary = `${sub.gamificationPoints ?? sub.examScore * 10} pts · ${timeFormatted} · ${sub.mistakesCount ?? sub.answers.filter((a) => !a.isCorrect).length} errores`;

    return [
      sub.formattedDate || new Date(sub.timestamp).toLocaleString('es-CO'),
      sub.learnerName,
      sub.documentNumber,
      sub.program,
      sub.ficha,
      sub.regional,
      sub.center,
      sub.isPassed ? 'APROBADO' : 'NO APROBADO',
      `${sub.examScore}% (${correctCount}/${sub.answers.length} acertadas)`,
      gamifiedSummary,
      sub.certificateCode,
      `${sub.completedModules.length} módulos (${sub.completedModules.join(', ')})`,
      new Date(sub.timestamp).toLocaleDateString('es-CO'),
    ];
  });

  const range = encodeURIComponent(`${SHEET_NAME}!A:L`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${targetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      range: `${SHEET_NAME}!A:L`,
      majorDimension: 'ROWS',
      values: rowsToInsert,
    }),
  });

  if (!res.ok) {
    // Fallback without sheet tab name
    const fallbackUrl = `https://sheets.googleapis.com/v4/spreadsheets/${targetId}/values/A:L:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
    const fallbackRes = await fetch(fallbackUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: rowsToInsert,
      }),
    });

    if (!fallbackRes.ok) {
      const err = await fallbackRes.text();
      throw new Error(`Error al sincronizar con Google Sheets: ${err}`);
    }
  }

  // Mark all as synced in local registry
  const syncedIds = submissions.map((s) => s.id);
  markSubmissionsAsSynced(syncedIds);

  return {
    spreadsheetId: targetId,
    fileUrl,
    syncedCount: submissions.length,
  };
};

