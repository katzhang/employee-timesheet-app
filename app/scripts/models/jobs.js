/*global app, Backbone*/

app.Models = app.Models || {};

(function () {
    'use strict';

    app.Models.JobsModel = Backbone.Model.extend({

        initialize: function() {
            // this.setTime = this.setTime;
            // console.log(this.setTime);
        },

        defaults: {
            time: 1,
        }
    });

})();
