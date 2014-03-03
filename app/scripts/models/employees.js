/*global timesheetBbApp, Backbone*/

timesheetBbApp.Models = timesheetBbApp.Models || {};

(function () {
    'use strict';

    timesheetBbApp.Models.EmployeesModel = Backbone.Model.extend({

        url: '',

        initialize: function() {
            this.jobs = new timesheetBbApp.Collections.JobsCollection;
        },

        defaults: {
        },

        addJob: function(job) {
            this.jobs.add(job);
        },

        removeJob: function(job) {
            this.jobs = this.jobs.remove(job);
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
