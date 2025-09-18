{
  "expo": {
    "name": "Trevi",
    "slug": "trevi",
    "version": "1.0.2",
    "scheme": "trevi",
    "orientation": "portrait",
    "userInterfaceStyle": "light",
    "icon": "./src/Assets/Images/icon.png",
    "splash": {
      "image": "./src/Assets/trevi-splash.png",
      "resizeMode": "cover",
      "backgroundColor": "#E6DAF5"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": ["**/*"],
    "jsEngine": "jsc",
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "com.amandatreviapp.trevi",
      "infoPlist": {
        "ITSAppUsesNonExemptEncryption": false,
        "NSCameraUsageDescription": "Trevi needs camera access so donors can attach a photo with their gift.",
        "NSPhotoLibraryUsageDescription": "Trevi needs photo library access so donors can choose a photo to include with their gift.",
        "NSPhotoLibraryAddUsageDescription": "Trevi may save the photo you choose to include with your gift."
      },
      "buildNumber": "1.0.2",
      "deploymentTarget": "12.0",
      "splash": {
        "backgroundColor": "#ffffff",
        "resizeMode": "contain"
      }
    },
    "plugins": ["expo-font"],
    "extra": {
      "eas": {
        "projectId": "589e2861-59b7-4fa3-bf31-93de216d73b0"
      }
    },
    "android": {
      "package": "com.amandatreviapp.trevi",
      "versionCode": 3,
      "splash": {
        "image": "./src/Assets/trevi-splash.png",
        "resizeMode": "cover",
        "backgroundColor": "#E6DAF5"
      },
      "adaptiveIcon": {
        "backgroundColor": "#E6DAF5"
      },
      "intentFilters": [
        {
          "action": "VIEW",
          "category": ["BROWSABLE", "DEFAULT"],
          "data": [
            {
              "scheme": "trevi"
            }
          ]
        }
      ]
    }
  }
}
