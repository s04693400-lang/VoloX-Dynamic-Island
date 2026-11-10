package com.volox.dynamicisland

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
