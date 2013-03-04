function actCtrl($scope, $routeParams) {
	console.log($routeParams);
	$scope.it=it;
}
function mainCtrl($scope, $routParams){
	$scope.it=it;
}

function formCtrl($scope, $routParams){
	$scope.submit = function() {
		console.log($scope);
		console.log($routParams.toJSON());
	};
	
	/*
	var newObj = StackMob.Model.extend({ schemaName: 'todo' });
	// completed will be a boolean field if it's not created already
	var myTodo = new Todo({ title: 'Send Data to StackMob!', priority: 1, completed: true });
	myTodo.create();
	*/
}