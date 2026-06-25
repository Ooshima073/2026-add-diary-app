import { act, renderHook } from '@testing-library/react-native';

import {
  EntriesProvider,
  searchEntries,
  sortEntries,
  useEntries,
} from './entries';

function wrap({ children }: { children: React.ReactNode }) {
  return <EntriesProvider>{children}</EntriesProvider>;
}

describe('searchEntries', () => {
  const entries = [
    {
      id: '1',
      title: '京都散歩',
      body: '鴨川沿いを歩いた',
      date: new Date(2026, 4, 29),
      images: [],
      createdAt: new Date(2026, 4, 29),
      updatedAt: new Date(2026, 4, 29),
    },
    {
      id: '2',
      title: '読書',
      body: '小説を読み終えた',
      date: new Date(2026, 4, 20),
      images: [],
      createdAt: new Date(2026, 4, 20),
      updatedAt: new Date(2026, 4, 20),
    },
  ];

  it('returns all entries when query is empty', () => {
    expect(searchEntries(entries, '')).toHaveLength(2);
    expect(searchEntries(entries, '   ')).toHaveLength(2);
  });

  it('filters by title', () => {
    expect(searchEntries(entries, '京都')).toHaveLength(1);
    expect(searchEntries(entries, '京都')[0].id).toBe('1');
  });

  it('filters by body', () => {
    expect(searchEntries(entries, '小説')).toHaveLength(1);
    expect(searchEntries(entries, '小説')[0].id).toBe('2');
  });

  it('is case insensitive', () => {
    expect(searchEntries(entries, 'KYOTO')).toHaveLength(0);
    expect(searchEntries(entries, '読書')).toHaveLength(1);
  });
});

describe('sortEntries', () => {
  it('sorts by date descending', () => {
    const sorted = sortEntries([
      {
        id: 'old',
        title: '古い',
        body: '',
        date: new Date(2026, 0, 1),
        images: [],
        createdAt: new Date(2026, 0, 1),
        updatedAt: new Date(2026, 0, 1),
      },
      {
        id: 'new',
        title: '新しい',
        body: '',
        date: new Date(2026, 5, 1),
        images: [],
        createdAt: new Date(2026, 5, 1),
        updatedAt: new Date(2026, 5, 1),
      },
    ]);

    expect(sorted.map((entry) => entry.id)).toEqual(['new', 'old']);
  });
});

describe('useEntries', () => {
  it('starts with the seeded entries', () => {
    const { result } = renderHook(() => useEntries(), { wrapper: wrap });
    expect(result.current.entries).toHaveLength(5);
  });

  it('prepends a new entry when addEntry is called', () => {
    const { result } = renderHook(() => useEntries(), { wrapper: wrap });

    act(() => {
      result.current.addEntry({
        title: 'テストエントリ',
        body: 'jest からの追加',
        date: new Date(2026, 5, 1),
        images: [],
      });
    });

    expect(result.current.entries).toHaveLength(6);
    expect(result.current.entries[0]).toMatchObject({
      title: 'テストエントリ',
      body: 'jest からの追加',
      images: [],
    });
  });

  it('throws when used outside the provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useEntries())).toThrow(
      /useEntries must be used inside/,
    );
    spy.mockRestore();
  });
});
