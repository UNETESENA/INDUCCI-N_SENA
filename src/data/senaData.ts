import { InductionModuleInfo, QuizQuestion, EthicalCase, DisciplinaryCase } from '../types/induction';

export const INDUCTION_MODULES: InductionModuleInfo[] = [
  {
    id: 'simbolos',
    title: 'Identidad, Historia & Símbolos',
    shortDesc: 'Origen en 1957 con Rodolfo Martínez Tono, escudo, bandera, logosímbolo e himno oficial.',
    iconName: 'Shield',
    estimatedMinutes: 8,
  },
  {
    id: 'valores',
    title: 'Valores & Código de Integridad',
    shortDesc: 'Los 7 valores rectores de la comunidad SENA y dilemas éticos cotidianos.',
    iconName: 'HeartHandshake',
    estimatedMinutes: 6,
  },
  {
    id: 'formacion',
    title: 'Formación Profesional Integral',
    shortDesc: 'Metodología por proyectos, etapa lectiva y las 6 modalidades de etapa productiva.',
    iconName: 'GraduationCap',
    estimatedMinutes: 7,
  },
  {
    id: 'reglamento',
    title: 'Reglamento del Aprendiz (Acuerdo 0009 de 2024)',
    shortDesc: 'Nuevo Acuerdo 0009 de 2024 (deroga Acuerdo 07 de 2012): 24 derechos fundamentales, deberes, prohibiciones, faltas y debido proceso.',
    iconName: 'BookOpen',
    estimatedMinutes: 9,
  },
  {
    id: 'ecosistema',
    title: 'Ecosistema de Apoyo & Bienestar',
    shortDesc: 'Plataforma Zajuna, APE, Fondo Emprender, SENNOVA y beneficios de Bienestar al Aprendiz.',
    iconName: 'Layers',
    estimatedMinutes: 6,
  },
  {
    id: 'evaluacion',
    title: 'Evaluación Final & Pasaporte',
    shortDesc: 'Demuestra lo aprendido y genera tu Certificado Oficial de Inducción Institucional.',
    iconName: 'Award',
    estimatedMinutes: 5,
  },
];

export const REGIONALES_COLOMBIA = [
  'Distrito Capital',
  'Antioquia',
  'Valle del Cauca',
  'Santander',
  'Atlántico',
  'Bolívar',
  'Boyacá',
  'Caldas',
  'Cauca',
  'Cesar',
  'Córdoba',
  'Cundinamarca',
  'Huila',
  'Magdalena',
  'Meta',
  'Nariño',
  'Norte de Santander',
  'Quindío',
  'Risaralda',
  'Tolima',
  'Sucre',
  'Casanare',
  'Chocó',
  'La Guajira',
  'Amazonas',
  'Arauca',
  'Caquetá',
  'Guaviare',
  'Putumayo',
  'San Andrés y Providencia',
  'Vaupés',
  'Vichada',
];

export const PROGRAMAS_POPULARES = [
  'Tecnología en Análisis y Desarrollo de Software (ADSO)',
  'Tecnología en Gestión Empresarial',
  'Tecnología en Animación Digital y 3D',
  'Tecnología en Producción Multimedia',
  'Tecnología en Gestión de Redes de Datos',
  'Tecnología en Gestión Logística',
  'Técnico en Sistemas e Informática',
  'Tecnología en Mecatrónica Industrial',
  'Tecnología en Contabilidad y Finanzas',
  'Tecnología en Gestión del Talento Humano',
  'Tecnología en Control de Calidad de Alimentos',
  'Tecnología en Gestión Agroempresarial',
  'Tecnología en Diseño para la Industria de la Moda',
];

export const CENTROS_DEFAULT = [
  'Centro de Servicios y Gestión Empresarial',
  'Centro de Tecnologías para la Construcción y la Madera',
  'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
  'Centro de Biotecnología Agropecuaria',
  'Centro de Gestión de Mercados, Logística y TIC',
  'Centro de Diseño y Metrología',
  'Centro para el Desarrollo del Hábitat y la Construcción',
  'Centro de Automatización Industrial',
  'Centro Náutico Pesquero',
];

