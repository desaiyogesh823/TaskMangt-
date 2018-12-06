!(function () {
    'use strict';
    var Config = require('../config/Configuration');
    var express = require('express'),
        router = express.Router(),
        path = require('path'),
        taskController = require('../app/controllers/taskController');

    var route = function (app) {
        router.get('/get-task-list', taskController.taskDespList);
        router.post('/add-task-desp', taskController.addTaskDesp);
        app.use('/api/admin', router);
    }
    module.exports = route;
})();