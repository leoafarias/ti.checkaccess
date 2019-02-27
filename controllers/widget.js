var check = require(WPATH('checkAccess')).check;

function checkAll(e){

	var _types = ['network','camera', 'calendar', 'contacts', 'geolocation'];
	var _results = check.permissions(_types);

	_.each(_results, function(type){

		handleReturn ( type.permission, type );

	});

}

function doCheck(e){
	
	console.log(e.source.id);
	var result = check[e.source.id]();
	handleReturn ( e.source.id, result );

}

function handleReturn(elem, result){
	
	var _elem = elem;
	var _label = elem + '_label';
	
	
	if(result && result.access){
		
		$[_elem].applyProperties({
			backgroundColor: '#3ca5c5',
			color: '#fff'
		});
		
		$[_label].applyProperties({
			text: '\ue900',
			color: '#fff'
		});
		
	} else {

		$[_elem].applyProperties({
			backgroundColor: '#fff',
			color: '#3ca5c5'
		});

	}
}

$.permissionView.open();

checkAll();