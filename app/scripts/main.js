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
            {id: 1, firstName: "Ann", lastName : "King", fullName: 'Ann King'},
            {id: 2, firstName: "Ben", lastName : "White", fullName: 'Ben White'},
            {id: 3, firstName: "Chris", lastName : "Smith", fullName: 'Chris Smith'},
            {id: 4, firstName: "Damon", lastName : "Albarn", fullName: 'Damon Albarn'},
            {id: 5, firstName: "Emma", lastName : "Woods", fullName: 'Emma Woods'}

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

        window.employeesCollection = new timesheetBbApp.Collections.EmployeesCollection(timesheetBbApp.store.employees);

        window.jobsCollection = new timesheetBbApp.Collections.JobsCollection(timesheetBbApp.store.jobs);

        // console.log(employeesCollection.models);
        // var testView = new timesheetBbApp.Views.EmployeesListView({model: employeesCollection});
        // $('#employees').append(testView.render().el);

        $('#datepicker').datepicker({
            onSelect: function (dateText, inst) {
                var selectedDate = dateText;
                var employeesOfDay = new timesheetBbApp.Collections.EmployeesCollection(timesheetBbApp.store.employees);
                employeesOfDay.date(selectedDate);
                var employeeOfDayView = new timesheetBbApp.Views.EmployeesListView({model: employeesOfDay});
                $('#employees').html(employeeOfDayView.render().el);
            }
        });
        // $('.ui-state-default').click(function(e) {
        //     e.preventDefault();
        //     var employeeView = new timesheetBbApp.Views.EmployeesListView({model: employeesCollection});
        //     $('#employees').html(employeeView.render().el);
        // })
    }
};

$(document).ready(function () {
    'use strict';

    timesheetBbApp.store = new timesheetBbApp.MemoryStore();
    timesheetBbApp.init();
});
