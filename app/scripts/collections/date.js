/*global timesheetBbApp, Backbone*/

timesheetBbApp.Collections = timesheetBbApp.Collections || {};

(function () {
    'use strict';

    timesheetBbApp.Collections.DateCollection = Backbone.Collection.extend({

        model: timesheetBbApp.Models.DateModel,

        localStorage: new Backbone.LocalStorage("dateCollectionStorage"),

        initialize: function () {
        }


    });

})();