export const HIMNO_LETRA = [
  {
    titulo: 'Coro',
    lineas: [
      'Estudiantes del SENA, ¡adelante!',
      'Por Colombia luchad con amor,',
      'Con el ánimo noble y constante,',
      'Al trabajo brindad ilusión.',
    ],
  },
  {
    titulo: 'Estrofa I',
    lineas: [
      'Desde el campo silvestre y el valle,',
      'Hasta el monte y la orilla del mar,',
      'Nuestras manos despiertan la fuerza,',
      'De la patria que va a despertar.',
    ],
  },
  {
    titulo: 'Estrofa II',
    lineas: [
      'En el yunque, en la máquina inquieta,',
      'O en el surco de fecunda labor,',
      'El vigor del trabajo fecundo',
      'Es la gloria de nuestro pendón.',
    ],
  },
  {
    titulo: 'Estrofa III',
    lineas: [
      'Hoy la patria nos pide un esfuerzo,',
      'Que transforme su faz y su ser,',
      'Con el brazo, la mente y el alma,',
      'A Colombia sabemos querer.',
    ],
  },
];

export const VALORES_INTEGRIDAD = [
  {
    nombre: 'Honestidad',
    descripcion: 'Actúo siempre con fundamento en la verdad, cumpliendo mis deberes con transparencia y rectitud, favoreciendo el interés general.',
    lema: 'La verdad orienta mi formación y mis actos.',
  },
  {
    nombre: 'Respeto',
    descripcion: 'Reconozco, valoro y trato de manera digna a todas las personas, con sus virtudes y diferencias, garantizando la armonía y la sana convivencia.',
    lema: 'La diversidad y la dignidad humana son sagradas.',
  },
  {
    nombre: 'Compromiso',
    descripcion: 'Soy consciente de la importancia de mi rol como aprendiz y formador; asumo con orgullo mi formación profesional y mi aporte a la sociedad.',
    lema: 'Doy lo mejor de mí en cada momento formativo.',
  },
  {
    nombre: 'Diligencia',
    descripcion: 'Cumplo con los deberes, funciones y responsabilidades asignadas de la mejor manera posible, con atención, prontitud y optimización de recursos.',
    lema: 'Actúo a tiempo, con excelencia y pulcritud.',
  },
  {
    nombre: 'Justicia',
    descripcion: 'Actúo con imparcialidad garantizando los derechos de las personas, con equidad, igualdad y sin discriminación.',
    lema: 'Cada decisión fomenta la equidad institucional.',
  },
  {
    nombre: 'Solidaridad',
    descripcion: 'Apoyo activamente a mis compañeros, comunidad y entorno, promoviendo el trabajo en equipo y el bienestar colectivo sin esperar recompensa.',
    lema: 'El éxito de mi compañero también es mi éxito.',
  },
  {
    nombre: 'Lealtad',
    descripcion: 'Mantengo una conducta fiel a los principios y objetivos institucionales del SENA, defendiendo su buen nombre y sus recursos.',
    lema: 'Orgullo y fidelidad por la entidad más querida de Colombia.',
  },
];

