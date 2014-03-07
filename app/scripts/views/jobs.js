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
	        this.searchResults = new timesheetBbApp.Collections.JobsCollection(timesheetBbApp.store.jobs);
	        this.searchresultsView = new timesheetBbApp.Views.JobsListView({model: this.searchResults, className: 'dropdown-menu'});
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
	        console.log(key);
	        this.searchResults.fetch({reset: true, data: {name: key}});
	        var self = this;
	        setTimeout(function () {
	            $('.dropdown').addClass('open');
	        });
	    },

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
