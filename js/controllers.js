function mainCtrl($scope){
	$scope.it=it;
}

function formCtrl($scope, $element){
	it.scope=$scope;
	$scope.submit = function() {
		var form = angular.element($element);
		it.form=$(form).serializeObject();
		var schema = $(form).data('schema');
		var callback = $(form).data('callback');

		var obj = StackMob.Model.extend({ schemaName: schema });
		// completed will be a boolean field if it's not created already
		var newObj = new obj(it.form);
		newObj.create({
			success: function(model, response) {
				if(callback!=undefined)
					callback(response);
				else
					it.message.wisper('alert-success', schema+' created successfully.');
			},
			error: function(model, response) {
				it.error.push(response);
				it.message.wisper('alert-error', response.error);
			}
		});
	};
}