import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { initialProgress, type Progress } from '@/lib/learning';

const STORAGE_KEY = 'linguae-demo-v1';
const Context = createContext<{
  progress: Progress;
  update: (fn: (progress: Progress) => Progress) => void;
}>({
  progress: initialProgress,
  update: () => {},
});

function isStoredProgress(value: unknown): value is Partial<Progress> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }

  const stored = value as Record<string, unknown>;
  return (
    typeof stored.xp === 'number' &&
    Array.isArray(stored.completed) &&
    stored.completed.every((item) => typeof item === 'number') &&
    (stored.coins === undefined || typeof stored.coins === 'number') &&
    (stored.hearts === undefined || typeof stored.hearts === 'number') &&
    (stored.mistakes === undefined ||
      (Array.isArray(stored.mistakes) &&
        stored.mistakes.every((item) => typeof item === 'number'))) &&
    (stored.inventory === undefined ||
      (Array.isArray(stored.inventory) &&
        stored.inventory.every((item) => typeof item === 'string'))) &&
    (stored.streak === undefined || typeof stored.streak === 'number') &&
    (stored.lastStudy === undefined || typeof stored.lastStudy === 'string') &&
    (stored.name === undefined || typeof stored.name === 'string')
  );
}

function loadProgress(): Progress {
  if (typeof window === 'undefined') {
    return initialProgress;
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === null) {
      return initialProgress;
    }

    const parsed: unknown = JSON.parse(saved);
    if (!isStoredProgress(parsed)) {
      throw new TypeError('Saved learning progress has an invalid format.');
    }

    return { ...initialProgress, ...parsed };
  } catch (error) {
    console.error('Unable to load saved learning progress.', error);
    return initialProgress;
  }
}

export function LearningProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(loadProgress);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Unable to save learning progress.', error);
    }
  }, [progress]);

  return (
    <Context.Provider value={{ progress, update: setProgress }}>
      {children}
    </Context.Provider>
  );
}

export const useLearning = () => useContext(Context);
