"use strict";
angular.module('filesBrowser')
.factory('files', ['$http', '$q', '$location', function ($http, $q, $location) {
    var filesFactory = {};
    var _groupProperty = 'directory';
    var _baseRenameURI = '/api/files/rename';
    var _baseFilesURI = '/api/files?path=';

    var _sortByName = function (item) {
        return item.name;
    }

    var _sortByDateDigits = function (item) {
        var numbersList = item.date.toString();
        var sum = 0;

        for (var i = 0, len = numbersList.length; i < len; i++) {
            sum += Math.sqrt(parseInt(numbersList[i]));
        }

        return sum;
    }

    var _getOrderFunction = function (value) {
        var result;

        switch (value) {
            case 'name':
                result = _sortByName;
                break;
            case 'digitsSum':
                result = _sortByDateDigits;
                break;
            default: result = _sortByName;
        }

        return result;
    }

    filesFactory.list = function (dir) {
        var URI = _baseFilesURI + dir;
        var defer = $q.defer();

        $http.get(URI)
            .then(function (response) {
                defer.resolve(response.data);
            }, function (response) {
                defer.reject(response.data);
            });

        return defer.promise;
    }

    filesFactory.sort = function (list, name, direction) {
        var orderFunction = _getOrderFunction(name);
        var wrappedResult = _.chain(list).sortBy(orderFunction);

        return (direction.toLowerCase() === 'asc')
                ? wrappedResult.sortBy(_groupProperty).value()
                : wrappedResult.reverse().sortBy(_groupProperty).value();
    }

    filesFactory.rename = function (from, to) {
        var URI = _baseRenameURI;
        var defer = $q.defer();

        $http.post(URI, { from: from, to: to })
            .then(function (response) {
                if (typeof response.data === 'object') {
                    defer.resolve(response.data);
                } else {
                    defer.reject(response.data);
                }
            }, function (response) {
                defer.reject(response.data);
            });
        return defer.promise;
    }

    filesFactory.getParentDirectory = function (path) {
        var pathItemsList = path.split('/');
        var parentDirPath = pathItemsList.splice(pathItemsList.length - 2, 1);
        parentDirPath = '/' + parentDirPath.join('/');

        return parentDirPath;
    }

    filesFactory.getFileType = function (name) {
        var pathItemsList = name.split('/');
        var filePartsList = pathItemsList[pathItemsList.length - 1].split('.');
        var fileType = _.last(filePartsList);

        return fileType;
    }

    return filesFactory;
}]);