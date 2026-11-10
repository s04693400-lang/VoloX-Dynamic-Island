import React, { useState } from 'react';
import { 
  IslandMode, 
  CricketMatchData, 
  MusicTrack, 
  BatteryState, 
  CallData, 
  TimerData,
  NotificationItem 
} from '../types/island';
import { soundEngine } from '../utils/soundEffects';
import { 
  Trophy, 
  Music, 
  Bell, 
  Zap, 
  PhoneCall, 
  Headphones, 
  Usb, 
  Timer as TimerIcon, 
  Play, 
  Pause, 
  Send, 
  Flame, 
  Radio, 
  SlidersHorizontal, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  PlusCircle,
  Clock
} from 'lucide-react';

interface Props {
  activeMode: IslandMode;
  onSelectMode: (mode: IslandMode) => void;
  cricketMatch: CricketMatchData;
  onSimulateBall: () => void;
  musicTrack: MusicTrack;
  onTogglePlay: () => void;
  onTriggerNotification: (app: 'whatsapp' | 'instagram' | 'messages') => void;
  onDispatchCustomNotification: (notif: Omit<NotificationItem, 'id' | 'time'>) => void;
  isAutoStreamActive: boolean;
  onToggleAutoStream: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  battery: BatteryState;
  onToggleCharging: () => void;
  onChangeBatteryLevel: (level: number) => void;
  call: CallData;
  onSimulateCall: () => void;
  timer: TimerData;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onTriggerEarphones: () => void;
  onTriggerUsb: () => void;
}

