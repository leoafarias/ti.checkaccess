# ti.checkaccess
Small utility to check iOS and Android API permissions, and access.

### Support:
Ti.SDK 5.2.0+
There have been a lot of API changes after 5.2.0

## Specs
Ability to check the following permissions on OS
- Network
- Notification
- X Camera
- Microphone
- Photo Gallery
- Location
- Contacts
- Calendar
- Storage

### Network
Titanium.Network.online:Boolean		 +Add implementation example
 - Boolean value indicating if the device can reach the Internet.		
 - Implement Ti.Network.networkType to give visibility of what is the connection type.		
 - The online property is true if the device can currently reach the Internet using either WiFi, mobile network or LAN.

### Notification
Ti.Network.remoteNotificatoinsEnabled:Boolean
Indicates whether push notifications have been enabled using registerForPushNotifications.
only iOS support

### Camera
-Ti.Media.hasCameraPermissions():Boolean		 +Add implementation example
 -Returns *true* if the app has camera access		
 -Android and iOS support
 
### Microphone
Ti.Media.requestAuthorization(*callback*)
Request the user's permission for audio recording
iOS only

### Location Application
Ti.Geolocation.hasLocationPermissions(*authorizationType*):Boolean
Returns *true* if the app has location access
authorizationType:Number, For iOS 8+ you can assign AUTHORIZATION_ALWAYS or AUTHORIZATION_WHEN_IN_USE

### Location Services 
Ti.Geolocation.locationServicesEnabled:Boolean
ndicates if the user has enabled or disabled location services for the device (not the application).

This method returns true if any location provider is enabled.

On Android OS 2.2 and above, there is a new, "passive" location provider that is enabled at all times, even when the user disables both the GPS and Network location providers. Therefore, this method always returns true on these devices

### Contacts
Ti.Contacts.hasContactsPermissions():Boolean
- Returns *true* if the app has contact access
- Android and iOS support

### Calendar
Ti.Calendar.hasCalendarPermissions():Boolean
 - Returns *true* if the app has calendar access
 - Android and iOS support

### Storage
Ti.Filesystem.hasStoragePermissions():Boolean
 - Returns *true* if the app ahs storage permissions
 - Android support
