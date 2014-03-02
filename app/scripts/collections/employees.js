/*global timesheetBbApp, Backbone*/

timesheetBbApp.Collections = timesheetBbApp.Collections || {};

(function () {
    'use strict';

    timesheetBbApp.Collections.EmployeesCollection = Backbone.Collection.extend({

        model: timesheetBbApp.Models.EmployeesModel

    });

})();
