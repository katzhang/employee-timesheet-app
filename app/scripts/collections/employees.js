/*global app, Backbone*/

app.Collections = app.Collections || {};

(function () {
    'use strict';

    app.Collections.EmployeesCollection = Backbone.Collection.extend({

        model: app.Models.EmployeesModel,

        localStorage: new Backbone.LocalStorage("employeeCollectionStorage")

    });

})();
