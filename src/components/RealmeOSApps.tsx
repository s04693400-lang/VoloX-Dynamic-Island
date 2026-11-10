import React, { useState } from 'react';
import { 
  CricketMatchData, 
  MusicTrack, 
  NotificationItem, 
  CallData, 
  TimerData, 
  StopwatchData, 
  OSAppId 
} from '../types/island';
import { soundEngine } from '../utils/soundEffects';
import { 
  Trophy, 
  Music, 
  MessageSquare, 
  Phone, 
  Camera, 
  Clock, 
  Settings as SettingsIcon, 
  Send, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  PhoneOff, 
  PhoneCall, 
  Search, 
  MoreVertical, 
  ArrowLeft, 
  Flame, 
  CheckCheck, 
  BatteryCharging, 
  ShieldCheck, 
  Cpu, 
  Sparkles, 
  RotateCcw,
  Zap
} from 'lucide-react';

interface OSAppProps {
  appId: OSAppId;
  onClose: () => void;
  // Cricket
  cricketMatch: CricketMatchData;
  matches: CricketMatchData[];
  onSelectMatch: (id: string) => void;
  onSimulateBall: () => void;
  // Music
  musicTrack: MusicTrack;
  tracks: MusicTrack[];
  trackIndex: number;
  onSelectTrack: (idx: number) => void;
  onTogglePlay: () => void;
  onPrevTrack: () => void;
  onNextTrack: () => void;
  // Notifications
  notifications: NotificationItem[];
  onSendCustomNotification: (notif: Omit<NotificationItem, 'id' | 'time'>) => void;
  // Calls
  call: CallData;
  onStartCall: (name: string, number: string) => void;
  onEndCall: () => void;
  // Clock / Timer
  timer: TimerData;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  stopwatch: StopwatchData;
  onToggleStopwatch: () => void;
  onResetStopwatch: () => void;
  // Dynamic Island trigger
  onTriggerIslandMode: (mode: any) => void;
}

