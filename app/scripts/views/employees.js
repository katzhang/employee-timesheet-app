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
        	'click a span.list-item': 	'getEmployeeDetail'
        },

        render: function () {
        	var data = this.model.attributes;
        	this.$el.html(this.template(data));
        	return this;
        },

        getEmployeeDetail: function(e) {
            console.log($(e.target).html());

            var selectedEmployee = employeesCollection.findWhere({fullName: $(e.target).html()});

            var employeeDetailView = new timesheetBbApp.Views.EmployeesDetailView({model: selectedEmployee});

            $('#jobs-search-menu').html(employeeDetailView.render(selectedEmployee).el.jobSearch);
            if (employeeDetailView.render(selectedEmployee).el.employeeJobs) {
                $('#employee-jobs').html(employeeDetailView.render(selectedEmployee).el.employeeJobs);
            }
        }

    });

    timesheetBbApp.Views.EmployeesDetailView = Backbone.View.extend({

        el: $('#employee-detail'),

        events: {
            'click span.list-item': 'addJob'
        },

        initialize: function() {


        },

        render: function(employee) {

            var self = this;
            var employeeJobs = employee.jobs;
            console.log(employee);
            console.log(employeeJobs instanceof timesheetBbApp.Collections.JobsCollection);
            var employeeJobsView;

            if (employeeJobs.length == 0) {
                console.log('no jobs for this person');
            } else {
                employeeJobsView = new timesheetBbApp.Views.JobsListView({model: employeeJobs});
                self.el.employeeJobs = employeeJobsView.render().el;
            }

            var jobSearchView = new timesheetBbApp.Views.JobSearchView();

            self.el.jobSearch = jobSearchView.render().el;

            // $('#jobs-search-menu').html(jobSearchView.render().el);
            return this;
        },

        addJob: function(e) {
            var selectedJob = jobsCollection.findWhere({name: $(e.target).html()});
            var self = this;
            console.log(self.model.attributes);
            console.log(self.model.attributes.jobs instanceof timesheetBbApp.Collections.JobsCollection);
            self.model.jobs.add(selectedJob);
            // self.model.save();
            self.model.fetch();
            setTimeout(function() {
                console.log(self.model.jobs);
            }, 1500);
            // console.log(this.model.get('jobs'));
        }


    })

})();
