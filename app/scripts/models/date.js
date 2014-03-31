/*global app, Backbone*/

app.Models = app.Models || {};

(function () {
    'use strict';

    app.Models.DateModel = Backbone.Model.extend({

        initialize: function() {
        	console.log('date model initialize');
        	this.set('employees', []);
        },

        getEmployees: function() {
        	return new app.Collections.EmployeesCollection(this.get('employees'));
        }
    });

})();
