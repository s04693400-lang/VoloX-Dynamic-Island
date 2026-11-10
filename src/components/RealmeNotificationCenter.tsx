import React from 'react';
import { 
  NotificationItem, 
  QuickSettingsState, 
  VoloXSettings 
} from '../types/island';
import { soundEngine } from '../utils/soundEffects';
import { 
  Wifi, 
  WifiOff, 
  Signal, 
  Bluetooth, 
  Flashlight, 
  Moon, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Sun, 
  Zap, 
  Sparkles, 
  Trash2, 
  ChevronUp, 
  MessageSquare, 
  X, 
  Smartphone,
  ExternalLink
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onDismissNotification: (id: string) => void;
  onClearAllNotifications: () => void;
  quickSettings: QuickSettingsState;
  onUpdateQuickSettings: (updater: (prev: QuickSettingsState) => QuickSettingsState) => void;
  islandSettings: VoloXSettings;
  onToggleIsland: () => void;
}

export const RealmeNotificationCenter: React.FC<Props> = ({
  isOpen,
  onClose,
  notifications,
  onDismissNotification,
  onClearAllNotifications,
  quickSettings,
  onUpdateQuickSettings,
  islandSettings,
  onToggleIsland
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-2xl flex flex-col text-white select-none animate-in fade-in slide-in-from-top duration-200">
      
      {/* Top Header */}
      <div className="p-4 pt-8 flex items-center justify-between border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold font-mono">20:34</span>
          <span className="text-xs text-zinc-400">Monday, Nov 9</span>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300"
          title="Close Notification Center"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        
        {/* Quick Settings Grid */}
        <div className="grid grid-cols-4 gap-2.5">
          {/* Wi-Fi */}
          <button
            onClick={() => {
              soundEngine.playIslandExpand();
              onUpdateQuickSettings(prev => ({ ...prev, wifi: !prev.wifi }));
            }}
            className={`p-2.5 rounded-2xl flex flex-col items-center gap-1 transition border ${
              quickSettings.wifi 
                ? 'bg-emerald-500 text-black border-emerald-400 shadow-md shadow-emerald-500/20' 
                : 'bg-zinc-900 text-zinc-400 border-zinc-800'
            }`}
          >
            {quickSettings.wifi ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
            <span className="text-[10px] font-semibold">Wi-Fi</span>
          </button>

          {/* 5G Data */}
          <button
            onClick={() => {
              soundEngine.playIslandExpand();
              onUpdateQuickSettings(prev => ({ ...prev, mobileData: !prev.mobileData }));
            }}
            className={`p-2.5 rounded-2xl flex flex-col items-center gap-1 transition border ${
              quickSettings.mobileData 
                ? 'bg-emerald-500 text-black border-emerald-400 shadow-md shadow-emerald-500/20' 
                : 'bg-zinc-900 text-zinc-400 border-zinc-800'
            }`}
          >
            <Signal className="w-5 h-5" />
            <span className="text-[10px] font-semibold">5G Data</span>
          </button>

          {/* Bluetooth */}
          <button
            onClick={() => {
              soundEngine.playIslandExpand();
              onUpdateQuickSettings(prev => ({ ...prev, bluetooth: !prev.bluetooth }));
            }}
            className={`p-2.5 rounded-2xl flex flex-col items-center gap-1 transition border ${
              quickSettings.bluetooth 
                ? 'bg-emerald-500 text-black border-emerald-400 shadow-md shadow-emerald-500/20' 
                : 'bg-zinc-900 text-zinc-400 border-zinc-800'
            }`}
          >
            <Bluetooth className="w-5 h-5" />
            <span className="text-[10px] font-semibold">Bluetooth</span>
          </button>

          {/* Flashlight */}
          <button
            onClick={() => {
              soundEngine.playIslandExpand();
              onUpdateQuickSettings(prev => ({ ...prev, flashlight: !prev.flashlight }));
            }}
            className={`p-2.5 rounded-2xl flex flex-col items-center gap-1 transition border ${
              quickSettings.flashlight 
                ? 'bg-amber-400 text-black border-amber-300 shadow-md shadow-amber-400/20' 
                : 'bg-zinc-900 text-zinc-400 border-zinc-800'
            }`}
          >
            <Flashlight className="w-5 h-5" />
            <span className="text-[10px] font-semibold">Torch</span>
          </button>

          {/* DND */}
          <button
            onClick={() => {
              soundEngine.playIslandExpand();
              onUpdateQuickSettings(prev => ({ ...prev, dnd: !prev.dnd }));
            }}
            className={`p-2.5 rounded-2xl flex flex-col items-center gap-1 transition border ${
              quickSettings.dnd 
                ? 'bg-purple-500 text-white border-purple-400' 
                : 'bg-zinc-900 text-zinc-400 border-zinc-800'
            }`}
          >
            <Moon className="w-5 h-5" />
            <span className="text-[10px] font-semibold">DND</span>
          </button>

          {/* VoloX Dynamic Island Toggle */}
          <button
            onClick={() => {
              soundEngine.playIslandExpand();
              onToggleIsland();
            }}
            className={`p-2.5 rounded-2xl flex flex-col items-center gap-1 transition border ${
              islandSettings.isEnabled 
                ? 'bg-emerald-500 text-black border-emerald-400 shadow-md shadow-emerald-500/30' 
                : 'bg-zinc-900 text-zinc-400 border-zinc-800'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-[10px] font-semibold">Island</span>
          </button>

          {/* Sound / Mute */}
          <button
            onClick={() => {
              soundEngine.playIslandExpand();
              onUpdateQuickSettings(prev => ({ 
                ...prev, 
                soundMode: prev.soundMode === 'sound' ? 'silent' : 'sound' 
              }));
            }}
            className={`p-2.5 rounded-2xl flex flex-col items-center gap-1 transition border ${
              quickSettings.soundMode === 'sound' 
                ? 'bg-zinc-800 text-zinc-200 border-zinc-700' 
                : 'bg-red-500/20 text-red-400 border-red-500/40'
            }`}
          >
            {quickSettings.soundMode === 'sound' ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            <span className="text-[10px] font-semibold">{quickSettings.soundMode === 'sound' ? 'Sound' : 'Silent'}</span>
          </button>

          {/* Auto Rotate */}
          <button
            onClick={() => {
              soundEngine.playIslandExpand();
              onUpdateQuickSettings(prev => ({ ...prev, autoRotate: !prev.autoRotate }));
            }}
            className={`p-2.5 rounded-2xl flex flex-col items-center gap-1 transition border ${
              quickSettings.autoRotate 
                ? 'bg-sky-500 text-black border-sky-400' 
                : 'bg-zinc-900 text-zinc-400 border-zinc-800'
            }`}
          >
            <RotateCw className="w-5 h-5" />
            <span className="text-[10px] font-semibold">Rotate</span>
          </button>
        </div>

        {/* Sliders: Brightness */}
        <div className="bg-zinc-900/90 p-3 rounded-2xl border border-zinc-800 space-y-2">
          <div className="flex items-center gap-3">
            <Sun className="w-4 h-4 text-zinc-400" />
            <input
              type="range"
              min="10"
              max="100"
              value={quickSettings.brightness}
              onChange={(e) => onUpdateSettingsBrightness(Number(e.target.value))}
              className="flex-1 accent-emerald-500 cursor-pointer h-1.5"
            />
            <span className="text-[10px] font-mono text-zinc-400">{quickSettings.brightness}%</span>
          </div>

          <div className="flex items-center gap-3">
            <Volume2 className="w-4 h-4 text-zinc-400" />
            <input
              type="range"
              min="0"
              max="100"
              value={quickSettings.volume}
              onChange={(e) => onUpdateSettingsVolume(Number(e.target.value))}
              className="flex-1 accent-emerald-500 cursor-pointer h-1.5"
            />
            <span className="text-[10px] font-mono text-zinc-400">{quickSettings.volume}%</span>
          </div>
        </div>

        {/* Real-Time Notifications Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Notifications</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 rounded-full">
                {notifications.length}
              </span>
            </div>

            {notifications.length > 0 && (
              <button
                onClick={() => {
                  soundEngine.playIslandCollapse();
                  onClearAllNotifications();
                }}
                className="text-[11px] text-zinc-400 hover:text-red-400 flex items-center gap-1 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
          </div>

          {/* Notifications List */}
          {notifications.length === 0 ? (
            <div className="p-6 text-center rounded-2xl bg-zinc-900/50 border border-zinc-800/80">
              <MessageSquare className="w-8 h-8 mx-auto text-zinc-600 mb-2" />
              <p className="text-xs text-zinc-400 font-semibold">No new notifications</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Incoming real-time alerts will appear here</p>
            </div>
          ) : (
            <div className="space-y-2">
              {notifications.map(notif => (
                <div
                  key={notif.id}
                  className="p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 flex items-start gap-3 shadow transition hover:border-zinc-700"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xs ${
                    notif.app === 'whatsapp' ? 'bg-emerald-600' :
                    notif.app === 'instagram' ? 'bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600' :
                    notif.app === 'messages' ? 'bg-blue-600' :
                    notif.app === 'swiggy' ? 'bg-orange-500' : 'bg-red-500'
                  }`}>
                    {notif.sender[0]}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white truncate">{notif.sender}</span>
                      <span className="text-[9px] text-zinc-500 font-mono">{notif.time}</span>
                    </div>
                    <p className="text-[11px] text-zinc-300 line-clamp-2 mt-0.5 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      soundEngine.playIslandCollapse();
                      onDismissNotification(notif.id);
                    }}
                    className="p-1 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Bottom Dismiss Handle */}
      <div 
        onClick={onClose}
        className="py-2.5 flex items-center justify-center cursor-pointer border-t border-zinc-800/80 bg-zinc-950 hover:bg-zinc-900 transition"
      >
        <div className="w-24 h-1 rounded-full bg-zinc-600" />
      </div>
    </div>
  );

  function onUpdateSettingsBrightness(val: number) {
    onUpdateQuickSettings(prev => ({ ...prev, brightness: val }));
  }

  function onUpdateSettingsVolume(val: number) {
    onUpdateQuickSettings(prev => ({ ...prev, volume: val }));
  }
};
