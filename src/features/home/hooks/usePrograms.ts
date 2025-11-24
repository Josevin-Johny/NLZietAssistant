// src/features/home/hooks/usePrograms.ts

import { useState, useEffect } from 'react';
import { programsService } from '../services/programsService';
import { ProgramsByDate } from '../../../shared/types/channel.types';

export const usePrograms = (channelId: string) => {
  const [programsByDate, setProgramsByDate] = useState<ProgramsByDate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadPrograms();
  }, [channelId]);

  const loadPrograms = () => {
    try {
      setLoading(true);
      const data = programsService.getProgramsByDate(channelId);
      setProgramsByDate(data);
    } catch (error) {
      console.error('Error loading programs:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    programsByDate,
    loading,
  };
};
