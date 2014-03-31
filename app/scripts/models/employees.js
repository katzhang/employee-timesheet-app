/*global app, Backbone*/

app.Models = app.Models || {};
//some changes

(function () {
    'use strict';

    app.Models.EmployeesModel = Backbone.Model.extend({

        url: '',

        initialize: function() {
            this.set('jobs', []);
        },

        addJob: function(job) {
            console.log('addjob function in models starts');
            console.log(this);
            var currentJobs = this.get('jobs');
            var indicator = false;

            if (currentJobs.length == 0) {
                indicator = true;
            } else {
                for (var i = 0; i < currentJobs.length; i++) {
                    if (currentJobs[i].name === job.get('name')) {
                        console.log('job already exists');
                        return;
                    } else {
                        indicator = true;
                    }
                }
            }

            if (indicator) {
                currentJobs.push(job);
            }
            this.save({'jobs': currentJobs}, {success: function() {
                console.log('saved currentJobs success');
            }});

            this.save({newAttribute: 'new attribute'});

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
