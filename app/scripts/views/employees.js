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
            var employeeDetailView = new timesheetBbApp.Views.EmployeesDetailView();
            $('#employee-detail').html(employeeDetailView.render().el);
        }

    });

    timesheetBbApp.Views.EmployeesDetailView = Backbone.View.extend({

        tagName: 'section',

        // id: 'employee-detail',

        initialize: function() {

        },

        render: function() {
            console.log('employee detail view rendered!');
            var self = this;
            // var employeeJobs = this.model.attributes.jobs;
            // var employeeJobsView = new timesheetBbApp.Views.JobsListView({model: this.searchResults, className: 'dropdown-menu'});
            var jobSearchView = new timesheetBbApp.Views.JobSearchView();
            self.el = jobSearchView.render().el;
            console.log(self.el);
            // $('#jobs-search-menu').html(jobSearchView.render().el);
            return this;
        }
    })

})();
