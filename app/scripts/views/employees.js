/*global timesheetBbApp, Backbone, JST*/

timesheetBbApp.Views = timesheetBbApp.Views || {};

(function () {
    'use strict';

    timesheetBbApp.Views.EmployeesListView = Backbone.View.extend({

        tagName: 'ul',

        className: 'employees-list',

        render: function () {
        	_.each(this.model.models, function (employee) {
        		this.$el.append(new timesheetBbApp.Views.EmployeesListItemView({model: employee}).render().el);
        	}, this);
        	return this;
        }
    });

    timesheetBbApp.Views.EmployeesListItemView = Backbone.View.extend({

        template: JST['app/scripts/templates/employees-item.ejs'],

        tagName: 'li',

        events: {
        	'click a span.list-item': 	'getEmployeeJobs',
        	'click a': 	'getJobsMenu'
        },

        render: function () {
        	var data = this.model.attributes;
        	this.$el.html(this.template(data));
        	return this;
        },

        getEmployeeJobs: function() {
        	console.log(this.model.attributes);
        },

        getJobsMenu: function() {
        	console.log('get jobs');
        	var jobSearchView = new timesheetBbApp.Views.JobSearchView();
        	$('#jobs').html(jobSearchView.render().el);
        }

    });

})();
