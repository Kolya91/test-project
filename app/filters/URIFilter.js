"use strict";
angular.module('filesBrowser')
.filter('URI', function () {
    var type = type || 'encode';
    var result;

    return function (name, type) {
        if (name === undefined) {
            return;
        }

        switch (type) {
            case 'encode':
                result = encodeURIComponent(name);
                break;
            case 'decode':
                result = decodeURIComponent(name);
                break;
            default: result = encodeURIComponent(name);
        }

        return result;
    };
});