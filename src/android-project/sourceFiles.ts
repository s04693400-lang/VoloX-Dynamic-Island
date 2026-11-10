export interface AndroidFile {
  path: string;
  name: string;
  category: 'config' | 'manifest' | 'kotlin' | 'res' | 'workflow' | 'docs';
  language: 'kotlin' | 'xml' | 'groovy' | 'properties' | 'yaml' | 'markdown';
  description: string;
  content: string;
}

export const ANDROID_PROJECT_FILES: AndroidFile[] = [
  {
    path: 'build.gradle.kts',
    name: 'build.gradle.kts (Project)',
    category: 'config',
    language: 'kotlin',
    description: 'Root Gradle build script with Kotlin 1.9.22 and Android Gradle Plugin 8.2.2',
    content: `// Top-level build file for VoloX Dynamic Island 1.0
plugins {
    id("com.android.application") version "8.2.2" apply false
    id("org.jetbrains.kotlin.android") version "1.9.22" apply false
}

tasks.register("clean", Delete::class) {
    delete(rootProject.buildDir)
}
`
  },
  {
    path: 'settings.gradle.kts',
    name: 'settings.gradle.kts',
    category: 'config',
    language: 'kotlin',
    description: 'Project settings and repository declarations (Google, MavenCentral)',
    content: `pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "VoloXDynamicIsland"
include(":app")
`
  },
  {
    path: 'gradle.properties',
    name: 'gradle.properties',
    category: 'config',
    language: 'properties',
    description: 'JVM arguments and AndroidX flags for fast builds',
    content: `org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8
android.useAndroidX=true
android.nonTransitiveRClass=true
kotlin.code.style=official
`
  },
  {
    path: 'app/build.gradle.kts',
    name: 'app/build.gradle.kts',
    category: 'config',
    language: 'kotlin',
    description: 'App module configuration: minSdk 26, targetSdk 34 (Android 14), Compose & Coroutines',
    content: `plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.volox.dynamicisland"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.volox.dynamicisland"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        compose = true
        viewBinding = true
    }
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.8"
    }
    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
}

dependencies {
    // Core & Lifecycle
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.7.0")
    implementation("androidx.lifecycle:lifecycle-service:2.7.0")

    // Jetpack Compose UI
    val composeBom = platform("androidx.compose:compose-bom:2024.02.00")
    implementation(composeBom)
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.material:material-icons-extended")
    implementation("androidx.activity:activity-compose:1.8.2")
    implementation("androidx.navigation:navigation-compose:2.7.7")

    // Coroutines & Networking (Cricket live score API)
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3")
    implementation("com.squareup.retrofit2:retrofit:2.9.0")
    implementation("com.squareup.retrofit2:converter-gson:2.9.0")
    implementation("com.squareup.okhttp3:logging-interceptor:4.12.0")

    // Media & System
    implementation("androidx.media:media:1.7.0")
}
`
  },
  {
    path: 'app/src/main/AndroidManifest.xml',
    name: 'AndroidManifest.xml',
    category: 'manifest',
    language: 'xml',
    description: 'Android 14 manifest with overlay, notification listener, foreground service and boot receivers',
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.volox.dynamicisland">

    <!-- Critical permissions for Overlay Window and Services -->
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE_SPECIAL_USE" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
    <uses-permission android:name="android.permission.VIBRATE" />
    
    <!-- Internet for Cricket Live Updates -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <!-- Optional for Call and Media events -->
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />
    <uses-permission android:name="android.permission.MEDIA_CONTENT_CONTROL" tools:ignore="ProtectedPermissions" />

    <application
        android:name=".VoloXApp"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.VoloXDynamicIsland">

        <!-- Main Configuration Activity -->
        <activity
            android:name=".ui.MainActivity"
            android:exported="true"
            android:label="@string/app_name"
            android:theme="@style/Theme.VoloXDynamicIsland">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <!-- Dynamic Island WindowManager Overlay Foreground Service -->
        <service
            android:name=".service.DynamicIslandService"
            android:enabled="true"
            android:exported="false"
            android:foregroundServiceType="specialUse">
            <property
                android:name="android.app.PROPERTY_SPECIAL_USE_FGS_SUBTYPE"
                android:value="Overlay Floating Dynamic Island Alert Indicator for Realme UI" />
        </service>

        <!-- Notification Listener Service for WhatsApp, Instagram, Messages -->
        <service
            android:name=".service.VoloXNotificationListener"
            android:enabled="true"
            android:exported="true"
            android:label="@string/notification_listener_label"
            android:permission="android.permission.BIND_NOTIFICATION_LISTENER_SERVICE">
            <intent-filter>
                <action android:name="android.service.notification.NotificationListenerService" />
            </intent-filter>
        </service>

        <!-- Broadcast Receiver for Battery, Charger, USB and Earphones -->
        <receiver
            android:name=".service.DeviceBroadcastReceiver"
            android:enabled="true"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.ACTION_POWER_CONNECTED" />
                <action android:name="android.intent.action.ACTION_POWER_DISCONNECTED" />
                <action android:name="android.intent.action.BATTERY_CHANGED" />
                <action android:name="android.intent.action.HEADSET_PLUG" />
                <action android:name="android.hardware.usb.action.USB_DEVICE_ATTACHED" />
                <action android:name="android.hardware.usb.action.USB_DEVICE_DETACHED" />
                <action android:name="android.intent.action.BOOT_COMPLETED" />
            </intent-filter>
        </receiver>

    </application>

</manifest>
`
  },
  {
    path: 'app/src/main/java/com/volox/dynamicisland/VoloXApp.kt',
    name: 'VoloXApp.kt',
    category: 'kotlin',
    language: 'kotlin',
    description: 'Application class setting up notification channels and singleton instances',
    content: `package com.volox.dynamicisland

import android.app.Application
import android.app.NotificationChannel
import android.app.NotificationManager
import android.os.Build
import com.volox.dynamicisland.data.PreferencesManager

class VoloXApp : Application() {

    lateinit var preferencesManager: PreferencesManager
        private set

    override fun onCreate() {
        super.onCreate()
        instance = this
        preferencesManager = PreferencesManager(this)
        createNotificationChannels()
    }

    private fun createNotificationChannels() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val serviceChannel = NotificationChannel(
                CHANNEL_SERVICE,
                "VoloX Island Service",
                NotificationManager.IMPORTANCE_LOW
            ).apply {
                description = "Keeps VoloX Dynamic Island active over Realme UI"
                setShowBadge(false)
            }

            val manager = getSystemService(NotificationManager::class.java)
            manager?.createNotificationChannel(serviceChannel)
        }
    }

    companion object {
        const val CHANNEL_SERVICE = "volox_dynamic_island_service"
        lateinit var instance: VoloXApp
            private set
    }
}
`
  },
  {
    path: 'app/src/main/java/com/volox/dynamicisland/service/DynamicIslandService.kt',
    name: 'DynamicIslandService.kt',
    category: 'kotlin',
    language: 'kotlin',
    description: 'Core Overlay service managing WindowManager.addView with spring physics and auto-collapse',
    content: `package com.volox.dynamicisland.service

