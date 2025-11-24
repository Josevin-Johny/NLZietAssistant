
import programData from '../../../../assets/data/mockProgramsdata.json';
import { 

    EPGData,
    ChannelData,
    ProgramContent,
    ProgramsByDate

} from '../../../shared/types/channel.types';

export class ProgramsService {
    private data: EPGData;

    constructor() {
        this.data = programData as EPGData;
    }

    getAllChannels(): ChannelData[] {
        return this.data.data;
    }

    getProgramsByChannel(channelID: string): ProgramContent[] {
       const channel = this.data.data.find(ch => ch.channel.content.id == channelID);
       
       if (!channel) {
        return [];
       }

       return channel.programLocations.map(loc => loc.content)
    } 

    getProgramsByDate(channelId: string): ProgramsByDate[] {
    const programs = this.getProgramsByChannel(channelId);
    
    // Group programs by date
    const groupedMap = new Map<string, ProgramContent[]>();
    
    programs.forEach(program => {
      // Extract date from ISO string (2025-11-23T10:30:00+01:00 → 2025-11-23)
      const date = program.startAt.split('T')[0];
      
      if (!groupedMap.has(date)) {
        groupedMap.set(date, []);
      }
      
      groupedMap.get(date)?.push(program);
    });
    
    // Convert Map to array and sort by date
    const grouped: ProgramsByDate[] = Array.from(groupedMap.entries())
      .map(([date, programs]) => ({
        date,
        displayDate: this.formatDisplayDate(date),
        programs: programs.sort((a, b) => 
          a.startAt.localeCompare(b.startAt)
        ),
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
    
    return grouped;
  }
  
 
  private formatDisplayDate(dateString: string): string {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const tomorrowOnly = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
    
    if (dateOnly.getTime() === todayOnly.getTime()) {
      return 'Today';
    } else if (dateOnly.getTime() === tomorrowOnly.getTime()) {
      return 'Tomorrow';
    } else {
      // Format as "Nov 23"
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  }

  formatTime(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  }
  
  getDuration(startAt: string, endAt: string): number {
    const start = new Date(startAt);
    const end = new Date(endAt);
    return Math.round((end.getTime() - start.getTime()) / 60000); // minutes
  }
  
}

export const programsService = new ProgramsService();

