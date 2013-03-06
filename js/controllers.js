function mainCtrl($scope){
	$scope.it=it;
}

function formCtrl($scope, $element){
	it.scope=$scope;
	$scope.submit = function() {
		var form = angular.element($element);
		handleForm(form);
	};
}