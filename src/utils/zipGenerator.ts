import JSZip from 'jszip';
import { ANDROID_PROJECT_FILES } from '../android-project/sourceFiles';

export async function generateProjectZip(onProgress?: (percent: number, file: string) => void): Promise<Blob> {
  const zip = new JSZip();
  const root = zip.folder('VoloXDynamicIsland');

  if (!root) {
    throw new Error('Failed to create zip folder');
  }

  // Add standard Gradle wrapper scripts
  root.file('gradlew', `#!/usr/bin/env sh
# Gradle wrapper script for VoloX Dynamic Island 1.0
APP_BASE_NAME=\`basename "\$0"\`
CLASSPATH=gradle/wrapper/gradle-wrapper.jar
exec "\$JAVACMD" "-Dorg.gradle.appname=\$APP_BASE_NAME" -classpath "\$CLASSPATH" org.gradle.wrapper.GradleWrapperMain "\$@"
`, { unixPermissions: '755' });

  root.file('gradlew.bat', `@rem Gradle wrapper batch script for Windows
@if "%DEBUG%" == "" @echo off
set DIRNAME=%~dp0
set CLASSPATH=%DIRNAME%gradle\\wrapper\\gradle-wrapper.jar
"%JAVA_EXE%" %DEFAULT_JVM_OPTS% %JAVA_OPTS% -classpath "%CLASSPATH%" org.gradle.wrapper.GradleWrapperMain %*
`);

  root.file('gradle/wrapper/gradle-wrapper.properties', `distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\\://services.gradle.org/distributions/gradle-8.5-bin.zip
networkTimeout=10000
validateDistributionUrl=true
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
`);

  // Add gitignore for Android
  root.file('.gitignore', `*.iml
.gradle
/local.properties
/.idea/caches
/.idea/libraries
/.idea/modules.xml
/.idea/workspace.xml
/.idea/navEditor.xml
/.idea/assetWizardSettings.xml
.DS_Store
/build
/captures
.externalNativeBuild
.cxx
local.properties
app/build/
`);

  // Add all Android project source files
  const total = ANDROID_PROJECT_FILES.length;
  for (let i = 0; i < total; i++) {
    const file = ANDROID_PROJECT_FILES[i];
    root.file(file.path, file.content);
    if (onProgress) {
      onProgress(Math.round(((i + 1) / total) * 100), file.name);
    }
  }

  return await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 }
  });
}
