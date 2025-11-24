


export interface ChannelLogo {
  normalUrl: string;
  darkUrl: string;
  flatUrl: string; 
}

export interface Channel {
  id: string;
  title: string; 
  logo: ChannelLogo;
}

export interface ProgramImage {
  landscapeUrl: string | null;  
  portraitUrl: string | null;   
}

export interface ProgramContent {
  contentItemId: string;
  assetId: string;
  title: string;
  startAt: string;  
  endAt: string;    
  image: ProgramImage;
  isReplayAllowed: boolean;
  isRestartAllowed: boolean;
  contentProvider: string;
  isMovie: boolean;
}

export interface ProgramLocation {
  content: ProgramContent;
}

export interface ChannelData {
  channel: {
    content: Channel;
  };
  programLocations: ProgramLocation[];
}

export interface EPGData {
  data: ChannelData[];
}

export interface ProgramsByDate {  
  date: string;         
  displayDate: string;  
  programs: ProgramContent[];
}