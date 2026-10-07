import { QuizQuestion } from '../types/induction';

export interface RegulationSectionInfo {
  id: string;
  key: 'marco' | 'derechos' | 'deberes' | 'prohibiciones' | 'faltas_proceso';
  title: string;
  badge: string;
  articleRef: string;
  description: string;
}

export const REGULATION_SECTIONS: RegulationSectionInfo[] = [
  {
    id: 'sec-marco',
    key: 'marco',
    title: 'Marco Normativo, Principios & Derogatorias',
    badge: 'Sección 1',
    articleRef: 'Acuerdo 0009 de 2024 · Art. 1-4',
    description: 'Vigencia jurídica, principios institucionales y derogatoria de acuerdos anteriores (07 de 2012, 02 de 2014, 06 de 2023, 02 de 2024).',
  },
  {
    id: 'sec-derechos',
    key: 'derechos',
    title: 'Catálogo de los 24 Derechos del Aprendiz',
    badge: 'Sección 2',
    articleRef: 'Acuerdo 0009 de 2024 · Art. 5',
    description: 'Garantías académicas, acceso a TIC, trato digno, no discriminación, bienestar y participación democrática.',
  },
  {
    id: 'sec-deberes',
    key: 'deberes',
    title: 'Deberes Institucionales & Convivencia',
    badge: 'Sección 3',
    articleRef: 'Acuerdo 0009 de 2024 · Art. 8',
    description: 'Porte obligatorio del carné, puntualidad, asistencia, integridad académica, SST y cuidado de recursos públicos.',
  },
  {
    id: 'sec-prohibiciones',
    key: 'prohibiciones',
    title: 'Prohibiciones Expresas del Aprendiz',
    badge: 'Sección 4',
    articleRef: 'Acuerdo 0009 de 2024 · Art. 9',
    description: 'Prevención de acoso y violencia de género, sustancias psicoactivas, armas, fraude digital, plagio y prácticas corruptas.',
  },
  {
    id: 'sec-faltas',
    key: 'faltas_proceso',
    title: 'Clasificación de Faltas, Sanciones & Debido Proceso',
    badge: 'Sección 5',
    articleRef: 'Acuerdo 0009 de 2024 · Art. 20-35',
    description: 'Faltas leves, graves y gravísimas, medidas formativas, sanciones, Comité de Evaluación y derecho a la defensa.',
  },
];

export interface SectionalQuizQuestion extends QuizQuestion {
  sectionKey: 'marco' | 'derechos' | 'deberes' | 'prohibiciones' | 'faltas_proceso';
  sectionTitle: string;
  positiveReinforcement: string;
  errorFeedback: string;
}

