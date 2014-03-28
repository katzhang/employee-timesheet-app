/*global timesheetBbApp, Backbone*/

timesheetBbApp.Collections = timesheetBbApp.Collections || {};

(function () {
    'use strict';

    timesheetBbApp.Collections.EmployeesCollection = Backbone.Collection.extend({

        model: timesheetBbApp.Models.EmployeesModel,

        localStorage: new Backbone.LocalStorage("employeeCollectionStorage"),

        initialize: function () {
            this._date = '';
        }

        // date: function (value) {
        //     if (value === undefined) {
        //         return this._date;
        //     } else {
        //         if (this._date === '') {
        //             this._date = value;
        //         } else {
        //             return this._date;
        //         }
        //     }
        // }

        // sync: function(method, model, options) {
        // 	console.log('EmployeesCollection synced');
        //     if (method === "read") {
        //         timesheetBbApp.store.findByName(options.data.name, function (data) {
        //             options.success(data);
        //         });
        //     }
        // },

    });

})();
