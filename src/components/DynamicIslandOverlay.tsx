import React, { useState, useEffect } from 'react';
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
} from '../types/island';
import { soundEngine } from '../utils/soundEffects';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Phone, 
  PhoneOff, 
  Zap, 
  Headphones, 
  Usb, 
  Timer as TimerIcon, 
  Clock, 
  MessageSquare, 
  X, 
  Check, 
  ChevronUp,
  Volume2,
  Send,
  Sparkles
} from 'lucide-react';

interface Props {
  mode: IslandMode;
  settings: VoloXSettings;
  cricketMatch: CricketMatchData;
  musicTrack: MusicTrack;
  notification: NotificationItem | null;
  battery: BatteryState;
  call: CallData;
  timer: TimerData;
  stopwatch: StopwatchData;
  onModeChange: (mode: IslandMode) => void;
  onTogglePlay: () => void;
  onPrevTrack: () => void;
  onNextTrack: () => void;
  onAnswerCall: () => void;
  onDeclineCall: () => void;
  onToggleTimer: () => void;
  onDismissNotification: () => void;
  onSendQuickReply?: (reply: string) => void;
}

export const DynamicIslandOverlay: React.FC<Props> = ({
  mode,
  settings,
  cricketMatch,
  musicTrack,
  notification,
  battery,
  call,
  timer,
  stopwatch,
  onModeChange,
  onTogglePlay,
  onPrevTrack,
  onNextTrack,
  onAnswerCall,
  onDeclineCall,
  onToggleTimer,
  onDismissNotification,
  onSendQuickReply
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [quickReplyText, setQuickReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  // Auto-expand when high-priority real-time events arrive
  useEffect(() => {
    if (mode === 'call' || mode === 'notification' || mode === 'battery' || mode === 'earphone' || mode === 'usb') {
      setIsExpanded(true);
      if (settings.soundEffects) {
        soundEngine.playIslandExpand();
      }

      if (mode !== 'call') {
        const timeout = setTimeout(() => {
          setIsExpanded(false);
          setIsReplying(false);
          if (settings.soundEffects) {
            soundEngine.playIslandCollapse();
          }
        }, settings.autoCollapseDuration * 1000);
        return () => clearTimeout(timeout);
      }
    }
  }, [mode, notification?.id, battery.isCharging, settings.autoCollapseDuration, settings.soundEffects]);

  const handleIslandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isExpanded;
    setIsExpanded(next);
    if (settings.soundEffects) {
      if (next) soundEngine.playIslandExpand();
      else soundEngine.playIslandCollapse();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartY !== null) {
      const deltaY = e.changedTouches[0].clientY - dragStartY;
      if (deltaY > 25 && !isExpanded) {
        setIsExpanded(true);
        if (settings.soundEffects) soundEngine.playIslandExpand();
      } else if (deltaY < -20 && isExpanded) {
        setIsExpanded(false);
        if (settings.soundEffects) soundEngine.playIslandCollapse();
      }
    }
    setDragStartY(null);
  };

  const handleQuickReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickReplyText.trim()) return;
    if (onSendQuickReply) {
      onSendQuickReply(quickReplyText);
    }
    setQuickReplyText('');
    setIsReplying(false);
    setIsExpanded(false);
    if (settings.soundEffects) {
      soundEngine.playNotificationSound();
    }
  };

  if (!settings.isEnabled) return null;

  // Render Compact (Collapsed) Pill
  const renderCompactPill = () => {
    switch (mode) {
      case 'cricket':
        return (
          <div className="flex items-center justify-between w-full px-2.5 text-[11px] font-semibold tracking-tight text-white select-none">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400 font-bold">{cricketMatch.team2.shortName}</span>
              <span className="text-zinc-200">{cricketMatch.team2.score}/{cricketMatch.team2.wickets}</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-400 text-[10px]">
              <span>({cricketMatch.team2.overs})</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>
        );

      case 'music':
        return (
          <div className="flex items-center justify-between w-full px-2.5 text-[11px] font-medium text-white select-none">
            <div className="flex items-center gap-1.5 max-w-[90px] truncate">
              <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Volume2 className="w-2.5 h-2.5 text-emerald-400" />
              </div>
              <span className="truncate text-zinc-200 text-[10px]">{musicTrack.title}</span>
            </div>
            {/* Animated Equalizer Wave */}
            <div className="flex items-end gap-0.5 h-3">
              <span className={`w-0.5 bg-emerald-400 rounded-full ${musicTrack.isPlaying ? 'animate-[bounce_0.8s_infinite]' : 'h-1.5'}`} style={{ height: '70%' }} />
              <span className={`w-0.5 bg-emerald-400 rounded-full ${musicTrack.isPlaying ? 'animate-[bounce_0.6s_infinite_0.2s]' : 'h-3'}`} style={{ height: '100%' }} />
              <span className={`w-0.5 bg-emerald-400 rounded-full ${musicTrack.isPlaying ? 'animate-[bounce_0.9s_infinite_0.4s]' : 'h-2'}`} style={{ height: '50%' }} />
              <span className={`w-0.5 bg-emerald-400 rounded-full ${musicTrack.isPlaying ? 'animate-[bounce_0.7s_infinite_0.1s]' : 'h-2.5'}`} style={{ height: '80%' }} />
            </div>
          </div>
        );

      case 'battery':
        return (
          <div className="flex items-center justify-between w-full px-3 text-[11px] font-semibold text-white select-none">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 animate-pulse" />
              <span className="text-zinc-200 text-[10px]">Dart 18W</span>
            </div>
            <span className="text-emerald-400 font-bold">{battery.level}%</span>
          </div>
        );

      case 'call':
        return (
          <div className="flex items-center justify-between w-full px-3 text-[11px] font-semibold text-white select-none">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-zinc-200 truncate max-w-[80px]">{call.callerName}</span>
            </div>
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        );

      case 'timer':
        return (
          <div className="flex items-center justify-between w-full px-3 text-[11px] font-semibold text-white select-none">
            <TimerIcon className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-amber-400 font-mono">
              {Math.floor(timer.remainingSeconds / 60)}:{(timer.remainingSeconds % 60).toString().padStart(2, '0')}
            </span>
          </div>
        );

      case 'notification':
        return (
          <div className="flex items-center justify-between w-full px-3 text-[11px] font-medium text-white select-none">
            <div className="flex items-center gap-1.5 truncate max-w-[120px]">
              <MessageSquare className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="truncate text-zinc-200 text-[10px]">{notification?.sender || 'Alert'}</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-ping" />
          </div>
        );

      case 'earphone':
        return (
          <div className="flex items-center justify-between w-full px-3 text-[11px] font-medium text-white select-none">
            <Headphones className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-sky-300 text-[10px]">Buds 3</span>
          </div>
        );

      case 'usb':
        return (
          <div className="flex items-center justify-between w-full px-3 text-[11px] font-medium text-white select-none">
            <Usb className="w-3.5 h-3.5 text-zinc-300" />
            <span className="text-zinc-300 text-[10px]">USB Plugged</span>
          </div>
        );

      case 'idle':
      default:
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 ring-1 ring-zinc-800" />
          </div>
        );
    }
  };

  // Render Expanded Card Content
  const renderExpandedContent = () => {
    switch (mode) {
      case 'cricket':
        return (
          <div className="p-3 text-white flex flex-col justify-between h-full select-none">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">Cricket Live</span>
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              </div>
              <span className="text-[10px] text-zinc-400 truncate max-w-[170px]">{cricketMatch.matchName}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 my-2 items-center">
              {/* Team 1 */}
              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                <span className="text-base">{cricketMatch.team1.flag}</span>
                <div>
                  <div className="text-[11px] font-bold text-zinc-200">{cricketMatch.team1.shortName}</div>
                  <div className="text-xs font-mono font-semibold text-zinc-300">
                    {cricketMatch.team1.score}/{cricketMatch.team1.wickets} <span className="text-[9px] text-zinc-500 font-normal">({cricketMatch.team1.overs})</span>
                  </div>
                </div>
              </div>

              {/* Team 2 (Batting) */}
              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30">
                <span className="text-base">{cricketMatch.team2.flag}</span>
                <div>
                  <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    {cricketMatch.team2.shortName}
                    <span className="text-[9px] text-emerald-500 font-normal">● Batting</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-white">
                    {cricketMatch.team2.score}/{cricketMatch.team2.wickets} <span className="text-[9px] text-emerald-300/80 font-normal">({cricketMatch.team2.overs})</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] pt-1 border-t border-zinc-800/60">
              <span className="text-emerald-400 font-medium truncate max-w-[220px]">
                {cricketMatch.status}
              </span>
              <span className="text-zinc-400 font-mono">CRR: {cricketMatch.runRate}</span>
            </div>
          </div>
        );

      case 'music':
        return (
          <div className="p-3 text-white flex flex-col justify-between h-full select-none">
            <div className="flex items-center gap-3">
              <img 
                src={musicTrack.albumArt} 
                alt={musicTrack.title} 
                className="w-12 h-12 rounded-xl object-cover shadow-lg border border-zinc-800 shrink-0" 
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold truncate text-white">{musicTrack.title}</div>
                <div className="text-[11px] text-zinc-400 truncate">{musicTrack.artist}</div>
                <div className="text-[9px] text-emerald-400 uppercase tracking-wider font-semibold mt-0.5">
                  Spotify • LDAC Hi-Res
                </div>
              </div>
              <div className="flex items-end gap-0.5 h-5 px-1">
                <span className={`w-0.5 bg-emerald-400 rounded-full ${musicTrack.isPlaying ? 'animate-[bounce_0.8s_infinite]' : 'h-2'}`} style={{ height: '60%' }} />
                <span className={`w-0.5 bg-emerald-400 rounded-full ${musicTrack.isPlaying ? 'animate-[bounce_0.6s_infinite_0.2s]' : 'h-4'}`} style={{ height: '90%' }} />
                <span className={`w-0.5 bg-emerald-400 rounded-full ${musicTrack.isPlaying ? 'animate-[bounce_0.9s_infinite_0.4s]' : 'h-3'}`} style={{ height: '50%' }} />
                <span className={`w-0.5 bg-emerald-400 rounded-full ${musicTrack.isPlaying ? 'animate-[bounce_0.7s_infinite_0.1s]' : 'h-5'}`} style={{ height: '100%' }} />
              </div>
            </div>

            <div className="mt-1">
              <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden mb-1.5">
                <div 
                  className="bg-emerald-400 h-full rounded-full transition-all"
                  style={{ width: `${(musicTrack.currentTime / musicTrack.duration) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-zinc-500 font-mono">
                  {Math.floor(musicTrack.currentTime / 60)}:{(musicTrack.currentTime % 60).toString().padStart(2, '0')}
                </span>
                
                <div className="flex items-center gap-3">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onPrevTrack(); }} 
                    className="p-1 hover:text-emerald-400 transition-colors"
                  >
                    <SkipBack className="w-4 h-4 fill-white" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onTogglePlay(); }} 
                    className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    {musicTrack.isPlaying ? <Pause className="w-3.5 h-3.5 fill-black" /> : <Play className="w-3.5 h-3.5 fill-black ml-0.5" />}
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onNextTrack(); }} 
                    className="p-1 hover:text-emerald-400 transition-colors"
                  >
                    <SkipForward className="w-4 h-4 fill-white" />
                  </button>
                </div>

                <span className="text-[9px] text-zinc-500 font-mono">
                  {Math.floor(musicTrack.duration / 60)}:{(musicTrack.duration % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        );

      case 'battery':
        return (
          <div className="p-3 text-white flex items-center justify-between h-full select-none">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full border-2 border-emerald-500/30 flex items-center justify-center bg-emerald-950/20">
                <div className="absolute inset-0 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
                <Zap className="w-6 h-6 text-emerald-400 fill-emerald-400" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  Realme Dart Charge
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">18W</span>
                </div>
                <div className="text-[11px] text-zinc-400">Fast charging • 38m until full</div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black font-mono text-emerald-400">{battery.level}%</span>
            </div>
          </div>
        );

      case 'call':
        return (
          <div className="p-3 text-white flex flex-col justify-between h-full select-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-sm text-emerald-400">
                  {call.callerName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{call.callerName}</div>
                  <div className="text-[10px] text-zinc-400">{call.callerNumber}</div>
                </div>
              </div>
              <span className="text-[10px] text-zinc-400 font-mono">
                {call.status === 'ongoing' ? `${Math.floor(call.durationSeconds / 60)}:${(call.durationSeconds % 60).toString().padStart(2, '0')}` : 'Incoming...'}
              </span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-1">
              <button 
                onClick={(e) => { e.stopPropagation(); onDeclineCall(); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-[11px] font-semibold transition"
              >
                <PhoneOff className="w-3.5 h-3.5" />
                <span>Decline</span>
              </button>
              {call.status === 'incoming' && (
                <button 
                  onClick={(e) => { e.stopPropagation(); onAnswerCall(); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Answer</span>
                </button>
              )}
            </div>
          </div>
        );

      case 'notification':
        return (
          <div className="p-3 text-white flex flex-col justify-between h-full select-none">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                  {notification?.sender[0]}
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{notification?.sender}</span>
                    <span className="text-[9px] text-zinc-400 uppercase font-mono">({notification?.app})</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); onDismissNotification(); }}
                className="text-zinc-500 hover:text-white p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <p className="text-[11px] text-zinc-300 line-clamp-2 my-1 leading-relaxed">
              {notification?.message}
            </p>

            {/* Quick Inline Reply directly on the Island */}
            {isReplying ? (
              <form onSubmit={handleQuickReplySubmit} onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 mt-1">
                <input
                  type="text"
                  placeholder="Quick reply..."
                  value={quickReplyText}
                  onChange={(e) => setQuickReplyText(e.target.value)}
                  autoFocus
                  className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1 text-[11px] text-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="p-1.5 rounded-lg bg-emerald-500 text-black font-bold hover:bg-emerald-400"
                >
                  <Send className="w-3 h-3" />
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1 border-t border-zinc-800/60">
                <span>{notification?.time}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); setIsReplying(true); }}
                  className="text-emerald-400 font-semibold hover:underline"
                >
                  Reply from Island ↵
                </button>
              </div>
            )}
          </div>
        );

      case 'timer':
        return (
          <div className="p-3 text-white flex items-center justify-between h-full select-none">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <TimerIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">{timer.label}</div>
                <div className="text-lg font-mono font-bold text-amber-400">
                  {Math.floor(timer.remainingSeconds / 60)}:{(timer.remainingSeconds % 60).toString().padStart(2, '0')}
                </div>
              </div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onToggleTimer(); }}
              className="px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition"
            >
              {timer.isRunning ? 'Pause' : 'Resume'}
            </button>
          </div>
        );

      case 'earphone':
        return (
          <div className="p-3 text-white flex items-center justify-between h-full select-none">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Realme Buds Wireless 3</div>
                <div className="text-[10px] text-sky-400">Connected • LDAC Hi-Res Audio 990kbps</div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-zinc-300">90%</span>
          </div>
        );

      case 'usb':
        return (
          <div className="p-3 text-white flex items-center justify-between h-full select-none">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300">
                <Usb className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">USB Connected</div>
                <div className="text-[10px] text-zinc-400">Transferring files / Android Auto ready</div>
              </div>
            </div>
            <Check className="w-4 h-4 text-emerald-400" />
          </div>
        );

      default:
        return null;
    }
  };

  const pillWidth = isExpanded ? settings.expandedWidth : settings.pillWidth;
  const pillHeight = isExpanded ? (isReplying ? settings.expandedHeight + 30 : settings.expandedHeight) : settings.pillHeight;

  return (
    <div 
      className="absolute z-50 left-1/2 -translate-x-1/2 cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] select-none shadow-2xl"
      style={{
        top: `${settings.yOffset}px`,
        marginLeft: `${settings.xOffset}px`,
        width: `${pillWidth}px`,
        height: `${pillHeight}px`,
        borderRadius: `${settings.cornerRadius}px`,
        backgroundColor: settings.blackPureOled ? '#000000' : '#0D1117',
        border: `1px solid ${isExpanded ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'}`,
        boxShadow: isExpanded 
          ? `0 12px 35px -5px rgba(0, 0, 0, 0.95), 0 0 15px -2px ${settings.glowAccentColor}33` 
          : '0 4px 12px rgba(0, 0, 0, 0.8)'
      }}
      onClick={handleIslandClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-full h-full overflow-hidden flex flex-col justify-center">
        {isExpanded ? renderExpandedContent() : renderCompactPill()}
      </div>

      {isExpanded && !isReplying && (
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity">
          <div className="w-8 h-1 rounded-full bg-zinc-600" />
        </div>
      )}
    </div>
  );
};
