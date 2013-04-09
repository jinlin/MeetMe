define([
    "jquery",
    "underscore",
    "backbone",
    'collections/appointments_list',
    'router',
    'temp/appointment_detail_temp'
], function($, _, Backbone,appointments_list,route ){
    _.templateSettings = {
        interpolate : /\{\{(.+?)\}\}/g
    };
    var appointment_detail_view = Backbone.View.extend({
        events :{
           'click .delete_button' : 'delete_appointment'
        },
        page_container: $('.container_content'), //not body, should be the html part under header
        initialize : function(){
            _.bindAll(this,'delete_appointment');
            this.page_container.html($(this.el).html(_.template(appointment_detail_temp)));
            this.model_id = this.options.id;   // model id for apopintment model
            this.appointments_list = new appointments_list();
            this.appointments_list.fetch();
            this.model = this.appointments_list.get(this.model_id);
            console.log(JSON.stringify(this.model));
            $('#appointment_title_input').val(this.model.get("title"));
            $('#appointment_start_time_input').val(this.model.get("start_time"));
            $('#appointment_end_time_input').val(this.model.get("end_time"));
            $('#appointment_name_input').val(this.model.get("name"));
            $('#appointment_description_input').val(this.model.get("description"));
            $('.form_input').attr('disabled','disabled');
            $('#appointment_start_time_input').datetimepicker(); //initial time picker for start_time
            $('#appointment_end_time_input').datetimepicker();  // initial time picker for end_time
        },
        delete_appointment : function(){
            this.model.destroy();
            route.exports.navigate("appointments",true,true);
            return false;
        }


    });

    return appointment_detail_view;
});