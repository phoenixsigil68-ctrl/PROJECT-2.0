'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target } from 'lucide-react';
import { useLearningTracker } from '@/hooks/use-learning-tracker';

const DAILY_GOAL_MINUTES = 45;

export function DailyProgress() {
  const [progress, setProgress] = useState({ learnedMinutes: 0, goalMinutes: DAILY_GOAL_MINUTES });

  // We listen for storage changes to update the UI in real-time
  // if another tab is open and tracking progress.
  useEffect(() => {
    const handleStorageChange = () => {
      const storedProgress = useLearningTracker.getState();
      setProgress(storedProgress);
    };

    window.addEventListener('storage', handleStorageChange);
    // Initial load
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const percentage = Math.min((progress.learnedMinutes / progress.goalMinutes) * 100, 100);

  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-center text-xl font-headline">
          <Target className="mr-2 text-primary" />
          આજનો અભ્યાસ
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <p className="text-3xl font-bold text-primary">{Math.floor(progress.learnedMinutes)}
            <span className="text-lg font-medium text-muted-foreground"> / {progress.goalMinutes} મિનિટ</span>
          </p>
        </div>
        <Progress value={percentage} className="w-full" />
         <p className="text-sm text-center text-muted-foreground mt-2">
            {percentage >= 100 ? "ખૂબ સરસ! આજનો લક્ષ્યાંક પૂરો થયો." : `તમે તમારા દૈનિક લક્ષ્યના ${Math.floor(percentage)}% પર છો.`}
        </p>
      </CardContent>
    </Card>
  );
}
