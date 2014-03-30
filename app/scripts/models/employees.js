/*global timesheetBbApp, Backbone*/

timesheetBbApp.Models = timesheetBbApp.Models || {};
//some changes

(function () {
    'use strict';

    timesheetBbApp.Models.EmployeesModel = Backbone.Model.extend({

        url: '',

        initialize: function() {
            this.set('jobs', []);
        },

        addJob: function(job) {
            console.log('addjob function in models starts');
            var currentJobs = this.get('jobs');
            if (!currentJobs instanceof timesheetBbApp.Collections.JobsCollection) {
                currentJobs = timesheetBbApp.Collection.JobsCollection(currentJobs);
            }
            var indicator = false;
            console.log(currentJobs);

     

            if (currentJobs.length == 0) {
                currentJobs.create(job);
            } else {
                currentJobs.each(function (element) {
                    console.log('djofwj');
                    if (element.get('name') === job.get('name')) {
                        console.log('job already exists');
                        return;
                    } else {
                        console.log('new job, create it');
                        currentJobs.create(job);
                    }
                })
            }

            // this.collection.fetch();
            console.log(currentJobs);
            this.save({'jobs': currentJobs}, {success: function() {
                console.log('saved currentJobs success');
            }});
            currentJobs.fetch();
            console.log(this.get('jobs'));

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

        date: function (value) {
            if (value === undefined) {
                return this._date;
            } else {
                if (this._date === '') {
                    this._date = value;
                    // this.save();
                } else {
                    return this._date;
                }
            }
        },

        setJobHour: function(job, hour) {
            var currentJobs = this.get('jobs');

            for (var i = 0; i < currentJobs.length; i++) {
                if (currentJobs[i].name === job.get('name')) {
                   currentJobs[i].time = hour;
                }
            }
            
            this.save();
            
        }
    });

})();
