/*global timesheetBbApp, $*/


window.timesheetBbApp = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},

    MemoryStore: function (successCallback, errorCallback) {
        this.findByName = function (searchKey, callback) {
            var employees = this.employees.filter(function (element) {
                var fullName = element.firstName + " " + element.lastName;
                return fullName.toLowerCase().indexOf(searchKey.toLowerCase() > -1);
            });
            callLater(callback, employees);
        }

        this.findJobName = function (searchKey, callback) {
            var jobs = this.jobs.filter(function (element) {
                var jobName = element.name;
                console.log(jobName);
                return jobName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            });
            callLater(callback, jobs);
        }

        var callLater = function (callback, data) {
            if (callback) {
                setTimeout(function () {
                    callback(data);
                });
            }
        }

        this.employees = [
            {id: 1, firstName: "Ann", lastName : "King", jobs: []},
            {id: 2, firstName: "Ben", lastName : "White", jobs: []},
            {id: 3, firstName: "Chris", lastName : "Smith", jobs: []},
            {id: 4, firstName: "Damon", lastName : "Albarn", jobs: []},
            {id: 5, firstName: "Emma", lastName : "Woods", jobs: []}

        ]

        this.jobs = [
            {id: 1, name: "Awesome Consumer Website"},
            {id: 2, name: "Magnificent Banners"},
            {id: 3, name: "Splendid HTML Emails"},
            {id: 4, name: "Beautiful iPad App"}
        ]

        callLater(successCallback);


    },

    init: function () {
        'use strict';
        console.log('Hello from Backbone!');
        var testCollection = new timesheetBbApp.Collections.EmployeesCollection(timesheetBbApp.store.employees);
        console.log(testCollection.models);
        var testView = new timesheetBbApp.Views.EmployeesListView({model: testCollection});
        $('#employees').append(testView.render().el);
    }
};

$(document).ready(function () {
    'use strict';

    timesheetBbApp.store = new timesheetBbApp.MemoryStore();
    timesheetBbApp.init();
});
