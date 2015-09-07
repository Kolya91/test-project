"use strict";
angular.module('filesBrowser')
.controller('FilesCtrl', ['$scope', '$route', 'files', 'dialogs', '$location', function ($scope, $route, files, dialogs, $location) {
    var _defaultDir = '/';
    var _routeParams = $route.current.params;

    var initialization = function () {
        $scope.dir = _routeParams.dir || _defaultDir;
        $scope.orderBy = _routeParams.orderBy || 'name';
        $scope.direction = _routeParams.direction || 'asc';
        $scope.parentDir = null;
        $scope.goToDirectory($scope.dir);
        _setURIParams();
    }

    var _setURIParams = function () {
        if (!_routeParams.dir) {
            _routeParams.dir = $scope.dir;
        }
        if (!_routeParams.orderBy) {
            _routeParams.orderBy = $scope.orderBy;
        }
        if (!_routeParams.direction) {
            _routeParams.direction = $scope.direction;
        }
        $route.updateParams(_routeParams);
    }

    $scope.$on('$routeUpdate', function () {
        _routeParams = $route.current.params;
        if ($scope.dir !== _routeParams.dir) {
            $scope.dir = _routeParams.dir || _defaultDir;
            $scope.goToDirectory($scope.dir);
        }
        if ($scope.orderBy !== _routeParams.orderBy || $scope.direction !== _routeParams.direction) {
            $scope.orderBy = _routeParams.orderBy || 'name';
            $scope.direction = _routeParams.direction || 'asc';
            $scope.files = files.sort($scope.files, $scope.orderBy, $scope.direction);
        }
        _setURIParams();

    });

    $scope.goToDirectory = function (dir) {
        return files.list(dir)
         .then(function (response) {
             $scope.files = files.sort(response, $scope.orderBy, $scope.direction);
             $scope.parentDir = files.getParentDirectory(dir);
             _routeParams.dir = dir;
             $route.updateParams(_routeParams);
         }, function (error) {
             return dialogs.displayMessage(error.message).then(function () {
                 _routeParams.dir = _defaultDir;
                 $route.updateParams(_routeParams);
             });

         });
    }

    $scope.goToFilePage = function (file) {
        $location.path('/preview').search({ filePath: file.name, orderBy: $scope.orderBy, direction: $scope.direction });
    }

    $scope.rename = function (file) {
        return dialogs.rename(file.name)
                .then(function (response) {
                    file.name = response.name;
                });
    }

    $scope.changeSortParams = function (name) {
        _routeParams.direction = (_routeParams.direction.toLowerCase() === 'asc' && _routeParams.orderBy === name) ? 'desc' : 'asc';
        _routeParams.orderBy = name;
        $route.updateParams(_routeParams);
    }

    initialization();

}]);