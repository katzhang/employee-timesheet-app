/*global timesheetBbApp, Backbone*/

timesheetBbApp.Collections = timesheetBbApp.Collections || {};

(function () {
    'use strict';

    timesheetBbApp.Collections.JobsCollection = Backbone.Collection.extend({

        model: timesheetBbApp.Models.JobsModel,

        localStorage: new Backbone.LocalStorage("JobsCollectionStorage"),

        url: '',

        findJobName: function(searchkey) {
            var jobs = jobsCollection.filter(function (element) {
                var jobName = element.get('name');
                return jobName.toLowerCase().indexOf(searchkey.toLowerCase()) > -1;
            });
            return new timesheetBbApp.Collections.JobsCollection(jobs);
        }

     //    sync: function(method, model, options) {
     //    	console.log('job collection synced!');
	    //     if (method === "read") {
	    //         timesheetBbApp.store.findJobName(options.data.name, function (data) {
	    //             options.success(data);
	    //         });
	    //     }
	    // }

    });

})();
