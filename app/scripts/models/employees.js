/*global timesheetBbApp, Backbone*/

timesheetBbApp.Models = timesheetBbApp.Models || {};

(function () {
    'use strict';

    timesheetBbApp.Models.EmployeesModel = Backbone.Model.extend({

        url: '',

        // localStorage: new Backbone.LocalStorage("employeeModelStorage"),

        initialize: function() {
        },

        defaults: {
            'jobs': []
        },

        addJob: function(job) {
            console.log('addjob function in models starts');
            var currentJobs = this.get('jobs');

            // if (currentJobs.length == 0) {
            //     //currentJobsCopy.push(job);
            // } else {
            //     //check if the job has already existed
            //     for (var i = 0; i < currentJobs.length; i++) {
            //         if (currentJobs[i].name === job.get('name')) {

            //             console.log('job already exists');
            //             return;
            //         } else {
            //             console.log('job doesnt exit so add it ' + currentJobs.length); 

            //             //currentJobsCopy.push(job);
            //         }
            //     }
            // }

            currentJobs.push(job);
            this.set({ 'jobs': currentJobs });
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
