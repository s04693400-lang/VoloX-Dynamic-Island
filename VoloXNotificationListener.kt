package com.volox.dynamicisland.service

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
