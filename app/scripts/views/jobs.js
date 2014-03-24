/*global timesheetBbApp, Backbone, JST*/

timesheetBbApp.Views = timesheetBbApp.Views || {};

(function () {
    'use strict';

    timesheetBbApp.Views.JobsListView = Backbone.View.extend({

        tagName: 'ul',

        className: 'jobs-list',

        initialize: function() {
        	var self = this;
        	this.model.on("reset", this.render, this);
	        this.model.on("add", function (employee) {
	            self.$el.append(new timesheetBbApp.Views.JobsListView({model:employee}).render().el);
	        });
        },

        render: function () {
        	_.each(this.model.models, function (job) {
        		this.$el.append(new timesheetBbApp.Views.JobsListItemView({model: job}).render().el);
        	}, this);
        	return this;
        }
    });

    timesheetBbApp.Views.JobsListItemView = Backbone.View.extend({

        template: JST['app/scripts/templates/jobs-item.ejs'],

        tagName: 'li',


	    initialize:function () {
	        this.model.on("change", this.render, this);
	        this.model.on("destroy", this.close, this);
	    },

        render: function () {
        	var data = this.model.attributes;
        	this.$el.html(this.template(data));
        	return this;
        }

    });

    timesheetBbApp.Views.JobSearchView = Backbone.View.extend({

    	template: JST['app/scripts/templates/jobs-search.ejs'],

	    initialize: function () {
	        this.searchResults = jobsCollection;
	        this.searchresultsView = new timesheetBbApp.Views.JobsListView({model: this.searchResults, className: 'dropdown-menu'});
	    	this.searchResults.on('reset', this.render, this);
	    },

	    render: function () {
	        this.$el.html(this.template());
	        $('.navbar-search', this.el).append(this.searchresultsView.render().el);
	        return this;
	    },

	    events: {
	        "keyup .search-query": "search",
	        "keypress .search-query": "onkeypress"
	    },

	    search: function (event) {
	    	$('.dropdown-menu').html('');
	        var key = $('#searchText').val();
	        var self = this;
	        console.log(key);
	        // this.searchResults.fetch({reset: true, data: {name: key}});
	        var jobs = this.searchResults.findJobName(key);
	    	this.searchResults = jobs;
	    	this.searchresultsView = new timesheetBbApp.Views.JobsListView({ model: this.searchResults, className: 'dropdown-menu'});
	    	$('.navbar-search', this.el).append(this.searchresultsView.render().el);
	        setTimeout(function () {
	            $('.dropdown').addClass('open');
	        });
	    },

	    // updateResults: function(cxt, jobs) {
	    // 	console.log('updateResults:' + jobs);
	    // 	cxt.searchResults = jobs;
	    // 	cxt.searchresultsView = new timesheetBbApp.Views.JobsListView({ model: cxt.searchResults, className: 'dropdown-menu'});
	    // 	$('.navbar-search', cxt.el).append(cxt.searchresultsView.render().el);
	    // },

	    onkeypress: function (event) {
	        if (event.keyCode === 13) { // enter key pressed
	            event.preventDefault();
	        }
	    },

	    selectMenuItem: function(menuItem) {
	        $('.navbar .nav li').removeClass('active');
	        if (menuItem) {
	            $('.' + menuItem).addClass('active');
	        }
	    }
    });

})();
