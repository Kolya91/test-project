"use strict";
angular.module('filesBrowser')
.controller('PreviewCtrl', ['$scope', '$route', 'files', 'dialogs', function ($scope, $route, files, dialogs) {
    var _routeParams;

    var initialization = function () {
        _routeParams = $route.current.params;
        $scope.orderBy = _routeParams.orderBy || 'name';
        $scope.direction = _routeParams.direction || 'asc';

        files.list(_routeParams.filePath).then(function (response) {
            $scope.file = _.first(response);
            $scope.fileParentDir = files.getParentDirectory(_routeParams.filePath);
            $scope.fileType = files.getFileType(_routeParams.filePath);
            }, function (error) {
                dialogs.displayMessage(error.message);
            });
    }

    $scope.rename = function (file) {
        return dialogs.rename(file.name)
                .then(function (response) {
                    file.name = response.name;
                });
    }

    initialization();

}]);