"use strict";
angular.module('filesBrowser')
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/files', {
            templateUrl: 'partials/files.html',
            controller: 'FilesCtrl',
            reloadOnSearch:false
        })
        .when('/preview', {
            templateUrl: 'partials/preview.html',
            controller: 'PreviewCtrl'
        })
        .otherwise({
            redirectTo: '/files'
        });
}]);
