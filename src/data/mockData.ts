import { CricketMatchData, MusicTrack, NotificationItem, VoloXSettings } from '../types/island';

export const INITIAL_SETTINGS: VoloXSettings = {
  isEnabled: true,
  autoCollapseDuration: 5,
  yOffset: 16, // px from top, aligned with Realme 9i 5G punch hole
  xOffset: 0,
  pillWidth: 120,
  pillHeight: 32,
  expandedWidth: 350,
  expandedHeight: 120,
  cornerRadius: 24,
  enableVibration: true,
  soundEffects: true,
  blackPureOled: true,
  glowAccentColor: '#00E676', // OnePlus OxygenOS / VoloX emerald glow
  cameraCutoutAlign: 'center',
  
  showCricketScores: true,
  cricketApiKey: '',
  cricketRefreshRate: 10,
  selectedMatchId: 'ind-vs-aus-2024',
  
  showMusic: true,
  showNotifications: true,
  notificationApps: {
    whatsapp: true,
    instagram: true,
    messages: true,
    telegram: true,
  },
  
  showBatteryEvents: true,
  showCalls: true,
  showPeripherals: true,
};

export const SAMPLE_MATCHES: CricketMatchData[] = [
  {
    id: 'ind-vs-aus-2024',
    matchName: 'ICC World Cup Final - 2nd Innings',
    series: 'ICC Men\'s Cricket Trophy',
    team1: { name: 'India', shortName: 'IND', score: '286', overs: '50.0', wickets: 7, flag: '🇮🇳' },
    team2: { name: 'Australia', shortName: 'AUS', score: '248', overs: '42.3', wickets: 6, flag: '🇦🇺' },
    currentBatting: 2,
    status: 'AUS need 39 runs from 45 balls',
    lastBall: '1 run (Maxwell)',
    runRate: '5.84'
  },
  {
    id: 'csk-vs-mi-2024',
    matchName: 'T20 Super League - Match 44',
    series: 'Indian Premier League',
    team1: { name: 'Chennai Kings', shortName: 'CSK', score: '194', overs: '20.0', wickets: 4, flag: '🦁' },
    team2: { name: 'Mumbai Indians', shortName: 'MI', score: '172', overs: '18.1', wickets: 5, flag: '⚡' },
    currentBatting: 2,
    status: 'MI need 23 runs in 11 balls',
    lastBall: 'FOUR! Smashed over covers',
    runRate: '9.47'
  },
  {
    id: 'eng-vs-pak-2024',
    matchName: '2nd T20 International',
    series: 'England Tour of Pakistan',
    team1: { name: 'England', shortName: 'ENG', score: '183', overs: '19.4', wickets: 8, flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    team2: { name: 'Pakistan', shortName: 'PAK', score: '165', overs: '17.2', wickets: 4, flag: '🇵🇰' },
    currentBatting: 2,
    status: 'PAK need 19 off 16 balls',
    lastBall: 'SIX! Pulled over deep mid-wicket',
    runRate: '9.51'
  }
];

export const SAMPLE_TRACKS: MusicTrack[] = [
  {
    title: 'Starboy (feat. Daft Punk)',
    artist: 'The Weeknd',
    albumArt: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=150&auto=format&fit=crop&q=80',
    duration: 230,
    currentTime: 78,
    isPlaying: true,
    app: 'spotify'
  },
  {
    title: 'Midnight City',
    artist: 'M83',
    albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&auto=format&fit=crop&q=80',
    duration: 244,
    currentTime: 112,
    isPlaying: true,
    app: 'spotify'
  },
  {
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&auto=format&fit=crop&q=80',
    duration: 200,
    currentTime: 45,
    isPlaying: true,
    app: 'apple-music'
  }
];

export const SAMPLE_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    app: 'whatsapp',
    sender: 'Aman Sharma',
    message: 'Hey bro, are you coming to the cricket turf at 6 PM? We have the pitch booked!',
    time: 'Just now'
  },
  {
    id: 'n2',
    app: 'instagram',
    sender: 'rohit_official',
    message: 'liked your reel "Realme 9i 5G clean setup with VoloX Dynamic Island 🔥"',
    time: '2m ago'
  },
  {
    id: 'n3',
    app: 'messages',
    sender: 'HDFC-BANK',
    message: 'Dear Customer, your OTP for transaction of Rs. 4,500 is 849201. Do not share it with anyone.',
    time: '4m ago'
  },
  {
    id: 'n4',
    app: 'telegram',
    sender: 'Android Dev Community',
    message: 'VoloX Dynamic Island 1.0 release notes: Smooth spring physics on Realme UI 5.0!',
    time: '8m ago'
  }
];
