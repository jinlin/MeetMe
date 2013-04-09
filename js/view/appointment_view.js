define([
    "jquery",
    "underscore",
    "backbone",
    "temp/appointment_temp"
], function($, _, Backbone){
    _.templateSettings = {
        interpolate : /\{\{(.+?)\}\}/g,
        evaluate : /\{\[([\s\S]+?)\]\}/g
    };
    var appointment_view = Backbone.View.extend({
        template :_.template(appointment_temp),
        tagName: 'li',
        initialize : function(){
            _.bindAll(this,'render');
        },
        render: function(){
            var $el = $(this.el);
            $el.html(this.template(this.options.model.toJSON()));
            return $el;
        }
    });

    return appointment_view;
});