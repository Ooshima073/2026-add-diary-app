import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type Entry = {
  id: string;
  title: string;
  body: string;
  date: Date;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
};

const INITIAL_ENTRIES: Entry[] = [
  {
    id: 'seed-1',
    title: '鴨川沿いを散歩した',
    body: '夕方から鴨川沿いを歩いた。風がぬるくて、もう初夏という感じ。等間隔カップルも健在で、見ているだけで少し笑ってしまった。',
    date: new Date(2026, 4, 29),
    images: [],
    createdAt: new Date(2026, 4, 29, 20, 0),
    updatedAt: new Date(2026, 4, 29, 20, 0),
  },
  {
    id: 'seed-2',
    title: '新しい喫茶店',
    body: '河原町二条の小さな喫茶店に入った。深煎りの豆と、店主の選曲がとても良かった。次は本を持って行きたい。',
    date: new Date(2026, 4, 27),
    images: [],
    createdAt: new Date(2026, 4, 27, 15, 30),
    updatedAt: new Date(2026, 4, 27, 15, 30),
  },
  {
    id: 'seed-3',
    title: '雨の日の作業',
    body: '一日中雨。家でコードを書いて過ごす。集中はできたけれど、夜になって少しだけ気分が落ちた。明日は外に出よう。',
    date: new Date(2026, 4, 24),
    images: [],
    createdAt: new Date(2026, 4, 24, 22, 0),
    updatedAt: new Date(2026, 4, 24, 22, 0),
  },
  {
    id: 'seed-4',
    title: '友人と夕食',
    body: '久しぶりに学生時代の友人とラーメン。お互い違う方向に進んだけれど、話しているとあの頃の距離感に戻る。',
    date: new Date(2026, 4, 21),
    images: [],
    createdAt: new Date(2026, 4, 21, 19, 0),
    updatedAt: new Date(2026, 4, 21, 19, 0),
  },
  {
    id: 'seed-5',
    title: '読了',
    body: '積んでいた本をやっと読み終えた。後半の展開がとても良くて、読後しばらく動けなかった。',
    date: new Date(2026, 4, 18),
    images: [],
    createdAt: new Date(2026, 4, 18, 23, 0),
    updatedAt: new Date(2026, 4, 18, 23, 0),
  },
];

export type EntryInput = {
  title: string;
  body: string;
  date: Date;
  images: string[];
};

type EntriesContextValue = {
  entries: Entry[];
  addEntry: (input: EntryInput) => string;
};

const EntriesContext = createContext<EntriesContextValue | null>(null);

export function sortEntries(entries: Entry[]): Entry[] {
  return [...entries].sort((a, b) => {
    const dateDiff = b.date.getTime() - a.date.getTime();
    if (dateDiff !== 0) return dateDiff;
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
}

export function searchEntries(entries: Entry[], query: string): Entry[] {
  const q = query.trim().toLowerCase();
  if (!q) return entries;
  return entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(q) ||
      entry.body.toLowerCase().includes(q),
  );
}

export function EntriesProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<Entry[]>(() =>
    sortEntries(INITIAL_ENTRIES),
  );

  const value = useMemo<EntriesContextValue>(
    () => ({
      entries,
      addEntry: ({ title, body, date, images }) => {
        const now = new Date();
        const id = `entry-${Date.now()}`;
        setEntries((prev) =>
          sortEntries([
            {
              id,
              title,
              body,
              date,
              images,
              createdAt: now,
              updatedAt: now,
            },
            ...prev,
          ]),
        );
        return id;
      },
    }),
    [entries],
  );

  return (
    <EntriesContext.Provider value={value}>{children}</EntriesContext.Provider>
  );
}

export function useEntries() {
  const ctx = useContext(EntriesContext);
  if (!ctx) {
    throw new Error('useEntries must be used inside <EntriesProvider>');
  }
  return ctx;
}