export const DILEMAS_ETICOS: EthicalCase[] = [
  {
    id: 1,
    title: 'El Proyecto Colaborativo y los Créditos',
    situation:
      'Tu equipo de formación debe entregar un software o prototipo clave. Uno de los integrantes no asistió ni aportó por problemas de conectividad, pero te pide que pongas su nombre como si hubiera hecho la mitad del trabajo para no reprobar la competencia.',
    options: [
      {
        text: 'Colocar su nombre sin consultar al instructor para evitar discusiones en el grupo.',
        isCorrect: false,
        feedback: 'Incorrecto. Esto vulnera el valor de la Honestidad e induce a un error de evaluación académica.',
      },
      {
        text: 'Informar al instructor con transparencia la situación real del compañero y buscar espacios de apoyo o nivelación según las guías formativas.',
        isCorrect: true,
        feedback: '¡Excelente! Actúas con Honestidad y Diligencia, permitiendo que el compañero reciba el apoyo pedagógico correspondiente mediante el debido proceso.',
      },
      {
        text: 'Excluirlo del grupo sin informarle a él ni al instructor.',
        isCorrect: false,
        feedback: 'Inadecuado. Falta el valor del Respeto y la comunicación asertiva que promueve la formación integral SENA.',
      },
    ],
  },
  {
    id: 2,
    title: 'Cuidado de Maquinaria y Equipos en el Taller',
    situation:
      'Durante una práctica en los laboratorios de cómputo/mecatrónica, un compañero derrama accidentalmente líquido sobre un equipo de alto costo. Él te pide guardar silencio porque "el SENA tiene presupuesto para reponerlo".',
    options: [
      {
        text: 'Reportar inmediatamente al instructor o monitor de ambiente para aplicar el protocolo de desconexión y preservación del equipo.',
        isCorrect: true,
        feedback: '¡Correcto! Cumples con la Diligencia, el Compromiso y la Lealtad institucional, protegiendo los bienes públicos que benefician a miles de aprendices.',
      },
      {
        text: 'Guardar silencio para no ser tildado de desleal por tu compañero.',
        isCorrect: false,
        feedback: 'Incorrecto. La complicidad en el deterioro de bienes públicos atenta contra el Reglamento del Aprendiz y los recursos de todos los colombianos.',
      },
      {
        text: 'Encender el equipo inmediatamente para ver si todavía funciona.',
        isCorrect: false,
        feedback: 'Peligroso. Encender un circuito mojado puede causar un cortocircuito grave o riesgo eléctrico.',
      },
    ],
  },
  {
    id: 3,
    title: 'Uso de la Inteligencia Artificial y Fuentes Externas',
    situation:
      'Tienes que entregar un ensayo crítico o código de arquitectura. Un software de IA generó todo el contenido en segundos.',
    options: [
      {
        text: 'Copiar y pegar todo el texto tal como lo entregó la IA y presentarlo como autoría 100% propia.',
        isCorrect: false,
        feedback: 'Incorrecto. El plagio o suplantación intelectual es una falta sancionable según el Reglamento del Aprendiz.',
      },
      {
        text: 'Usar la herramienta como fuente de consulta o inspiración, pero redactar con tu propio análisis crítico y citar formalmente las fuentes.',
        isCorrect: true,
        feedback: '¡Sobresaliente! Desarrollas tus propias competencias laborales con ética, integridad académica y pensamiento crítico profesional.',
      },
      {
        text: 'No entregar la evidencia y decir que el sistema Zajuna falló.',
        isCorrect: false,
        feedback: 'Incorrecto. Falta de Diligencia y Honestidad que afecta tu historial académico.',
      },
    ],
  },
];

