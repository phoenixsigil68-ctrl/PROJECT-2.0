'use client';

import { useEffect } from 'react';

const STORAGE_KEY = 'dailyLearningProgress';
const DAILY_GOAL_MINUTES = 45;

type ProgressState = {
  learnedMinutes: number;
  goalMinutes: number;
  lastUpdated: string;
};

const getToday = () => new Date().toISOString().split('T')[0];

const getStoredProgress = (): ProgressState => {
  if (typeof window === 'undefined') {
    return { learnedMinutes: 0, goalMinutes: DAILY_GOAL_MINUTES, lastUpdated: getToday() };
  }
  
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const progress: ProgressState = JSON.parse(saved);
    // Reset if it's a new day
    if (progress.lastUpdated !== getToday()) {
      return { learnedMinutes: 0, goalMinutes: DAILY_GOAL_MINUTES, lastUpdated: getToday() };
    }
    return progress;
  }
  return { learnedMinutes: 0, goalMinutes: DAILY_GOAL_MINUTES, lastUpdated: getToday() };
};

const setStoredProgress = (progress: ProgressState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  // Dispatch a storage event to notify other components/tabs
  window.dispatchEvent(new Event('storage'));
};

// A simple store-like object
export const useLearningTracker = {
  getState: getStoredProgress,
  setState: setStoredProgress,
};


export function LearningTracker() {
  useEffect(() => {
    const interval = setInterval(() => {
      const currentProgress = getStoredProgress();
      const newLearnedMinutes = currentProgress.learnedMinutes + 1 / 60; // Add one second worth of minutes
      
      setStoredProgress({
        ...currentProgress,
        learnedMinutes: newLearnedMinutes,
      });

    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return null; // This component does not render anything
}
