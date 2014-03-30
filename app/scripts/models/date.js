/*global timesheetBbApp, Backbone*/

timesheetBbApp.Models = timesheetBbApp.Models || {};

(function () {
    'use strict';

    timesheetBbApp.Models.DateModel = Backbone.Model.extend({

        initialize: function() {
        	console.log('date model initialize');
        	this.set('employees', []);
        },

        getEmployees: function() {
        	return new timesheetBbApp.Collections.EmployeesCollection(this.get('employees'));
        }
    });

})();
