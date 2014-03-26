/*global timesheetBbApp, Backbone, JST*/

timesheetBbApp.Views = timesheetBbApp.Views || {};

(function () {
    'use strict';

    timesheetBbApp.Views.DateView = Backbone.View.extend({

        tagName: 'a',

        className: 'ui-state-defualt',

        events: {
            "onSelect #datepicker": "clickDate",
            "keypress .search-query": "onkeypress"
        },

        clickDate: function() {
            console.log('date clicked');
        }

        // render: function () {
        // 	_.each(this.model.models, function (employee) {
        // 		this.$el.append(new timesheetBbApp.Views.EmployeesListItemView({model: employee}).render().el);
        // 	}, this);
        // 	return this;
        // }
    });

})();
