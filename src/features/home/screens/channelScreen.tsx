// src/features/home/screens/ChannelScreen.tsx

import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { usePrograms } from '../hooks/usePrograms';
import { ProgramRow } from '../components/ProgramRow';
import { LoadingScreen } from '../components/loadingScreen';
import { colors } from '../../../shared/constants/colors';

interface Props {
  channelId: string;
}

export const ChannelScreen: React.FC<Props> = ({ channelId }) => {
  const { programsByDate, loading } = usePrograms(channelId);

  if (loading) {
    return <LoadingScreen />;
  }

  if (programsByDate.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No programs available</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        {programsByDate.map((dateGroup) => (
          <ProgramRow
            key={dateGroup.date}
            title={dateGroup.displayDate}
            date={dateGroup.date}  // ← Pass date prop
            programs={dateGroup.programs}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});