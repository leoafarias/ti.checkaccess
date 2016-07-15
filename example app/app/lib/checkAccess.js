
/**
 * Init permission check
 *
 * @param {array} type - Array with all the permissions would like to check.
 * @param {boolean} requestPermission - Flag to trigger the requestPermission for the permission type
 * @param {boolean} editPermission - Flag to trigger editPermission functionality
 * @return {object} - With all the permissions
*/

function Check(options){
    if(!options){
        options = {};
        // TODO: Remove this options check later
    }
    _.defaults(options, {
        type: false,
        requestPermission: false,
        editPermission: false
    });

    if(!_.isArray(options.type)){
        console.error('Type passed during Check() is invalid');
        return;
    }

    this.type = options.type;
    this.requestPermission = options.requestPermission;
    this.editPermission = options.editPermission;

    // TODO:  - created check method for all the permissions
};

Check.prototype.network = function(){
    var _hasNetworkConnection = Ti.Network.online;
    var _networkType = Ti.Network.networkType;
    var _detail;

    if (_networkType === Ti.Network.NETWORK_MOBILE) {
        _detail = 'Device is communicating over a mobile network';
        console.log('ti.checkAccess => ' + _detail);
    } else if( _networkType === Ti.Network.NETWORK_WIFI ){
        _detail = 'Device is communicating over a wifi network';
        console.log('ti.checkAccess => ' + _detail);
    } else if( _networkType === Ti.Network.NETWORK_NONE ){
        _detail = 'No network is available';
        console.log('ti.checkAccess => ' + _detail);
    }

    return result(_hasNetworkConnection, _detail);
};

Check.prototype.camera = function(){
    var _hasCameraPermissions = Ti.Media.hasCameraPermissions();
    var _detail;

    if (_hasCameraPermissions) {
        _detail = 'You already have permission';
        console.log(_detail);
        return result(_hasCameraPermissions, _detail);
    }

    if (OS_IOS) {
        var cameraAuthorizationStatus = Ti.Media.cameraAuthorizationStatus;

        if (cameraAuthorizationStatus === Ti.Media.CAMERA_AUTHORIZATION_RESTRICTED) {
			_detail = 'Permission are restricted by some policy. Requesting again might cause issues.';
            console.warn('ti.checkAccess => ' + _detail);
		} else if (cameraAuthorizationStatus === Ti.Media.CAMERA_AUTHORIZATION_DENIED) {
            _detail = 'Permission has been denied before.';
            console.warn('ti.checkAccess =>  ' + _detail);
        }
    }

    //if we dont have to request permission
    if(requestPermission){
        //Before you request permission on android make sure you have this set on tiapp.xml
        // <android xmlns:android="http://schemas.android.com/apk/res/android">
        //     <manifest>
        //         <uses-permission android:name="android.permission.CAMERA" />
        //     </manifest>
        // </android>

        Ti.Media.requestCameraPermissions(function(e){
            if(e.success){
                _detail = 'You granted permission';
                console.log('ti.checkAccess => ' + _detail);
            }  else {
                _detail = 'You denied permission';
                console.warn('ti.checkAccess => ' + _detail);
            }
        });
    }

     _hasCameraPermissions = Ti.Media.hasCameraPermissions();
    return result(_hasCameraPermissions, _detail);
}

Check.prototype.calendar = function(){
    var _hasCalendarPermissions = Ti.Calendar.hasCalendarPermissions();
    var _detail;

    if (_hasCalendarPermissions) {
        _detail = 'You already have permission';
        console.log(_detail);
        return result(_hasCalendarPermissions, _detail);
    }

    if (OS_IOS) {
	
		var eventsAuthorization = Ti.Calendar.eventsAuthorization;

		if (eventsAuthorization === Ti.Calendar.AUTHORIZATION_RESTRICTED) {
           _detail = 'Permission are restricted by some policy. Requesting again might cause issues.';
            console.warn('ti.checkAccess => ' + _detail);

		} else if (eventsAuthorization === Ti.Calendar.AUTHORIZATION_DENIED) {
            _detail = 'Permission has been denied before.';
            console.warn('ti.checkAccess =>  ' + _detail);
		}
	}

    if(requestPermission){
        Ti.Calendar.requestCalendarPermissions(function(e) {

            if (e.success) {

                _detail = 'You granted calendar permission.';

            } else if (OS_ANDROID) {
                _detail = 'You don\'t have the required uses-permissions in tiapp.xml or you denied calendar permission for now, forever or the dialog did not show at all because you denied forever before.';

            } else {
                _detail = 'You denied calendar permission.';
            }
        });
    }

    _hasCalendarPermissions = Ti.Calendar.hasCalendarPermissions();
    return result(_hasCalendarPermissions, _detail);
}

