cp={};

function actCtrl($scope, $routeParams) {
	$scope.it=it;
}
function mainCtrl($scope, $routParams){
	$scope.it=it;
}

function formCtrl($scope, $rout, $routParams){
	console.log('hi from formCtrl');
		cp.scope=$scope;
		cp.rout=$rout;
		cp.routParams=$routParams;
		console.log($scope.valueOf());
		console.log($rout.valueOf());
		console.log($routParams.valueOf());
	$scope.submit = function() {
		console.log($scope);
		console.log($routParams.valueOf());
	};
	
	/*
	var newObj = StackMob.Model.extend({ schemaName: 'todo' });
	// completed will be a boolean field if it's not created already
	var myTodo = new Todo({ title: 'Send Data to StackMob!', priority: 1, completed: true });
	myTodo.create();
	*/
}