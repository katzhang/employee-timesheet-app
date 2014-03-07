/*global timesheetBbApp, Backbone*/

timesheetBbApp.Collections = timesheetBbApp.Collections || {};

(function () {
    'use strict';

    timesheetBbApp.Collections.JobsCollection = Backbone.Collection.extend({

        model: timesheetBbApp.Models.JobsModel,

        // localStorage: new Backbone.LocalStorage("JobsCollection"),

        url: '',

        sync: function(method, model, options) {
        	console.log('job collection synced!');
	        if (method === "read") {
	            timesheetBbApp.store.findJobName(options.data.name, function (data) {
	                options.success(data);
	            });
	        }
	    }

    });

})();
