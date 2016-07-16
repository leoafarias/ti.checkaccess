var _isAndroid = Ti.Platform.osname === 'android';

var DIALOG_TYPE = {
	NETWORK : 0,
	LOCATION_SERVICES :1
};

exports.SETTINGS_TYPE = DIALOG_TYPE;

var getActionByType = function(settingsType){
	if(settingsType ===DIALOG_TYPE.NETWORK){
		return "android.settings.WIRELESS_SETTINGS";
	}else{
		return "android.settings.LOCATION_SOURCE_SETTINGS";
	}
};

exports.prompt = function(args, callback){
	
	if(!args.hasOwnProperty("settingsType")){
		throw "settingsType property is required";
	}
	if(!args.hasOwnProperty("settingsIndex")){
		throw "settingsIndex property is required";
	}
	
	var ew = Ti.UI.createAlertDialog(args);	
	
	ew.addEventListener("click",function(e){
		e.settingsSelected = (e.index == args.settingsIndex);
		if(e.settingsSelected){
			if(_isAndroid){
				var actionType = getActionByType(args.settingsType);
				var intent = Ti.Android.createIntent({action: actionType});
				Ti.Android.currentActivity.startActivity(intent);
			}else{
				Ti.Platform.openURL(Ti.App.iOS.applicationOpenSettingsURL);	
			}
		}
		return callback(e);
	});
	ew.show();						
};