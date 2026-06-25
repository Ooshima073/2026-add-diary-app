import { Pressable, StyleSheet, TextInput, View } from 'react-native';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

const SUB = '#8A8278';
const INK = '#2B2A28';
const CARD = '#FFFFFF';
const BORDER = '#E8E0D2';

export function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="タイトルや本文で検索"
        placeholderTextColor={SUB}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        clearButtonMode="while-editing"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <Pressable
          onPress={() => onChangeText('')}
          hitSlop={8}
          style={styles.clearButton}
        >
          <View style={styles.clearIcon}>
            <View style={styles.clearLineA} />
            <View style={styles.clearLineB} />
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: INK,
    paddingVertical: 12,
  },
  clearButton: {
    marginLeft: 8,
    padding: 4,
  },
  clearIcon: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearLineA: {
    position: 'absolute',
    width: 14,
    height: 1.5,
    backgroundColor: SUB,
    transform: [{ rotate: '45deg' }],
  },
  clearLineB: {
    position: 'absolute',
    width: 14,
    height: 1.5,
    backgroundColor: SUB,
    transform: [{ rotate: '-45deg' }],
  },
});
