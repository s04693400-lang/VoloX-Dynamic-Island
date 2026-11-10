#!/usr/bin/env sh
# Gradle wrapper script for VoloX Dynamic Island 1.0
APP_BASE_NAME=`basename "$0"`
CLASSPATH=gradle/wrapper/gradle-wrapper.jar
exec "$JAVACMD" "-Dorg.gradle.appname=$APP_BASE_NAME" -classpath "$CLASSPATH" org.gradle.wrapper.GradleWrapperMain "$@"
