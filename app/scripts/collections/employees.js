/*global timesheetBbApp, Backbone*/

timesheetBbApp.Collections = timesheetBbApp.Collections || {};

(function () {
    'use strict';

    timesheetBbApp.Collections.EmployeesCollection = Backbone.Collection.extend({

        model: timesheetBbApp.Models.EmployeesModel,

        localStorage: new Backbone.LocalStorage("EmployeesCollection"),

        // sync: function(method, model, options) {
        // 	console.log('EmployeesCollection synced');
        //     if (method === "read") {
        //         timesheetBbApp.store.findByName(options.data.name, function (data) {
        //             options.success(data);
        //         });
        //     }
        // },

        error: function() {
        	console.log('EmployeesCollection sync failed');
        }

    });

})();
