/*global timesheetBbApp, Backbone*/

timesheetBbApp.Models = timesheetBbApp.Models || {};

(function () {
    'use strict';

    timesheetBbApp.Models.JobsModel = Backbone.Model.extend({

        initialize: function() {
            // this.setTime = this.setTime;
            // console.log(this.setTime);
        },

        defaults: {
            time: 1,
        }
    });

})();
