"use strict";
angular.module('filesBrowser')
.factory('dialogs', ['$q', 'files', function ($q, files) {
    var dialogsFactory = {};
    var _messages = {
        rename: 'Rename file',
        exist: 'File already exists!',
        otherName: 'Enter new other name for'
    };

    var _prompt = function (msg) {
        var defer = $q.defer();
        var result = prompt(msg);
        var error = { code: 'CANCEL', message: 'Action canceled' };

        if (result !== null) {
            defer.resolve(result);
        } else {
            defer.reject(error);
        }

        return defer.promise;
    }

    var _alert = function (message) {
        var defer = $q.defer();
        window.alert(message);
        defer.resolve();

        return defer.promise;
    }

    var _combineMessages = function (left, right) {
        return left + ' ' + right;
    }

    var _renameFile = function (msg, from) {
        return _prompt(msg).then(function (to) {
            return files.rename(from, to);
        })
        .catch(function (error) {
            if (error) {
                if (error.code === 'EEXIST') {
                    return dialogsFactory.displayMessage(_messages.exist)
                        .then(function () {
                            var existMessage = _combineMessages(_messages.otherName, from);
                            return _rename(existMessage, from);
                        });
                }
            }
            return $q.reject('Renaming canceled');
        });
    }


    dialogsFactory.rename = function (from) {
        var renameMessage = _combineMessages(_messages.rename, from);
        return _renameFile(renameMessage, from);
    }

    dialogsFactory.displayMessage = function (msg) {
        return _alert(msg);
    }

    return dialogsFactory;
}]);