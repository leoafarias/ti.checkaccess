var check = require('checkAccess').check;

function network(){
	check.network();
}

function camera(){
	check.camera();
}

function calendar(){
	check.calendar();
}

function contacts(){
	check.contacts();
}

function storage(){
	check.storage();
}

function geolocation(){
	check.geolocation();
}

/**
 * Event Handler
 */

function onRequestPermissionSwitch(e){
	check.requestPermission = e.value;
	console.log(e.value);
}

$.index.open();
