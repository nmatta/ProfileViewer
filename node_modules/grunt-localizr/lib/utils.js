'use strict';
var path = require('path'),
    fs = require('fs');

module.exports = {

    getName: function getName (filePath, root) {
        var relative = module.exports.getRelative(filePath, root);
        return relative.replace(path.extname(relative), '');
    },

    getRelative: function getRelative (filePath, root) {
        return filePath.replace(root, '').substr(1);
    }
};