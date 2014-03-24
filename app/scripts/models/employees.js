/*global timesheetBbApp, Backbone*/

timesheetBbApp.Models = timesheetBbApp.Models || {};
//some changes

(function () {
    'use strict';

    timesheetBbApp.Models.EmployeesModel = Backbone.Model.extend({

        url: '',

        // localStorage: new Backbone.LocalStorage("employeeModelStorage"),

        initialize: function() {
            this.set('jobs', []);
        },

        // defaults: {
        //     'jobs': []
        // },

        addJob: function(job) {
            console.log('addjob function in models starts');
            console.log(job);
            var currentJobs = this.get('jobs');
            var indicator = false;

            if (!currentJobs.length) {
                indicator = true;
            } else {
                for (var i = 0; i < currentJobs.length; i++) {
                    if (currentJobs[i].name === job.get('name')) {
                        console.log('job already exists');
                        return;
                    } else {
                        console.log('new job, add it');
                        indicator = true;
                    }
                }
            }

            if (indicator) {
                currentJobs.push(job);
            }

            console.log(currentJobs);

            this.save({ 'jobs': currentJobs });
            console.log(this.get('jobs'));
            // this.save();
            // this.fetch();
        },

        deleteJob: function(job) {
            console.log('deletejob in model starts');
            var currentJobs = this.get('jobs');
            var jobIndex;
            console.log(job);

            for (var i = 0; i < currentJobs.length; i++) {
                if (currentJobs[i].name === job.get('name')) {
                   // currentJobsCopy = _.omit(currentJobs, i);
                   // indicator = true;
                   jobIndex = i;
                }
            }

            if (jobIndex || jobIndex === 0) {
                currentJobs = _.without(currentJobs, currentJobs[jobIndex]);
            }

            this.save({'jobs': currentJobs});


            console.log(this.get('jobs'));
        },

        setJobHour: function(job, hour) {
            console.log('set job hour starts');
            var currentJobs = this.get('jobs');

            for (var i = 0; i < currentJobs.length; i++) {
                if (currentJobs[i].name === job.get('name')) {
                   currentJobs[i].time = hour;
                }
            }
            
            this.save();
            console.log(this.get('jobs'));
            
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
