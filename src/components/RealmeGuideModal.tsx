import React from 'react';
import { 
  X, 
  ShieldCheck, 
  BatteryCharging, 
  Lock, 
  Power, 
  Smartphone, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const RealmeGuideModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl text-white max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Realme 9i 5G (RMX3612) Optimization</h3>
            <p className="text-xs text-zinc-400">
              Realme UI 4.0 / 5.0 aggressive RAM cleanup checklist (No root needed).
            </p>
          </div>
        </div>

        {/* Why this is necessary notice */}
        <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200/90 mb-5 leading-relaxed">
          <strong>Why is this needed?</strong> Realme UI uses an aggressive power-saving engine called <em>"Quick Freeze"</em>. If not whitelisted, the system will pause background services like the Dynamic Island when the screen turns off. Following these 4 steps ensures VoloX stays responsive 24/7.
        </div>

        {/* Step-by-Step Cards */}
        <div className="space-y-3.5">
          
          <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-start gap-3.5">
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
              1
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Display Over Other Apps (Overlay Permission)</h4>
              <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                Open <strong>Settings</strong> &gt; <strong>Apps</strong> &gt; <strong>Special App Access</strong> &gt; <strong>Display Over Other Apps</strong> &gt; find <strong>VoloX Dynamic Island</strong> and turn the toggle <strong>ON</strong>.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-start gap-3.5">
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
              2
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Notification Access (Live Alerts & Media)</h4>
              <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                Open <strong>Settings</strong> &gt; <strong>Apps</strong> &gt; <strong>Special App Access</strong> &gt; <strong>Device & App Notifications</strong> &gt; Enable <strong>VoloX Live Notifications</strong>.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-start gap-3.5">
            <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
              3
            </div>
            <div>
              <h4 className="text-xs font-bold text-amber-300">Allow Auto-Launch & Background Activity</h4>
              <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                Long press the <strong>VoloX</strong> app icon on your home screen &gt; Tap <strong>App Info</strong> &gt; Tap <strong>Battery Usage</strong> &gt; Enable both:
              </p>
              <ul className="mt-1.5 space-y-1 text-[11px] text-zinc-300 list-disc list-inside">
                <li><strong className="text-white">Allow background activity</strong></li>
                <li><strong className="text-white">Allow auto-launch</strong> (starts service automatically after phone restart)</li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-start gap-3.5">
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
              4
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Lock in Recent Tasks (Memory Priority)</h4>
              <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                Swipe up and hold to open <strong>Recent Apps</strong> &gt; locate VoloX &gt; tap the <strong>3 vertical dots</strong> in the upper right &gt; tap <strong>Lock</strong>. A small padlock icon will appear, preventing the system from ever clearing VoloX when you tap "Clear All".
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
          <span className="text-xs text-zinc-400">That's it! Your Realme 9i 5G will now run smoothly without interruptions.</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition"
          >
            Understood
          </button>
        </div>

      </div>
    </div>
  );
};