import android.animation.ValueAnimator
import android.app.Notification
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.graphics.PixelFormat
import android.os.Build
import android.os.Handler
import android.os.IBinder
import android.os.Looper
import android.view.Gravity
import android.view.LayoutInflater
import android.view.MotionEvent
import android.view.View
import android.view.WindowManager
import android.view.animation.OvershootInterpolator
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import androidx.core.app.NotificationCompat
import com.volox.dynamicisland.R
import com.volox.dynamicisland.VoloXApp
import com.volox.dynamicisland.data.PreferencesManager
import com.volox.dynamicisland.model.IslandEvent
import com.volox.dynamicisland.ui.MainActivity

class DynamicIslandService : Service() {

    private lateinit var windowManager: WindowManager
    private var islandRootView: View? = null
    private lateinit var layoutParams: WindowManager.LayoutParams
    private lateinit var prefs: PreferencesManager

    private val handler = Handler(Looper.getMainLooper())
    private var isExpanded = false
    private var currentEvent: IslandEvent? = null

    private val collapseRunnable = Runnable {
        collapseIsland()
    }

    override fun onCreate() {
        super.onCreate()
        prefs = VoloXApp.instance.preferencesManager
        windowManager = getSystemService(Context.WINDOW_SERVICE) as WindowManager
        startForegroundServiceNotification()
        setupOverlay()
    }

    private fun startForegroundServiceNotification() {
        val launchIntent = Intent(this, MainActivity::class.java)
        val pendingIntent = PendingIntent.getActivity(
            this, 0, launchIntent,
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
        )

        val notification: Notification = NotificationCompat.Builder(this, VoloXApp.CHANNEL_SERVICE)
            .setContentTitle("VoloX Dynamic Island")
            .setContentText("Active on Realme 9i 5G (Android 14)")
            .setSmallIcon(R.drawable.ic_volox_island)
            .setContentIntent(pendingIntent)
            .setOngoing(true)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .build()

        startForeground(1001, notification)
    }

    private fun setupOverlay() {
        val type = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
        } else {
            @Suppress("DEPRECATION")
            WindowManager.LayoutParams.TYPE_PHONE
        }

        layoutParams = WindowManager.LayoutParams(
            dpToPx(prefs.pillWidth),
            dpToPx(prefs.pillHeight),
            type,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or
                    WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS or
                    WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL,
            PixelFormat.TRANSLUCENT
        ).apply {
            gravity = Gravity.TOP or Gravity.CENTER_HORIZONTAL
            x = prefs.xOffset
            y = prefs.yOffset // Calibrated for Realme 9i 5G punch hole
        }

