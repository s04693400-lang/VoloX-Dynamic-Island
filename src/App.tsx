import React, { useState, useEffect, useRef } from 'react';
import { 
  IslandMode, 
  VoloXSettings, 
  CricketMatchData, 
  MusicTrack, 
  NotificationItem, 
  BatteryState, 
  CallData, 
  TimerData, 
  StopwatchData 
} from './types/island';
import { 
  INITIAL_SETTINGS, 
  SAMPLE_MATCHES, 
  SAMPLE_TRACKS, 
  SAMPLE_NOTIFICATIONS 
} from './data/mockData';
import { RealmeSimulator } from './components/RealmeSimulator';
import { SimulationDeck } from './components/SimulationDeck';
import { AndroidProjectExplorer } from './components/AndroidProjectExplorer';
import { ApkBuildGuide } from './components/ApkBuildGuide';
import { RealmeGuideModal } from './components/RealmeGuideModal';
import { generateProjectZip } from './utils/zipGenerator';
import { soundEngine } from './utils/soundEffects';
import { 
  Smartphone, 
  Download, 
  Code2, 
  Layers, 
  BookOpen, 
  ShieldCheck, 
  Cpu, 
  Flame, 
  Check, 
  Terminal,
  ExternalLink,
  Sliders,
  Volume2,
  VolumeX,
  Radio
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'codebase' | 'guide'>('simulator');
  const [islandMode, setIslandMode] = useState<IslandMode>('cricket');
  const [settings, setSettings] = useState<VoloXSettings>({
    ...INITIAL_SETTINGS,
    soundEffects: true
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isAutoStreamActive, setIsAutoStreamActive] = useState<boolean>(false);

  // Cricket state
  const [matches, setMatches] = useState<CricketMatchData[]>(SAMPLE_MATCHES);
  const [currentMatchId, setCurrentMatchId] = useState<string>(SAMPLE_MATCHES[0].id);

  // Music state
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [tracks, setTracks] = useState<MusicTrack[]>(SAMPLE_TRACKS);

  // Real-time Notifications list
  const [notificationsList, setNotificationsList] = useState<NotificationItem[]>(SAMPLE_NOTIFICATIONS);
  const [activeNotification, setActiveNotification] = useState<NotificationItem | null>(SAMPLE_NOTIFICATIONS[0]);

  // Battery state
  const [battery, setBattery] = useState<BatteryState>({
    level: 86,
    isCharging: true,
    chargeType: 'dart-18w'
  });

  // Call state
  const [call, setCall] = useState<CallData>({
    callerName: 'Vikram (Realme Tech)',
    callerNumber: '+91 98765 43210',
    status: 'incoming',
    durationSeconds: 0
  });

  // Timer & Stopwatch
  const [timer, setTimer] = useState<TimerData>({
    initialSeconds: 300,
    remainingSeconds: 274,
    isRunning: true,
    label: 'Focus Timer'
  });
  const [stopwatch, setStopwatch] = useState<StopwatchData>({
    elapsedSeconds: 0,
    isRunning: false,
    lapTimes: []
  });

  const [isRealmeGuideOpen, setIsRealmeGuideOpen] = useState<boolean>(false);
  const [isZippingTop, setIsZippingTop] = useState<boolean>(false);

  const currentMatch = matches.find(m => m.id === currentMatchId) || matches[0];
  const currentTrack = tracks[trackIndex];

  // Sync sound engine state
  useEffect(() => {
    soundEngine.enabled = soundEnabled;
  }, [soundEnabled]);

  // Background Auto-Stream Notification Engine (Simulates real phone usage)
  useEffect(() => {
    if (!isAutoStreamActive) return;

    const streamItems: Array<{ app: any; sender: string; message: string }> = [
      { app: 'whatsapp', sender: 'Aman Sharma', message: 'Bro check out the new score, match is going crazy! 🏏' },
      { app: 'instagram', sender: 'rohit_official', message: 'shared a reel with you: "OxygenOS Live Alerts test"' },
      { app: 'swiggy', sender: 'Swiggy', message: 'Your butter chicken order is out for delivery! 🛵' },
      { app: 'messages', sender: 'AXIS-BANK', message: 'Alert: Acct *3921 debited for INR 640 at Cafe Coffee Day' },
      { app: 'telegram', sender: 'Realme 9i Community', message: 'VoloX Dynamic Island 1.0 running smooth on Dimensity 810!' }
    ];

    let index = 0;
    const interval = setInterval(() => {
      const item = streamItems[index % streamItems.length];
      index++;

      const newNotif: NotificationItem = {
        id: `auto-${Date.now()}`,
        app: item.app,
        sender: item.sender,
        message: item.message,
        time: 'Just now',
        read: false
      };

      setNotificationsList(prev => [newNotif, ...prev.slice(0, 15)]);
      setActiveNotification(newNotif);
      setIslandMode('notification');
      soundEngine.playNotificationSound();
    }, 12000);

    return () => clearInterval(interval);
  }, [isAutoStreamActive]);

  // Music timer simulation
  useEffect(() => {
    if (!currentTrack.isPlaying) return;
    const interval = setInterval(() => {
      setTracks(prev => {
        const next = [...prev];
        const cur = next[trackIndex];
        if (cur.currentTime >= cur.duration) {
          cur.currentTime = 0;
        } else {
          cur.currentTime += 1;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTrack.isPlaying, trackIndex]);

  // Countdown timer simulation
  useEffect(() => {
    if (!timer.isRunning || timer.remainingSeconds <= 0) return;
    const interval = setInterval(() => {
      setTimer(prev => ({
        ...prev,
        remainingSeconds: Math.max(0, prev.remainingSeconds - 1)
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer.isRunning, timer.remainingSeconds]);

  // Stopwatch simulation
  useEffect(() => {
    if (!stopwatch.isRunning) return;
    const interval = setInterval(() => {
      setStopwatch(prev => ({
        ...prev,
        elapsedSeconds: prev.elapsedSeconds + 1
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [stopwatch.isRunning]);

  // Call timer simulation
  useEffect(() => {
    if (call.status !== 'ongoing') return;
    const interval = setInterval(() => {
      setCall(prev => ({
        ...prev,
        durationSeconds: prev.durationSeconds + 1
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [call.status]);

  // Cricket ball simulation handler
  const handleSimulateBall = () => {
    const outcomes = [
      { text: 'FOUR! Dispatched through extra cover', runs: 4, wicket: false },
      { text: 'SIX! Hammered deep into the stands!', runs: 6, wicket: false },
      { text: 'WICKET! Clean bowled! Middle stump uprooted', runs: 0, wicket: true },
      { text: '1 run, guided down towards third man', runs: 1, wicket: false },
      { text: '2 runs, quick running between the wickets', runs: 2, wicket: false },
      { text: 'Dot ball, swing and a miss outside off', runs: 0, wicket: false }
    ];
    const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];

    setMatches(prev => prev.map(m => {
      if (m.id !== currentMatchId) return m;
      const currentScoreNum = parseInt(m.team2.score) + outcome.runs;
      const currentWickets = m.team2.wickets + (outcome.wicket ? 1 : 0);
      
      const [oversInt, ballsInt] = m.team2.overs.split('.').map(Number);
      let nextBalls = (ballsInt || 0) + 1;
      let nextOvers = oversInt || 0;
      if (nextBalls >= 6) {
        nextOvers += 1;
        nextBalls = 0;
      }

      return {
        ...m,
        team2: {
          ...m.team2,
          score: currentScoreNum.toString(),
          wickets: Math.min(10, currentWickets),
          overs: `${nextOvers}.${nextBalls}`
        },
        lastBall: outcome.text,
        status: outcome.wicket 
          ? `WICKET FALLEN! ${m.team2.shortName} ${currentScoreNum}/${currentWickets}` 
          : `${m.team2.shortName} need ${Math.max(0, 287 - currentScoreNum)} runs to win`
      };
    }));

    setIslandMode('cricket');
  };

  // Real-time custom notification dispatch handler
  const handleDispatchCustomNotification = (notif: Omit<NotificationItem, 'id' | 'time'>) => {
    const newNotif: NotificationItem = {
      ...notif,
      id: `notif-${Date.now()}`,
      time: 'Just now',
      read: false
    };

    setNotificationsList(prev => [newNotif, ...prev]);
    setActiveNotification(newNotif);
    setIslandMode('notification');
  };

  const handleSendQuickReply = (reply: string) => {
    // Send feedback notification
    const responseNotif: NotificationItem = {
      id: `reply-${Date.now()}`,
      app: 'whatsapp',
      sender: activeNotification?.sender || 'Contact',
      message: `Replied: "${reply}"`,
      time: 'Just now',
      read: true
    };
    setNotificationsList(prev => [responseNotif, ...prev]);
  };

  const handleDismissNotification = (id: string) => {
    setNotificationsList(prev => prev.filter(n => n.id !== id));
    if (activeNotification?.id === id) {
      setActiveNotification(null);
      setIslandMode('idle');
    }
  };

  const handleClearAllNotifications = () => {
    setNotificationsList([]);
    setActiveNotification(null);
    setIslandMode('idle');
  };

  const handleTogglePlay = () => {
    setTracks(prev => {
      const copy = [...prev];
      copy[trackIndex] = { ...copy[trackIndex], isPlaying: !copy[trackIndex].isPlaying };
      return copy;
    });
  };

  const handlePrevTrack = () => {
    setTrackIndex(prev => (prev === 0 ? tracks.length - 1 : prev - 1));
  };

  const handleNextTrack = () => {
    setTrackIndex(prev => (prev === tracks.length - 1 ? 0 : prev + 1));
  };

  const handleToggleCharging = () => {
    setBattery(prev => {
      const nextCharging = !prev.isCharging;
      return {
        ...prev,
        isCharging: nextCharging,
        chargeType: nextCharging ? 'dart-18w' : 'unplugged'
      };
    });
    setIslandMode('battery');
  };

  const handleStartCall = (name: string, number: string) => {
    setCall({
      callerName: name,
      callerNumber: number,
      status: 'ongoing',
      durationSeconds: 0
    });
    setIslandMode('call');
  };

  const handleSimulateCall = () => {
    setCall({
      callerName: 'Vikram (Realme Tech)',
      callerNumber: '+91 98765 43210',
      status: 'incoming',
      durationSeconds: 0
    });
    setIslandMode('call');
  };

  const handleAnswerCall = () => {
    setCall(prev => ({ ...prev, status: 'ongoing' }));
  };

  const handleDeclineCall = () => {
    setCall(prev => ({ ...prev, status: 'missed' }));
    setIslandMode('idle');
  };

  const handleToggleTimer = () => {
    setTimer(prev => ({ ...prev, isRunning: !prev.isRunning }));
    setIslandMode('timer');
  };

  const handleResetTimer = () => {
    setTimer(prev => ({ ...prev, remainingSeconds: prev.initialSeconds, isRunning: false }));
  };

  const handleToggleStopwatch = () => {
    setStopwatch(prev => ({ ...prev, isRunning: !prev.isRunning }));
    setIslandMode('stopwatch');
  };

  const handleResetStopwatch = () => {
    setStopwatch({ elapsedSeconds: 0, isRunning: false, lapTimes: [] });
  };

  const handleTopDownloadZip = async () => {
    try {
      setIsZippingTop(true);
      const blob = await generateProjectZip();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'VoloX-Dynamic-Island-v1.0-Realme-9i-5G.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    } finally {
      setIsZippingTop(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090D] text-zinc-100 flex flex-col selection:bg-emerald-500 selection:text-black">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/80 px-4 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center">
              <div className="w-5 h-2.5 rounded-full bg-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-sm sm:text-base text-white tracking-tight">
                VoloX Dynamic Island <span className="text-emerald-400 font-mono">1.0</span>
              </h1>
              <span className="hidden sm:inline-block text-[10px] bg-zinc-800 text-zinc-300 border border-zinc-700 px-2 py-0.5 rounded-full font-mono">
                Realme 9i 5G (RMX3612)
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              OxygenOS Live Alerts • Real-Time Notification Pipeline • Android 14 Pure Overlay
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsRealmeGuideOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 transition"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Realme UI 5.0 Guide</span>
          </button>

          <button
            onClick={handleTopDownloadZip}
            disabled={isZippingTop}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold shadow-lg shadow-emerald-500/20 transition disabled:opacity-50"
          >
            {isZippingTop ? (
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">Export Android Project (.ZIP)</span>
            <span className="sm:hidden">Download ZIP</span>
          </button>
        </div>
      </header>

      {/* Main Navigation Tabs */}
      <div className="bg-zinc-950/40 border-b border-zinc-800/60 px-4 lg:px-8 py-2">
        <div className="flex items-center gap-2 max-w-7xl mx-auto overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
              activeTab === 'simulator'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Realme OS & Real-Time Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('codebase')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
              activeTab === 'codebase'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Android Studio Project Source Code</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
              activeTab === 'guide'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Build & Installation Instructions</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6">
        
        {/* Tab 1: Interactive Device Simulator & Live OS */}
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left: Interactive Realme 9i 5G OS Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <RealmeSimulator
                mode={islandMode}
                settings={settings}
                cricketMatch={currentMatch}
                matches={matches}
                onSelectMatch={setCurrentMatchId}
                onSimulateBall={handleSimulateBall}
                musicTrack={currentTrack}
                tracks={tracks}
                trackIndex={trackIndex}
                onSelectTrack={setTrackIndex}
                onTogglePlay={handleTogglePlay}
                onPrevTrack={handlePrevTrack}
                onNextTrack={handleNextTrack}
                notification={activeNotification}
                notificationsList={notificationsList}
                onDismissNotification={handleDismissNotification}
                onClearAllNotifications={handleClearAllNotifications}
                onSendCustomNotification={handleDispatchCustomNotification}
                onSendQuickReply={handleSendQuickReply}
                battery={battery}
                call={call}
                onStartCall={handleStartCall}
                onEndCall={() => setCall(prev => ({ ...prev, status: 'missed' }))}
                onAnswerCall={handleAnswerCall}
                onDeclineCall={handleDeclineCall}
                timer={timer}
                onToggleTimer={handleToggleTimer}
                onResetTimer={handleResetTimer}
                stopwatch={stopwatch}
                onToggleStopwatch={handleToggleStopwatch}
                onResetStopwatch={handleResetStopwatch}
                onModeChange={setIslandMode}
                onUpdateSettings={setSettings}
                onOpenRealmeGuide={() => setIsRealmeGuideOpen(true)}
              />
            </div>

            {/* Right: Simulation Deck & Real-Time Notification Controls */}
            <div className="lg:col-span-7 space-y-6">
              <SimulationDeck
                activeMode={islandMode}
                onSelectMode={setIslandMode}
                cricketMatch={currentMatch}
                onSimulateBall={handleSimulateBall}
                musicTrack={currentTrack}
                onTogglePlay={handleTogglePlay}
                onTriggerNotification={(app) => {
                  const notif = SAMPLE_NOTIFICATIONS.find(n => n.app === app) || SAMPLE_NOTIFICATIONS[0];
                  handleDispatchCustomNotification(notif);
                }}
                onDispatchCustomNotification={handleDispatchCustomNotification}
                isAutoStreamActive={isAutoStreamActive}
                onToggleAutoStream={() => setIsAutoStreamActive(!isAutoStreamActive)}
                soundEnabled={soundEnabled}
                onToggleSound={() => setSoundEnabled(!soundEnabled)}
                battery={battery}
                onToggleCharging={handleToggleCharging}
                onChangeBatteryLevel={(lvl) => setBattery(prev => ({ ...prev, level: lvl }))}
                call={call}
                onSimulateCall={handleSimulateCall}
                timer={timer}
                onToggleTimer={handleToggleTimer}
                onResetTimer={handleResetTimer}
                onTriggerEarphones={() => setIslandMode('earphone')}
                onTriggerUsb={() => setIslandMode('usb')}
              />

              {/* Realme 9i 5G Compatibility Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-emerald-950/30 border border-zinc-800 text-xs text-zinc-300 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Realme OS Integrity Guaranteed</span>
                    <span className="text-[11px] text-zinc-400">
                      Standard user APK. Runs over Realme UI without altering system partitions or triggering Knox/Warranty flags.
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsRealmeGuideOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold shrink-0 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Android Studio Codebase Explorer */}
        {activeTab === 'codebase' && (
          <AndroidProjectExplorer />
        )}

        {/* Tab 3: Build & Installation Guide */}
        {activeTab === 'guide' && (
          <ApkBuildGuide />
        )}

      </main>

      {/* Realme 9i 5G Optimization Modal */}
      <RealmeGuideModal
        isOpen={isRealmeGuideOpen}
        onClose={() => setIsRealmeGuideOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-800/80 bg-zinc-950 px-6 py-4 text-center text-xs text-zinc-500">
        <p>VoloX Dynamic Island 1.0 • Designed for Realme 9i 5G (RMX3612) • OxygenOS Live Alerts Architecture</p>
      </footer>
    </div>
  );
}
