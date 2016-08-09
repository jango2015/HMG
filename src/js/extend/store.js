/**
 * @file 本地存储localStorage
 * @name store
 * @short store
 * @desc 封装localStorage
 * @import 
 */



'use strict';

var store = {},
    storage;

var noop = function() {};

store.disabled = false;

store.set = function(key, value) {};

store.get = function(key, defaultVal) {};

store.remove = function(key) {};

store.clear = noop;
store.getAll = noop;
store.forEach = noop;

store.has = function(key) {
    return store.get(key) !== undefined;
};

store.transact = function(key, defaultVal, transactionFn) {
    if (transactionFn == null) {
        transactionFn = defaultVal;
        defaultVal = null;
    }

    if (defaultVal == null) {
        defaultVal = {};
    }

    var val = store.get(key, defaultVal);
    transactionFn(val);
    store.set(key, val);
};

store.serialize = function(value) {
    return JSON.stringify(value);
};

store.deserialize = function(value) {
    if (typeof value != 'string') {
        return undefined;
    }

    try {
        return JSON.parse(value);
    } catch (e) {
        return value || undefined;
    }
};

function isLocalStorageNameSupported() {
    try {
        return ('localStorage' in window && window.localStorage);
    } catch (err) {
        return false;
    }
}

if (isLocalStorageNameSupported()) {

    storage = window.localStorage;
    store.set = function(key, val) {

        if (val === undefined) {
            return store.remove(key);
        }

        storage.setItem(key, store.serialize(val));

        return val;
    };

    store.get = function(key, defaultVal) {
        var val = store.deserialize(storage.getItem(key));
        return (val === undefined ? defaultVal : val);
    };

    store.remove = function(key) {
        storage.removeItem(key);
    };

    store.clear = function() {
        storage.clear();
    };

    store.getAll = function() {
        var ret = {};
        store.forEach(function(key, val) {
            ret[key] = val;
        });
        return ret;
    };

    store.forEach = function(callback) {
        for (var i = 0; i < storage.length; i++) {
            var key = storage.key(i);
            callback(key, store.get(key));
        }
    };
}

try {
    var testKey = '__storeJs__';
    store.set(testKey, testKey);

    if (store.get(testKey) != testKey) {
        store.disabled = true;
    }

    store.remove(testKey);

} catch (e) {
    store.disabled = true;
}

store.enabled = !store.disabled;

module.exports = store;
