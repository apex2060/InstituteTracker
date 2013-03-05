function mainCtrl($scope){
	$scope.it=it;
}

function formCtrl($scope, $element){
	it.scope=$scope;
	$scope.submit = function() {
		var form = angular.element($element);
		it.form=$(form).serializeObject();
		var schema = $(form).data('schema');
		var obj = StackMob.Model.extend({ schemaName: schema });
		// completed will be a boolean field if it's not created already
		var newObj = new obj(it.form);
		newObj.create({
			success: function(model, response) {
				console.debug('Created:');
				console.debug(model);
				console.debug(response);
				it.message.wisper('alert-success', response);
			},
			error: function(model, response) {
				it.error.push(response);
				it.message.wisper('alert-error', response.error[0].error);
			}
		});
	};
}