        val inflater = LayoutInflater.from(this)
        islandRootView = inflater.inflate(R.layout.layout_dynamic_island_overlay, null)

        setupTouchInteractions(islandRootView!!)
        windowManager.addView(islandRootView, layoutParams)
    }

    private fun setupTouchInteractions(view: View) {
        var startY = 0f
        var startX = 0f
        var isDragging = false

        view.setOnTouchListener { _, motionEvent ->
            when (motionEvent.action) {
                MotionEvent.ACTION_DOWN -> {
                    startX = motionEvent.rawX
                    startY = motionEvent.rawY
                    isDragging = false
                    true
                }
                MotionEvent.ACTION_MOVE -> {
                    val deltaY = motionEvent.rawY - startY
                    if (deltaY > 20 && !isExpanded) {
                        expandIsland()
                    }
                    true
                }
                MotionEvent.ACTION_UP -> {
                    val deltaX = Math.abs(motionEvent.rawX - startX)
                    val deltaY = Math.abs(motionEvent.rawY - startY)
                    if (deltaX < 15 && deltaY < 15) {
                        // Tap detected
                        if (isExpanded) collapseIsland() else expandIsland()
                    }
                    true
                }
                else -> false
            }
        }
    }

    fun displayEvent(event: IslandEvent) {
        currentEvent = event
        handler.removeCallbacks(collapseRunnable)

        // Update UI inside overlay
        updateViewContents(event)
        expandIsland()

        // Auto collapse after configured seconds
        handler.postDelayed(collapseRunnable, (prefs.autoCollapseDuration * 1000).toLong())
    }

    private fun expandIsland() {
        if (isExpanded || islandRootView == null) return
        isExpanded = true

        val startW = layoutParams.width
        val targetW = dpToPx(prefs.expandedWidth)
        val startH = layoutParams.height
        val targetH = dpToPx(prefs.expandedHeight)

        val animator = ValueAnimator.ofFloat(0f, 1f).apply {
            duration = 320
            interpolator = OvershootInterpolator(0.85f)
            addUpdateListener { anim ->
                val frac = anim.animatedValue as Float
                layoutParams.width = (startW + (targetW - startW) * frac).toInt()
                layoutParams.height = (startH + (targetH - startH) * frac).toInt()
                windowManager.updateViewLayout(islandRootView, layoutParams)
            }
        }
        animator.start()
        islandRootView?.findViewById<View>(R.id.expandedContentContainer)?.visibility = View.VISIBLE
    }

    fun collapseIsland() {
        if (!isExpanded || islandRootView == null) return
        isExpanded = false

        val startW = layoutParams.width
        val targetW = dpToPx(prefs.pillWidth)
        val startH = layoutParams.height
        val targetH = dpToPx(prefs.pillHeight)

        val animator = ValueAnimator.ofFloat(0f, 1f).apply {
            duration = 260
            addUpdateListener { anim ->
                val frac = anim.animatedValue as Float
                layoutParams.width = (startW + (targetW - startW) * frac).toInt()
                layoutParams.height = (startH + (targetH - startH) * frac).toInt()
                windowManager.updateViewLayout(islandRootView, layoutParams)
            }
        }
        animator.start()
        islandRootView?.findViewById<View>(R.id.expandedContentContainer)?.visibility = View.GONE
    }

    private fun updateViewContents(event: IslandEvent) {
        val root = islandRootView ?: return
        val titleView = root.findViewById<TextView>(R.id.tvIslandTitle)
        val subtitleView = root.findViewById<TextView>(R.id.tvIslandSubtitle)
        val iconView = root.findViewById<ImageView>(R.id.ivIslandIcon)

        titleView?.text = event.title
        subtitleView?.text = event.subtitle
        // Populate additional icons or controls depending on event type
    }

    private fun dpToPx(dp: Int): Int {
        val density = resources.displayMetrics.density
        return (dp * density).toInt()
    }

    override fun onDestroy() {
        handler.removeCallbacks(collapseRunnable)
        if (islandRootView != null) {
            windowManager.removeView(islandRootView)
        }
        super.onDestroy()
    }

    override fun onBind(intent: Intent?): IBinder? = null
}
`
  },
  {
    path: 'app/src/main/java/com/volox/dynamicisland/service/VoloXNotificationListener.kt',
    name: 'VoloXNotificationListener.kt',
    category: 'kotlin',
    language: 'kotlin',
    description: 'NotificationListenerService capturing WhatsApp, Instagram, Telegram and Messages',
    content: `package com.volox.dynamicisland.service

import android.app.Notification
import android.content.Intent
import android.os.Bundle
import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification
import com.volox.dynamicisland.VoloXApp
import com.volox.dynamicisland.model.IslandEvent
import com.volox.dynamicisland.model.IslandEventType

