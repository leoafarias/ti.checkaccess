var editPermission = false;
var requestPermission = false;

function Check(options){

    this.setOptions(options);
    
}

/**
 * Check permissions
 *
 * @param {array} types - Array with all the permissions would like to check.
 * @return {object} - With all the permissions
*/

Check.prototype.permissions = function(types, callback ){
    
    var _this = this;

    if( types && !_.isArray(types)){
        console.error('ti.checkAccess => Options "type" is not a valid array');
        return;
    }   
	
	// Sets options for bulk calls
	var _options = {
		requestPermission: false,
		editPermission: false
	};

    _this.setOptions(_options);

    var _result = {};
    
    _.each(types, function(type){
         if(_.isFunction(_this[type])){
            _result[type] = _this[type]();
         } else {
             console.error('ti.checkAccess => Invalid value passed in the array options');
         }
    });

    if(callback) callback(_result);
    return _result;

};

Check.prototype.network = function(callback){
	
	var _callee = 'network';
    var _hasAccess = Ti.Network.online;
    var _networkType = Ti.Network.networkType;
    var _reason;

    if (_networkType === Ti.Network.NETWORK_MOBILE) {
        _reason = 'Device is communicating over a mobile network';
        
    } else if( _networkType === Ti.Network.NETWORK_WIFI ){
        _reason = 'Device is communicating over a wifi network';
        
    } else if( _networkType === Ti.Network.NETWORK_NONE ){
        _reason = 'No network is available';
        
    }
    
    return result(_callee, _hasAccess, _reason, callback);
};

Check.prototype.camera = function(callback){
	
	var _callee = 'camera';
    var _hasAccess = Ti.Media.hasCameraPermissions();
    var _reason;

    if (_hasAccess) {
        _reason = 'You already have permission';
        return result(_callee, _hasAccess, _reason, callback);
    }

    if (OS_IOS) {
        var cameraAuthorizationStatus = Ti.Media.cameraAuthorization;

        if (cameraAuthorizationStatus === Ti.Media.CAMERA_AUTHORIZATION_RESTRICTED) {
			_reason = 'Permission are restricted by some policy. Requesting again might cause issues.';
		} else if (cameraAuthorizationStatus === Ti.Media.CAMERA_AUTHORIZATION_DENIED) {
            _reason = 'Permission has been denied before.';
        }
    }

    //if we dont have to request permission
    if(this.requestPermission){
        //Before you request permission on android make sure you have this set on tiapp.xml
        // <android xmlns:android="http://schemas.android.com/apk/res/android">
        //     <manifest>
        //         <uses-permission android:name="android.permission.CAMERA" />
        //     </manifest>
        // </android>

        Ti.Media.requestCameraPermissions(function(e){
            if(e.success){
                _reason = 'You granted permission';
            }  else {
                _reason = 'You denied permission';
            }
        });
    }

    _hasAccess = Ti.Media.hasCameraPermissions();
    return result(_callee, _hasAccess, _reason, callback);
};

Check.prototype.calendar = function(callback){
	
	var _callee = 'calendar';
    var _hasAccess = Ti.Calendar.hasCalendarPermissions();
    var _reason;

    if (_hasAccess) {
        _reason = 'You already have permission';
        return result(_callee, _hasAccess, _reason, callback);
    }

    if (OS_IOS) {
	
		var eventsAuthorization = Ti.Calendar.calendarAuthorization;

		if (eventsAuthorization === Ti.Calendar.AUTHORIZATION_RESTRICTED) {
           _reason = 'Permission are restricted by some policy. Requesting again might cause issues.';

		} else if (eventsAuthorization === Ti.Calendar.AUTHORIZATION_DENIED) {
            _reason = 'Permission has been denied before.';  
		}
	}

    if(this.requestPermission){
        Ti.Calendar.requestCalendarPermissions(function(e) {

            if (e.success) {
                _reason = 'You granted calendar permission.';

            } else if (OS_ANDROID) {
                _reason = 'You don\'t have the required uses-permissions in tiapp.xml or you denied calendar permission for now, forever or the dialog did not show at all because you denied forever before.';

            } else {
                _reason = 'You denied calendar permission.';
            }
        });
    }

    _hasAccess = Ti.Calendar.hasCalendarPermissions();
    return result(_callee, _hasAccess, _reason, callback);
};

