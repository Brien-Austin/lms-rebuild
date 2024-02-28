import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Counter {
  chapterId: string |null;
  setChapterId: (currentCourseId: string | null) => void;
}

export const useCourseIdStore = create(
  persist<Counter>(
    (set, get) => ({
      chapterId: '',
      setChapterId: (currentCourseId) => {
        set({ chapterId: currentCourseId });
      },
    }),
    {
      name: 'chapterId',
    }
  )
);
