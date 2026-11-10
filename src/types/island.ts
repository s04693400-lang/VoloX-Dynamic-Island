export interface CricketMatchData {
  id: string;
  matchName: string;
  series: string;
  team1: { name: string; shortName: string; score: string; overs: string; wickets: number; flag: string };
  team2: { name: string; shortName: string; score: string; overs: string; wickets: number; flag: string };
  currentBatting: 1 | 2;
  status: string;
  lastBall: string;
  runRate: string;
}

export interface MusicTrack {
  title: string;
  artist: string;
  albumArt?: string;
  duration: number; // in seconds
  currentTime: number;
  isPlaying: boolean;
  app: 'spotify' | 'apple-music' | 'youtube-music' | 'local';
}

export interface NotificationItem {
  id: string;
  app: 'whatsapp' | 'instagram' | 'messages' | 'telegram' | 'phone' | 'swiggy' | 'zomato' | 'gmail';
  sender: string;
  message: string;
  time: string;
  avatar?: string;
  read?: boolean;
}

export interface CallData {
  callerName: string;
  callerNumber: string;
  avatar?: string;
  status: 'incoming' | 'ongoing' | 'missed';
  durationSeconds: number;
}

export interface BatteryState {
  level: number;
  isCharging: boolean;
  chargeType: 'dart-18w' | 'standard' | 'unplugged';
}

export interface TimerData {
  initialSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
  label: string;
}

export interface StopwatchData {
  elapsedSeconds: number;
  isRunning: boolean;
  lapTimes: number[];
}

export type IslandMode = 
  | 'idle' 
  | 'cricket' 
  | 'music' 
  | 'notification' 
  | 'battery' 
  | 'call' 
  | 'timer' 
  | 'stopwatch' 
  | 'earphone' 
  | 'usb';

export type OSView = 'lockscreen' | 'homescreen' | 'app' | 'recents';

export type OSAppId = 
  | 'volox' 
  | 'cricket' 
  | 'music' 
  | 'messages' 
  | 'phone' 
  | 'camera' 
  | 'clock' 
  | 'settings';

export interface QuickSettingsState {
  wifi: boolean;
  mobileData: boolean;
  bluetooth: boolean;
  flashlight: boolean;
  dnd: boolean;
  autoRotate: boolean;
  soundMode: 'sound' | 'vibrate' | 'silent';
  brightness: number; // 0 - 100
  volume: number; // 0 - 100
}

export interface VoloXSettings {
  isEnabled: boolean;
  autoCollapseDuration: number; // in seconds, default 5
  yOffset: number; // dp from top (Realme 9i 5G camera punch-hole)
  xOffset: number; // dp from center
  pillWidth: number; // dp default ~110
  pillHeight: number; // dp default ~34
  expandedWidth: number; // dp default ~340
  expandedHeight: number; // dp default ~110
  cornerRadius: number;
  enableVibration: boolean;
  soundEffects: boolean;
  blackPureOled: boolean;
  glowAccentColor: string;
  cameraCutoutAlign: 'center' | 'left' | 'custom';
  
  // Feature Toggles
  showCricketScores: boolean;
  cricketApiKey: string;
  cricketRefreshRate: number; // seconds
  selectedMatchId: string;
  
  showMusic: boolean;
  showNotifications: boolean;
  notificationApps: {
    whatsapp: boolean;
    instagram: boolean;
    messages: boolean;
    telegram: boolean;
    swiggy?: boolean;
    gmail?: boolean;
  };
  
  showBatteryEvents: boolean;
  showCalls: boolean;
  showPeripherals: boolean;
}