export const CASOS_DISCIPLINARIOS: DisciplinaryCase[] = [
  {
    id: 1,
    title: 'Inasistencia Reiterada Injustificada',
    context: 'Un aprendiz de tecnología acumula 4 días consecutivos de inasistencia a la etapa lectiva sin comunicación previa ni soporte médico.',
    incident: 'El instructor registra la novedad en el sistema de gestión académica y cita al aprendiz.',
    question: '¿Qué procedimiento corresponde según el Reglamento del Aprendiz?',
    options: [
      {
        title: 'Cancelación inmediata de matrícula sin escuchar al aprendiz',
        classification: 'Falta Grave',
        measure: 'Sanción sumaria',
        isOptimal: false,
        feedback: 'Incorrecto. El SENA siempre garantiza el Debido Proceso y el derecho a la defensa del aprendiz.',
      },
      {
        title: 'Reporte por presunta deserción y citación para justificar la inasistencia (3 días hábiles)',
        classification: 'Falta Leve',
        measure: 'Llamado de atención y debido proceso de deserción',
        isOptimal: true,
        feedback: '¡Exacto! El reglamento estipula que ante 3 días continuos de inasistencia sin soporte, se notifica al aprendiz para que justifique antes de iniciar proceso formal de deserción.',
      },
      {
        title: 'Ignorar la inasistencia si el aprendiz es un estudiante destacado',
        classification: 'No constituye falta',
        measure: 'Ninguna',
        isOptimal: false,
        feedback: 'Incorrecto. El principio de justicia y equidad aplica por igual a todos los aprendices.',
      },
    ],
  },
  {
    id: 2,
    title: 'Agresión Verbal en Ambientes de Aprendizaje',
    context: 'Durante un debate en clase, un aprendiz utiliza lenguaje desobligante e insultos discriminatorios contra un compañero y el instructor.',
    incident: 'La situación interrumpe la formación y vulnera los derechos y dignidad de la comunidad.',
    question: '¿Cómo tipifica el reglamento esta conducta y cuál es la instancia de resolución?',
    options: [
      {
        title: 'Falta disciplinaria grave/gravísima remitida al Comité de Evaluación y Seguimiento',
        classification: 'Falta Grave',
        measure: 'Comité de Evaluación y Seguimiento para descargos y medida sancionatoria',
        isOptimal: true,
        feedback: '¡Correcto! Atentar contra la integridad moral, dignidad y convivencia es una falta grave que debe ser tratada en el Comité de Evaluación del Centro.',
      },
      {
        title: 'Una simple charla informal sin ningún registro en el historial formativo',
        classification: 'Falta Leve',
        measure: 'Llamado informal',
        isOptimal: false,
        feedback: 'Inadecuado. Las agresiones y conductas discriminatorias requieren intervención formal para proteger el ambiente seguro de formación.',
      },
    ],
  },
  {
    id: 3,
    title: 'Porte Inadecuado o No Porte del Carné Institucional',
    context: 'Un aprendiz ingresa al centro de formación sin el carné visible y al ser requerido por seguridad o bienestar, muestra apatía.',
    incident: 'El aprendiz argumenta que como ya lo conocen los celadores, no necesita portarlo.',
    question: '¿Cuál es el deber del aprendiz frente al carné institucional?',
    options: [
      {
        title: 'Portar el carné en lugar visible durante toda la permanencia en las instalaciones del SENA',
        classification: 'Falta Leve',
        measure: 'Llamado de atención verbal y formativo',
        isOptimal: true,
        feedback: '¡Muy bien! El carné es el documento oficial que te identifica como aprendiz SENA, garantiza tu seguridad y el acceso a los servicios de bienestar y bibliotecas.',
      },
      {
        title: 'El carné solo es necesario el primer día de inducción',
        classification: 'No constituye falta',
        measure: 'Ninguna',
        isOptimal: false,
        feedback: 'Falso. El carné es de porte obligatorio y continuo durante toda la formación.',
      },
    ],
  },
];

