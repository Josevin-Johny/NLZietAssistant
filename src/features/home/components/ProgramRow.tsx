// src/features/home/components/ProgramRow.tsx

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ProgramContent } from '../../../shared/types/channel.types';
import { ProgramCard } from './programCard';
import { colors } from '../../../shared/constants/colors';

interface Props {
  title: string;
  date: string;  // ← Add date prop
  programs: ProgramContent[];
}

export const ProgramRow: React.FC<Props> = ({ title, date, programs }) => {
  const renderProgram = ({ item }: { item: ProgramContent }) => (
    <ProgramCard 
      program={item} 
      onPress={() => console.log('Program pressed:', item.title)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      
      <FlatList
        data={programs}
        renderItem={renderProgram}
        keyExtractor={(item, index) => `${date}-${item.contentItemId}-${index}`}
        // ↑ Fixed: Unique key using date + contentItemId + index
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 16,
    marginLeft: 16,
  },
  listContent: {
    paddingHorizontal: 16,
  },
});