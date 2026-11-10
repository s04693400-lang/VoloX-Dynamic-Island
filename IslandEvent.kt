package com.volox.dynamicisland.model

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
