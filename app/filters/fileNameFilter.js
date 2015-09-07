"use strict";
angular.module('filesBrowser')
.filter('fileName', function () {
    return function (name) {
        if (name === undefined) {
            return;
        }
        var nameItemsList = name.split('/');
        return _.last(nameItemsList);
    };
});