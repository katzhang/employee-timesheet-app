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

        callLater(successCallback);


    },

    getDate: function (date) {

        dateCollection.fetch();

        console.log(dateCollection);
        console.log(date);
        if (!dateCollection.findWhere({dateText: date})) {
            console.log('create new dateModel');
            return dateCollection.create(new timesheetBbApp.Models.DateModel({dateText: date}));
        } else {
            return dateCollection.findWhere({dateText: date});
        }


    },

    

    init: function () {
        'use strict';
        console.log('Hello from Backbone!');

        window.employeesCollection = new timesheetBbApp.Collections.EmployeesCollection(timesheetBbApp.store.employees);

        window.jobsCollection = new timesheetBbApp.Collections.JobsCollection(timesheetBbApp.store.jobs);

        window.dateCollection = new timesheetBbApp.Collections.DateCollection();

        window.currentCid = 0;

        $('#datepicker').datepicker({
            onSelect: function (dateText, inst) {
                console.log('onSelect');
                var dateModel;

                // dateCollection.fetch();

                // console.log(dateCollection);
                // console.log(selectedDate);
                // if (!dateCollection.findWhere({dateText: selectedDate})) {
                //     dateCollection.create({dateText: selectedDate});
                // }

                dateModel = timesheetBbApp.getDate(dateText);

                dateCollection.fetch();

                var employees = dateModel.get('employees');

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

$(document).ready(function () {
    'use strict';

    timesheetBbApp.store = new timesheetBbApp.MemoryStore();
    timesheetBbApp.init();
});
