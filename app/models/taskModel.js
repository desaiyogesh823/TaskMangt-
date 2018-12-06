/**
 * Task Model Class
 */
!(function () {
    'use strict'

    var mongoose = require('mongoose')
        , timestamps = require('mongoose-timestamp')
        , mongoosePaginate = require('mongoose-paginate')
        , fs = require('fs')
        , path = require('path')
        , moment = require('moment')
        , Config = require('../../config/Configuration')
        , taskSchema
        , Schema = mongoose.Schema;

    /*
     * Task Schema
     */
    taskSchema = new Schema({
        title: { type: String, required: true },
        taskDesp: { type: String, required: true },
        date_Time:{ type: String, required: true },
        created_by: { type: Schema.Types.ObjectId, ref: 'User' },
        updated_by: { type: Schema.Types.ObjectId, ref: 'User' },
        status: { type: String, default: 'active', enum: ['active', 'inactive', 'deleted'] }
    });

    /**
     * Add timestamp plugin
     */
    taskSchema.plugin(timestamps, {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    /**
     * Add paginate plugin
     */
    taskSchema.plugin(mongoosePaginate);
    /*
         * Add task
         */
    taskSchema.statics.addTaskDesp = function (req, callback) {
        var data = req.body,
            TaskModel;
        // callback(null, data);
        // return false;
        TaskModel = new TaskDesp(data);
        TaskModel.save(function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null, TaskModel);
            }
        });
    };

    taskSchema.statics.getAllTasksCount = function (data, callback) {
        Event.count().exec(callback);
    };

    /*
           * Get event list
           */
    taskSchema.statics.taskList = function (req, callback) {
        var data = req.body,
            page = data.page || 1,
            where = {};
        return TaskDesp.paginate(where, {
            page: page,
            limit: 20,
        }, callback);
    };

    var TaskDesp = mongoose.model('TaskDesp', taskSchema);
    module.exports = TaskDesp;
})();