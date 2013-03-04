angular.module('institute', []).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.
		when('/home', {templateUrl: 'partials/site/main.html', controller:mainCtrl}).
		when('/account/create', {templateUrl: 'partials/account/create.html', controller:formCtrl}).

		otherwise({redirectTo: '/home'});
}]);

/*		when('/list:sni', {templateUrl: 'partials/list.html',   controller: listCtrl}).
		when('/map:sni', {templateUrl: 'partials/map.html',   controller: mapCtrl}).
		when('/report:sni', {templateUrl: 'partials/report.html',   controller: reportCtrl}).
		when('/message:sni', {templateUrl: 'partials/message.html',   controller: messageCtrl}).
		when('/student:studentId', {templateUrl: 'partials/student/view.html',   controller: stuCtrl}).
		when('/student/add', {templateUrl: 'partials/student/add.html',   controller: stuCtrl}).
		when('/student/edit', {templateUrl: 'partials/student/edit.html',   controller: stuCtrl}).
		when('/student/delete', {templateUrl: 'partials/student/delete.html',   controller: stuCtrl}).

		when('/account', {templateUrl: 'partials/account/view.html',   controller: actCtrl}).
		when('/account/create', {templateUrl: 'partials/account/create.html',   controller: actCtrl}).
		when('/account/login', {templateUrl: 'partials/account/login.html',   controller: actCtrl}).
		when('/account/logout', {templateUrl: 'partials/account/logout.html',   controller: actCtrl}).
		when('/account/delete', {templateUrl: 'partials/account/delete.html',   controller: actCtrl}).*/