import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { useEntries } from '../store/entries';

export default function NewEntry() {
  const { addEntry } = useEntries();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const canSave = title.trim().length > 0 || body.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    addEntry({
      title: title.trim(),
      body: body.trim(),
      date: new Date(),
      images: [],
    });
    router.back();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text style={styles.cancel}>キャンセル</Text>
        </Pressable>
        <Text style={styles.headerTitle}>新しい記録</Text>
        <Pressable onPress={handleSave} hitSlop={12} disabled={!canSave}>
          <Text style={[styles.save, !canSave && styles.saveDisabled]}>
            保存
          </Text>
        </Pressable>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <TextInput
            style={styles.titleInput}
            placeholder="タイトル"
            placeholderTextColor="#B5AC9F"
            value={title}
            onChangeText={setTitle}
            returnKeyType="next"
          />

          <View style={styles.divider} />

          <TextInput
            style={styles.bodyInput}
            placeholder="今日のこと..."
            placeholderTextColor="#B5AC9F"
            value={body}
            onChangeText={setBody}
            multiline
            textAlignVertical="top"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const PAPER = '#FAF6EE';
const INK = '#2B2A28';
const SUB = '#8A8278';
const ACCENT = '#8B5E3C';
const BORDER = '#E8E0D2';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: PAPER,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: INK,
    letterSpacing: 2,
  },
  cancel: {
    fontSize: 15,
    color: SUB,
  },
  save: {
    fontSize: 15,
    color: ACCENT,
    fontWeight: '600',
  },
  saveDisabled: {
    color: '#C9C0B2',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 8,
  },
  titleInput: {
    fontSize: 20,
    fontWeight: '600',
    color: INK,
    paddingVertical: 10,
  },
  divider: {
    height: 1,
    backgroundColor: BORDER,
    marginVertical: 8,
  },
  bodyInput: {
    fontSize: 15,
    color: INK,
    lineHeight: 24,
    minHeight: 240,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
