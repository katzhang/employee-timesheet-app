/*global app, $*/


window.app = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},

    Data: function() {

        this.employees = [
            {employeeId: '1', firstName: "Ann", lastName : "King", fullName: 'Ann King', title: 'Senior Developer'},
            {employeeId: '2', firstName: "Ben", lastName : "White", fullName: 'Ben White', title: 'Junior Developer'},
            {employeeId: '3', firstName: "Chris", lastName : "Smith", fullName: 'Chris Smith', title: 'Developer'},
            {employeeId: '4', firstName: "Damon", lastName : "Albarn", fullName: 'Damon Albarn', title: 'Flash Developer'},
            {employeeId: '5', firstName: "Emma", lastName : "Woods", fullName: 'Emma Woods', title: 'Developer'}

        ]

        this.jobs = [
            {id: 1, name: "Awesome Consumer Website"},
            {id: 2, name: "Magnificent Banners"},
            {id: 3, name: "Splendid HTML Emails"},
            {id: 4, name: "Beautiful iPad App"}
        ]

        this.dates = []

        this.data = []

        //Merge employees array and dates array into one data array
        //Each date should have a list of employees
        //Also give each record an id
        this.generateData = function() {
            var employees = this.employees;
            this.getDates();
            var dates = this.dates;
            var data = this.data;

            for (var i = 0; i < employees.length; i++) {
                for (var j = 0; j < dates.length; j++) {
                    employees[i]['date'] = dates[j];

                    employees[i]['id'] = j * 10 + (i + 1);

                    data.push(_.clone(employees[i]));
                }
            }

        }

        //Iterate over datepicker widget and store dates as strings in dates array
        this.getDates = function () {
            var table = $('.ui-datepicker-calendar');
            var self = this;

            table.find('td').each(function() {

                var year = $(this).data('year');
                var month = $(this).data('month') + 1;
                var day = $(this).find('a').html();

                if (year && month && day) {
                    var yearText = year.toString();
                    var monthText = month > 9 ? month.toString() : '0' + month;
                    var dayText = day > 9 ? day.toString() : '0' + day;
                    self.dates.push(monthText + '/' + dayText + '/' + yearText);
                }
            })
        }



    },

    init: function () {
        'use strict';
        console.log('Hello from Backbone!');

        $('#datepicker').datepicker({
            onSelect: function (dateText, inst) {
                console.log('onSelect');
                console.log(dateText);

                var employees = app.employeesCollection.where({date: dateText});
                var header = '<h5 class="employees-list-header">Choose an employee: </h5>';

                $('.employees-list').html(header);

                _.each(employees, function(employee) {
                    $('.employees-list').append(new app.Views.EmployeesListItemView({model: employee}).render().el);
                })

                $('#employee-jobs, #jobs-search-menu').html('');
            }
        });

        app.data.generateData();

        app.employeesCollection = new app.Collections.EmployeesCollection(app.data.data);

        app.jobsCollection = new app.Collections.JobsCollection(app.data.jobs);


        console.log(app.data.data);

    }
};



$(document).ready(function () {
    'use strict';

    app.data = new app.Data();

    app.init();

});
