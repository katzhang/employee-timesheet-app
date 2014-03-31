/*global app, Backbone*/

app.Collections = app.Collections || {};

(function () {
    'use strict';

    app.Collections.JobsCollection = Backbone.Collection.extend({

        model: app.Models.JobsModel,

        localStorage: new Backbone.LocalStorage("JobsCollectionStorage"),

        url: '',

        findJobName: function(searchkey) {
            var jobs = app.jobsCollection.filter(function (element) {
                var jobName = element.get('name');
                return jobName.toLowerCase().indexOf(searchkey.toLowerCase()) > -1;
            });
            return new app.Collections.JobsCollection(jobs);
        }

    });


})();
