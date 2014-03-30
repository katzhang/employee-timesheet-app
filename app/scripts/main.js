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

        callLater(successCallback);


    },

    Data: function() {

        this.employees = [
            {employeeId: '1', firstName: "Ann", lastName : "King", fullName: 'Ann King'},
            {employeeId: '2', firstName: "Ben", lastName : "White", fullName: 'Ben White'},
            {employeeId: '3', firstName: "Chris", lastName : "Smith", fullName: 'Chris Smith'},
            {employeeId: '4', firstName: "Damon", lastName : "Albarn", fullName: 'Damon Albarn'},
            {employeeId: '5', firstName: "Emma", lastName : "Woods", fullName: 'Emma Woods'}

        ]

        this.jobs = [
            {id: 1, name: "Awesome Consumer Website"},
            {id: 2, name: "Magnificent Banners"},
            {id: 3, name: "Splendid HTML Emails"},
            {id: 4, name: "Beautiful iPad App"}
        ]

        this.dates = []

        this.data = []

        this.generateData = function() {
            var employees = this.employees;
            this.getDates();
            var dates = this.dates;

            for (var i = 0; i < employees.length; i++) {
                for (var j = 0; j < dates.length; j++) {
                    employees[i]['date'] = dates[j];
                }
            }
        }

        this.getDates = function () {
            var table = $('.ui-datepicker-calendar');
            var self = this;

            table.find('td').each(function() {

                var year = $(this).data('year');
                var month = $(this).data('month');
                var day = $(this).find('a').html();

                if (year && month && day) {
                    var date = new Date(year, month, day);
                    self.dates.push(date);
                }
            })
        }



    },

    init: function () {
        'use strict';
        console.log('Hello from Backbone!');

        window.employeesCollection = new timesheetBbApp.Collections.EmployeesCollection(timesheetBbApp.store.employees);

        window.jobsCollection = new timesheetBbApp.Collections.JobsCollection(timesheetBbApp.store.jobs);

        window.dateCollection = new timesheetBbApp.Collections.DateCollection(timesheetBbApp.store.dates);

        window.currentCid = 0;

        $('#datepicker').datepicker({
            onSelect: function (dateText, inst) {
                console.log('onSelect');

                var dateModel;

                dateModel = dateCollection.findWhere({date: dateText});

                var employees = dateModel.getEmployees;

                console.log(dateModel);

                console.log(employees);
                var employeesView = new timesheetBbApp.Views.EmployeesListView({model: employees});
                // console.log(employeesView.render().el);
                $('#employees').html(employeesView.render().el);
                $('#employee-jobs, #jobs-search-menu').html('');
            }
        });


    }
};

// var dates = [];

// function getDates() {
//     var table = $('.ui-datepicker-calendar');
//     console.log(this);
//     table.find('td').each(function() {

//         var year = $(this).data('year');
//         var month = $(this).data('month');
//         var day = $(this).find('a').html();

//         if (year && month && day) {
//             var date = new Date(year, month, day);
//             dates.push(date);
//         }
//     })

//     console.log(dates);
// }


$(document).ready(function () {
    'use strict';

    timesheetBbApp.store = new timesheetBbApp.MemoryStore();

    timesheetBbApp.data = new timesheetBbApp.Data();

    timesheetBbApp.init();

    timesheetBbApp.data.generateData();
});