export const SimulationDeck: React.FC<Props> = ({
  activeMode,
  onSelectMode,
  cricketMatch,
  onSimulateBall,
  musicTrack,
  onTogglePlay,
  onTriggerNotification,
  onDispatchCustomNotification,
  isAutoStreamActive,
  onToggleAutoStream,
  soundEnabled,
  onToggleSound,
  battery,
  onToggleCharging,
  onChangeBatteryLevel,
  call,
  onSimulateCall,
  timer,
  onToggleTimer,
  onResetTimer,
  onTriggerEarphones,
  onTriggerUsb
}) => {
  // Custom composer state
  const [composerApp, setComposerApp] = useState<'whatsapp' | 'instagram' | 'messages' | 'swiggy' | 'telegram'>('whatsapp');
  const [composerSender, setComposerSender] = useState('Rahul Dravid');
  const [composerText, setComposerText] = useState('Great innings today! See you in practice tomorrow.');

  const handleCustomDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composerText.trim()) return;

    soundEngine.playNotificationSound();
    onDispatchCustomNotification({
      app: composerApp,
      sender: composerSender || 'Contact',
      message: composerText,
      read: false
    });

    onSelectMode('notification');
  };

  const dispatchPreset = (app: any, sender: string, message: string) => {
    soundEngine.playNotificationSound();
    onDispatchCustomNotification({
      app,
      sender,
      message,
      read: false
    });
    onSelectMode('notification');
  };

  return (
    <div className="bg-zinc-950/80 border border-zinc-800 rounded-3xl p-5 shadow-2xl backdrop-blur-xl flex flex-col gap-5 text-white">
      
      {/* Header with Auto-Stream & Sound controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-3.5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm tracking-wide text-white">Real-Time Event Control Deck</h3>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Stream Engine
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Send instant real-time notifications, trigger cricket ball commentary, and simulate OS actions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Sound toggle */}
          <button
            onClick={onToggleSound}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition border ${
              soundEnabled
                ? 'bg-zinc-800 border-zinc-700 text-emerald-400'
                : 'bg-zinc-900 border-zinc-800 text-zinc-500'
            }`}
            title="Toggle OxygenOS Audio Synthesis"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{soundEnabled ? 'Sound ON' : 'Muted'}</span>
          </button>

          {/* Auto Stream Simulation Toggle */}
          <button
            onClick={onToggleAutoStream}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border ${
              isAutoStreamActive
                ? 'bg-emerald-500 border-emerald-400 text-black shadow-lg shadow-emerald-500/20'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${isAutoStreamActive ? 'animate-pulse' : ''}`} />
            <span>{isAutoStreamActive ? 'Auto-Stream Active' : 'Enable Auto-Stream'}</span>
          </button>
        </div>
      </div>

      {/* Real-Time Notification Composer Module */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/20 via-zinc-900 to-zinc-900 border border-emerald-500/30">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Bell className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-white">Real-Time Notification Dispatcher</span>
          </div>
          <span className="text-[10px] text-zinc-400">Pushes directly to Dynamic Island</span>
        </div>

        {/* 1-Click Fast Presets */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <button
            onClick={() => dispatchPreset('whatsapp', 'Rohit Sharma', 'Bro, check the score! We need 23 off 11 balls 🔥')}
            className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 hover:border-emerald-500 text-[11px] text-emerald-300 transition"
          >
            WhatsApp: Rohit Sharma
          </button>

          <button
            onClick={() => dispatchPreset('instagram', '@virat_official', 'mentioned you in a story: "VoloX Dynamic Island 1.0 on Realme 9i 5G"')}
            className="px-2.5 py-1 rounded-lg bg-pink-950/60 border border-pink-500/30 hover:border-pink-500 text-[11px] text-pink-300 transition"
          >
            Instagram: @virat_official
          </button>

          <button
            onClick={() => dispatchPreset('messages', 'HDFC-ALERT', 'OTP for transaction of Rs 4,500 is 942183. Valid for 5 mins.')}
            className="px-2.5 py-1 rounded-lg bg-blue-950/60 border border-blue-500/30 hover:border-blue-500 text-[11px] text-blue-300 transition"
          >
            Bank OTP (SMS)
          </button>

          <button
            onClick={() => dispatchPreset('swiggy', 'Swiggy Delivery', 'Your spicy biryani is arriving at your door in 3 minutes! 🛵')}
            className="px-2.5 py-1 rounded-lg bg-orange-950/60 border border-orange-500/30 hover:border-orange-500 text-[11px] text-orange-300 transition"
          >
            Swiggy Delivery
          </button>
        </div>

        {/* Custom Input Form */}
        <form onSubmit={handleCustomDispatch} className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
          <div className="sm:col-span-3">
            <select
              value={composerApp}
              onChange={(e) => setComposerApp(e.target.value as any)}
              className="w-full bg-zinc-950 px-2.5 py-2 rounded-xl border border-zinc-800 text-zinc-200 focus:outline-none focus:border-emerald-500 text-xs"
            >
              <option value="whatsapp">WhatsApp</option>
              <option value="instagram">Instagram</option>
              <option value="messages">Messages / SMS</option>
              <option value="swiggy">Swiggy Delivery</option>
              <option value="telegram">Telegram</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <input
              type="text"
              placeholder="Sender Name..."
              value={composerSender}
              onChange={(e) => setComposerSender(e.target.value)}
              className="w-full bg-zinc-950 px-2.5 py-2 rounded-xl border border-zinc-800 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 text-xs"
            />
          </div>

          <div className="sm:col-span-4">
            <input
              type="text"
              placeholder="Type notification text..."
              value={composerText}
              onChange={(e) => setComposerText(e.target.value)}
              className="w-full bg-zinc-950 px-2.5 py-2 rounded-xl border border-zinc-800 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 text-xs"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full h-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow transition"
            >
              <Send className="w-3.5 h-3.5 fill-black" />
              <span>Send Now</span>
            </button>
          </div>
        </form>
      </div>

      {/* Modular Event Triggers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        
        {/* Cricket Live Score Controls */}
        <div className={`p-4 rounded-2xl border transition ${
          activeMode === 'cricket' 
            ? 'bg-amber-950/20 border-amber-500/50 shadow-lg' 
            : 'bg-zinc-900/60 border-zinc-800'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                <Trophy className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white">Live Cricket Updates</span>
            </div>
            <button
              onClick={() => onSelectMode('cricket')}
              className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold transition ${
                activeMode === 'cricket' ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-zinc-300 hover:text-white'
              }`}
            >
              {activeMode === 'cricket' ? 'Active' : 'Show Island'}
            </button>
          </div>

          <div className="text-xs text-zinc-300 bg-zinc-950/60 p-2 rounded-xl border border-zinc-800 mb-2 flex items-center justify-between">
            <span className="font-bold text-amber-300">{cricketMatch.team1.shortName} vs {cricketMatch.team2.shortName}</span>
            <span className="font-mono text-emerald-400 font-bold">{cricketMatch.team2.score}/{cricketMatch.team2.wickets} ({cricketMatch.team2.overs} ov)</span>
          </div>

          <button
            onClick={() => {
              soundEngine.playBoundaryFanfare();
              onSimulateBall();
            }}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-500/30 transition shadow-sm"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Simulate Live Ball Update (4s, 6s, Wicket)</span>
          </button>
        </div>

        {/* Battery & 18W Dart Charge */}
        <div className={`p-4 rounded-2xl border transition ${
          activeMode === 'battery' 
            ? 'bg-emerald-950/20 border-emerald-500/50 shadow-lg' 
            : 'bg-zinc-900/60 border-zinc-800'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white">Battery & 18W Dart Charge</span>
            </div>
            <button
              onClick={() => {
                soundEngine.playChargingConnected();
                onToggleCharging();
              }}
              className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold transition ${
                battery.isCharging ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-300 hover:text-white'
              }`}
            >
              {battery.isCharging ? '18W Plugged' : 'Plug Dart Charger'}
            </button>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-zinc-300">
              <span>Level:</span>
              <span className="font-mono text-emerald-400 font-bold">{battery.level}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              value={battery.level}
              onChange={(e) => onChangeBatteryLevel(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-1.5"
            />
          </div>
        </div>

        {/* Phone Calls */}
        <div className={`p-4 rounded-2xl border transition ${
          activeMode === 'call' 
            ? 'bg-emerald-950/20 border-emerald-500/50 shadow-lg' 
            : 'bg-zinc-900/60 border-zinc-800'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-green-500/20 text-green-400">
                <PhoneCall className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white">Call Alerts</span>
            </div>
            <span className="text-[10px] text-zinc-400 font-mono">Realme Dialer</span>
          </div>

          <button
            onClick={() => {
              soundEngine.playNotificationSound();
              onSimulateCall();
            }}
            className="w-full py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition flex items-center justify-center gap-2"
          >
            <span>Trigger Incoming Call ({call.callerName})</span>
          </button>
        </div>

        {/* Peripherals & Timers */}
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-white">Hardware Peripherals</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                soundEngine.playIslandExpand();
                onTriggerEarphones();
              }}
              className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 text-[11px] font-semibold transition text-center flex flex-col items-center gap-1"
            >
              <Headphones className="w-4 h-4 text-sky-400" />
              <span>Earphones</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playIslandExpand();
                onTriggerUsb();
              }}
              className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 text-[11px] font-semibold transition text-center flex flex-col items-center gap-1"
            >
              <Usb className="w-4 h-4 text-zinc-300" />
              <span>USB Plug</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playIslandExpand();
                onToggleTimer();
              }}
              className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 text-[11px] font-semibold transition text-center flex flex-col items-center gap-1"
            >
              <TimerIcon className="w-4 h-4 text-amber-400" />
              <span>Timer</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
