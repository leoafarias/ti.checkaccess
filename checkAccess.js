var requestPermission;
var editPermission;

function check(e){
    requestPermission = e.requestPermission;
    // TO DO - created check method for all the permissions
}

function network(e){
    var _hasNetworkConnection = Titanium.Network.online;
    var _networkType = Ti.Network.networkType;
    var _detail;

    if (_networkType === Ti.Network.NETWORK_MOBILE) {
        _detail = "Device is communicating over a mobile network";
        console.log('ti.checkAccess => ' + _detail);
    } else if( _networkType === Ti.Network.NETWORK_WIFI ){
        _detail = "Device is communicating over a mobile network";
        console.log('ti.checkAccess => ' + _detail);
    } else if( _networkType === Ti.Network.NETWORK_NONE ){
        _detail = "No network is available";
        console.log('ti.checkAccess => ' + _detail);
    }

    return result(_hasNetworkConnection, _detail);
}

function camera(e){

    var _detail;

    if (OS_IOS) {
        var cameraAuthorizationStatus = Ti.Media.cameraAuthorizationStatus;

        if (cameraAuthorizationStatus === Ti.Media.CAMERA_AUTHORIZATION_RESTRICTED) {
			_detail = "Because permission are restricted by some policy which you as user cannot change, we don\'t request as that might also cause issues.";
            console.warn('ti.checkAccess => ' + _detail);
		} else if (cameraAuthorizationStatus === Ti.Media.CAMERA_AUTHORIZATION_DENIED) {
            _detail = "Permission has been denied before.";
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
                _detail = "You granted permission";
                console.log('ti.checkAccess => ' + _detail);
            }  else {
                _detail = "You denied permission";
                console.warn('ti.checkAccess => ' + _detail);
            }
        });
    }

    var _hasCameraPermissions = Ti.Media.hasCameraPermissions();
    return result(_hasCameraPermissions, _detail);
}

function result(value, detail){
    if (editPermission) goToSettings();

    return {
        "permission": value,
        "detail": detail
    }
}

exports.check = check;