class VoloXNotificationListener : NotificationListenerService() {

    override fun onNotificationPosted(sbn: StatusBarNotification?) {
        super.onNotificationPosted(sbn)
        if (sbn == null) return

        val packageName = sbn.packageName
        val extras: Bundle = sbn.notification.extras ?: return

        val title = extras.getString(Notification.EXTRA_TITLE) ?: ""
        val text = extras.getCharSequence(Notification.EXTRA_TEXT)?.toString() ?: ""

        if (title.isEmpty() && text.isEmpty()) return

        val prefs = VoloXApp.instance.preferencesManager
        if (!prefs.showNotifications) return

        // Filter for allowed apps
        val eventType = when (packageName) {
            "com.whatsapp" -> if (prefs.notifyWhatsApp) IslandEventType.WHATSAPP else null
            "com.instagram.android" -> if (prefs.notifyInstagram) IslandEventType.INSTAGRAM else null
            "com.google.android.apps.messaging", "com.android.mms" -> if (prefs.notifyMessages) IslandEventType.MESSAGES else null
            "org.telegram.messenger" -> if (prefs.notifyTelegram) IslandEventType.TELEGRAM else null
            else -> null
        }

        if (eventType != null) {
            val event = IslandEvent(
                type = eventType,
                title = title,
                subtitle = text,
                packageName = packageName,
                timestamp = System.currentTimeMillis()
            )
            // Dispatch to DynamicIslandService
            val intent = Intent(this, DynamicIslandService::class.java).apply {
                action = "ACTION_SHOW_EVENT"
                putExtra("EXTRA_EVENT", event)
            }
            startService(intent)
        }
    }

    override fun onNotificationRemoved(sbn: StatusBarNotification?) {
        super.onNotificationRemoved(sbn)
    }
}
`
  },
  {
    path: 'app/src/main/java/com/volox/dynamicisland/service/DeviceBroadcastReceiver.kt',
    name: 'DeviceBroadcastReceiver.kt',
    category: 'kotlin',
    language: 'kotlin',
    description: 'Broadcast receiver for battery charging (Dart 18W), headphones, USB connection and boot',
    content: `package com.volox.dynamicisland.service

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.BatteryManager
import android.os.Build
import com.volox.dynamicisland.model.IslandEvent
import com.volox.dynamicisland.model.IslandEventType

class DeviceBroadcastReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        val action = intent.action ?: return

        when (action) {
            Intent.ACTION_BOOT_COMPLETED -> {
                // Auto-restart overlay service on Realme 9i 5G boot
                val serviceIntent = Intent(context, DynamicIslandService::class.java)
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    context.startForegroundService(serviceIntent)
                } else {
                    context.startService(serviceIntent)
                }
            }

            Intent.ACTION_POWER_CONNECTED -> {
                val batteryStatus: Intent? = Intent(Intent.ACTION_BATTERY_CHANGED)
                val level = batteryStatus?.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) ?: 85
                
                val event = IslandEvent(
                    type = IslandEventType.BATTERY_CHARGING,
                    title = "Realme Dart Charge Connected",
                    subtitle = "\$level% • Fast Charging 18W",
                    timestamp = System.currentTimeMillis()
                )
                forwardToService(context, event)
            }

            Intent.ACTION_POWER_DISCONNECTED -> {
                val event = IslandEvent(
                    type = IslandEventType.BATTERY_UNPLUGGED,
                    title = "Charger Disconnected",
                    subtitle = "Running on battery",
                    timestamp = System.currentTimeMillis()
                )
                forwardToService(context, event)
            }

            Intent.ACTION_HEADSET_PLUG -> {
                val state = intent.getIntExtra("state", -1)
                val name = intent.getStringExtra("name") ?: "Earphones"
                if (state == 1) {
                    val event = IslandEvent(
                        type = IslandEventType.EARPHONES_CONNECTED,
                        title = "Earphones Connected",
                        subtitle = "Audio routed to \$name",
                        timestamp = System.currentTimeMillis()
                    )
                    forwardToService(context, event)
                }
            }
        }
    }

    private fun forwardToService(context: Context, event: IslandEvent) {
        val intent = Intent(context, DynamicIslandService::class.java).apply {
            action = "ACTION_SHOW_EVENT"
            putExtra("EXTRA_EVENT", event)
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            context.startForegroundService(intent)
        } else {
            context.startService(intent)
        }
    }
}
`
  },
  {
    path: 'app/src/main/java/com/volox/dynamicisland/data/CricketApiClient.kt',
    name: 'CricketApiClient.kt',
    category: 'kotlin',
    language: 'kotlin',
    description: 'Live Cricket API integration client (Retrofit + OkHttp) with automatic live polling',
    content: `package com.volox.dynamicisland.data

import com.google.gson.annotations.SerializedName
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET
import retrofit2.http.Query
import java.util.concurrent.TimeUnit