Check.prototype.contacts = function(){
    var _hasContactsPermissions = Ti.Contacts.hasContactsPermissions();
    var _detail;

    if (_hasContactsPermissions) {
        _detail = 'You already have permission';
        console.log(_detail);
        return result(_hasContactsPermissions, _detail);
    }

    if (OS_IOS) {
	
        var _contactsAuthorization = Ti.Contacts.contactsAuthorization;

        if (_contactsAuthorization === Ti.Contacts.AUTHORIZATION_RESTRICTED) {
            _detail = 'Permission are restricted by some policy. Requesting again might cause issues.';
            console.warn('ti.checkAccess => ' + _detail);

        } else if (_contactsAuthorization === Ti.Contacts.AUTHORIZATION_DENIED) {
            _detail = 'Permission has been denied before.';
            console.warn('ti.checkAccess =>  ' + _detail);
        }
    }

    if(requestPermission){
        Ti.Contacts.requestContactsPermissions(function(e) {

            if (e.success) {

                _detail = 'You granted contacts permission.';

            } else if (OS_ANDROID) {
                _detail = 'You don\'t have the required uses-permissions in tiapp.xml or you denied contacts permission for now, forever or the dialog did not show at all because you denied forever before.';

            } else {
                _detail = 'You denied contact permission.';
            }

        });
    }

    _hasContactsPermissions = Ti.Contacts.hasContactsPermissions();
    return result(_hasContactsPermissions, _detail);

}

Check.prototype.storage = function(){

    if (!OS_ANDROID) {
        console.error('ti.checkAccess => This is storage method is only available on Android');
    }
    
    var _hasStoragePermission = Ti.Filesystem.hasStoragePermissions();
    if (_hasStoragePermission) {
		 _detail = 'You already have permission';
        console.log(_detail);
        return result(_hasStoragePermission, _detail);
	}

    if(requestPermission){
        Ti.Filesystem.requestStoragePermissions(function(e){
             if (e.success) {
                _detail = 'You granted location permission.';
            } else {
                _detail = 'You denied location permission.';
            }
        });
    }

    _hasStoragePermission = Ti.Filesystem.hasStoragePermissions();
    return result(_hasStoragePermission, _detail);
}

Check.prototype.geolocation = function(){
    var _hasLocationPermissions = Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS);

    if (_hasLocationPermissions) {
		 _detail = 'You already have permission';
        console.log(_detail);
        return result(_hasLocationPermissions, _detail);
	}

    if (OS_IOS) {

		var _locationServicesAuthorization = Ti.Geolocation.locationServicesAuthorization;


		if (_locationServicesAuthorization === Ti.Geolocation.AUTHORIZATION_RESTRICTED) {
			_detail = 'Permission are restricted by some policy. Requesting again might cause issues.';
            console.warn('ti.checkAccess => ' + _detail);
		} else if (_locationServicesAuthorization === Ti.Geolocation.AUTHORIZATION_DENIED) {
            _detail = 'Permission has been denied before.';
            console.warn('ti.checkAccess =>  ' + _detail);
		}
	}

    Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS, function(e) {
	
        if (e.success) {

            _detail = 'You granted location permission.';

        } else if (OS_ANDROID) {
            _detail = 'You don\'t have the required uses-permissions in tiapp.xml or you denied location permission for now, forever or the dialog did not show at all because you denied forever before.';

        } else {
            _detail = 'You denied location permission.';
        }
	
	});

    _hasLocationPermissions = Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS);
    return result(_hasLocationPermissions, _detail);

}

function result(value, detail){
    //if (editPermission) goToSettings();

    alert('ti.checkaccess => ' + value + '\n ' + detail);
    console.log('ti.checkaccess => ' + value + '\n ' + detail);

    return {
        "permission": value,
        "detail": detail
    };
}

function goToSettings(e){
    if (OS_IOS) {
		Ti.Platform.openURL(Ti.App.iOS.applicationOpenSettingsURL);
	}

	if (OS_ANDROID) {
		var intent = Ti.Android.createIntent({
			action: 'android.settings.APPLICATION_SETTINGS'
		});
		intent.addFlags(Ti.Android.FLAG_ACTIVITY_NEW_TASK);
		Ti.Android.currentActivity.startActivity(intent);
	}
}

exports.check = new Check();