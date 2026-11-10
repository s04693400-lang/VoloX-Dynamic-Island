package com.volox.dynamicisland.ui

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
