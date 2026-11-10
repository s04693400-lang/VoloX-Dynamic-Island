import React, { useState } from 'react';
import { 
  IslandMode, 
  VoloXSettings, 
  CricketMatchData, 
  MusicTrack, 
  NotificationItem, 
  BatteryState, 
  CallData, 
  TimerData, 
  StopwatchData, 
  OSView, 
  OSAppId, 
  QuickSettingsState 
} from '../types/island';
import { DynamicIslandOverlay } from './DynamicIslandOverlay';
import { InAppScreens, ScreenTab } from './InAppScreens';
import { RealmeOSApps } from './RealmeOSApps';
import { RealmeNotificationCenter } from './RealmeNotificationCenter';
import { soundEngine } from '../utils/soundEffects';
import { 
  Wifi, 
  WifiOff, 
  Battery, 
  Signal, 
  Camera, 
  MessageCircle, 
  Compass, 
  Settings as SettingsIcon,
  Music,
  Trophy,
  ChevronLeft,
  Smartphone,
  Lock,
  Unlock,
  Bell,
  Sliders,
  Phone,
  Clock as ClockIcon,
  Search,
  Sparkles,
  Zap,
  RotateCcw,
  Square,
  Circle,
  Triangle
} from 'lucide-react';

interface Props {
  mode: IslandMode;
  settings: VoloXSettings;
  cricketMatch: CricketMatchData;
  matches: CricketMatchData[];
  onSelectMatch: (matchId: string) => void;
  onSimulateBall: () => void;
  musicTrack: MusicTrack;
  tracks: MusicTrack[];
  trackIndex: number;
  onSelectTrack: (idx: number) => void;
  onTogglePlay: () => void;
  onPrevTrack: () => void;
  onNextTrack: () => void;
  notification: NotificationItem | null;
  notificationsList: NotificationItem[];
  onDismissNotification: (id: string) => void;
  onClearAllNotifications: () => void;
  onSendCustomNotification: (notif: Omit<NotificationItem, 'id' | 'time'>) => void;
  onSendQuickReply?: (reply: string) => void;
  battery: BatteryState;
  call: CallData;
  onStartCall: (name: string, number: string) => void;
  onEndCall: () => void;
  onAnswerCall: () => void;
  onDeclineCall: () => void;
  timer: TimerData;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  stopwatch: StopwatchData;
  onToggleStopwatch: () => void;
  onResetStopwatch: () => void;
  onModeChange: (mode: IslandMode) => void;
  onUpdateSettings: (updater: (prev: VoloXSettings) => VoloXSettings) => void;
  onOpenRealmeGuide: () => void;
}

