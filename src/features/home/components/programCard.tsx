
// src/features/home/components/ProgramCard.tsx

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ProgramContent } from '../../../shared/types/channel.types';
import { colors } from '../../../shared/constants/colors';
import { programsService } from '../../../features/home/services/programsService';

interface Props {
  program: ProgramContent;
  onPress?: () => void;
}

export const ProgramCard: React.FC<Props> = ({ program, onPress }) => {
  const startTime = programsService.formatTime(program.startAt);
  const endTime = programsService.formatTime(program.endAt);
  const duration = programsService.getDuration(program.startAt, program.endAt);

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: program.image.landscapeUrl || '' }}
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {program.title}
        </Text>
        
        <Text style={styles.time}>
          {startTime} - {endTime}
        </Text>
        
        <Text style={styles.duration}>{duration} min</Text>
      </View>
      
      {program.isMovie && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>MOVIE</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: colors.surfaceLight,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
    minHeight: 40,
  },
  time: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  duration: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textPrimary,
  },
});