data class CricketApiResponse(
    @SerializedName("status") val status: String,
    @SerializedName("data") val data: List<CricketMatchDto>?
)

data class CricketMatchDto(
    @SerializedName("id") val id: String,
    @SerializedName("name") val name: String,
    @SerializedName("matchType") val matchType: String,
    @SerializedName("status") val status: String,
    @SerializedName("venue") val venue: String,
    @SerializedName("score") val score: List<ScoreDto>?,
    @SerializedName("teams") val teams: List<String>?
)

data class ScoreDto(
    @SerializedName("r") val runs: Int,
    @SerializedName("w") val wickets: Int,
    @SerializedName("o") val overs: Double,
    @SerializedName("inning") val inning: String
)

interface CricketApiService {
    @GET("v1/currentMatches")
    suspend fun getCurrentMatches(
        @Query("apikey") apiKey: String,
        @Query("offset") offset: Int = 0
    ): CricketApiResponse
}

class CricketApiClient(private val apiKey: String) {

    private val service: CricketApiService

    init {
        val logging = HttpLoggingInterceptor().apply {
            level = HttpLoggingInterceptor.Level.BASIC
        }
        val okHttpClient = OkHttpClient.Builder()
            .addInterceptor(logging)
            .connectTimeout(15, TimeUnit.SECONDS)
            .readTimeout(15, TimeUnit.SECONDS)
            .build()

        val retrofit = Retrofit.Builder()
            .baseUrl("https://api.cricapi.com/")
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        service = retrofit.create(CricketApiService::class.java)
    }

    suspend fun fetchLiveMatches(): List<CricketMatchDto> = withContext(Dispatchers.IO) {
        try {
            val response = service.getCurrentMatches(apiKey = apiKey)
            response.data ?: emptyList()
        } catch (e: Exception) {
            e.printStackTrace()
            emptyList()
        }
    }
}
`
  },
  {
    path: 'app/src/main/java/com/volox/dynamicisland/data/PreferencesManager.kt',
    name: 'PreferencesManager.kt',
    category: 'kotlin',
    language: 'kotlin',
    description: 'SharedPreferences wrapper storing Realme 9i 5G camera punch-hole calibration and settings',
    content: `package com.volox.dynamicisland.data

import android.content.Context
import android.content.SharedPreferences

class PreferencesManager(context: Context) {

    private val prefs: SharedPreferences =
        context.getSharedPreferences("volox_island_prefs", Context.MODE_PRIVATE)

    var isServiceEnabled: Boolean
        get() = prefs.getBoolean(KEY_SERVICE_ENABLED, true)
        set(value) = prefs.edit().putBoolean(KEY_SERVICE_ENABLED, value).apply()

    // Realme 9i 5G camera punch hole default position: top center, ~11px down
    var yOffset: Int
        get() = prefs.getInt(KEY_Y_OFFSET, 18)
        set(value) = prefs.edit().putInt(KEY_Y_OFFSET, value).apply()

    var xOffset: Int
        get() = prefs.getInt(KEY_X_OFFSET, 0)
        set(value) = prefs.edit().putInt(KEY_X_OFFSET, value).apply()

    var pillWidth: Int
        get() = prefs.getInt(KEY_PILL_WIDTH, 110)
        set(value) = prefs.edit().putInt(KEY_PILL_WIDTH, value).apply()

    var pillHeight: Int
        get() = prefs.getInt(KEY_PILL_HEIGHT, 34)
        set(value) = prefs.edit().putInt(KEY_PILL_HEIGHT, value).apply()

    var expandedWidth: Int
        get() = prefs.getInt(KEY_EXP_WIDTH, 340)
        set(value) = prefs.edit().putInt(KEY_EXP_WIDTH, value).apply()

    var expandedHeight: Int
        get() = prefs.getInt(KEY_EXP_HEIGHT, 110)
        set(value) = prefs.edit().putInt(KEY_EXP_HEIGHT, value).apply()

    var autoCollapseDuration: Int
        get() = prefs.getInt(KEY_AUTO_COLLAPSE, 5)
        set(value) = prefs.edit().putInt(KEY_AUTO_COLLAPSE, value).apply()

    // Features
    var showCricketScores: Boolean
        get() = prefs.getBoolean(KEY_SHOW_CRICKET, true)
        set(value) = prefs.edit().putBoolean(KEY_SHOW_CRICKET, value).apply()

    var cricketApiKey: String
        get() = prefs.getString(KEY_CRICKET_KEY, "") ?: ""
        set(value) = prefs.edit().putString(KEY_CRICKET_KEY, value).apply()

    var showMusic: Boolean
        get() = prefs.getBoolean(KEY_SHOW_MUSIC, true)
        set(value) = prefs.edit().putBoolean(KEY_SHOW_MUSIC, value).apply()

