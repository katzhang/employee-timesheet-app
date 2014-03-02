/*global timesheetBbApp, Backbone, JST*/

timesheetBbApp.Views = timesheetBbApp.Views || {};

(function () {
    'use strict';

    timesheetBbApp.Views.EmployeesView = Backbone.View.extend({

        template: JST['app/scripts/templates/employees.ejs']

    });

})();
