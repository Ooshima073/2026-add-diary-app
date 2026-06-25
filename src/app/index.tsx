import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { AddEntryButton } from '../components/AddEntryButton';
import { EmptyState } from '../components/EmptyState';
import { EntryCard } from '../components/EntryCard';
import { SearchBar } from '../components/SearchBar';
import { searchEntries, useEntries } from '../store/entries';

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

function formatHeader(date: Date) {
  return `${date.getFullYear()}年 ${date.getMonth() + 1}月`;
}

function formatDay(date: Date) {
  return {
    day: String(date.getDate()).padStart(2, '0'),
    weekday: WEEKDAYS[date.getDay()],
  };
}

export default function Index() {
  const { entries } = useEntries();
  const [query, setQuery] = useState('');
  const today = useMemo(() => new Date(), []);
  const { day: todayDay, weekday: todayWeekday } = formatDay(today);

  const filteredEntries = useMemo(
    () => searchEntries(entries, query),
    [entries, query],
  );

  const isSearching = query.trim().length > 0;
  const openNew = () => router.push('/new');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.headerMonth}>{formatHeader(today)}</Text>
          <Text style={styles.headerTitle}>日記</Text>
        </View>

        <SearchBar value={query} onChangeText={setQuery} />

        {!isSearching && (
          <Pressable style={styles.todayCard} onPress={openNew}>
            <View style={styles.todayDateColumn}>
              <Text style={styles.todayWeekday}>{todayWeekday}</Text>
              <Text style={styles.todayDay}>{todayDay}</Text>
            </View>
            <View style={styles.todayBody}>
              <Text style={styles.todayLabel}>今日の記録</Text>
              <Text style={styles.todayPrompt}>
                タップして、今日のことを書きとめよう。
              </Text>
            </View>
            <Text style={styles.todayChevron}>＋</Text>
          </Pressable>
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>
            {isSearching ? '検索結果' : 'これまでの日記'}
          </Text>
          {isSearching && (
            <Text style={styles.resultCount}>{filteredEntries.length}件</Text>
          )}
        </View>

        {filteredEntries.length === 0 ? (
          <EmptyState
            title={
              isSearching ? '該当する日記がありません' : '日記がまだありません'
            }
            message={
              isSearching
                ? '別のキーワードで試してみてください。'
                : 'ボタンをタップして、最初の日記を書いてみましょう。'
            }
            onAdd={isSearching ? undefined : openNew}
          />
        ) : (
          <View style={styles.list}>
            {filteredEntries.map((entry) => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </View>
        )}
      </ScrollView>

      <AddEntryButton onPress={openNew} />
    </SafeAreaView>
  );
}

const PAPER = '#FAF6EE';
const INK = '#2B2A28';
const SUB = '#8A8278';
const ACCENT = '#8B5E3C';
const CARD = '#FFFFFF';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: PAPER,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  header: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerMonth: {
    fontSize: 13,
    color: SUB,
    letterSpacing: 2,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: INK,
    marginTop: 4,
    letterSpacing: 4,
  },
  todayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD,
    borderRadius: 16,
    padding: 18,
    gap: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  todayDateColumn: {
    alignItems: 'center',
    width: 44,
  },
  todayWeekday: {
    fontSize: 12,
    color: ACCENT,
    fontWeight: '600',
  },
  todayDay: {
    fontSize: 26,
    fontWeight: '700',
    color: INK,
    marginTop: 2,
  },
  todayBody: {
    flex: 1,
  },
  todayLabel: {
    fontSize: 12,
    color: SUB,
    letterSpacing: 1,
  },
  todayPrompt: {
    fontSize: 15,
    color: INK,
    marginTop: 4,
    lineHeight: 22,
  },
  todayChevron: {
    fontSize: 24,
    color: ACCENT,
    fontWeight: '300',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 28,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionLabel: {
    fontSize: 12,
    color: SUB,
    letterSpacing: 2,
  },
  resultCount: {
    fontSize: 12,
    color: ACCENT,
    fontWeight: '600',
  },
  list: {
    gap: 12,
  },
});