export const RealmeOSApps: React.FC<OSAppProps> = ({
  appId,
  onClose,
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
  notifications,
  onSendCustomNotification,
  call,
  onStartCall,
  onEndCall,
  timer,
  onToggleTimer,
  onResetTimer,
  stopwatch,
  onToggleStopwatch,
  onResetStopwatch,
  onTriggerIslandMode
}) => {
  // Local states for sub-views
  const [typedMessage, setTypedMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState<'Aman' | 'Rohit' | 'HDFC'>('Aman');
  const [dialerNumber, setDialerNumber] = useState('');
  const [cameraMode, setCameraMode] = useState<'PHOTO' | 'PORTRAIT' | 'NIGHT' | '50M'>('PHOTO');
  const [cameraFlash, setCameraFlash] = useState(false);
  const [clockTab, setClockTab] = useState<'timer' | 'stopwatch'>('timer');

  // App 1: Live Cricket App
  if (appId === 'cricket') {
    return (
      <div className="h-full flex flex-col bg-zinc-950 text-white select-none">
        {/* Header */}
        <div className="p-3 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="p-1 hover:bg-zinc-800 rounded-lg text-zinc-400">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="font-bold text-xs">VoloX Live Cricket</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            Live Stream
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-3 no-scrollbar">
          {/* Active Scorecard Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-950/30 via-zinc-900 to-zinc-900 border border-amber-500/30 shadow-xl">
            <div className="flex justify-between items-center text-[10px] text-zinc-400 mb-2 border-b border-zinc-800/80 pb-1.5">
              <span>{cricketMatch.series}</span>
              <span className="text-amber-400 font-bold uppercase">{cricketMatch.matchName}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 my-2">
              <div className="p-2 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                <div className="text-xs font-bold flex items-center gap-1.5">
                  <span>{cricketMatch.team1.flag}</span>
                  <span>{cricketMatch.team1.shortName}</span>
                </div>
                <div className="text-sm font-mono font-bold text-zinc-200 mt-1">
                  {cricketMatch.team1.score}/{cricketMatch.team1.wickets}
                  <span className="text-[10px] text-zinc-500 ml-1">({cricketMatch.team1.overs})</span>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-500/40">
                <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <span>{cricketMatch.team2.flag}</span>
                  <span>{cricketMatch.team2.shortName}</span>
                  <span className="text-[9px] bg-amber-500/20 px-1 rounded text-amber-400">Batting</span>
                </div>
                <div className="text-sm font-mono font-bold text-white mt-1">
                  {cricketMatch.team2.score}/{cricketMatch.team2.wickets}
                  <span className="text-[10px] text-amber-400/80 ml-1">({cricketMatch.team2.overs})</span>
                </div>
              </div>
            </div>

            <div className="mt-2 text-xs font-semibold text-emerald-400 flex items-center justify-between">
              <span>{cricketMatch.status}</span>
              <span className="font-mono text-zinc-400 text-[10px]">CRR: {cricketMatch.runRate}</span>
            </div>

            {/* Ball Commentary Ticker */}
            <div className="mt-2 p-2 rounded-lg bg-black/60 border border-zinc-800 text-[11px] text-zinc-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-ping" />
              <span className="font-mono text-zinc-400">Last ball:</span>
              <span className="font-semibold text-white truncate">{cricketMatch.lastBall}</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                soundEngine.playBoundaryFanfare();
                onSimulateBall();
              }}
              className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-1.5 transition shadow"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Next Ball Event</span>
            </button>

            <button
              onClick={() => onTriggerIslandMode('cricket')}
              className="py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Pin to Island</span>
            </button>
          </div>

          {/* Other Matches */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
              Live Tournaments
            </span>
            {matches.map(m => (
              <button
                key={m.id}
                onClick={() => onSelectMatch(m.id)}
                className={`w-full p-2.5 rounded-xl border text-left text-xs transition flex items-center justify-between ${
                  m.id === cricketMatch.id
                    ? 'bg-zinc-900 border-amber-500/50 text-white'
                    : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-400 hover:text-white'
                }`}
              >
                <div>
                  <div className="font-bold text-zinc-200">{m.team1.shortName} vs {m.team2.shortName}</div>
                  <div className="text-[10px] text-zinc-500">{m.status}</div>
                </div>
                <span className="text-xs">{m.id === cricketMatch.id ? '● Live' : 'Track'}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // App 2: Music App
  if (appId === 'music') {
    return (
      <div className="h-full flex flex-col bg-gradient-to-b from-zinc-900 via-black to-zinc-950 text-white select-none">
        <div className="p-3 flex items-center justify-between border-b border-zinc-800/60">
          <button onClick={onClose} className="p-1 hover:bg-zinc-800 rounded-lg text-zinc-400">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="font-bold text-xs text-zinc-300">OxygenOS Music</span>
          <span className="text-[10px] text-emerald-400 font-mono">LDAC Hi-Res</span>
        </div>

        <div className="flex-1 p-4 flex flex-col justify-between overflow-y-auto no-scrollbar">
          {/* Big Album Art */}
          <div className="w-44 h-44 mx-auto rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 my-2">
            <img src={musicTrack.albumArt} alt="" className="w-full h-full object-cover" />
          </div>

          <div className="text-center my-1">
            <h3 className="font-bold text-sm text-white truncate">{musicTrack.title}</h3>
            <p className="text-xs text-zinc-400 mt-0.5">{musicTrack.artist}</p>
          </div>

          {/* Equalizer animation */}
          <div className="flex items-center justify-center gap-1 h-6">
            {[40, 90, 60, 100, 75, 45, 80, 50, 95].map((h, i) => (
              <span
                key={i}
                className={`w-1 bg-emerald-400 rounded-full transition-all ${musicTrack.isPlaying ? 'animate-pulse' : 'opacity-40'}`}
                style={{ height: `${musicTrack.isPlaying ? h : 20}%` }}
              />
            ))}
          </div>

          {/* Scrubber */}
          <div className="space-y-1">
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all"
                style={{ width: `${(musicTrack.currentTime / musicTrack.duration) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>{Math.floor(musicTrack.currentTime / 60)}:{(musicTrack.currentTime % 60).toString().padStart(2, '0')}</span>
              <span>{Math.floor(musicTrack.duration / 60)}:{(musicTrack.duration % 60).toString().padStart(2, '0')}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-around py-2">
            <button onClick={onPrevTrack} className="p-2 hover:text-emerald-400 transition">
              <SkipBack className="w-5 h-5 fill-white" />
            </button>
            <button
              onClick={onTogglePlay}
              className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-105 transition"
            >
              {musicTrack.isPlaying ? <Pause className="w-6 h-6 fill-black" /> : <Play className="w-6 h-6 fill-black ml-0.5" />}
            </button>
            <button onClick={onNextTrack} className="p-2 hover:text-emerald-400 transition">
              <SkipForward className="w-5 h-5 fill-white" />
            </button>
          </div>

          <button
            onClick={() => onTriggerIslandMode('music')}
            className="w-full py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-semibold text-emerald-400 flex items-center justify-center gap-1.5"
          >
            <Music className="w-3.5 h-3.5" />
            <span>Show on Dynamic Island</span>
          </button>
        </div>
      </div>
    );
  }

  // App 3: Messages / WhatsApp App (With Real-Time Notification Trigger)
  if (appId === 'messages') {
    const handleSend = () => {
      if (!typedMessage.trim()) return;
      const sentText = typedMessage;
      setTypedMessage('');

      // Play local sound
      soundEngine.playIslandExpand();

      // Trigger realistic real-time notification to the island after 800ms
      setTimeout(() => {
        soundEngine.playNotificationSound();
        onSendCustomNotification({
          app: 'whatsapp',
          sender: selectedChat === 'Aman' ? 'Aman Sharma' : selectedChat === 'Rohit' ? 'Rohit Sharma' : 'HDFC Alerts',
          message: `Reply to "${sentText.slice(0, 20)}...": Done! Catch you in 5 minutes!`,
          read: false
        });
      }, 900);
    };

    return (
      <div className="h-full flex flex-col bg-[#0C1317] text-white select-none">
        {/* Chat Header */}
        <div className="p-3 bg-[#1F2C34] flex items-center justify-between border-b border-[#2A3942]">
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="p-1 text-zinc-300">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white">
              {selectedChat[0]}
            </div>
            <div>
              <div className="text-xs font-bold leading-tight">{selectedChat} Sharma</div>
              <div className="text-[10px] text-emerald-400">Online • Realme 9i 5G</div>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-semibold">
            WhatsApp
          </span>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-3 overflow-y-auto space-y-2.5 no-scrollbar text-xs">
          <div className="bg-[#202C33] p-2.5 rounded-2xl rounded-tl-sm max-w-[85%] self-start shadow">
            <p className="text-zinc-200">Hey bro! What's the score in the India vs Aus cricket match?</p>
            <div className="text-[9px] text-zinc-400 text-right mt-1">10:14 AM</div>
          </div>

          <div className="bg-[#005C4B] p-2.5 rounded-2xl rounded-tr-sm max-w-[85%] ml-auto text-white shadow">
            <p>AUS need 39 runs from 45 balls! Following it live on VoloX Island 🔥</p>
            <div className="text-[9px] text-emerald-200 text-right mt-1 flex items-center justify-end gap-1">
              <span>10:15 AM</span>
              <CheckCheck className="w-3 h-3 text-sky-400" />
            </div>
          </div>

          <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300 text-center">
            💡 Type any message below and tap Send — it will trigger an instant real-time notification on your Dynamic Island!
          </div>
        </div>

        {/* Composer */}
        <div className="p-2 bg-[#1F2C34] flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message to trigger notification..."
            value={typedMessage}
            onChange={(e) => setTypedMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-[#2A3942] px-3 py-2 rounded-full text-xs text-white placeholder-zinc-400 focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center transition shadow"
          >
            <Send className="w-3.5 h-3.5 fill-black" />
          </button>
        </div>
      </div>
    );
  }

  // App 4: Phone & Dialer App
  if (appId === 'phone') {
    const handleDigitClick = (num: string) => {
      soundEngine.playDialerTone(num);
      setDialerNumber(prev => prev + num);
    };

    const handleCall = () => {
      const numberToCall = dialerNumber || '+91 98765 43210';
      soundEngine.playNotificationSound();
      onStartCall('Rahul (Tech Lead)', numberToCall);
      onTriggerIslandMode('call');
    };

    return (
      <div className="h-full flex flex-col bg-zinc-950 text-white select-none">
        <div className="p-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="p-1 text-zinc-400">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="font-bold text-xs">Realme Dialer</span>
          </div>
          <span className="text-[10px] text-zinc-400 font-mono">5G VoLTE</span>
        </div>

        <div className="flex-1 flex flex-col justify-end p-4 pb-2">
          {/* Displayed Number */}
          <div className="text-center mb-4">
            <div className="text-2xl font-bold font-mono tracking-wider min-h-[36px] text-emerald-400">
              {dialerNumber || <span className="text-zinc-600 text-sm font-sans font-normal">Dial a number...</span>}
            </div>
            {dialerNumber && (
              <button
                onClick={() => setDialerNumber('')}
                className="text-[10px] text-zinc-500 hover:text-zinc-300 mt-1"
              >
                Clear
              </button>
            )}
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-3 max-w-[260px] mx-auto mb-4">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map(digit => (
              <button
                key={digit}
                onClick={() => handleDigitClick(digit)}
                className="w-14 h-14 rounded-full bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-700 font-bold text-base transition flex flex-col items-center justify-center border border-zinc-800/80 shadow"
              >
                <span>{digit}</span>
              </button>
            ))}
          </div>

          {/* Call Trigger Button */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={handleCall}
              className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center shadow-lg shadow-emerald-500/30 transition hover:scale-105"
            >
              <PhoneCall className="w-6 h-6 fill-black" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // App 5: Camera App
  if (appId === 'camera') {
    const handleSnap = () => {
      setCameraFlash(true);
      soundEngine.playCameraShutter();
      setTimeout(() => setCameraFlash(false), 150);
    };

    return (
      <div className="relative h-full flex flex-col bg-black text-white select-none">
        {/* Flash overlay */}
        {cameraFlash && <div className="absolute inset-0 bg-white z-50 pointer-events-none" />}

        {/* Viewfinder Top */}
        <div className="p-3 flex items-center justify-between z-10 bg-gradient-to-b from-black/80 to-transparent">
          <button onClick={onClose} className="p-1 text-white">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-[10px] font-bold tracking-widest text-amber-400">50MP AI CAMERA</span>
          <span className="text-[10px] text-zinc-300">HDR Auto</span>
        </div>

        {/* Live Simulated Viewfinder Scene */}
        <div className="relative flex-1 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-900 to-black overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="text-center z-10">
            <div className="w-20 h-20 mx-auto rounded-full border-2 border-dashed border-emerald-400/60 flex items-center justify-center animate-pulse mb-2">
              <Camera className="w-8 h-8 text-emerald-400" />
            </div>
            <span className="text-xs text-zinc-300 font-semibold block">Realme 9i 5G Viewfinder</span>
            <span className="text-[10px] text-zinc-500">AI Scene Recognition: Active</span>
          </div>

          {/* Focus Box */}
          <div className="absolute w-28 h-28 border border-emerald-400/80 rounded pointer-events-none" />
        </div>

        {/* Shutter Dock */}
        <div className="p-4 bg-black/90 flex flex-col items-center gap-3">
          <div className="flex gap-4 text-[10px] font-semibold text-zinc-400">
            {(['NIGHT', 'PHOTO', 'PORTRAIT', '50M'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setCameraMode(mode)}
                className={`transition ${cameraMode === mode ? 'text-amber-400 font-bold underline' : ''}`}
              >
                {mode}
              </button>
            ))}
          </div>

          <button
            onClick={handleSnap}
            className="w-16 h-16 rounded-full border-4 border-white p-1 hover:scale-105 active:scale-95 transition flex items-center justify-center"
          >
            <div className="w-full h-full rounded-full bg-white" />
          </button>
        </div>
      </div>
    );
  }

  // App 6: Clock & Timer App
  if (appId === 'clock') {
    return (
      <div className="h-full flex flex-col bg-zinc-950 text-white select-none">
        <div className="p-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="p-1 text-zinc-400">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="font-bold text-xs">Clock & Timers</span>
          </div>
          <div className="flex gap-2 text-xs">
            <button
              onClick={() => setClockTab('timer')}
              className={`px-2 py-0.5 rounded ${clockTab === 'timer' ? 'bg-amber-500/20 text-amber-300' : 'text-zinc-400'}`}
            >
              Timer
            </button>
            <button
              onClick={() => setClockTab('stopwatch')}
              className={`px-2 py-0.5 rounded ${clockTab === 'stopwatch' ? 'bg-amber-500/20 text-amber-300' : 'text-zinc-400'}`}
            >
              Stopwatch
            </button>
          </div>
        </div>

        <div className="flex-1 p-4 flex flex-col items-center justify-center gap-6">
          {clockTab === 'timer' ? (
            <>
              <div className="text-center">
                <span className="text-xs text-zinc-400 uppercase tracking-widest">{timer.label}</span>
                <div className="text-5xl font-mono font-bold text-amber-400 mt-2">
                  {Math.floor(timer.remainingSeconds / 60)}:{(timer.remainingSeconds % 60).toString().padStart(2, '0')}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={onResetTimer}
                  className="p-3 rounded-full bg-zinc-800 text-zinc-400 hover:text-white transition"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
                <button
                  onClick={onToggleTimer}
                  className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition"
                >
                  {timer.isRunning ? 'Pause' : 'Start Timer'}
                </button>
              </div>

              <button
                onClick={() => onTriggerIslandMode('timer')}
                className="text-xs text-amber-400 hover:underline"
              >
                Pin timer to Dynamic Island →
              </button>
            </>
          ) : (
            <>
              <div className="text-center">
                <span className="text-xs text-zinc-400 uppercase tracking-widest">Precision Stopwatch</span>
                <div className="text-5xl font-mono font-bold text-sky-400 mt-2">
                  00:{stopwatch.elapsedSeconds.toString().padStart(2, '0')}.8
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={onResetStopwatch}
                  className="p-3 rounded-full bg-zinc-800 text-zinc-400 hover:text-white transition"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
                <button
                  onClick={onToggleStopwatch}
                  className="px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-400 text-black font-bold text-sm transition"
                >
                  {stopwatch.isRunning ? 'Stop' : 'Start'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // App 7: Realme Settings App (Device Info)
  return (
    <div className="h-full flex flex-col bg-zinc-950 text-white select-none">
      <div className="p-3 bg-zinc-900 border-b border-zinc-800 flex items-center gap-2">
        <button onClick={onClose} className="p-1 text-zinc-400">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="font-bold text-xs">Realme UI 5.0 Settings</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar text-xs">
        <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">
            R
          </div>
          <div>
            <div className="font-bold text-white text-sm">Realme 9i 5G</div>
            <div className="text-[10px] text-zinc-400">Model: RMX3612 • Realme UI 5.0 Official</div>
          </div>
        </div>

        <div className="space-y-1 bg-zinc-900/80 p-3 rounded-2xl border border-zinc-800">
          <div className="flex justify-between py-1.5 border-b border-zinc-800">
            <span className="text-zinc-400">Processor</span>
            <span className="font-semibold text-white">MediaTek Dimensity 810 5G (6nm)</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-zinc-800">
            <span className="text-zinc-400">Android Version</span>
            <span className="font-semibold text-emerald-400">Android 14 (API 34)</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-zinc-800">
            <span className="text-zinc-400">Display</span>
            <span className="font-semibold text-white">6.6" FHD+ 90Hz Ultra Smooth</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-zinc-800">
            <span className="text-zinc-400">Charging</span>
            <span className="font-semibold text-amber-400">18W Quick Charge (Dart Charge)</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-zinc-400">VoloX Island Service</span>
            <span className="font-semibold text-emerald-400">Active (Foreground Overlay)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
