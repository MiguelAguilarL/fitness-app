const QUESTION_LABELS = {
  gender: { male: 'Masculino', female: 'Femenino', other: 'Otro' },
  age: { '18-25': '18 a 25 años', '26-35': '26 a 35 años', '36-45': '36 a 45 años', '46+': '46 años o más' },
  weight: { light: 'Menos de 60 kg', normal: '60 a 80 kg', heavy: '80 a 100 kg', 'very-heavy': 'Más de 100 kg' },
  height: { short: 'Menos de 160 cm', normal: '160 a 175 cm', tall: '175 a 190 cm', 'very-tall': 'Más de 190 cm' },
  experience: { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado' },
  goal: { 'gain-muscle': 'Ganar Masa Muscular', 'lose-fat': 'Perder Grasa', health: 'Resistencia y Salud' },
  focusArea: { 'upper-body': 'Tren Superior', 'lower-body': 'Tren Inferior', 'full-body': 'Cuerpo Completo' },
  shortTermGoal: { 'first-pull-up': 'Mi primera flexión/dominada', 'more-weight': 'Cargar más peso', 'more-active': 'Ser más activo/a' },
  daysPerWeek: { '2': '2 días', '3': '3 días', '4': '4 días', '5+': '5 o más días' },
  sessionDuration: { 'less-45': 'Menos de 45 min', '45-75': '45 a 75 min', 'more-90': 'Más de 90 min' },
  trainingLocation: { 'commercial-gym': 'Gimnasio comercial', 'home-gym': 'Gimnasio en casa', 'no-equipment': 'Sin equipo (Calistenia)' },
  equipmentPreference: { machines: 'Máquinas guiadas', 'free-weights': 'Pesos libres', mixed: 'Una mezcla de ambos' },
  activeInjury: { back: 'Espalda/Lumbar', knees: 'Rodillas', shoulders: 'Hombros', none: 'Ninguna' },
  dailyActivity: { sedentary: 'Sedentario', moderate: 'Moderado', 'very-active': 'Muy activo' },
  techniqueVideos: { 'very-important': 'Muy importante', 'new-exercises': 'Solo ejercicios nuevos', 'not-needed': 'No lo necesito' },
  mainObstacle: { 'not-know': 'No sé qué hacer', motivation: 'Falta de motivación', boring: 'Rutinas aburridas' },
  unitPreference: { kg: 'Kilogramos (kg)', lb: 'Libras (lb)' },
  disclaimer: { accept: 'Sí, acepto', decline: 'No acepto' },
};

const QUESTION_SCORE = {
  gender: { male: 2, female: 2, other: 2 },
  age: { '18-25': 3, '26-35': 2, '36-45': 2, '46+': 1 },
  weight: { light: 1, normal: 2, heavy: 2, 'very-heavy': 1 },
  height: { short: 1, normal: 2, tall: 2, 'very-tall': 2 },
  experience: { beginner: 10, intermediate: 12, advanced: 14 },
  goal: { 'gain-muscle': 24, 'lose-fat': 20, health: 16 },
  focusArea: { 'upper-body': 2, 'lower-body': 2, 'full-body': 3 },
  shortTermGoal: { 'first-pull-up': 3, 'more-weight': 3, 'more-active': 2 },
  daysPerWeek: { '2': 2, '3': 3, '4': 4, '5+': 5 },
  sessionDuration: { 'less-45': 2, '45-75': 3, 'more-90': 4 },
  trainingLocation: { 'commercial-gym': 3, 'home-gym': 2, 'no-equipment': 1 },
  equipmentPreference: { machines: 2, 'free-weights': 3, mixed: 3 },
  activeInjury: { back: -2, knees: -2, shoulders: -2, none: 2 },
  dailyActivity: { sedentary: 1, moderate: 2, 'very-active': 3 },
  techniqueVideos: { 'very-important': 2, 'new-exercises': 2, 'not-needed': 1 },
  mainObstacle: { 'not-know': 2, motivation: 2, boring: 1 },
  unitPreference: { kg: 1, lb: 1 },
  disclaimer: { accept: 3, decline: 0 },
};

function getLabel(questionId, optionId) {
  return QUESTION_LABELS[questionId]?.[optionId] ?? optionId ?? null;
}

function getScore(questionId, optionId) {
  return QUESTION_SCORE[questionId]?.[optionId] ?? 0;
}

function getTrainingLevel(totalScore) {
  if (totalScore >= 100) return 'avanzado';
  if (totalScore >= 70) return 'intermedio';
  return 'inicial';
}

function getRecommendedSplit(answers) {
  const goal = answers.goal;
  const daysPerWeek = answers.daysPerWeek;
  const focusArea = answers.focusArea;

  if (goal === 'gain-muscle' && (daysPerWeek === '5+')) {
    return 'Push/Pull/Legs';
  }

  if (goal === 'lose-fat' && focusArea === 'full-body') {
    return 'Full body + cardio';
  }

  if (daysPerWeek === '2' || daysPerWeek === '3') {
    return 'Full body';
  }

  if (daysPerWeek === '4' || daysPerWeek === '5+') {
    return focusArea === 'upper-body' ? 'Torso/Pierna' : 'Upper/Lower';
  }

  return 'Rutina personalizada';
}

export function classifyQuestionnaire(answers) {
  const answeredEntries = Object.entries(answers ?? {});
  const scoreBreakdown = {};

  const totalScore = answeredEntries.reduce((accumulator, [questionId, optionId]) => {
    const score = getScore(questionId, optionId);
    scoreBreakdown[questionId] = score;
    return accumulator + score;
  }, 0);

  const normalizedAnswers = {};

  for (const [questionId, optionId] of answeredEntries) {
    normalizedAnswers[questionId] = {
      id: optionId,
      label: getLabel(questionId, optionId),
    };
  }

  return {
    gender: normalizedAnswers.gender ?? null,
    age: normalizedAnswers.age ?? null,
    weight: normalizedAnswers.weight ?? null,
    height: normalizedAnswers.height ?? null,
    experience: normalizedAnswers.experience ?? null,
    goal: normalizedAnswers.goal ?? null,
    focusArea: normalizedAnswers.focusArea ?? null,
    shortTermGoal: normalizedAnswers.shortTermGoal ?? null,
    daysPerWeek: normalizedAnswers.daysPerWeek ?? null,
    sessionDuration: normalizedAnswers.sessionDuration ?? null,
    trainingLocation: normalizedAnswers.trainingLocation ?? null,
    equipmentPreference: normalizedAnswers.equipmentPreference ?? null,
    activeInjury: normalizedAnswers.activeInjury ?? null,
    dailyActivity: normalizedAnswers.dailyActivity ?? null,
    techniqueVideos: normalizedAnswers.techniqueVideos ?? null,
    mainObstacle: normalizedAnswers.mainObstacle ?? null,
    unitPreference: normalizedAnswers.unitPreference ?? null,
    disclaimer: normalizedAnswers.disclaimer ?? null,
    totalScore,
    trainingLevel: getTrainingLevel(totalScore),
    recommendedSplit: getRecommendedSplit(answers),
    summary: [
      normalizedAnswers.goal?.label,
      normalizedAnswers.experience?.label,
      normalizedAnswers.age?.label,
    ].filter(Boolean),
    scoreBreakdown,
  };
}

export function buildAnswerRecord(questionnaireData, answers) {
  return questionnaireData.reduce((accumulator, question) => {
    const optionId = answers?.[question.id] ?? null;
    accumulator[question.id] = {
      id: optionId,
      label: getLabel(question.id, optionId),
    };
    return accumulator;
  }, {});
}