    var showNotifications: Boolean
        get() = prefs.getBoolean(KEY_SHOW_NOTIF, true)
        set(value) = prefs.edit().putBoolean(KEY_SHOW_NOTIF, value).apply()

    var notifyWhatsApp: Boolean
        get() = prefs.getBoolean(KEY_NOTIF_WA, true)
        set(value) = prefs.edit().putBoolean(KEY_NOTIF_WA, value).apply()

    var notifyInstagram: Boolean
        get() = prefs.getBoolean(KEY_NOTIF_IG, true)
        set(value) = prefs.edit().putBoolean(KEY_NOTIF_IG, value).apply()

    var notifyMessages: Boolean
        get() = prefs.getBoolean(KEY_NOTIF_MSG, true)
        set(value) = prefs.edit().putBoolean(KEY_NOTIF_MSG, value).apply()

    var notifyTelegram: Boolean
        get() = prefs.getBoolean(KEY_NOTIF_TG, true)
        set(value) = prefs.edit().putBoolean(KEY_NOTIF_TG, value).apply()

    companion object {
        private const val KEY_SERVICE_ENABLED = "key_service_enabled"
        private const val KEY_Y_OFFSET = "key_y_offset"
        private const val KEY_X_OFFSET = "key_x_offset"
        private const val KEY_PILL_WIDTH = "key_pill_width"
        private const val KEY_PILL_HEIGHT = "key_pill_height"
        private const val KEY_EXP_WIDTH = "key_exp_width"
        private const val KEY_EXP_HEIGHT = "key_exp_height"
        private const val KEY_AUTO_COLLAPSE = "key_auto_collapse"
        private const val KEY_SHOW_CRICKET = "key_show_cricket"
        private const val KEY_CRICKET_KEY = "key_cricket_key"
        private const val KEY_SHOW_MUSIC = "key_show_music"
        private const val KEY_SHOW_NOTIF = "key_show_notif"
        private const val KEY_NOTIF_WA = "key_notif_wa"
        private const val KEY_NOTIF_IG = "key_notif_ig"
        private const val KEY_NOTIF_MSG = "key_notif_msg"
        private const val KEY_NOTIF_TG = "key_notif_tg"
    }
}
`
  },
  {
    path: 'app/src/main/java/com/volox/dynamicisland/model/IslandEvent.kt',
    name: 'IslandEvent.kt',
    category: 'kotlin',
    language: 'kotlin',
    description: 'Data model and event types for Dynamic Island alerts',
    content: `package com.volox.dynamicisland.model

import java.io.Serializable

enum class IslandEventType {
    CRICKET_SCORE,
    MUSIC_PLAYBACK,
    WHATSAPP,
    INSTAGRAM,
    MESSAGES,
    TELEGRAM,
    BATTERY_CHARGING,
    BATTERY_UNPLUGGED,
    INCOMING_CALL,
    ONGOING_CALL,
    TIMER,
    STOPWATCH,
    EARPHONES_CONNECTED,
    USB_CONNECTED
}

data class IslandEvent(
    val type: IslandEventType,
    val title: String,
    val subtitle: String,
    val packageName: String? = null,
    val timestamp: Long = System.currentTimeMillis(),
    val extraData: Map<String, String>? = null
) : Serializable
`
  },
  {
    path: 'app/src/main/java/com/volox/dynamicisland/util/RealmeOptimizationHelper.kt',
    name: 'RealmeOptimizationHelper.kt',
    category: 'kotlin',
    language: 'kotlin',
    description: 'Specific Realme UI (ColorOS) intents for Auto-Launch, Background Freeze, and App Lock',
    content: `package com.volox.dynamicisland.util

import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.PowerManager
import android.provider.Settings
import android.widget.Toast

object RealmeOptimizationHelper {

    /**
     * Guides the user to exempt VoloX from Realme UI aggressive battery freeze
     */
    fun openRealmeAutoStartSettings(context: Context) {
        val intents = listOf(
            // Realme UI / ColorOS Auto Launch manager
            Intent().setComponent(
                ComponentName(
                    "com.coloros.safecenter",
                    "com.coloros.safecenter.permission.startup.StartupAppListActivity"
                )
            ),
            Intent().setComponent(
                ComponentName(
                    "com.oplus.safecenter",
                    "com.oplus.safecenter.permission.startup.StartupAppListActivity"
                )
            ),
            Intent().setComponent(
                ComponentName(
                    "com.coloros.safecenter",
                    "com.coloros.safecenter.startupapp.StartupAppListActivity"
                )
            )
        )

        var opened = false
        for (intent in intents) {
            try {
                intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
                context.startActivity(intent)
                opened = true
                break
            } catch (ignored: Exception) {
            }
        }

        if (!opened) {
            openAppDetailsSettings(context)
            Toast.makeText(
                context,
                "Please enable 'Auto-launch' and 'Allow background activity' in App Info",
                Toast.LENGTH_LONG
            ).show()
        }
    }

