package com.volox.dynamicisland.data

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
