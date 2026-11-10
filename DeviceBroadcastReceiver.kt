package com.volox.dynamicisland.service

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
                    subtitle = "$level% • Fast Charging 18W",
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
                        subtitle = "Audio routed to $name",
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
