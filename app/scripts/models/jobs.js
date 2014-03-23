/*global timesheetBbApp, Backbone*/

timesheetBbApp.Models = timesheetBbApp.Models || {};

(function () {
    'use strict';

    timesheetBbApp.Models.JobsModel = Backbone.Model.extend({

        initialize: function() {
        },

        // localStorage: new Backbone.LocalStorage("JobModelStorage"),

        defaults: {
            time: 0.5
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        },

        setTime: function(time) {
            this.set('time', time);
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