export const RealmeSimulator: React.FC<Props> = ({
  mode,
  settings,
  cricketMatch,
  matches,
  onSelectMatch,
  onSimulateBall,
  musicTrack,
  tracks,
  trackIndex,
  onSelectTrack,
  onTogglePlay,
  onPrevTrack,
  onNextTrack,
  notification,
  notificationsList,
  onDismissNotification,
  onClearAllNotifications,
  onSendCustomNotification,
  onSendQuickReply,
  battery,
  call,
  onStartCall,
  onEndCall,
  onAnswerCall,
  onDeclineCall,
  timer,
  onToggleTimer,
  onResetTimer,
  stopwatch,
  onToggleStopwatch,
  onResetStopwatch,
  onModeChange,
  onUpdateSettings,
  onOpenRealmeGuide
}) => {
  // OS Navigation States
  const [osView, setOsView] = useState<OSView>('homescreen');
  const [activeApp, setActiveApp] = useState<OSAppId>('volox');
  const [voloxTab, setVoloxTab] = useState<ScreenTab>('dashboard');
  const [isNotifCenterOpen, setIsNotifCenterOpen] = useState<boolean>(false);

  // Quick settings state
  const [quickSettings, setQuickSettings] = useState<QuickSettingsState>({
    wifi: true,
    mobileData: true,
    bluetooth: true,
    flashlight: false,
    dnd: false,
    autoRotate: true,
    soundMode: 'sound',
    brightness: 85,
    volume: 70
  });

  const launchApp = (app: OSAppId) => {
    soundEngine.playIslandExpand();
    setActiveApp(app);
    setOsView('app');
  };

  const handleHomeClick = () => {
    soundEngine.playIslandCollapse();
    setIsNotifCenterOpen(false);
    setOsView('homescreen');
  };

  const handleLockToggle = () => {
    soundEngine.playIslandCollapse();
    setOsView(prev => (prev === 'lockscreen' ? 'homescreen' : 'lockscreen'));
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 select-none">
      
      {/* Top OS Quick Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-3 bg-zinc-900/90 p-1.5 rounded-2xl border border-zinc-800 text-xs">
        <button
          onClick={handleLockToggle}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl transition ${
            osView === 'lockscreen' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          {osView === 'lockscreen' ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
          <span>{osView === 'lockscreen' ? 'Locked' : 'Lock Phone'}</span>
        </button>

        <button
          onClick={() => setOsView('homescreen')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl transition ${
            osView === 'homescreen' ? 'bg-emerald-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <span>Homescreen</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playIslandExpand();
            setIsNotifCenterOpen(!isNotifCenterOpen);
          }}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl transition ${
            isNotifCenterOpen ? 'bg-sky-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Control Center {notificationsList.length > 0 && `(${notificationsList.length})`}</span>
        </button>
      </div>

      {/* Realme 9i 5G Outer Hardware Chassis */}
      <div className="relative w-[370px] h-[755px] bg-gradient-to-b from-[#181C24] via-[#0D1118] to-[#121620] rounded-[50px] p-[10px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.08)] ring-1 ring-zinc-700/60">
        
        {/* Hardware Volume Buttons (Left) */}
        <div className="absolute -left-[3px] top-28 w-[3px] h-10 bg-zinc-700 rounded-l" />
        <div className="absolute -left-[3px] top-42 w-[3px] h-10 bg-zinc-700 rounded-l" />
        {/* Hardware Fingerprint Power Button (Right) */}
        <button
          onClick={handleLockToggle}
          title="Power / Lock Key"
          className="absolute -right-[3px] top-36 w-[3px] h-14 bg-zinc-600 hover:bg-emerald-500 rounded-r cursor-pointer transition"
        />

        {/* Screen Frame */}
        <div className="relative w-full h-full bg-black rounded-[40px] overflow-hidden flex flex-col border border-zinc-900 shadow-inner">

          {/* Front Camera Cutout (Realme 9i 5G Punch Hole Centered) */}
          <div className="absolute top-[14px] left-1/2 -translate-x-1/2 z-40 pointer-events-none">
            <div className="w-3.5 h-3.5 rounded-full bg-black border border-zinc-800/90 shadow-inner flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#05111d] ring-1 ring-emerald-500/20" />
            </div>
          </div>

          {/* Dynamic Island Overlay Floating on top of the OS */}
          <DynamicIslandOverlay
            mode={mode}
            settings={settings}
            cricketMatch={cricketMatch}
            musicTrack={musicTrack}
            notification={notification}
            battery={battery}
            call={call}
            timer={timer}
            stopwatch={stopwatch}
            onModeChange={onModeChange}
            onTogglePlay={onTogglePlay}
            onPrevTrack={onPrevTrack}
            onNextTrack={onNextTrack}
            onAnswerCall={onAnswerCall}
            onDeclineCall={onDeclineCall}
            onToggleTimer={onToggleTimer}
            onDismissNotification={() => {
              if (notification) onDismissNotification(notification.id);
              onModeChange('idle');
            }}
            onSendQuickReply={onSendQuickReply}
          />

          {/* Realme UI 5.0 Status Bar (Click or Swipe down to open Control Center) */}
          <div 
            onClick={() => {
              soundEngine.playIslandExpand();
              setIsNotifCenterOpen(!isNotifCenterOpen);
            }}
            className="relative z-30 px-6 pt-3 pb-1 flex items-center justify-between text-[11px] font-semibold text-white cursor-pointer hover:bg-white/5 transition"
            title="Click to pull down Realme Control Center & Notifications"
          >
            {/* Clock */}
            <span className="font-mono tracking-tight text-xs">20:34</span>

            {/* Status Icons */}
            <div className="flex items-center gap-1.5 text-zinc-300">
              {notificationsList.length > 0 && (
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-0.5 animate-pulse" />
              )}
              <span className="text-[9px] font-bold tracking-tighter text-emerald-400">5G</span>
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <div className="flex items-center gap-0.5">
                <span className="text-[10px] font-mono">{battery.level}%</span>
                <Battery className={`w-4 h-4 ${battery.isCharging ? 'text-emerald-400 fill-emerald-400' : 'fill-white'}`} />
              </div>
            </div>
          </div>

          {/* Control Center & Real-Time Notification Shade Drawer */}
          <RealmeNotificationCenter
            isOpen={isNotifCenterOpen}
            onClose={() => setIsNotifCenterOpen(false)}
            notifications={notificationsList}
            onDismissNotification={onDismissNotification}
            onClearAllNotifications={onClearAllNotifications}
            quickSettings={quickSettings}
            onUpdateQuickSettings={setQuickSettings}
            islandSettings={settings}
            onToggleIsland={() => onUpdateSettings(prev => ({ ...prev, isEnabled: !prev.isEnabled }))}
          />

          {/* Screen Content View based on OS State */}
          <div className="relative flex-1 overflow-y-auto no-scrollbar">
            
            {/* 1. LOCK SCREEN VIEW */}
            {osView === 'lockscreen' && (
              <div 
                onClick={() => {
                  soundEngine.playIslandExpand();
                  setOsView('homescreen');
                }}
                className="relative h-full flex flex-col justify-between p-6 select-none cursor-pointer bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-[#050A12]"
              >
                {/* Big Lockscreen Clock */}
                <div className="mt-14 text-center">
                  <div className="text-6xl font-extralight text-white tracking-tight font-sans">
                    20:34
                  </div>
                  <div className="text-xs text-zinc-400 mt-1.5">
                    Monday, November 9
                  </div>
                </div>

                {/* Notifications on Lock Screen */}
                <div className="my-auto space-y-2">
                  {notificationsList.slice(0, 2).map(n => (
                    <div key={n.id} className="p-3 rounded-2xl bg-zinc-900/80 backdrop-blur border border-zinc-800 text-left">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-white">{n.sender}</span>
                        <span className="text-[9px] text-zinc-500">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-zinc-300 truncate">{n.message}</p>
                    </div>
                  ))}
                </div>

                {/* Bottom Unlock Prompt & Shortcuts */}
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 animate-bounce">
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Swipe or tap to unlock</span>
                  </div>

                  <div className="w-full flex items-center justify-between px-2 pt-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); launchApp('phone'); }}
                      className="p-3 rounded-full bg-zinc-900/80 border border-zinc-800 text-white"
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); launchApp('camera'); }}
                      className="p-3 rounded-full bg-zinc-900/80 border border-zinc-800 text-white"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 2. HOMESCREEN VIEW */}
            {osView === 'homescreen' && (
              <div className="relative h-full flex flex-col justify-between p-4 select-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-[#050B14]">
                
                {/* Clock & Weather Widget */}
                <div className="mt-8 text-center">
                  <div className="text-5xl font-extralight text-white tracking-tight font-sans">
                    20:34
                  </div>
                  <div className="text-xs text-zinc-400 mt-1 flex items-center justify-center gap-2">
                    <span>Mon, Nov 9</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-medium">Realme UI 5.0</span>
                  </div>
                </div>

                {/* Google Search Bar */}
                <div className="my-2 bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-full px-3.5 py-2 flex items-center justify-between text-zinc-400 shadow">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-white">G</span>
                    <span className="text-[11px]">Search or type URL...</span>
                  </div>
                  <Search className="w-3.5 h-3.5" />
                </div>

                {/* 8 Full Interactive OS Apps Grid */}
                <div className="grid grid-cols-4 gap-3.5 my-auto px-1">
                  
                  {/* 1. VoloX Island App */}
                  <div 
                    onClick={() => launchApp('volox')}
                    className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 border border-emerald-400/40 flex items-center justify-center text-black font-extrabold shadow-lg shadow-emerald-500/20">
                      <Sparkles className="w-6 h-6 text-black" />
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold truncate">VoloX</span>
                  </div>

                  {/* 2. Cricket Live App */}
                  <div 
                    onClick={() => launchApp('cricket')}
                    className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-500 border border-amber-400/40 flex items-center justify-center text-black font-bold shadow-lg shadow-amber-500/20">
                      <Trophy className="w-6 h-6 text-black" />
                    </div>
                    <span className="text-[10px] text-zinc-300 truncate">Cricket</span>
                  </div>

                  {/* 3. Music App */}
                  <div 
                    onClick={() => launchApp('music')}
                    className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-500 border border-sky-400/40 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
                      <Music className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] text-zinc-300 truncate">Music</span>
                  </div>

                  {/* 4. WhatsApp / Messages */}
                  <div 
                    onClick={() => launchApp('messages')}
                    className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-500 border border-emerald-400/40 flex items-center justify-center text-white shadow-lg">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] text-zinc-300 truncate">WhatsApp</span>
                  </div>

                  {/* 5. Phone / Dialer */}
                  <div 
                    onClick={() => launchApp('phone')}
                    className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 border border-blue-400/40 flex items-center justify-center text-white shadow-lg">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] text-zinc-300 truncate">Phone</span>
                  </div>

                  {/* 6. 50MP AI Camera */}
                  <div 
                    onClick={() => launchApp('camera')}
                    className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 border border-red-400/40 flex items-center justify-center text-white shadow-lg">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] text-zinc-300 truncate">Camera</span>
                  </div>

                  {/* 7. Clock & Timer */}
                  <div 
                    onClick={() => launchApp('clock')}
                    className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-violet-500 border border-purple-400/40 flex items-center justify-center text-white shadow-lg">
                      <ClockIcon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] text-zinc-300 truncate">Clock</span>
                  </div>

                  {/* 8. Realme Settings */}
                  <div 
                    onClick={() => launchApp('settings')}
                    className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 shadow-lg">
                      <SettingsIcon className="w-6 h-6 text-zinc-300" />
                    </div>
                    <span className="text-[10px] text-zinc-300 truncate">Settings</span>
                  </div>

                </div>

                {/* Bottom Dock */}
                <div className="p-2 rounded-3xl bg-zinc-900/70 backdrop-blur-md border border-zinc-800/80 flex items-center justify-around mb-1">
                  <div onClick={() => launchApp('phone')} className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white cursor-pointer hover:scale-105 transition">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div onClick={() => launchApp('messages')} className="w-10 h-10 rounded-2xl bg-green-600 flex items-center justify-center text-white cursor-pointer hover:scale-105 transition">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div onClick={() => launchApp('cricket')} className="w-10 h-10 rounded-2xl bg-amber-600 flex items-center justify-center text-white cursor-pointer hover:scale-105 transition">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div onClick={() => launchApp('camera')} className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center text-white cursor-pointer hover:scale-105 transition">
                    <Camera className="w-5 h-5" />
                  </div>
                </div>

              </div>
            )}

            {/* 3. ACTIVE APPLICATION VIEW */}
            {osView === 'app' && (
              <div className="h-full flex flex-col">
                {activeApp === 'volox' ? (
                  <div>
                    {voloxTab !== 'dashboard' && (
                      <div className="px-4 py-2 flex items-center gap-2 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur sticky top-0 z-20">
                        <button
                          onClick={() => setVoloxTab('dashboard')}
                          className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-300"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-xs font-bold text-white capitalize">
                          {voloxTab.replace('_', ' ')}
                        </span>
                      </div>
                    )}
                    <InAppScreens
                      currentTab={voloxTab}
                      onNavigate={setVoloxTab}
                      settings={settings}
                      onUpdateSettings={onUpdateSettings}
                      matches={matches}
                      onSelectMatch={onSelectMatch}
                      onOpenRealmeGuide={onOpenRealmeGuide}
                    />
                  </div>
                ) : (
                  <RealmeOSApps
                    appId={activeApp}
                    onClose={handleHomeClick}
                    cricketMatch={cricketMatch}
                    matches={matches}
                    onSelectMatch={onSelectMatch}
                    onSimulateBall={onSimulateBall}
                    musicTrack={musicTrack}
                    tracks={tracks}
                    trackIndex={trackIndex}
                    onSelectTrack={onSelectTrack}
                    onTogglePlay={onTogglePlay}
                    onPrevTrack={onPrevTrack}
                    onNextTrack={onNextTrack}
                    notifications={notificationsList}
                    onSendCustomNotification={onSendCustomNotification}
                    call={call}
                    onStartCall={onStartCall}
                    onEndCall={onEndCall}
                    timer={timer}
                    onToggleTimer={onToggleTimer}
                    onResetTimer={onResetTimer}
                    stopwatch={stopwatch}
                    onToggleStopwatch={onToggleStopwatch}
                    onResetStopwatch={onResetStopwatch}
                    onTriggerIslandMode={onModeChange}
                  />
                )}
              </div>
            )}

          </div>

          {/* Android Navigation Bar (Back, Home, Recents) */}
          <div className="py-2.5 px-6 flex items-center justify-around bg-black border-t border-zinc-900 z-30">
            {/* Back */}
            <button
              onClick={() => {
                soundEngine.playIslandCollapse();
                if (osView === 'app') {
                  if (activeApp === 'volox' && voloxTab !== 'dashboard') {
                    setVoloxTab('dashboard');
                  } else {
                    setOsView('homescreen');
                  }
                }
              }}
              className="p-1.5 text-zinc-500 hover:text-white transition"
              title="Back"
            >
              <Triangle className="w-4 h-4 -rotate-90 fill-current" />
            </button>

            {/* Home */}
            <button
              onClick={handleHomeClick}
              className="p-1.5 text-zinc-500 hover:text-white transition"
              title="Home"
            >
              <Circle className="w-4 h-4 fill-current" />
            </button>

            {/* Recents */}
            <button
              onClick={() => {
                soundEngine.playIslandExpand();
                launchApp('volox');
              }}
              className="p-1.5 text-zinc-500 hover:text-white transition"
              title="Recent Tasks"
            >
              <Square className="w-4 h-4 fill-current" />
            </button>
          </div>

        </div>
      </div>

      {/* Hardware Spec Label */}
      <div className="mt-2 text-center text-xs text-zinc-400">
        <span className="text-zinc-200 font-semibold">Realme 9i 5G</span> (RMX3612) • Dimensity 810 • Realme UI 5.0 (Android 14)
      </div>
    </div>
  );
};
