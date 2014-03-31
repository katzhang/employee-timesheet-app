/*global app, Backbone, JST*/

app.Views = app.Views || {};

(function () {
    'use strict';


    app.Views.EmployeesListItemView = Backbone.View.extend({

        template: JST['app/scripts/templates/employees-item.ejs'],

        tagName: 'button',

        className: 'btn btn-default',

        events: {
        	'click .list-item': 	'getEmployeeDetail'
        },

        render: function () {

            this.model.fetch();

        	var data = this.model.attributes;
        	this.$el.html(this.template(data));
        	return this;
        },

        getEmployeeDetail: function(e) {
            console.log($(e.target).html());

            var selectedEmployee = this.model;
            console.log(this.model);

            $('.employees-list .list-item').removeClass('current');

            var currentBtn = app.employeesCollection.findWhere({fullName: $(e.target).html()}).get('employeeId');
            $('#' + currentBtn).addClass('current');

            var employeeDetailView = new app.Views.EmployeesDetailView({model: selectedEmployee});

            employeeDetailView.render();
        }

    });

    app.Views.EmployeesDetailView = Backbone.View.extend({

        el: $('#employee-detail'),

        events: {
            'click .dropdown-menu .list-item': 'callAddJob',
            'click .delete-job': 'callDeleteJob',
            'change select': 'callSetTime'
        },

        initialize: function() {

            // this.listenTo(this.model, 'add', this.render);
            this.listenTo(this.model, 'change:jobs', this.render);
            this.listenTo(this.model, 'destroy', this.remove);

            this.model.fetch();
        },

        render: function() {
            $('#employee-jobs').html('');

            var self = this;

            var employee = self.model;


            var employeeJobs = employee.get('jobs');

            //after saving the job collection will be returned as an array rather than a bb collection
            var employeeJobsCollection = new app.Collections.JobsCollection(employeeJobs);
            var employeeJobsView;

            if (employeeJobs.length == 0) {
                console.log('no jobs for this person');
                $('#employee-jobs').html('');
            } else {
                employeeJobsView = new app.Views.JobsListView({model: employeeJobsCollection});
                $('#employee-jobs').html(employeeJobsView.render().el);
            }

            var jobSearchView = new app.Views.JobSearchView();

            $('#jobs-search-menu').html(jobSearchView.render().el);

            return this;
        },

        callAddJob: function(e) {
            var selectedJob = app.jobsCollection.findWhere({name: $(e.target).html()});
            var self = this;
            var curEmployeeId = $('.list-item.current').attr('id');
            if (self.model.get('employeeId') === curEmployeeId) {

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
            var selectedJob = app.jobsCollection.findWhere({name: $(e.target).parent().data('job-name')});
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
            console.log(this.model);
            var select = $(e.target);
            var selectedJob = app.jobsCollection.findWhere({name: select.next().data('job-name')});
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
