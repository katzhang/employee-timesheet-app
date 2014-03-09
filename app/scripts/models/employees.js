/*global timesheetBbApp, Backbone*/

timesheetBbApp.Models = timesheetBbApp.Models || {};

(function () {
    'use strict';

    timesheetBbApp.Models.EmployeesModel = Backbone.Model.extend({

        url: '',

        localStorage: new Backbone.LocalStorage("employeeModelStorage"),

        initialize: function() {
            this.jobs = new timesheetBbApp.Collections.JobsCollection();
        },

        defaults: {
        },

        addJob: function(job) {
            this.jobs.add(job);
        },

        removeJob: function(job) {
            this.jobs = this.jobs.remove(job);
        },

        // sync: function(method, model, options) {
        //     if (method === "read") {
        //         timesheetBbApp.store.findByName(options.data.name, function (data) {
        //             options.success(data);
        //         });
        //     }
        // },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
