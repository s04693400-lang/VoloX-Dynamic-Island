package com.volox.dynamicisland.service

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
