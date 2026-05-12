import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { questionnaireData } from '../utils/questionnaireData';
import { buildAnswerRecord, classifyQuestionnaire } from '../utils/questionnaireScoring';

const QUESTIONNAIRE_STORAGE_KEY = '@fitness-app:questionnaire:v1';

const QuestionnaireContext = createContext(null);

export function QuestionnaireProvider({ children }) {
  const [answers, setAnswers] = useState({});
  const [profile, setProfile] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let active = true;

    const loadQuestionnaire = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(QUESTIONNAIRE_STORAGE_KEY);

        if (!active) {
          return;
        }

        if (!storedValue) {
          setIsReady(true);
          return;
        }

        const parsedValue = JSON.parse(storedValue);
        setAnswers(parsedValue.answers ?? {});
        setProfile(parsedValue.profile ?? null);
      } catch {
        if (active) {
          setAnswers({});
          setProfile(null);
        }
      } finally {
        if (active) {
          setIsReady(true);
        }
      }
    };

    loadQuestionnaire();

    return () => {
      active = false;
    };
  }, []);

  const setAnswer = useCallback((questionId, optionId) => {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: optionId,
    }));
  }, []);

  const clearQuestionnaire = useCallback(async () => {
    setAnswers({});
    setProfile(null);
    await AsyncStorage.removeItem(QUESTIONNAIRE_STORAGE_KEY);
  }, []);

  const submitQuestionnaire = useCallback(async () => {
    const normalizedAnswers = questionnaireData.reduce((accumulator, question) => {
      accumulator[question.id] = answers[question.id] ?? null;
      return accumulator;
    }, {});

    const computedProfile = classifyQuestionnaire(normalizedAnswers);
    const payload = {
      answers: normalizedAnswers,
      profile: computedProfile,
      completedAt: new Date().toISOString(),
    };

    setProfile(computedProfile);
    await AsyncStorage.setItem(QUESTIONNAIRE_STORAGE_KEY, JSON.stringify(payload));

    return computedProfile;
  }, [answers]);

  const hasAllAnswers = useMemo(
    () => questionnaireData.every((question) => Boolean(answers[question.id])),
    [answers]
  );

  const value = useMemo(
    () => ({
      answers,
      profile,
      isReady,
      hasAllAnswers,
      setAnswer,
      submitQuestionnaire,
      clearQuestionnaire,
      getAnswer: (questionId) => answers[questionId] ?? null,
      getAnswerRecord: () => buildAnswerRecord(questionnaireData, answers),
    }),
    [answers, clearQuestionnaire, hasAllAnswers, isReady, profile, setAnswer, submitQuestionnaire]
  );

  return <QuestionnaireContext.Provider value={value}>{children}</QuestionnaireContext.Provider>;
}

export function useQuestionnaire() {
  const context = useContext(QuestionnaireContext);

  if (!context) {
    throw new Error('useQuestionnaire must be used within a QuestionnaireProvider');
  }

  return context;
}
