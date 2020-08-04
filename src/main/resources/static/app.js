(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngCookies'])
        .config(config)
        .directive('focusMe', function($timeout) {
			return function(scope, element, attrs) {
				scope.$watch(attrs.focusMe, function(value) {
					if (value) {
						$timeout(function() {
							element.focus();
						}, 200);
					}
				});
			};
		});
        
    config.$inject = ['$stateProvider', '$urlRouterProvider','$qProvider'];
    function config($stateProvider, $urlRouterProvider,$qProvider) {
    	$qProvider.errorOnUnhandledRejections(false);
        $stateProvider
            .state('list', {
            	url:'/list',
                controller: 'ListController',
                templateUrl: '/list/list.view.html',
                controllerAs: 'vm'
            })
            .state('add', {
            	url:'/add',
                controller: 'AddController',
                templateUrl: 'add/add.view.html',
                controllerAs: 'vm'
            })
            .state('update', {
            	url:'/update',
            	params: {
                    vehicleId: null
                },
                controller: 'UpdateController',
                templateUrl: 'update/update.view.html',
                controllerAs: 'vm'
            })
        $urlRouterProvider.otherwise('/list');
    }

})();