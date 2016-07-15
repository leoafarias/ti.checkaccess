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


$.index.open();
q