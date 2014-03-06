/*global timesheetBbApp, Backbone*/

timesheetBbApp.Collections = timesheetBbApp.Collections || {};

(function () {
    'use strict';

    timesheetBbApp.Collections.JobsCollection = Backbone.Collection.extend({

        model: timesheetBbApp.Models.JobsModel,

        localStorage: new Backbone.LocalStorage("JobsCollection")

    });

})();
