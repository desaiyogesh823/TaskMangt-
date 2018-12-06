!(function () {
    'use strict';

    var Config = require('../../config/Configuration'),
        tskModel = require('../models/taskModel');

    var taskController = {
        addTaskDesp: function (req, res, next) {
            tskModel.addTaskDesp(req, function (err, data) {
                if (err) {
                    res.json({ success: false, data: [], message: err, error: err });
                } else {
                    res.json({ success: true, data: data, message: "Task successfully added.", error: [] });
                }
            });

        },
        taskDespList: function (req, res, next) {
            tskModel.taskList(req, function (err, paginatedResults, pageCount, itemCount) {
                if (err) {
                    res.json({ success: false, data: [], message: err });
                } else {
                    res.json({
                        success: true,
                        data: { totalItems: itemCount, page: pageCount, items: paginatedResults },
                        message: 'Task list.'
                    });
                }
            });
        }
    };
    module.exports = taskController;
})();