export const PREGUNTAS_EVALUACION: QuizQuestion[] = [
  {
    id: 1,
    question: '¿En qué año fue fundado el SENA y quién fue su principal promotor?',
    options: [
      'En 1975 por Alfonso López Michelsen.',
      'En 1957 por Rodolfo Martínez Tono.',
      'En 1991 durante la Asamblea Nacional Constituyente.',
      'En 1968 por Carlos Lleras Restrepo.',
    ],
    correctAnswer: 1,
    explanation: 'El SENA nació el 21 de junio de 1957 por iniciativa del cartagenero Rodolfo Martínez Tono, respaldado por la OIT y la ANDI.',
  },
  {
    id: 2,
    question: '¿Qué representan los tres sectores económicos en el escudo del SENA?',
    options: [
      'Agropecuario (café), Industria (piñón/rueda dentada) y Comercio y Servicios (caduceo).',
      'Minero, Petrolero y Farmacéutico.',
      'Aeroespacial, Naval y Robótica.',
      'Educación primaria, secundaria y universitaria.',
    ],
    correctAnswer: 0,
    explanation: 'El escudo del SENA sintetiza el sector primario (rama de café), el sector secundario (piñón de la industria) y el sector terciario (caduceo del comercio y servicios).',
  },
  {
    id: 3,
    question: '¿Cuál es el significado del logosímbolo del SENA (la figura humana sobre líneas)?',
    options: [
      'Una antena de telecomunicaciones de última generación.',
      'El ser humano caminando hacia el futuro y construyendo su proyecto de vida sobre el camino del conocimiento.',
      'Un árbol de roble colombiano de gran fortaleza.',
      'Un puente de ingeniería civil sobre un río.',
    ],
    correctAnswer: 1,
    explanation: 'El logosímbolo representa al aprendiz SENA como protagonista de su formación, avanzando erguido sobre un camino hacia su realización integral.',
  },
  {
    id: 4,
    question: '¿Cuáles son las dos grandes etapas de la Formación Profesional Integral (FPI) en el SENA?',
    options: [
      'Etapa Teórica y Etapa de Vacaciones.',
      'Etapa Escolar y Etapa Universitaria.',
      'Etapa Lectiva y Etapa Productiva.',
      'Etapa de Examen y Etapa de Grado.',
    ],
    correctAnswer: 2,
    explanation: 'La FPI se estructura en dos fases complementarias: Etapa Lectiva (adquisición de competencias y proyectos) y Etapa Productiva (aplicación real en el sector empresarial o productivo).',
  },
  {
    id: 5,
    question: '¿Cuál de las siguientes es una modalidad válida para desarrollar la Etapa Productiva?',
    options: [
      'Contrato de Aprendizaje, Proyecto Productivo o Pasantía.',
      'Cursos libres en YouTube sin convenio.',
      'Práctica no supervisada en cualquier actividad no relacionada.',
      'Descanso remunerado domiciliario.',
    ],
    correctAnswer: 0,
    explanation: 'El SENA cuenta con 6 modalidades válidas: Contrato de aprendizaje, Proyecto productivo (Fondo Emprender/SENNOVA), Pasantía, Monitoría, Vínculo laboral afín y Unidad productiva familiar.',
  },
  {
    id: 6,
    question: '¿Qué norma institucional reglamenta actualmente los derechos, deberes y el régimen disciplinario del aprendiz SENA?',
    options: [
      'El Código Nacional de Tránsito y Transporte.',
      'El Acuerdo 0009 de 2024 (Nuevo Reglamento del Aprendiz SENA, que deroga expresamente el Acuerdo 07 de 2012).',
      'La Ley General de Minería e Hidrocarburos.',
      'El Manual de Convivencia Escolar de Colegios Privados.',
    ],
    correctAnswer: 1,
    explanation: 'El Acuerdo 0009 de 2024 (Acuerdo 009 de 2024) es el estatuto oficial vigente que adopta el nuevo Reglamento del Aprendiz SENA, derogando el Acuerdo 07 de 2012, el Acuerdo 02 de 2014, el Acuerdo 06 de 2023 y el Acuerdo 02 de 2024.',
  },
  {
    id: 7,
    question: '¿Qué es Zajuna en el ecosistema actual del SENA?',
    options: [
      'El restaurante escolar del centro.',
      'El nuevo y moderno Sistema de Gestión del Aprendizaje (LMS) oficial del SENA para el desarrollo de actividades formativas virtuales y presenciales.',
      'Un canal de televisión privada.',
      'El banco donde se cobran los auxilios de transporte.',
    ],
    correctAnswer: 1,
    explanation: 'Zajuna es la plataforma oficial LMS del SENA, donde los aprendices acceden a contenidos, evidencias, guías interactivas, foros y evaluaciones.',
  },
  {
    id: 8,
    question: '¿Cuál es el rol de la Agencia Pública de Empleo (APE) del SENA?',
    options: [
      'Cobrar comisiones a las empresas por contratar personal.',
      'Conectar de manera gratuita, pública e indiscriminada a los aprendices y colombianos con ofertas laborales reales y orientación ocupacional.',
      'Vender uniformes y carnés para los centros de formación.',
      'Tramitar créditos bancarios para automóviles.',
    ],
    correctAnswer: 1,
    explanation: 'La APE es un servicio gratuito del SENA que asesora ocupacionalmente e intermedia entre buscadores de empleo y empresas de todo el país.',
  },
];

export const EVALUATION_QUESTIONS = PREGUNTAS_EVALUACION;