Check.prototype.contacts = function(callback){
	
	var _callee = 'contacts';
    var _hasAccess = Ti.Contacts.hasContactsPermissions();
    var _reason;

    if (_hasAccess) {
        _reason = 'You already have permission';
        return result(_callee, _hasAccess, _reason, callback);
    }

    if (OS_IOS) {
	
        var _contactsAuthorization = Ti.Contacts.contactsAuthorization;

        if (_contactsAuthorization === Ti.Contacts.AUTHORIZATION_RESTRICTED) {
            _reason = 'Permission are restricted by some policy. Requesting again might cause issues.'; 

        } else if (_contactsAuthorization === Ti.Contacts.AUTHORIZATION_DENIED) {
            _reason = 'Permission has been denied before.';
        }
    }

    if(this.requestPermission){
        Ti.Contacts.requestContactsPermissions(function(e) {

            if (e.success) {
                _reason = 'You granted contacts permission.';

            } else if (OS_ANDROID) {
                _reason = 'You don\'t have the required uses-permissions in tiapp.xml or you denied contacts permission for now, forever or the dialog did not show at all because you denied forever before.';

            } else {
                _reason = 'You denied contact permission.';
            }

        });
    }

    _hasAccess = Ti.Contacts.hasContactsPermissions();
    return result(_callee, _hasAccess, _reason, callback);

};

Check.prototype.storage = function(callback){
    
    if (!OS_ANDROID) {
        console.error('ti.checkAccess => This is storage method is only available on Android');
        return;
    }
    
    var _callee = 'storage';
    var _hasAccess = Ti.Filesystem.hasStoragePermissions();
    if (_hasAccess) {
		 _reason = 'You already have storage';
        return result(_callee, _hasAccess, _reason, callback);
	}

    if(this.requestPermission){
        Ti.Filesystem.requestStoragePermissions(function(e){
             if (e.success) {
                _reason = 'You granted storage permission.';
            } else {
                _reason = 'You denied storage permission.';
            }
        });
    }

    _hasAccess = Ti.Filesystem.hasStoragePermissions();
    return result(_callee, _hasAccess, _reason, callback);
};

Check.prototype.geolocation = function(callback){

    // TODO: Check for always and while in use geolocation
    var _callee = 'geolocation';
    var _hasAccess = Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS);
    var _reason;

    if (_hasAccess) {
		 _reason = 'You already have permission';
        return result(_callee, _hasAccess, _reason, callback);
	}

    if (OS_IOS) {

		var _locationServicesAuthorization = Ti.Geolocation.locationServicesAuthorization;


		if (_locationServicesAuthorization === Ti.Geolocation.AUTHORIZATION_RESTRICTED) {
			_reason = 'Permission are restricted by some policy. Requesting again might cause issues.';
		} else if (_locationServicesAuthorization === Ti.Geolocation.AUTHORIZATION_DENIED) {
            _reason = 'Permission has been denied before.';
		}
	}

    if(this.requestPermission){

        Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS, function(e) {
        
            if (e.success) {

                _reason = 'You granted location permission.';

            } else if (OS_ANDROID) {
                _reason = 'You don\'t have the required uses-permissions in tiapp.xml or you denied location permission for now, forever or the dialog did not show at all because you denied forever before.';

            } else {
                _reason = 'You denied location permission.';
            }
        
        }); 

    }

    _hasAccess = Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS);
    return result(_callee, _hasAccess, _reason, callback);

};

Check.prototype.setOptions = function(options){
    if(!options){
       console.log('ti.checkAccess => No options were set on setOptions method.');
       return;
    }
    
    _.defaults(options, {
        requestPermission: false,
        editPermission: true
    });
    
    this.requestPermission = options.requestPermission;
    this.editPermission = options.editPermission;

    editPermission = this.editPermission;
    requestPermission = this.requestPermission;
	
};

Check.prototype.getOptions = function(){
	return {
		requestPermission: this.requestPermission,
		editPermission: this.editPermission
	};
};

function result(type, value, reason, callback){
	
    if(!editPermission && value){

        var alertSettings = require("settingsDialog");

        alertSettings.prompt({
            title:"Information", 
            message:"We can't find a network connection. Please check your settings.",
            buttonNames:["Settings", "Continue"],
            settingsType : alertSettings.SETTINGS_TYPE[type], //The type of prompt 
            settingsIndex : 0 //What button index should launch the settings
        }, function(d){
            console.log("prompt results = " + JSON.stringify(d));
        });

    }
    
    var _result = {
        "permission": type,
        "access": value,
        "reason": reason
    };
    
    if(callback) callback(_result);
	console.error(_result);
    return _result;
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