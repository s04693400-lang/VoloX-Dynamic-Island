# VoloX Dynamic Island 1.0
> OxygenOS Live Alerts & iPhone Dynamic Island experience for Realme 9i 5G (RMX3612, Android 14)

---

## ⚡ 1. Why VoloX Won't Touch or Break Your Realme OS
- **No Root Required**: Runs entirely as a standard Android user application.
- **No Bootloader Unlocking**: Zero partition tampering, OTA updates continue to work seamlessly.
- **Realme Launcher Untouched**: Works seamlessly as a non-intrusive floating overlay via `SYSTEM_ALERT_WINDOW`.
- **Pure Overlay Architecture**: Collapses to zero-touch punch-hole pill when idle, avoiding touch blocking.

---

## 🚀 2. Two Ways to Build the APK

### Method A: 1-Click Cloud Build via GitHub Actions (Zero SDK required!)
1. Push this folder to a new GitHub repository (or fork).
2. Go to the **Actions** tab on your GitHub repository.
3. The `Build VoloX Dynamic Island APK` workflow will run automatically.
4. Once finished (~2 minutes), download `VoloX-Dynamic-Island-Debug-APK` from the **Artifacts** section!
5. Transfer the `.apk` to your Realme 9i 5G and tap to install.

### Method B: Build locally with Android Studio or Terminal
```bash
# 1. Clone repository
git clone <your-repo>
cd VoloXDynamicIsland

# 2. Build debug APK
./gradlew assembleDebug

# Output APK will be at:
# app/build/outputs/apk/debug/app-debug.apk
```

---

## 📱 3. Realme 9i 5G (Android 14 / Realme UI 5.0) Setup Checklist

Realme UI has aggressive background management. Follow these 4 quick settings for 100% 24/7 reliability:

1. **Draw Over Other Apps**: Settings > Apps > Special App Access > Display Over Other Apps > Enable **VoloX Dynamic Island**.
2. **Notification Access**: Settings > Apps > Special App Access > Device & App Notifications > Enable **VoloX Live Notifications**.
3. **Auto-Launch & Background Activity**: Settings > Apps > App Management > VoloX Dynamic Island > **Battery Usage** > Turn ON:
   - *Allow background activity*
   - *Allow auto-launch*
4. **Lock in Recent Apps**: Open your recent tasks view, swipe to VoloX, tap the 3 dots (or drag down), and select **Lock**. This prevents Realme UI from clearing the service from RAM.

---

## 🏏 4. Live Cricket Scores Setup
- VoloX integrates with **CricAPI / Sportmonks**.
- Open VoloX Settings > **Cricket Live Scores**.
- Enter your free API key from [cricapi.com](https://cricapi.com).
- VoloX will dynamically stream live match scores, overs, wickets, and run rates straight onto the island!
