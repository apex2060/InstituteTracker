function mainCtrl($scope){
	$scope.it=it;
}

function formCtrl($scope){
	console.log(JSON.stringify($scope));
	$scope.submit = function() {
		it.form=$(form).serializeObject();
		var schema = $(form).data('schema');
		var obj = StackMob.Model.extend({ schemaName: schema });
		// completed will be a boolean field if it's not created already
		var newObj = new obj(it.form);
		newObj.create();
	};
}