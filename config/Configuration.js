!(function () {
    'use strict';
    var config = {
        app_version: '2.0.4',
        site_url: 'http://localhost:2152',
        database: {
            mongodb: {
                url: 'mongodb://localhost:27017/taskMgnt_db'
            }
        },
    };
    module.exports = config;
})();
