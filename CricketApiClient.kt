package com.volox.dynamicisland.data

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
