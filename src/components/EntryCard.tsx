import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Entry } from '../store/entries';

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

const SUB = '#8A8278';
const INK = '#2B2A28';
const CARD = '#FFFFFF';
const BORDER = '#E8E0D2';

type EntryCardProps = {
  entry: Entry;
  onPress?: () => void;
};

function formatDay(date: Date) {
  return {
    day: String(date.getDate()).padStart(2, '0'),
    weekday: WEEKDAYS[date.getDay()],
  };
}

export function EntryCard({ entry, onPress }: EntryCardProps) {
  const { day, weekday } = formatDay(entry.date);
  const thumbnail = entry.images[0];

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.dateColumn}>
        <Text style={styles.weekday}>{weekday}</Text>
        <Text style={styles.day}>{day}</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>
          {entry.title || '(無題)'}
        </Text>
        {entry.body.length > 0 && (
          <Text style={styles.excerpt} numberOfLines={2}>
            {entry.body}
          </Text>
        )}
        {entry.images.length > 1 && (
          <Text style={styles.imageCount}>📷 {entry.images.length}枚</Text>
        )}
      </View>

      {thumbnail ? (
        <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
      ) : (
        <View style={styles.thumbnailPlaceholder}>
          <Text style={styles.thumbnailPlaceholderText}>📝</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: CARD,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: BORDER,
  },
  cardPressed: {
    opacity: 0.85,
  },
  dateColumn: {
    alignItems: 'center',
    width: 40,
  },
  weekday: {
    fontSize: 11,
    color: SUB,
  },
  day: {
    fontSize: 22,
    fontWeight: '600',
    color: INK,
    marginTop: 2,
  },
  body: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: INK,
  },
  excerpt: {
    fontSize: 13,
    color: SUB,
    marginTop: 6,
    lineHeight: 20,
  },
  imageCount: {
    fontSize: 11,
    color: SUB,
    marginTop: 6,
  },
  thumbnail: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: BORDER,
  },
  thumbnailPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: '#F3EDE3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailPlaceholderText: {
    fontSize: 22,
  },
});
