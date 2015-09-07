"use strict";
angular.module('filesBrowser')
.directive('preview', ['files', function (files) {
    return {
        restrict: 'E',
        scope: {
            file: '=file'
        },
        templateUrl: 'partials/templates/file-preview.tpl.html',
        link: function (scope, elem, attr) {
            scope.type = files.getFileType(scope.file.name);
        }
    }
}]);