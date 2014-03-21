/*global timesheetBbApp, Backbone, JST*/

timesheetBbApp.Views = timesheetBbApp.Views || {};

(function () {
    'use strict';

    timesheetBbApp.Views.EmployeesListView = Backbone.View.extend({

        tagName: 'div',

        className: 'employees-list btn-group-vertical',

        render: function () {
        	_.each(this.model.models, function (employee) {
        		this.$el.append(new timesheetBbApp.Views.EmployeesListItemView({model: employee}).render().el);
        	}, this);
        	return this;
        }
    });

    timesheetBbApp.Views.EmployeesListItemView = Backbone.View.extend({

        template: JST['app/scripts/templates/employees-item.ejs'],

        tagName: 'button',

        className: 'btn btn-default',

        events: {
        	'click': 	'getEmployeeDetail'
        },

        render: function () {
        	var data = this.model.attributes;
        	this.$el.html(this.template(data));
        	return this;
        },

        getEmployeeDetail: function(e) {
            console.log($(e.target).html());




            var selectedEmployee = employeesCollection.findWhere({fullName: $(e.target).html()});

            $('.employees-list .list-item').removeClass('current');

            var currentBtn = employeesCollection.findWhere({fullName: $(e.target).html()}).get('id');
            $('#' + currentBtn).addClass('current');

            var employeeDetailView = new timesheetBbApp.Views.EmployeesDetailView({model: selectedEmployee});

            employeeDetailView.render();


            // $('#jobs-search-menu').html(employeeDetailView.render(selectedEmployee).el.jobSearch);
            // if (employeeDetailView.render(selectedEmployee).el.employeeJobs) {
            //     $('#employee-jobs').html(employeeDetailView.render(selectedEmployee).el.employeeJobs);
            // }
        }

    });

    timesheetBbApp.Views.EmployeesDetailView = Backbone.View.extend({

        el: $('#employee-detail'),

        events: {
            'click .dropdown-menu .list-item': 'callAddJob',
            'click .delete-job': 'callDeleteJob'
        },

        initialize: function() {

            this.listenTo(this.model, 'add', this.render);
            this.listenTo(this.model, 'change:jobs', this.render);

            this.model.fetch({reset: true});

            // self.employeeJobs = employee.get('jobs');
            // self.employeeJobsCollection = new timesheetBbApp.Collections.JobsCollection(employeeJobs);

            // if (self.employeeJobs.length == 0) {
            //     console.log('no jobs for self person');
            //     $('#employee-jobs').html('');
            //     self.employeeJobs = '<p>self person has no jobs assigned.</p>';
            // } else {
            //     self.employeeJobsView = new timesheetBbApp.Views.JobsListView({model: self.employeeJobsCollection});
            //     self.employeeJobs = self.employeeJobsView.render().el;
            // }

            // self.jobSearchView = new timesheetBbApp.Views.JobSearchView();

            // self.jobSearch = self.jobSearchView.render().el;


        },

        render: function() {
            console.log('employeeDetailView render starts');

            var self = this;
            var employee = self.model;
            console.log(employee);
            var employeeJobs = employee.get('jobs');
            var employeeJobsCollection = new timesheetBbApp.Collections.JobsCollection(employeeJobs);
            var employeeJobsView;

            if (employeeJobs.length == 0) {
                console.log('no jobs for this person');
                $('#employee-jobs').html('');
            } else {
                employeeJobsView = new timesheetBbApp.Views.JobsListView({model: employeeJobsCollection});
                $('#employee-jobs').html(employeeJobsView.render().el);
            }

            var jobSearchView = new timesheetBbApp.Views.JobSearchView();

            $('#jobs-search-menu').html(jobSearchView.render().el);

            return this;
        },

        callAddJob: function(e) {
            var selectedJob = jobsCollection.findWhere({name: $(e.target).html()});
            var self = this;
            var curEmployeeId = $('.list-item.current').attr('id');
            console.log(curEmployeeId);
            console.log(self.model.get('id'));
            if (self.model.get('id') === curEmployeeId) {
                self.model.addJob(selectedJob);
                // self.model.save();
                // self.model.fetch();
            } else {
                return;
            }
            // self.model.addJob(selectedJob);
            console.log(self.model.get('jobs'));
        },

        callDeleteJob: function(e) {
            e.preventDefault();
            var selectedJob = jobsCollection.findWhere({name: $(e.target).parent().data('job-name')});
            var self = this;
            self.model.deleteJob(selectedJob);
        }


    })

})();
