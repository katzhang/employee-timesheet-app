/*global timesheetBbApp, Backbone*/

timesheetBbApp.Models = timesheetBbApp.Models || {};

(function () {
    'use strict';

    timesheetBbApp.Models.JobsModel = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
