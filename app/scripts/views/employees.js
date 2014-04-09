/*global app, Backbone, JST*/

app.Views = app.Views || {};

(function () {
    'use strict';


    app.Views.EmployeesListItemView = Backbone.View.extend({

        template: JST['app/scripts/templates/employees-item.ejs'],

        tagName: 'button',

        className: 'btn btn-default',

        events: {
        	'click': 	'getEmployeeDetail'
        },

        render: function () {

            this.model.fetch();

        	var data = this.model.attributes;
        	this.$el.html(this.template(data));
        	return this;
        },

        getEmployeeDetail: function(e) {
            var target = $(e.currentTarget);

            var selectedEmployee = this.model;
            console.log(this.model);
            var fullNameText = target.find('.list-item').html();
            console.log(fullNameText);

            $('.employees-list .list-item').parents('button').removeClass('current');

            var currentBtn = app.employeesCollection.findWhere({fullName: fullNameText}).get('employeeId');
            $('#' + currentBtn).parents('button').addClass('current');

            var employeeDetailView = new app.Views.EmployeesDetailView({model: selectedEmployee});

            // employeeDetailView.render();
            this.getView(employeeDetailView);
        },

        getView: function(view) {
            console.log('get view starts');
            if (window.currentView){
                console.log('remove view');
                window.currentView.undelegateEvents();
            }
         
            window.currentView = view;
            window.currentView.render();
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
            console.log('employee detail renders');
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

        getJob: function(target) {
            var jobName = target.parents('li').attr('data-job-name');
            console.log(jobName);
            return app.jobsCollection.findWhere({name: jobName});
        },

        callAddJob: function(e) {
            var self = this;
            var selectedJob = self.getJob($(e.target));
            var curEmployeeId = $('.current .list-item').attr('id');
            if (self.model.get('employeeId') === curEmployeeId) {

                self.model.addJob(selectedJob);
            }
        },

        callDeleteJob: function(e) {
            e.preventDefault();
            var self = this;
            var selectedJob = self.getJob($(e.target));
            console.log(selectedJob);
            var curEmployeeId = $('.current .list-item').attr('id');
            if (self.model.get('employeeId') === curEmployeeId) {
                self.model.deleteJob(selectedJob);
            }
        },

        callSetTime: function(e) {
            console.log('callSetTime');
            var self = this;
            var select = $(e.target);
            var selectedJob = self.getJob($(e.target));
            var hour = select.children(':selected').html();
            var self = this;
            var curEmployeeId = $('.current .list-item').attr('id');
            if (self.model.get('employeeId') === curEmployeeId) {
                self.model.setJobHour(selectedJob, hour);
            }
        }


    })

})();
