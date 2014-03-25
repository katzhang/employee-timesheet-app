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

            var selectedEmployee = this.model;
            console.log(this.model);
            console.log(this.model.cid);

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
            'click .delete-job': 'callDeleteJob',
            'change select': 'callSetTime'
        },

        initialize: function() {

            currentCid = this.model.cid;
            console.log(currentCid);

            this.listenTo(this.model, 'add', this.render);
            this.listenTo(this.model, 'change:jobs', this.render);

            this.model.fetch({reset: true});
        },

        render: function() {
            console.log('employeeDetailView render starts');
            $('#employee-jobs').html('');

            var self = this;
            var employee = self.model;
            var employeeJobs = employee.get('jobs');
            console.log(employeeJobs);
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
            console.log('CID: ' + currentCid);
            if (self.model.get('id') === curEmployeeId && self.model.cid === currentCid) {

                self.model.addJob(selectedJob);
                // self.model.save();
                // self.model.fetch();
            } else {
                return;
            }
            // self.model.addJob(selectedJob);
        },

        callDeleteJob: function(e) {
            e.preventDefault();
            var selectedJob = jobsCollection.findWhere({name: $(e.target).parent().data('job-name')});
            var self = this;
            var curEmployeeId = $('.list-item.current').attr('id');
            if (self.model.get('id') === curEmployeeId) {
                self.model.deleteJob(selectedJob);
                // self.model.save();
                // self.model.fetch();
            } else {
                return;
            }
        },

        callSetTime: function(e) {
            console.log('callSetTime');
            var select = $(e.target);
            var selectedJob = jobsCollection.findWhere({name: select.next().data('job-name')});
            var hour = select.children(':selected').html();
            var self = this;
            var curEmployeeId = $('.list-item.current').attr('id');
            if (self.model.get('id') === curEmployeeId) {
                self.model.setJobHour(selectedJob, hour);
                // self.model.save();
                // self.model.fetch();
            } else {
                return;
            }
        }


    })

})();