export const SECTIONAL_EVALUATION_QUESTIONS: SectionalQuizQuestion[] = [
  // ==========================================
  // SECCIÓN 1: MARCO NORMATIVO & DEROGATORIAS (5 preguntas)
  // ==========================================
  {
    id: 101,
    sectionKey: 'marco',
    sectionTitle: 'Marco Normativo, Principios & Derogatorias',
    question: '¿Cuál es el estatuto oficial que rige actualmente como Reglamento del Aprendiz SENA?',
    options: [
      'El Acuerdo 07 de 2012 expedido anteriormente por la dirección general.',
      'El Acuerdo 0009 de 2024 (Acuerdo 009 de 2024), expedido por el Consejo Directivo Nacional.',
      'El Código Sustantivo del Trabajo de la República de Colombia.',
      'La Ley 115 General de Educación Básica y Secundaria.',
    ],
    correctAnswer: 1,
    explanation: 'El Acuerdo 0009 de 2024 es el estatuto legal y pedagógico vigente aprobado por el Consejo Directivo Nacional que rige para todos los aprendices del país.',
    positiveReinforcement: '¡Excelente conocimiento normativo! Identificas con precisión el Acuerdo 0009 de 2024 como el marco rector que rige tu vida formativa en el SENA.',
    errorFeedback: '¡Ojo con la norma! Recuerda que el Acuerdo 07 de 2012 quedó derogado. El estatuto vigente que te ampara y te orienta es el Acuerdo 0009 de 2024.',
  },
  {
    id: 102,
    sectionKey: 'marco',
    sectionTitle: 'Marco Normativo, Principios & Derogatorias',
    question: '¿Cuáles de los siguientes acuerdos quedaron expresamente derogados con la expedición del Acuerdo 0009 de 2024?',
    options: [
      'Los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024.',
      'Únicamente la Constitución Política de 1991.',
      'El decreto fundacional de Rodolfo Martínez Tono de 1957.',
      'Ningún acuerdo previo, todos continúan vigentes al mismo tiempo.',
    ],
    correctAnswer: 0,
    explanation: 'El Acuerdo 0009 de 2024 unificó y actualizó la normativa, derogando expresamente los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024 para evitar vacíos o contradicciones.',
    positiveReinforcement: '¡Impecable! Tienes total claridad sobre la derogatoria expresa de los acuerdos anteriores (07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024).',
    errorFeedback: 'Recuerda que para evitar dispersión jurídica, el nuevo Acuerdo 0009 de 2024 derogó expresamente los Acuerdos 07/2012, 02/2014, 06/2023 y 02/2024.',
  },
  {
    id: 103,
    sectionKey: 'marco',
    sectionTitle: 'Marco Normativo, Principios & Derogatorias',
    question: '¿A quiénes aplica el Reglamento del Aprendiz según su ámbito de aplicación?',
    options: [
      'Únicamente a los aprendices de formación técnica presencial diurna.',
      'A todas las personas matriculadas en el SENA en sus diferentes modalidades (presencial, virtual, a distancia o combinada), sedes y jornadas.',
      'Solamente a los aprendices que ya se encuentren en etapa productiva.',
      'Exclusivamente a los instructores y coordinadores académicos.',
    ],
    correctAnswer: 1,
    explanation: 'El reglamento aplica universalmente a todos los aprendices del SENA, sin importar la modalidad (presencial, virtual, a distancia), jornada, nivel técnico o tecnológico, en cualquier sede nacional.',
    positiveReinforcement: '¡Correcto! El reglamento es universal e inclusivo: ampara a todos los matriculados en cualquier modalidad, jornada y centro de formación del país.',
    errorFeedback: 'Ten presente que el reglamento no distingue modalidades: rige por igual a aprendices virtuales, presenciales, a distancia y en alternancia en todo Colombia.',
  },
  {
    id: 104,
    sectionKey: 'marco',
    sectionTitle: 'Marco Normativo, Principios & Derogatorias',
    question: '¿Cuál es el principio orientador fundamental de la Formación Profesional Integral (FPI) en el SENA?',
    options: [
      'La memorización mecánica de manuales técnicos sin práctica real.',
      'El desarrollo armónico de competencias técnicas, humanas, éticas y socioemocionales para el proyecto de vida y el trabajo digno.',
      'La competencia desleal entre aprendices para obtener notas numéricas altas.',
      'La delegación total de la formación a plataformas automáticas sin instructores.',
    ],
    correctAnswer: 1,
    explanation: 'La FPI concibe al ser humano de manera integral: fortalece habilidades técnicas pero también dimensiones éticas, cívicas, reflexivas y socioambientales.',
    positiveReinforcement: '¡Gran visión institucional! Comprendes que el SENA forma no solo técnicos idóneos sino ciudadanos éticos, solidarios e íntegros.',
    errorFeedback: 'Recuerda que en el SENA la formación es Integral (FPI): articula el saber técnico con valores humanos, pensamiento crítico y ética profesional.',
  },
  {
    id: 105,
    sectionKey: 'marco',
    sectionTitle: 'Marco Normativo, Principios & Derogatorias',
    question: '¿En qué año nació el SENA y bajo qué visión inspiradora del doctor Rodolfo Martínez Tono?',
    options: [
      'En 1985 como una escuela privada de mecánica industrial.',
      'En 1957, para dotar a los trabajadores colombianos de formación técnica profesional gratuita respaldada por el Estado, la OIT y gremios.',
      'En 1999 como una plataforma puramente virtual sin talleres físicos.',
      'En 1930 durante la modernización del ferrocarril de Antioquia.',
    ],
    correctAnswer: 1,
    explanation: 'El 21 de junio de 1957 nació el SENA como iniciativa visionaria de Rodolfo Martínez Tono, respaldada por la Organización Internacional del Trabajo (OIT) y la ANDI.',
    positiveReinforcement: '¡Excelente sentido de pertenencia histórica! Rodolfo Martínez Tono fundó en 1957 la entidad más querida por todos los colombianos.',
    errorFeedback: 'Fallo histórico: El SENA fue creado el 21 de junio de 1957 gracias a la iniciativa de Rodolfo Martínez Tono para brindar capacitación técnica gratuita al país.',
  },

  // ==========================================
  // SECCIÓN 2: LOS 24 DERECHOS DEL APRENDIZ (5 preguntas)
  // ==========================================
  {
    id: 201,
    sectionKey: 'derechos',
    sectionTitle: 'Catálogo de los 24 Derechos del Aprendiz',
    question: '¿Cuántos derechos formales consagra expresamente el Artículo 5 del nuevo Acuerdo 0009 de 2024?',
    options: [
      'Solo 5 derechos limitados a la biblioteca.',
      '12 derechos idénticos al reglamento anterior.',
      '24 derechos fundamentales estructurados en dimensiones académicas, dignidad, bienestar y participación.',
      '50 derechos sin obligaciones correlativas.',
    ],
    correctAnswer: 2,
    explanation: 'El Artículo 5 del Acuerdo 0009 de 2024 amplió y blindó el catálogo a 24 derechos fundamentales clasificados para salvaguardar la formación integral y la dignidad humana.',
    positiveReinforcement: '¡Puntaje perfecto! El Artículo 5 del Acuerdo 0009 consagra con exactitud los 24 derechos fundamentales del aprendiz SENA.',
    errorFeedback: '¡Atención al dato numérico! El nuevo reglamento elevó y blindó el catálogo formal a 24 derechos clasificados en el Artículo 5.',
  },
  {
    id: 202,
    sectionKey: 'derechos',
    sectionTitle: 'Catálogo de los 24 Derechos del Aprendiz',
    question: 'Frente a los criterios e instrumentos de evaluación, ¿cuál es un derecho inalienable del aprendiz?',
    options: [
      'Conocer los resultados solo hasta el día final de graduación.',
      'Conocer previamente los planes de trabajo, guías de aprendizaje, criterios de evaluación y solicitar retroalimentación respetuosa y oportuna.',
      'Exigir que no se evalúe ninguna evidencia técnica.',
      'Modificar las notas en el sistema SofiaPlus o Zajuna por cuenta propia.',
    ],
    correctAnswer: 1,
    explanation: 'El aprendiz tiene derecho a ser informado con antelación de las guías de aprendizaje, instrumentos de evaluación y a recibir retroalimentación clara y constructiva.',
    positiveReinforcement: '¡Excelente! Ejerces tu derecho a la transparencia pedagógica: conocer guías, criterios y recibir retroalimentación formativa y a tiempo.',
    errorFeedback: '¡Revisa tus garantías! Todo aprendiz tiene derecho a conocer previamente qué y cómo será evaluado, así como a solicitar revisión justificada de evidencias.',
  },
  {
    id: 203,
    sectionKey: 'derechos',
    sectionTitle: 'Catálogo de los 24 Derechos del Aprendiz',
    question: 'En materia de convivencia y dignidad humana, ¿qué protección explícita garantiza el nuevo reglamento?',
    options: [
      'Permitir bromas pesadas siempre que no ocurran dentro del aula.',
      'Ambientes de aprendizaje 100% libres de discriminación, acoso sexual, ciberacoso y cualquier violencia basada en género.',
      'Obligación de guardar silencio ante tratos hostiles para no generar conflictos.',
      'Ninguna, las situaciones de acoso deben resolverse fuera del SENA.',
    ],
    correctAnswer: 1,
    explanation: 'El Acuerdo 0009 de 2024 es pionero en blindar protocolos de cero tolerancia contra el acoso sexual, discriminación racial, de género o psicológica en ambientes físicos y digitales.',
    positiveReinforcement: '¡Excelente apropiación de la dignidad humana! El SENA garantiza entornos libres de cualquier clase de discriminación, violencia o acoso.',
    errorFeedback: '¡No lo olvides! El nuevo estatuto prohíbe de forma tajante el acoso sexual y cualquier violencia por motivos de género, etnia u orientación en el SENA.',
  },
  {
    id: 204,
    sectionKey: 'derechos',
    sectionTitle: 'Catálogo de los 24 Derechos del Aprendiz',
    question: 'En el ámbito de la representación democrática en el Centro de Formación, ¿qué derecho posee el aprendiz?',
    options: [
      'Únicamente acatar las decisiones de las directivas sin voz ni voto.',
      'Elegir y ser elegido democráticamente como vocero de ficha o representante general de aprendices ante el Comité y Consejo de Centro.',
      'Suspender clases de manera unilateral sin acuerdo institucional.',
      'Votar solo si cuenta con un promedio de 100% en todos los módulos.',
    ],
    correctAnswer: 1,
    explanation: 'El derecho de participación ciudadana permite a los aprendices participar en elecciones democráticas para voceros de ficha y representantes del Centro de Formación.',
    positiveReinforcement: '¡Muy bien! Reconoces la participación democrática como un pilar fundamental para liderar y representar a tu comunidad formativa.',
    errorFeedback: 'Fallo en participación: El reglamento te otorga pleno derecho a elegir y postularte como vocero de ficha y representante de tu Centro de Formación.',
  },
  {
    id: 205,
    sectionKey: 'derechos',
    sectionTitle: 'Catálogo de los 24 Derechos del Aprendiz',
    question: '¿Qué derecho asiste al aprendiz respecto a los servicios del Plan de Bienestar al Aprendiz?',
    options: [
      'Pagar una mensualidad extra para ingresar a las canchas deportivas o talleres culturales.',
      'Acceder a las 9 dimensiones del plan de bienestar: salud, deportes, arte, cultura, liderazgo, monitorías y acompañamiento psicosocial.',
      'Solo pueden acceder aprendices con más de 2 años de antigüedad.',
      'Los servicios de bienestar son exclusivos para el personal administrativo.',
    ],
    correctAnswer: 1,
    explanation: 'Bienestar al Aprendiz ofrece de forma abierta y formativa actividades deportivas, culturales, de salud preventiva, apoyos socioeconómicos y atención psicológica.',
    positiveReinforcement: '¡Magnífico! Conoces los beneficios del Plan de Bienestar al Aprendiz en sus 9 dimensiones de desarrollo humano y salud integral.',
    errorFeedback: 'Recuerda que Bienestar al Aprendiz es un derecho gratuito para todos los matriculados, que abarca deporte, salud preventiva, cultura y monitorías.',
  },

  // ==========================================
  // SECCIÓN 3: DEBERES DEL APRENDIZ (5 preguntas)
  // ==========================================
  {
    id: 301,
    sectionKey: 'deberes',
    sectionTitle: 'Deberes Institucionales & Convivencia',
    question: 'Según el Artículo 8, ¿cuál es la norma sobre el porte del carné institucional del SENA?',
    options: [
      'Solo se debe presentar el primer día de inducción y luego se puede guardar en casa.',
      'Portar el carné institucional en lugar visible durante toda la permanencia en las instalaciones del SENA o ambientes externos autorizados.',
      'El carné es opcional únicamente para aprendices de jornada nocturna.',
      'Se puede prestar el carné a familiares para que ingresen a almorzar.',
    ],
    correctAnswer: 1,
    explanation: 'El carné institucional es de porte visible y obligatorio; acredita la condición de aprendiz, salvaguarda la seguridad del centro y permite el acceso a recursos.',
    positiveReinforcement: '¡Excelente cumplimiento! Portar el carné en lugar visible acredita tu identidad institucional y protege la seguridad de toda la comunidad.',
    errorFeedback: '¡Cuidado! El carné no es opcional ni transferible: debe portarse en un lugar visible en todo momento dentro de las instalaciones o visitas formativas.',
  },
  {
    id: 302,
    sectionKey: 'deberes',
    sectionTitle: 'Deberes Institucionales & Convivencia',
    question: 'Si un aprendiz presenta una inasistencia a sus actividades de formación por fuerza mayor o enfermedad, ¿cuál es su deber?',
    options: [
      'No decir nada y esperar a que el instructor no se dé cuenta.',
      'Aportar la justificación médica o soporte de fuerza mayor ante el instructor o coordinación dentro de los siguientes 3 días hábiles.',
      'Presentar la excusa únicamente al terminar el trimestre formativo.',
      'Enviar un mensaje por redes sociales personales 15 días después.',
    ],
    correctAnswer: 1,
    explanation: 'El reglamento estipula un plazo de 3 días hábiles para radicar oportunamente los soportes médicos o de fuerza mayor que justifiquen la inasistencia.',
    positiveReinforcement: '¡Exacto! El plazo reglamentario para justificar inasistencias con soportes válidos es de 3 días hábiles contados a partir del hecho.',
    errorFeedback: '¡Ojo con los tiempos! Tienes un plazo perentorio de 3 días hábiles para justificar debidamente tus inasistencias y evitar reportes de deserción.',
  },
  {
    id: 303,
    sectionKey: 'deberes',
    sectionTitle: 'Deberes Institucionales & Convivencia',
    question: '¿Qué deber exige el reglamento respecto a la autoría y entrega de evidencias de aprendizaje?',
    options: [
      'Copiar y pegar textos enteros de internet o generar trabajos con IA sin citar ni aportar análisis personal.',
      'Actuar con honestidad académica, entregando trabajos de autoría propia o debidamente referenciados según normas de citación, sin cometer plagio.',
      'Pagar a un tercero para que elabore las evidencias del proyecto.',
      'Subir archivos en blanco a la plataforma Zajuna para simular entregas a tiempo.',
    ],
    correctAnswer: 1,
    explanation: 'La integridad académica es un deber ineludible. El plagio, copia o suplantación intelectual vulnera el reglamento y atenta contra el aprendizaje real.',
    positiveReinforcement: '¡Gran ética profesional! La honestidad intelectual y la citación rigurosa son sellos de calidad que distinguen al aprendiz SENA.',
    errorFeedback: '¡Cuidado con el plagio! Presentar evidencias ajenas como propias o sin citar fuentes vulnera la integridad académica y acarrea sanciones disciplinarias.',
  },
  {
    id: 304,
    sectionKey: 'deberes',
    sectionTitle: 'Deberes Institucionales & Convivencia',
    question: 'Frente a las normas de Seguridad y Salud en el Trabajo (SST), ¿cuál es una obligación expresa del aprendiz?',
    options: [
      'Usar los Elementos de Protección Personal (EPP) únicamente si el instructor está mirando.',
      'Cumplir estrictamente las normas de bioseguridad, utilizar la dotación y EPP requeridos y acatar protocolos en talleres y laboratorios.',
      'Ingresar a los laboratorios con alimentos y recipientes destapados.',
      'Modificar las instalaciones eléctricas de las máquinas por iniciativa propia.',
    ],
    correctAnswer: 1,
    explanation: 'En talleres y laboratorios de formación técnica, el cumplimiento de protocolos SST y el uso riguroso de EPP protegen la vida e integridad física del aprendiz y su grupo.',
    positiveReinforcement: '¡Muy bien! La cultura del autocuidado y el uso riguroso de Elementos de Protección Personal (EPP) salvan vidas en los ambientes técnicos.',
    errorFeedback: '¡La seguridad no es negociable! El uso de EPP y el cumplimiento de normas de SST en talleres y laboratorios es un deber estricto de todo aprendiz.',
  },
  {
    id: 305,
    sectionKey: 'deberes',
    sectionTitle: 'Deberes Institucionales & Convivencia',
    question: '¿Cómo debe actuar el aprendiz frente a las instalaciones, herramientas y recursos tecnológicos del SENA?',
    options: [
      'Considerarlos ajenos y utilizarlos sin cuidado porque pertenecen al Estado.',
      'Hacer uso racional, responsable y solidario de maquinaria, software, computadores y mobiliario, preservándolos para el beneficio común.',
      'Descargar software pirata o juegos no autorizados en los equipos del laboratorio.',
      'Llevarse herramientas a casa sin autorización de préstamo oficial.',
    ],
    correctAnswer: 1,
    explanation: 'Los bienes del SENA son patrimonio público de todos los colombianos. Cuidarlos y preservarlos garantiza la continuidad formativa para generaciones presentes y futuras.',
    positiveReinforcement: '¡Sentido de pertenencia ejemplar! Cuidar la maquinaria y equipos tecnológicos del SENA asegura oportunidades para ti y para miles de colombianos.',
    errorFeedback: 'Recuerda que la infraestructura y equipos del SENA son bienes públicos: cuidarlos con diligencia y respeto es un deber prioritario del aprendiz.',
  },

  // ==========================================
  // SECCIÓN 4: PROHIBICIONES EXPRESAS (5 preguntas)
  // ==========================================
  {
    id: 401,
    sectionKey: 'prohibiciones',
    sectionTitle: 'Prohibiciones Expresas del Aprendiz',
    question: '¿Qué prohíbe de manera terminante el Artículo 9 frente al consumo e ingreso de sustancias?',
    options: [
      'Ingresar botellas de agua mineral a las aulas de clase.',
      'Ingresar, comercializar, portar o consumir bebidas alcohólicas o sustancias psicoactivas dentro del centro o permanecer en estado de embriaguez o alteración.',
      'Consumir alimentos en la cafetería en los horarios de descanso.',
      'Portar medicamentos recetados por un médico debidamente soportados.',
    ],
    correctAnswer: 1,
    explanation: 'Está terminantemente prohibido portar, comercializar o consumir alcohol o sustancias psicoactivas en cualquier sede del SENA, o presentarse bajo sus efectos.',
    positiveReinforcement: '¡Correcto y claro! Mantener los ambientes libres de alcohol y sustancias psicoactivas asegura una formación sana, segura y con excelencia.',
    errorFeedback: '¡Alerta con las prohibiciones! Portar, vender o consumir bebidas alcohólicas o drogas en el SENA es una falta de extrema gravedad sancionable.',
  },
  {
    id: 402,
    sectionKey: 'prohibiciones',
    sectionTitle: 'Prohibiciones Expresas del Aprendiz',
    question: 'En el ámbito digital y plataformas (SofiaPlus, Zajuna), ¿cuál de las siguientes acciones constituye una prohibición gravísima?',
    options: [
      'Participar en foros virtuales respetuosos con aportes constructivos.',
      'Suplantar la identidad de otro aprendiz o instructor, compartir credenciales, alterar bases de datos o vulnerar la seguridad informática.',
      'Descargar guías de aprendizaje en formato PDF para estudiar sin conexión.',
      'Actualizar la foto de perfil con una imagen formal y adecuada.',
    ],
    correctAnswer: 1,
    explanation: 'La suplantación de identidad digital, vulneración de contraseñas, fraude en pruebas virtuales o sabotaje a Zajuna/SofiaPlus son conductas expresamente prohibidas.',
    positiveReinforcement: '¡Excelente criterio de ciudadanía digital! La suplantación y el fraude en plataformas oficiales constituyen infracciones graves a la ética institucional.',
    errorFeedback: '¡Cuidado en el entorno virtual! Suplantar identidades, compartir contraseñas o adulterar datos en Zajuna/SofiaPlus acarrea drásticas sanciones disciplinarias.',
  },
  {
    id: 403,
    sectionKey: 'prohibiciones',
    sectionTitle: 'Prohibiciones Expresas del Aprendiz',
    question: 'Respecto al porte de elementos peligrosos en los Centros de Formación, ¿qué establece el reglamento?',
    options: [
      'Se permiten elementos cortopunzantes de uso recreativo personal en los pasillos.',
      'Está absolutamente prohibido portar armas de fuego, cortopunzantes, artefactos explosivos o elementos contundentes que atenten contra la integridad humana.',
      'Solo se prohíben las armas si son utilizadas contra instructores.',
      'Se pueden ingresar fuegos pirotécnicos para celebraciones entre compañeros.',
    ],
    correctAnswer: 1,
    explanation: 'La seguridad de la comunidad es prioritaria. El porte de cualquier tipo de arma o elemento peligroso es una conducta prohibida que amerita desvinculación inmediata y reporte a autoridades.',
    positiveReinforcement: '¡Muy bien! Los centros del SENA son territorios de paz y convivencia pacífica: el porte de armas o elementos peligrosos está vedado por completo.',
    errorFeedback: '¡No te equivoques! El porte de armas, elementos cortopunzantes o explosivos es una prohibición absoluta en todos los centros y actividades del SENA.',
  },
  {
    id: 404,
    sectionKey: 'prohibiciones',
    sectionTitle: 'Prohibiciones Expresas del Aprendiz',
    question: '¿Qué dispone el Acuerdo 0009 de 2024 frente a conductas de acoso sexual, acoso virtual o discriminación de género?',
    options: [
      'Las considera diferencias de opinión que deben arreglarse informalmente entre las partes.',
      'Las prohíbe taxativamente como conductas gravísimas que vulneran los derechos humanos, activando protocolos inmediatos de protección y sanción.',
      'Solo se investigan si la víctima presenta pruebas notariales formalizadas.',
      'Las faltas de acoso sexual solo aplican si ocurren fuera del horario formativo.',
    ],
    correctAnswer: 1,
    explanation: 'El Acuerdo 0009 de 2024 refuerza la política de cero tolerancia institucional contra el acoso y violencia de género, tipificándolas como conductas repudiables y sancionables con rigor.',
    positiveReinforcement: '¡Excelente compromiso ético! El SENA lidera una política contundente de cero tolerancia frente al acoso y la violencia de género.',
    errorFeedback: '¡Atención prioritaria! El acoso sexual y la discriminación de género no son faltas menores: están prohibidas de forma taxativa y ameritan cancelación de matrícula.',
  },
  {
    id: 405,
    sectionKey: 'prohibiciones',
    sectionTitle: 'Prohibiciones Expresas del Aprendiz',
    question: 'Ofrecer dinero, obsequios o favores indebidos a instructores o coordinadores a cambio de aprobación o notas académicas se considera:',
    options: [
      'Una muestra tradicional de agradecimiento y cortesía entre estudiante y docente.',
      'Una práctica corrupta y falta gravísima de soborno que atenta contra la transparencia de la entidad.',
      'Un procedimiento aceptado siempre que se facture formalmente.',
      'Una falta leve que solo genera un llamado de atención verbal.',
    ],
    correctAnswer: 1,
    explanation: 'El soborno o la entrega de dádivas para manipular evaluaciones es un acto corrupto, tipificado como falta gravísima e incompatible con los valores de integridad del SENA.',
    positiveReinforcement: '¡Intachable sentido ético! El soborno o la entrega de prebendas para alterar evaluaciones es una práctica corrupta inaceptable en el SENA.',
    errorFeedback: '¡Cero tolerancia a la corrupción! Ofrecer dádivas o dinero a instructores o funcionarios para obtener calificaciones es una falta gravísima prohibida por el reglamento.',
  },

  // ==========================================
  // SECCIÓN 5: FALTAS, SANCIONES & DEBIDO PROCESO (5 preguntas)
  // ==========================================
  {
    id: 501,
    sectionKey: 'faltas_proceso',
    sectionTitle: 'Clasificación de Faltas, Sanciones & Debido Proceso',
    question: '¿Cómo clasifica el nuevo reglamento las faltas disciplinarias y académicas cometidas por los aprendices?',
    options: [
      'Únicamente en faltas sin importancia y faltas con expulsión.',
      'Faltas Leves, Faltas Graves y Faltas Gravísimas, evaluadas según su intencionalidad, reiteración y daño.',
      'Faltas de primer año y faltas de segundo año.',
      'Faltas de etapa lectiva solamente; en etapa productiva no aplican faltas.',
    ],
    correctAnswer: 1,
    explanation: 'El régimen disciplinario gradúa las faltas en Leves, Graves y Gravísimas, analizando criterios de proporcionalidad, antecedentes y grado de afectación.',
    positiveReinforcement: '¡Dominio exacto del régimen disciplinario! Las faltas se tipifican técnicamente en Leves, Graves y Gravísimas según su impacto.',
    errorFeedback: 'Recuerda la graduación reglamentaria: el Acuerdo 0009 clasifica las faltas en tres categorías precisas: Leves, Graves y Gravísimas.',
  },
  {
    id: 502,
    sectionKey: 'faltas_proceso',
    sectionTitle: 'Clasificación de Faltas, Sanciones & Debido Proceso',
    question: '¿Qué medida formativa corresponde típicamente ante la ocurrencia de una Falta Leve?',
    options: [
      'Cancelación definitiva de la matrícula y veto por 3 años.',
      'Llamado de atención por escrito acompañado de un compromiso pedagógico y formativo suscrito por el aprendiz.',
      'Denuncia penal inmediata ante la Fiscalía General de la Nación.',
      'Multa económica descontada del apoyo de sostenimiento.',
    ],
    correctAnswer: 1,
    explanation: 'Las faltas leves tienen un enfoque predominantemente formativo: buscan corregir la conducta mediante llamado de atención escrito y plan de mejoramiento pedagógico.',
    positiveReinforcement: '¡Muy bien! Ante una falta leve prima el enfoque pedagógico: un llamado de atención por escrito con plan de compromiso formativo.',
    errorFeedback: 'Fallo en la medida: Para faltas leves se aplica un llamado de atención por escrito con compromiso pedagógico; las sanciones severas se reservan para faltas graves o gravísimas.',
  },
  {
    id: 503,
    sectionKey: 'faltas_proceso',
    sectionTitle: 'Clasificación de Faltas, Sanciones & Debido Proceso',
    question: '¿Cuál es la máxima sanción que puede imponer el Subdirector de Centro ante la comisión de una Falta Gravísima comprobada?',
    options: [
      'Obligar al aprendiz a repetir la primaria en un colegio público.',
      'Cancelación definitiva de la matrícula con inhabilidad temporal para ingresar al SENA (de 1 a 3 años).',
      'Suspender el acceso a internet por una semana en la biblioteca.',
      'Retener los documentos personales del aprendiz indefinidamente.',
    ],
    correctAnswer: 1,
    explanation: 'Para faltas gravísimas comprobadas, la sanción es la cancelación definitiva de la matrícula, acarreando inhabilidad temporal de 1 a 3 años para cursar programas en la institución.',
    positiveReinforcement: '¡Correcto! La sanción más severa ante faltas gravísimas es la cancelación de matrícula e inhabilidad para matricularse en el SENA entre 1 y 3 años.',
    errorFeedback: '¡Ojo con la gravedad! Una falta gravísima comprobada acarrea la cancelación definitiva de matrícula e inhabilidad temporal de hasta 3 años para ingresar al SENA.',
  },
  {
    id: 504,
    sectionKey: 'faltas_proceso',
    sectionTitle: 'Clasificación de Faltas, Sanciones & Debido Proceso',
    question: '¿Cuál es el rol del Comité de Evaluación y Seguimiento en el marco del Debido Proceso?',
    options: [
      'Imponer sanciones de plano y expulsar aprendices en secreto sin escucharlos.',
      'Escuchar al aprendiz en descargos, analizar testimonios y pruebas con apego a la presunción de inocencia, y recomendar motivadamente la medida al Subdirector de Centro.',
      'Cobrar dinero por trámites administrativos a los padres de familia.',
      'Reemplazar a los instructores en las clases cotidianas.',
    ],
    correctAnswer: 1,
    explanation: 'El Comité garantiza el debido proceso: sesiona para escuchar descargos, valorar pruebas, permitir el acompañamiento del vocero y emitir una recomendación motivada al Subdirector.',
    positiveReinforcement: '¡Excelente comprensión del debido proceso! El Comité investiga, escucha descargos y recomienda la medida con plenas garantías de defensa.',
    errorFeedback: '¡El debido proceso es una garantía! En el SENA ninguna sanción es sumaria: el Comité de Evaluación y Seguimiento siempre escucha descargos y analiza pruebas.',
  },
  {
    id: 505,
    sectionKey: 'faltas_proceso',
    sectionTitle: 'Clasificación de Faltas, Sanciones & Debido Proceso',
    question: 'Una vez notificada la resolución sancionatoria emitida por la Subdirección de Centro, ¿qué recurso legal puede interponer el aprendiz?',
    options: [
      'Ninguno, las decisiones administrativas en el SENA son inapelables de inmediato.',
      'El Recurso de Reposición dentro de los términos establecidos por la ley y el reglamento, para que el Subdirector revise la decisión con nuevos argumentos.',
      'Una queja verbal informal ante el celador de la puerta principal.',
      'Una huelga indefinida con toma física de la sede.',
    ],
    correctAnswer: 1,
    explanation: 'En concordancia con el debido proceso constitucional y administrativo, el aprendiz tiene derecho a interponer el Recurso de Reposición para solicitar la revisión formal del acto sancionatorio.',
    positiveReinforcement: '¡Conocimiento jurídico sobresaliente! El Recurso de Reposición garantiza el derecho constitucional a controvertir decisiones administrativas con argumentos legales.',
    errorFeedback: '¡Conoce tus derechos procesales! Todo aprendiz tiene derecho a interponer el Recurso de Reposición para que el Subdirector de Centro revise la decisión emitida.',
  },
];
