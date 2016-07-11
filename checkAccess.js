var requestPermission;

function check(e){
    requestPermission = e.requestPermission;
    if (e.camera) { camera(); } 
}


function camera(e){
    //check camera permission
    var hasCameraPermissions = Ti.Media.hasCameraPermissions();

    if (OS_IOS) {
        var cameraAuthorizationStatus = Ti.Media.cameraAuthorizationStatus;

        if (cameraAuthorizationStatus === Ti.Media.CAMERA_AUTHORIZATION_RESTRICTED) {
			console.warn('ti.checkAccess =>  Because permission are restricted by some policy which you as user cannot change, we don\'t request as that might also cause issues.');
		} else if (cameraAuthorizationStatus === Ti.Media.CAMERA_AUTHORIZATION_DENIED) {
            console.warn('ti.checkAccess =>  Permission has been denied before.')
        }
    }

    //if we dont have to request permission
    if(!requestPermission){
        return hasCameraPermissions;
    }

    //Before you request permission on android make sure you have this set on tiapp.xml
    // <android xmlns:android="http://schemas.android.com/apk/res/android">
    //     <manifest>
    //         <uses-permission android:name="android.permission.CAMERA" />
    //     </manifest>
    // </android>

    Ti.Media.requestCameraPermissions(function(e){
        if(e.success){
            console.log('ti.checkAccess => You granted permission');
        }  else {
            console.warn('ti.checkAccess => You denied permission');
        }
        return Ti.Media.hasCameraPermissions();
    });
}

exports.check = check;