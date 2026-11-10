import React from 'react';
import { VoloXSettings, CricketMatchData } from '../types/island';
import { 
  ShieldCheck, 
  Layers, 
  Bell, 
  Palette, 
  Trophy, 
  Info, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Smartphone, 
  Cpu, 
  BatteryCharging,
  Sliders,
  Radio,
  Lock,
  ArrowRight
} from 'lucide-react';

export type ScreenTab = 'dashboard' | 'permissions' | 'island_settings' | 'appearance' | 'notifications' | 'cricket' | 'about';

interface Props {
  currentTab: ScreenTab;
  onNavigate: (tab: ScreenTab) => void;
  settings: VoloXSettings;
  onUpdateSettings: (updater: (prev: VoloXSettings) => VoloXSettings) => void;
  matches: CricketMatchData[];
  onSelectMatch: (matchId: string) => void;
  onOpenRealmeGuide: () => void;
}

export const InAppScreens: React.FC<Props> = ({
  currentTab,
  onNavigate,
  settings,
  onUpdateSettings,
  matches,
  onSelectMatch,
  onOpenRealmeGuide
}) => {
  // Screen 1: Dashboard / Home
  if (currentTab === 'dashboard') {
    return (
      <div className="space-y-4 text-white p-4">
        {/* Header Hero */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950/30 border border-emerald-500/20 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Active on Realme 9i 5G
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400 font-semibold">Running</span>
            </div>
          </div>
          <h2 className="text-lg font-bold text-white">VoloX Dynamic Island 1.0</h2>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
            Independent overlay service active over your Realme UI 5.0. No root or ROM changes.
          </p>

          <div className="mt-3 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
            <span className="text-xs text-zinc-300">Master Island Service</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.isEnabled}
                onChange={(e) => onUpdateSettings(prev => ({ ...prev, isEnabled: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>
        </div>

        {/* Realme 9i 5G Optimization Banner */}
        <button
          onClick={onOpenRealmeGuide}
          className="w-full text-left p-3.5 rounded-xl bg-gradient-to-r from-amber-950/30 to-zinc-900 border border-amber-500/30 hover:border-amber-500/60 transition group"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300">Realme UI Background Freeze Fix</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Enable Auto-launch & lock in Recent Apps so VoloX stays running 24/7.
              </p>
            </div>
          </div>
        </button>

        {/* Quick Nav Cards */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onNavigate('permissions')}
            className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 text-left transition"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
            <div className="text-xs font-bold text-white">Permissions</div>
            <div className="text-[10px] text-zinc-400 mt-0.5">Overlay & Notifications</div>
          </button>

          <button
            onClick={() => onNavigate('island_settings')}
            className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 text-left transition"
          >
            <Sliders className="w-5 h-5 text-sky-400 mb-2" />
            <div className="text-xs font-bold text-white">Position & Size</div>
            <div className="text-[10px] text-zinc-400 mt-0.5">Camera cutout alignment</div>
          </button>

          <button
            onClick={() => onNavigate('cricket')}
            className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 text-left transition"
          >
            <Trophy className="w-5 h-5 text-amber-400 mb-2" />
            <div className="text-xs font-bold text-white">Cricket Live</div>
            <div className="text-[10px] text-zinc-400 mt-0.5">API & live match feed</div>
          </button>

          <button
            onClick={() => onNavigate('appearance')}
            className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 text-left transition"
          >
            <Palette className="w-5 h-5 text-purple-400 mb-2" />
            <div className="text-xs font-bold text-white">Appearance</div>
            <div className="text-[10px] text-zinc-400 mt-0.5">OLED black & Glow</div>
          </button>
        </div>
      </div>
    );
  }

  // Screen 2: Permissions Setup
  if (currentTab === 'permissions') {
    return (
      <div className="space-y-4 text-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Permission Setup
          </h2>
          <span className="text-[10px] text-zinc-400">Android 14 (API 34)</span>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">
          VoloX only asks for essential permissions needed to display the floating pill and listen for notifications.
        </p>

        <div className="space-y-2.5">
          {/* Overlay Permission */}
          <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">Draw Over Other Apps</span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-semibold">Granted</span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Required by <code className="text-zinc-300 font-mono text-[10px]">SYSTEM_ALERT_WINDOW</code> to render the pill overlay.
                </p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            </div>
          </div>

          {/* Notification Access */}
          <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">Notification Listener</span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-semibold">Granted</span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Listens for WhatsApp, Instagram and SMS alerts to display live popups.
                </p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            </div>
          </div>

          {/* Battery Optimization */}
          <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-amber-500/30">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-300">Realme Background Activity</span>
                  <span className="text-[9px] bg-amber-500/20 text-amber-400 px-1.5 py-0.2 rounded font-semibold">Recommended</span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Exempt VoloX from Realme UI sleep mode to prevent random closing.
                </p>
              </div>
              <button
                onClick={onOpenRealmeGuide}
                className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 text-xs font-semibold hover:bg-amber-500/30 transition shrink-0"
              >
                Setup
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  // Screen 3: Island Settings
  if (currentTab === 'island_settings') {
    return (
      <div className="space-y-4 text-white p-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Sliders className="w-5 h-5 text-sky-400" />
          Realme 9i 5G Cutout Calibration
        </h2>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Fine-tune the position of VoloX Dynamic Island so it aligns around your phone's front camera punch hole.
        </p>

        <div className="space-y-4 bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-300">Vertical Offset (Y-Axis)</span>
              <span className="font-mono text-emerald-400">{settings.yOffset} px</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              value={settings.yOffset}
              onChange={(e) => onUpdateSettings(prev => ({ ...prev, yOffset: Number(e.target.value) }))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <span className="text-[10px] text-zinc-500">Realme 9i 5G punch hole is calibrated at 16px</span>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-300">Horizontal Offset (X-Axis)</span>
              <span className="font-mono text-emerald-400">{settings.xOffset} px</span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              value={settings.xOffset}
              onChange={(e) => onUpdateSettings(prev => ({ ...prev, xOffset: Number(e.target.value) }))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-300">Auto-Collapse Timeout</span>
              <span className="font-mono text-emerald-400">{settings.autoCollapseDuration} seconds</span>
            </div>
            <input
              type="range"
              min="2"
              max="15"
              value={settings.autoCollapseDuration}
              onChange={(e) => onUpdateSettings(prev => ({ ...prev, autoCollapseDuration: Number(e.target.value) }))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs transition"
        >
          Save & Return
        </button>
      </div>
    );
  }

  // Screen 4: Appearance Settings
  if (currentTab === 'appearance') {
    return (
      <div className="space-y-4 text-white p-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Palette className="w-5 h-5 text-purple-400" />
          Appearance & Themes
        </h2>
        
        <div className="space-y-3 bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white">Pure OLED Black</div>
              <div className="text-[10px] text-zinc-400">Save battery & blend with front camera</div>
            </div>
            <input
              type="checkbox"
              checked={settings.blackPureOled}
              onChange={(e) => onUpdateSettings(prev => ({ ...prev, blackPureOled: e.target.checked }))}
              className="w-4 h-4 accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="pt-2 border-t border-zinc-800">
            <label className="text-xs font-bold text-white block mb-1.5">Glow Accent Color</label>
            <div className="flex items-center gap-3">
              {[
                { label: 'Oxygen Emerald', color: '#00E676' },
                { label: 'Cyan Dart', color: '#00D2FF' },
                { label: 'Royal Gold', color: '#FFD700' },
                { label: 'Crimson', color: '#FF3B30' }
              ].map(item => (
                <button
                  key={item.color}
                  onClick={() => onUpdateSettings(prev => ({ ...prev, glowAccentColor: item.color }))}
                  className={`w-7 h-7 rounded-full transition-transform ${settings.glowAccentColor === item.color ? 'ring-2 ring-white scale-110' : 'opacity-70'}`}
                  style={{ backgroundColor: item.color }}
                  title={item.label}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs transition"
        >
          Done
        </button>
      </div>
    );
  }

  // Screen 5: Notification Filters
  if (currentTab === 'notifications') {
    return (
      <div className="space-y-4 text-white p-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-emerald-400" />
          Notification Channels
        </h2>
        <p className="text-xs text-zinc-400">
          Choose which applications trigger the Dynamic Island expand alert.
        </p>

        <div className="space-y-2.5 bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800">
          {([
            { id: 'whatsapp', name: 'WhatsApp', desc: 'Direct messages & group alerts' },
            { id: 'instagram', name: 'Instagram', desc: 'DMs, comments & story likes' },
            { id: 'messages', name: 'Messages & SMS', desc: 'OTP verification & banking alerts' },
            { id: 'telegram', name: 'Telegram', desc: 'Channels & private chats' },
          ] as const).map(app => (
            <div key={app.id} className="flex items-center justify-between py-1.5 border-b border-zinc-800/60 last:border-0">
              <div>
                <div className="text-xs font-semibold text-white">{app.name}</div>
                <div className="text-[10px] text-zinc-400">{app.desc}</div>
              </div>
              <input
                type="checkbox"
                checked={settings.notificationApps[app.id]}
                onChange={(e) => onUpdateSettings(prev => ({
                  ...prev,
                  notificationApps: {
                    ...prev.notificationApps,
                    [app.id]: e.target.checked
                  }
                }))}
                className="w-4 h-4 accent-emerald-500 cursor-pointer"
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs transition"
        >
          Save Preferences
        </button>
      </div>
    );
  }

  // Screen 6: Cricket Settings
  if (currentTab === 'cricket') {
    return (
      <div className="space-y-4 text-white p-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          Live Cricket Stream Setup
        </h2>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Stream live match scores with ball-by-ball updates directly on the island pill.
        </p>

        <div className="space-y-3 bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800">
          <div>
            <label className="text-xs font-bold text-zinc-300 block mb-1">CricAPI / Sportmonks API Key</label>
            <input
              type="text"
              placeholder="Enter free API key (Optional)"
              value={settings.cricketApiKey}
              onChange={(e) => onUpdateSettings(prev => ({ ...prev, cricketApiKey: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-xs font-mono text-emerald-400 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
            <span className="text-[10px] text-zinc-500 mt-1 block">
              Default live engine provides high-speed mock updates if no API key is provided.
            </span>
          </div>

          <div className="pt-2 border-t border-zinc-800">
            <label className="text-xs font-bold text-zinc-300 block mb-1.5">Select Active Match to Track</label>
            <div className="space-y-1.5">
              {matches.map(m => (
                <button
                  key={m.id}
                  onClick={() => onSelectMatch(m.id)}
                  className={`w-full p-2.5 rounded-lg text-left text-xs transition border flex items-center justify-between ${
                    settings.selectedMatchId === m.id 
                      ? 'bg-emerald-950/40 border-emerald-500 text-white font-bold' 
                      : 'bg-zinc-800/60 border-zinc-700/60 text-zinc-300 hover:border-zinc-600'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span>{m.team1.shortName} vs {m.team2.shortName}</span>
                      <span className="text-[10px] text-zinc-400 font-normal">({m.series})</span>
                    </div>
                    <div className="text-[10px] text-emerald-400 font-mono mt-0.5">{m.status}</div>
                  </div>
                  {settings.selectedMatchId === m.id && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs transition"
        >
          Save & Return
        </button>
      </div>
    );
  }

  // Screen 7: About VoloX
  return (
    <div className="space-y-4 text-white p-4">
      <div className="text-center py-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
          <Smartphone className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-bold text-white">VoloX Dynamic Island</h2>
        <span className="text-xs font-mono text-emerald-400">Version 1.0.0</span>
      </div>

      <div className="space-y-2 bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800 text-xs">
        <div className="flex justify-between py-1 border-b border-zinc-800">
          <span className="text-zinc-400">Target Device</span>
          <span className="text-white font-semibold">Realme 9i 5G (RMX3612)</span>
        </div>
        <div className="flex justify-between py-1 border-b border-zinc-800">
          <span className="text-zinc-400">SoC</span>
          <span className="text-white font-semibold">MediaTek Dimensity 810 5G</span>
        </div>
        <div className="flex justify-between py-1 border-b border-zinc-800">
          <span className="text-zinc-400">OS Compatibility</span>
          <span className="text-white font-semibold">Android 14 (Realme UI 5.0)</span>
        </div>
        <div className="flex justify-between py-1 border-b border-zinc-800">
          <span className="text-zinc-400">Architecture</span>
          <span className="text-emerald-400 font-semibold">Overlay Service (Zero ROM modification)</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-zinc-400">Developer</span>
          <span className="text-white font-semibold">VoloX Engineering</span>
        </div>
      </div>

      <button
        onClick={() => onNavigate('dashboard')}
        className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs transition"
      >
        Back to Dashboard
      </button>
    </div>
  );
};
