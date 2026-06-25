import { StyleSheet, Text, View } from 'react-native';

import { AddEntryButton } from './AddEntryButton';

const SUB = '#8A8278';
const INK = '#2B2A28';

type EmptyStateProps = {
  title: string;
  message: string;
  onAdd?: () => void;
};

export function EmptyState({ title, message, onAdd }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {onAdd && <AddEntryButton variant="primary" onPress={onAdd} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: INK,
  },
  message: {
    fontSize: 14,
    color: SUB,
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 22,
  },
});
