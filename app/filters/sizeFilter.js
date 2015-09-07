"use strict";
angular.module('filesBrowser')
.filter('size', function () {
    return function (size, type, length) {
        var type = type || 'Mb';
        var length = length || 2;
        var result;

        var getMbs = function (value) {
            return (value / (1024 * 1024)).toFixed(length) + ' ' + 'Mb';
        }
        var getKbs = function (value) {
            return (value / 1024).toFixed(length) + ' ' + 'Kb';
        }

        switch (type) {
            case 'Mb':
                result = getMbs(size);
                break;
            case 'Kb':
                result = getKbs(size);
                break;
            default: result = getMbs(size);
        }

        return result;
    };
});