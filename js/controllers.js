cp={};

function actCtrl($scope, $routeParams) {
	$scope.it=it;
}
function mainCtrl($scope, $routParams){
	$scope.it=it;
}

function formCtrl($scope, $routParams){
	console.log('hi from formCtrl');
	$scope.submit = function() {
		console.log('hi from formCtrl.submit');
	};
	
	/*
	var newObj = StackMob.Model.extend({ schemaName: 'todo' });
	// completed will be a boolean field if it's not created already
	var myTodo = new Todo({ title: 'Send Data to StackMob!', priority: 1, completed: true });
	myTodo.create();
	*/
}