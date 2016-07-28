var check = require('checkAccess').check;

function checkAll(e){
	var _types = ['network','camera', 'calendar', 'contacts', 'geolocation'];
	var _results = check.permissions(_types);

	_.each(_results, function(type){
		handleReturn(type.permission, type);
	});
}

function doCheck(e){
	var result = check[e.source.id]();
	handleReturn(e.source.id, result);
}

function handleReturn(elem, result){
	
	
	if(result && result.access){
		$[elem].applyProperties({
			backgroundColor: '#006400'
		});
	} else {
		$[elem].applyProperties({
			backgroundColor: '#8b0000'
		});
	}
}

/**
 * Event Handler
 */

function onRequestPermissionSwitch(e){
	check.requestPermission = e.value;
	console.log(e.value);
}

$.index.open();

checkAll();