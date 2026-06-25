import { Pressable, StyleSheet, Text } from 'react-native';

const ACCENT = '#8B5E3C';

type AddEntryButtonProps = {
  onPress: () => void;
  variant?: 'fab' | 'primary';
};

export function AddEntryButton({
  onPress,
  variant = 'fab',
}: AddEntryButtonProps) {
  if (variant === 'primary') {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.primary,
          pressed && styles.primaryPressed,
        ]}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel="日記を追加"
      >
        <Text style={styles.primaryIcon}>＋</Text>
        <Text style={styles.primaryLabel}>日記を書く</Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="日記を追加"
    >
      <Text style={styles.fabIcon}>＋</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  fabPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.96 }],
  },
  fabIcon: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 30,
  },
  primary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: ACCENT,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginTop: 20,
  },
  primaryPressed: {
    opacity: 0.9,
  },
  primaryIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  primaryLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
