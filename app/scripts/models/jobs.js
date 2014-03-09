/*global timesheetBbApp, Backbone*/

timesheetBbApp.Models = timesheetBbApp.Models || {};

(function () {
    'use strict';

    timesheetBbApp.Models.JobsModel = Backbone.Model.extend({

        initialize: function() {
        },

        localStorage: new Backbone.LocalStorage("JobModelStorage"),

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }

        // sync: function(method, model, options) {
        //     if (method === "read") {
        //         directory.store.findByName(options.data.name, function (data) {
        //             options.success(data);
        //         });
        //     }
        // }
    });

})();
