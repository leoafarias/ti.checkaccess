var _isAndroid = Ti.Platform.osname === 'android';

var DIALOG_TYPE = {
	network : 0,
	camera :1,
	calendar: 2,
	contacts: 3,
	storage: 4,
	geolocation: 5
};

exports.SETTINGS_TYPE = DIALOG_TYPE;

var getActionByType = function(settingsType){
	if(settingsType === DIALOG_TYPE.network){
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