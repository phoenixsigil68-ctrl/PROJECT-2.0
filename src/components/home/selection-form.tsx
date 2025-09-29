'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AppData } from '@/lib/data';
import type { Subject, Chapter } from '@/lib/types';
import { BookOpen } from 'lucide-react';

export function SelectionForm() {
  const router = useRouter();
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedChapter, setSelectedChapter] = useState<string>('');

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    if (selectedGrade) {
      const gradeData = AppData.find(g => g.id === selectedGrade);
      setSubjects(gradeData?.subjects || []);
      setSelectedSubject('');
      setChapters([]);
      setSelectedChapter('');
    }
  }, [selectedGrade]);

  useEffect(() => {
    if (selectedSubject) {
      const subjectData = subjects.find(s => s.id === selectedSubject);
      setChapters(subjectData?.chapters || []);
      setSelectedChapter('');
    }
  }, [selectedSubject, subjects]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGrade && selectedSubject && selectedChapter) {
      router.push(`/learn/${selectedGrade}/${selectedSubject}/${selectedChapter}`);
    }
  };

  const availableGrades = AppData.filter(grade => grade.subjects.length > 0);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Select onValueChange={setSelectedGrade} value={selectedGrade}>
          <SelectTrigger className="w-full h-12 text-base">
            <SelectValue placeholder="ધોરણ પસંદ કરો" />
          </SelectTrigger>
          <SelectContent>
            {availableGrades.map(grade => (
              <SelectItem key={grade.id} value={grade.id} className="text-base">
                {grade.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Select onValueChange={setSelectedSubject} value={selectedSubject} disabled={!selectedGrade}>
          <SelectTrigger className="w-full h-12 text-base">
            <SelectValue placeholder="વિષય પસંદ કરો" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map(subject => (
              <SelectItem key={subject.id} value={subject.id} className="text-base">
                {subject.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Select onValueChange={setSelectedChapter} value={selectedChapter} disabled={!selectedSubject}>
          <SelectTrigger className="w-full h-12 text-base">
            <SelectValue placeholder="પ્રકરણ પસંદ કરો" />
          </SelectTrigger>
          <SelectContent>
            {chapters.map(chapter => (
              <SelectItem key={chapter.id} value={chapter.id} className="text-base">
                {chapter.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full text-lg bg-gradient-to-r from-primary/90 to-primary text-primary-foreground transition-all duration-300 hover:from-accent hover:to-primary hover:shadow-lg hover:-translate-y-1"
        disabled={!selectedGrade || !selectedSubject || !selectedChapter}
      >
        <BookOpen className="mr-2 h-5 w-5" />
        અભ્યાસ શરૂ કરો
      </Button>
    </form>
  );
}
