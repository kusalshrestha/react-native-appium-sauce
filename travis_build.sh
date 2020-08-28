#!/usr/bin/env bash

TERM=dumb # Don't use any fancy escape sequences / colours, we're on a basic terminal!

# Travis variables
TRAVIS_BRANCH=$1

# Release build variables
RELEASE_BUNDLE_PATH=${TRAVIS_BUILD_DIR}/app/build/outputs/bundle/prodRelease/
RELEASE_KEYSTORE_PATH='app/my-release-key.keystore'
RELEASE_KEYSTORE_PASSWORD=ENV["MYAPP_RELEASE_STORE_PASSWORD"]
RELEASE_KEYSTORE_ALIAS=ENV["MYAPP_RELEASE_KEY_ALIAS"]
RELEASE_KEYSTORE_KEY_PASSWORD=ENV["MYAPP_RELEASE_KEY_PASSWORD"]

function compileAndTestDebugBundle {
    echo "Compiling and testing a debug bundle!"
    ./gradlew app:bundleDebug
}

function convertBundleToApk {
    # Check all necessary arguments have been passed
    if [[ "$#" -eq 5 ]]; then
        echo "Converting bundle to APK!"
    else
        echo "Make sure you pass in a bundle path, and all 4 keystore values!"
        exit 1
    fi

    # Download bundletool
    curl -O -L "https://github.com/google/bundletool/releases/download/0.11.0/bundletool-all-0.11.0.jar"

    # Use bundletool to create universal .apks zip
    java -jar bundletool-all-0.11.0.jar build-apks \
        --mode=universal \
        --bundle=${1}app.aab \
        --output=${1}app.apks \
        --ks=${2} \
        --ks-pass=pass:${3} \
        --ks-key-alias=${4} \
        --key-pass=pass:${5};

    # Unzip .apks zip into /unzipped
    unzip ${1}app.apks -d ${1}unzipped;
}

compileAndTestDebugBundle;
convertBundleToApk ${RELEASE_BUNDLE_PATH} ${RELEASE_KEYSTORE_PATH} ${RELEASE_KEYSTORE_PASSWORD} ${RELEASE_KEYSTORE_ALIAS} ${RELEASE_KEYSTORE_KEY_PASSWORD}
# uploadToDeployGate; # Not covered in this tutorial
