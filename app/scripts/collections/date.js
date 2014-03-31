/*global app, Backbone*/

app.Collections = app.Collections || {};

(function () {
    'use strict';

    app.Collections.DateCollection = Backbone.Collection.extend({

        model: app.Models.DateModel,

        localStorage: new Backbone.LocalStorage("dateCollectionStorage"),

    });

})();
