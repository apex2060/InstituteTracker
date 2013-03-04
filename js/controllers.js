function mainCtrl($scope){
	$scope.it=it;
}

function formCtrl($scope){
	console.log('hi from formCtrl');
	$scope.submit = function() {
		console.log('hi from formCtrl.submit');
	};
}