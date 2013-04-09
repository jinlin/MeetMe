define([
    "jquery",
    "underscore",
    "backbone",
    "router",
    'collections/appointments_list',
    'models/appointments_model',
    'temp/appointment_form_temp'
], function($, _, Backbone,route,appointments_list,appointments_model){
    _.templateSettings = {
        interpolate : /\{\{(.+?)\}\}/g
    };
    var create_appointment_view = Backbone.View.extend({
        events : {
            'click .submit_button': 'submit_form'
        },
        page_container: $('.container_content'), //not body, should be the html part under header
        initialize : function(){
            _.bindAll(this, 'submit_form');
            this.page_container.html($(this.el).html(_.template(appointment_form_temp)));
            $('#appointment_start_time_input').datetimepicker(); //initial time picker for start_time
            $('#appointment_end_time_input').datetimepicker();  // initial time picker for end_time
            $('.validate_text').hide();
        },
        submit_form: function(){
            var id = (new Date()).getTime(); //initial the unique id
            var title = $('#appointment_title_input').val();
            var start_time = $('#appointment_start_time_input').val();
            var end_time = $('#appointment_end_time_input').val();
            var name = $('#appointment_name_input').val();
            var description = $('#appointment_description_input').val();
            this.appointments_list = new appointments_list();
            this.appointments_list.fetch();
            if(title == "" || start_time =="" || end_time =="" || name =="" || description ==""){
                $('.validate_text').show();  // validation message
            }else{
                //save the appointment to collections on local storage
                var appointment = new appointments_model({id:id,title:title, start_time: start_time,end_time :end_time, description:description, name:name});
                this.appointments_list.add(appointment);
                appointment.save();
            }
            route.exports.navigate("appointments",true,true);
            return false;
        }
    });

    return create_appointment_view;
});