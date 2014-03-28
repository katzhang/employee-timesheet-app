/*global timesheetBbApp, Backbone*/

timesheetBbApp.Models = timesheetBbApp.Models || {};

(function () {
    'use strict';

    timesheetBbApp.Models.DateModel = Backbone.Model.extend({

        initialize: function() {
        	this.set('employees', new timesheetBbApp.Collections.EmployeesCollection(timesheetBbApp.store.employees));
        },

        defaults: {
            'dateText': '01/01/2014'
        }
    });

})();