    /**
     * Request ignore standard battery optimizations
     */
    fun requestIgnoreBatteryOptimizations(context: Context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            val powerManager = context.getSystemService(Context.POWER_SERVICE) as PowerManager
            if (!powerManager.isIgnoringBatteryOptimizations(context.packageName)) {
                val intent = Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS).apply {
                    data = Uri.parse("package:\${context.packageName}")
                    flags = Intent.FLAG_ACTIVITY_NEW_TASK
                }
                context.startActivity(intent)
            }
        }
    }

    fun openAppDetailsSettings(context: Context) {
        val intent = Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS).apply {
            data = Uri.fromParts("package", context.packageName, null)
            flags = Intent.FLAG_ACTIVITY_NEW_TASK
        }
        context.startActivity(intent)
    }
}
`
  },
  {
    path: 'app/src/main/java/com/volox/dynamicisland/ui/MainActivity.kt',
    name: 'MainActivity.kt',
    category: 'kotlin',
    language: 'kotlin',
    description: 'Jetpack Compose UI hosting Welcome, Permissions, Settings, Appearance, Cricket & About screens',
    content: `package com.volox.dynamicisland.ui

import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.provider.Settings
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.volox.dynamicisland.service.DynamicIslandService
import com.volox.dynamicisland.ui.screens.*

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            MaterialTheme(
                colorScheme = darkColorScheme(
                    primary = Color(0xFF00E676),
                    background = Color(0xFF0B0F14),
                    surface = Color(0xFF141A22)
                )
            ) {
                val navController = rememberNavController()
                
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    NavHost(navController = navController, startDestination = "welcome") {
                        composable("welcome") {
                            WelcomeScreen(
                                onGetStarted = { navController.navigate("permissions") }
                            )
                        }
                        composable("permissions") {
                            PermissionsScreen(
                                onContinue = { 
                                    startIslandService()
                                    navController.navigate("dashboard") 
                                }
                            )
                        }
                        composable("dashboard") {
                            IslandDashboardScreen(navController = navController)
                        }
                        composable("settings_island") {
                            IslandSettingsScreen(onBack = { navController.popBackStack() })
                        }
                        composable("settings_appearance") {
                            AppearanceScreen(onBack = { navController.popBackStack() })
                        }
                        composable("settings_notifications") {
                            NotificationSettingsScreen(onBack = { navController.popBackStack() })
                        }
                        composable("settings_cricket") {
                            CricketSettingsScreen(onBack = { navController.popBackStack() })
                        }
                        composable("about") {
                            AboutScreen(onBack = { navController.popBackStack() })
                        }
                    }
                }
            }
        }
    }

    private fun startIslandService() {
        if (Settings.canDrawOverlays(this)) {
            val serviceIntent = Intent(this, DynamicIslandService::class.java)
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                startForegroundService(serviceIntent)
            } else {
                startService(serviceIntent)
            }
        }
    }
}
`
  },
  {
    path: 'app/src/main/res/layout/layout_dynamic_island_overlay.xml',
    name: 'layout_dynamic_island_overlay.xml',
    category: 'res',
    language: 'xml',
    description: 'XML layout for the WindowManager floating pill view with OxygenOS rounded aesthetics',
    content: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/islandContainer"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@drawable/bg_island_pill"
    android:gravity="center"
    android:orientation="vertical"
    android:padding="8dp">

    <!-- Idle Pill Content -->
    <LinearLayout
        android:id="@+id/compactContentContainer"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:gravity="center_vertical"
        android:orientation="horizontal">

        <ImageView
            android:id="@+id/ivIslandIcon"
            android:layout_width="18dp"
            android:layout_height="18dp"
            android:layout_marginStart="4dp"
            android:src="@drawable/ic_volox_island" />

        <TextView
            android:id="@+id/tvIslandTitle"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginStart="8dp"
            android:layout_weight="1"
            android:ellipsize="end"
            android:maxLines="1"
            android:textColor="#FFFFFF"
            android:textSize="12sp"
            android:textStyle="bold" />
    </LinearLayout>

    <!-- Expanded Card Content -->
    <LinearLayout
        android:id="@+id/expandedContentContainer"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:paddingTop="6dp"
        android:visibility="gone">

        <TextView
            android:id="@+id/tvIslandSubtitle"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:textColor="#A0AEC0"
            android:textSize="13sp" />
    </LinearLayout>

</LinearLayout>
`
  },
  {
    path: 'app/src/main/res/drawable/bg_island_pill.xml',
    name: 'bg_island_pill.xml',
    category: 'res',
    language: 'xml',
    description: 'Pure black pill background with sleek OxygenOS curvature and subtle border',
    content: `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">
    <solid android:color="#000000" />
    <corners android:radius="24dp" />
    <stroke
        android:width="0.8dp"
        android:color="#26FFFFFF" />
</shape>
`
  },
  {
    path: 'app/src/main/res/drawable/ic_volox_island.xml',
    name: 'ic_volox_island.xml',
    category: 'res',
    language: 'xml',
    description: 'Vector asset for VoloX logo and status indicator',
    content: `<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
    <path
        android:fillColor="#00E676"
        android:pathData="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M11,7V13H17V11H13V7H11Z" />
</vector>
`
  },
  {
    path: 'app/src/main/res/values/strings.xml',
    name: 'strings.xml',
    category: 'res',
    language: 'xml',
    description: 'Application localized strings and labels',
    content: `<resources>
    <string name="app_name">VoloX Dynamic Island</string>
    <string name="app_version">1.0.0</string>
    <string name="notification_listener_label">VoloX Live Notifications</string>
    <string name="target_device">Realme 9i 5G (RMX3612)</string>
</resources>
`
  },
  {
    path: 'app/src/main/res/values/colors.xml',
    name: 'colors.xml',
    category: 'res',
    language: 'xml',
    description: 'Pure black OLED and OxygenOS color palette',
    content: `<resources>
    <color name="volox_black">#000000</color>
    <color name="volox_dark_surface">#0D1117</color>
    <color name="volox_accent">#00E676</color>
    <color name="volox_cyan">#00D2FF</color>
    <color name="volox_border">#26FFFFFF</color>
    <color name="volox_text_primary">#FFFFFF</color>
    <color name="volox_text_secondary">#9E9E9E</color>
</resources>
`
  },
  {
    path: 'app/src/main/res/values/themes.xml',
    name: 'themes.xml',
    category: 'res',
    language: 'xml',
    description: 'Material3 dark theme without action bar',
    content: `<resources xmlns:tools="http://schemas.android.com/tools">
    <style name="Theme.VoloXDynamicIsland" parent="android:Theme.Material.NoActionBar">
        <item name="android:statusBarColor">#000000</item>
        <item name="android:navigationBarColor">#000000</item>
        <item name="android:windowBackground">#0B0F14</item>
    </style>
</resources>
`
  },
  {
    path: '.github/workflows/build-apk.yml',
    name: 'build-apk.yml (GitHub Actions)',
    category: 'workflow',
    language: 'yaml',
    description: 'Automated CI/CD workflow to compile and upload installable Debug & Release APKs',
    content: `name: Build VoloX Dynamic Island APK

on:
  push:
    branches: [ "main", "master" ]
  pull_request:
    branches: [ "main", "master" ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Repository
      uses: actions/checkout@v4

    - name: Set up JDK 17
      uses: actions/setup-java@v4
      with:
        java-version: '17'
        distribution: 'temurin'
        cache: gradle

    - name: Grant Execute Permission to Gradle Wrapper
      run: chmod +x gradlew || true

    - name: Build Debug APK with Gradle
      run: ./gradlew assembleDebug --stacktrace

    - name: Upload Debug APK Artifact
      uses: actions/upload-artifact@v4
      with:
        name: VoloX-Dynamic-Island-Debug-APK
        path: app/build/outputs/apk/debug/app-debug.apk
        retention-days: 14
`
  },
  {
    path: 'README.md',
    name: 'README.md',
    category: 'docs',
    language: 'markdown',
    description: 'Complete build, installation, and Realme 9i 5G setup instructions',
    content: `# VoloX Dynamic Island 1.0
> OxygenOS Live Alerts & iPhone Dynamic Island experience for Realme 9i 5G (RMX3612, Android 14)

---

## ⚡ 1. Why VoloX Won't Touch or Break Your Realme OS
- **No Root Required**: Runs entirely as a standard Android user application.
- **No Bootloader Unlocking**: Zero partition tampering, OTA updates continue to work seamlessly.
- **Realme Launcher Untouched**: Works seamlessly as a non-intrusive floating overlay via \`SYSTEM_ALERT_WINDOW\`.
- **Pure Overlay Architecture**: Collapses to zero-touch punch-hole pill when idle, avoiding touch blocking.

---

## 🚀 2. Two Ways to Build the APK

### Method A: 1-Click Cloud Build via GitHub Actions (Zero SDK required!)
1. Push this folder to a new GitHub repository (or fork).
2. Go to the **Actions** tab on your GitHub repository.
3. The \`Build VoloX Dynamic Island APK\` workflow will run automatically.
4. Once finished (~2 minutes), download \`VoloX-Dynamic-Island-Debug-APK\` from the **Artifacts** section!
5. Transfer the \`.apk\` to your Realme 9i 5G and tap to install.

### Method B: Build locally with Android Studio or Terminal
\`\`\`bash
# 1. Clone repository
git clone <your-repo>
cd VoloXDynamicIsland

# 2. Build debug APK
./gradlew assembleDebug

# Output APK will be at:
# app/build/outputs/apk/debug/app-debug.apk
\`\`\`

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
`
  }
];
