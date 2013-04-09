define([
    "jquery",
    "underscore",
    "backbone",
    "router",
    'collections/appointments_list',
    'models/appointments_model',
    'view/appointment_view',
    'temp/appointment_list_temp'
], function($, _, Backbone,route,appointments_list,appointments_model,appointment_view){
    _.templateSettings = {
        interpolate : /\{\{(.+?)\}\}/g
    };
    var appointment_list_view = Backbone.View.extend({
        events : {
            'click .appointment' : 'view_appointment'
        },
        page_container: $('.container_content'), //not body, should be the html part under header
        appointments_list_container: $('ul.appointments'),
        initialize : function(){
            _.bindAll(this, 'view_appointment');
            this.page_container.html($(this.el).html(_.template(appointment_list_temp)));
            this.appointments_list = new appointments_list();
            this.appointments_list.bind('add', this.appendAppointment);
            this.appointments_list.fetch({add:true});
            if(this.appointments_list.length==0){
                    $('.no_appointment').show();  //show when local storage has no data
            }

        },
        view_appointment: function(e){
            var id = $(e.target).data('id'); // get the model id through data
            route.exports.navigate("show_appointment/"+id,true,true);
            return false;
        },
        appendAppointment : function(model){
            var a = new appointment_view({model:model});
            $('ul.appointments').prepend(a.render());
        }
    });

    return appointment_list_view;
});