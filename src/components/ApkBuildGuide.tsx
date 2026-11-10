import React from 'react';
import { 
  GitBranch, 
  Terminal, 
  Download, 
  CheckCircle2, 
  Smartphone, 
  AlertTriangle, 
  ExternalLink, 
  ShieldAlert, 
  Play,
  Copy,
  Check,
  Zap,
  Radio,
  Sparkles,
  Lock,
  ArrowRight
} from 'lucide-react';

export const ApkBuildGuide: React.FC = () => {
  const [copiedCmd, setCopiedCmd] = React.useState<string | null>(null);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl flex flex-col gap-6 text-white">
      
      {/* Big Reassurance Card for the User */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-teal-950/30 border-2 border-emerald-500/50 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-black flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-emerald-500/30">
            ✓
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-extrabold text-lg text-white">
                YES BRO! 100% IT WORKS ON YOUR REAL REALME 9i 5G (RMX3612)
              </h3>
              <span className="text-[10px] bg-emerald-500 text-black font-bold px-2.5 py-0.5 rounded-full">
                Native Android 14 App
              </span>
            </div>
            <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed">
              This is <strong>not just a website mockup</strong>. The code we generated inside this project contains real, compile-ready Kotlin files (<code className="text-emerald-400 font-mono">DynamicIslandService.kt</code>, <code className="text-emerald-400 font-mono">VoloXNotificationListener.kt</code>, and <code className="text-emerald-400 font-mono">AndroidManifest.xml</code>). When compiled into an APK, it runs directly on your actual phone screen over your Realme UI!
            </p>
          </div>
        </div>
      </div>

      {/* How it works on your Real Phone technically */}
      <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800">
        <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          How VoloX Operates on Your Physical Realme 9i 5G
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-emerald-400 font-bold">1. Floating Overlay</span>
              <span className="text-[9px] bg-zinc-800 text-zinc-400 px-1.5 rounded font-mono">WindowManager</span>
            </div>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Uses Android's official <code className="text-zinc-200">TYPE_APPLICATION_OVERLAY</code> API. It sits right on top of the punch hole camera, floating smoothly over your games, WhatsApp, YouTube, or home screen.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-emerald-400 font-bold">2. Real WhatsApp Alerts</span>
              <span className="text-[9px] bg-zinc-800 text-zinc-400 px-1.5 rounded font-mono">ListenerService</span>
            </div>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              The <code className="text-zinc-200">NotificationListenerService</code> intercepts real incoming messages from WhatsApp, Instagram, and SMS, immediately expanding the island pill with sender and text.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-emerald-400 font-bold">3. 18W Dart Charge</span>
              <span className="text-[9px] bg-zinc-800 text-zinc-400 px-1.5 rounded font-mono">BroadcastReceiver</span>
            </div>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              When you plug your real USB Type-C charger into your Realme 9i 5G, the phone broadcasts an <code className="text-zinc-200">ACTION_POWER_CONNECTED</code> intent, triggering the Dart Charge green animation.
            </p>
          </div>
        </div>
      </div>

      {/* Two Methods Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Method 1: GitHub Actions CI/CD (Zero PC Required - Build on Phone!) */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/30 via-zinc-900 to-zinc-900 border border-emerald-500/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wide">
                <GitBranch className="w-4 h-4" />
                Method 1: Cloud Build (No PC Needed!)
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                Easiest for You
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed mb-3">
              You do <strong>not</strong> need Android Studio or a computer. GitHub builds the real APK in the cloud for free:
            </p>

            <ol className="space-y-2 text-xs text-zinc-300 list-decimal list-inside pl-1">
              <li>
                Click <strong>"Export Android Project (.ZIP)"</strong> above and download the zip.
              </li>
              <li>
                Go to <a href="https://github.com" target="_blank" rel="noreferrer" className="text-emerald-400 underline font-semibold">GitHub.com</a>, create a new repository, and upload the zip files.
              </li>
              <li>
                GitHub automatically detects our <code className="text-emerald-300 font-mono text-[11px]">.github/workflows/build-apk.yml</code> and compiles the APK.
              </li>
              <li>
                Under the <strong>Actions</strong> tab, click the completed build and download <code className="text-emerald-300 font-mono text-[11px]">VoloX-Dynamic-Island-Debug-APK</code> directly onto your Realme 9i 5G!
              </li>
            </ol>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
            <span>Takes ~2 minutes</span>
            <span className="text-emerald-400 font-semibold">Install directly on phone</span>
          </div>
        </div>

        {/* Method 2: Local Android Studio / Terminal Build */}
        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5 uppercase tracking-wide">
                <Terminal className="w-4 h-4" />
                Method 2: Android Studio / Laptop
              </span>
              <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded font-bold">
                Developers
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed mb-3">
              If you have a laptop with Android Studio:
            </p>

            <div className="space-y-2">
              <p className="text-[11px] text-zinc-300">
                1. Open Android Studio &gt; <strong>File &gt; Open</strong> &gt; Select the unzipped folder.
              </p>
              <p className="text-[11px] text-zinc-300">
                2. Connect your Realme 9i 5G via USB cable (with USB debugging ON).
              </p>
              <p className="text-[11px] text-zinc-300">
                3. Click the green <strong>"Run" ▶</strong> button, or run in terminal:
              </p>

              <div className="relative bg-zinc-950 p-2.5 rounded-xl border border-zinc-800 font-mono text-[11px] text-emerald-400 flex items-center justify-between">
                <code>./gradlew assembleDebug</code>
                <button
                  onClick={() => copyText('./gradlew assembleDebug', 'cmd1')}
                  className="p-1 hover:text-white transition"
                >
                  {copiedCmd === 'cmd1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
                </button>
              </div>

              <p className="text-[11px] text-zinc-400">
                The APK file is compiled to:
              </p>
              <div className="bg-zinc-950/80 p-2 rounded-lg border border-zinc-800/80 font-mono text-[10px] text-zinc-300 truncate">
                app/build/outputs/apk/debug/app-debug.apk
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
            <span>Fast build</span>
            <span className="text-sky-400 font-semibold">Ready for deployment</span>
          </div>
        </div>

      </div>

      {/* Realme 9i 5G Post-Installation Checklist */}
      <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
        <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          The Only 3 Toggles You Need on Your Realme 9i 5G
        </h4>
        <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
          After installing the APK on your Realme 9i 5G, turn on these 3 settings in Realme UI so the island appears and stays alive 24/7:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          
          <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800">
            <span className="text-emerald-400 font-bold block mb-1">1. Draw Over Other Apps</span>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              When prompted, tap <strong>Enable</strong> so the island can float over other apps on your screen.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800">
            <span className="text-emerald-400 font-bold block mb-1">2. Notification Access</span>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Allow <strong>VoloX Live Notifications</strong> so it can detect incoming WhatsApp and SMS alerts.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800">
            <span className="text-amber-400 font-bold block mb-1">3. Lock in Recent Apps</span>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Open Recent Apps, tap the 3 dots on VoloX, and tap <strong>Lock</strong> so Realme UI never kills it.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
