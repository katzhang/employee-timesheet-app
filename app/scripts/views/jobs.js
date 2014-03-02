/*global timesheetBbApp, Backbone, JST*/

timesheetBbApp.Views = timesheetBbApp.Views || {};

(function () {
    'use strict';

    timesheetBbApp.Views.JobsView = Backbone.View.extend({

        template: JST['app/scripts/templates/jobs.ejs']

    });

})();
