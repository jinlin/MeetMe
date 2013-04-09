require.config({
	baseUrl : 'js',
	paths : {
		jquery: 'libs/jquery/jquery-min',
		underscore: 'libs/underscore/underscore-min',
		backbone: 'libs/backbone/backbone-min',
        localStorage: "lib/backbone/backbone-localStorage",
        templates: '../templates',
        jqueryUI: 'libs/jquery/jquery-ui',
        timePicker: 'libs/jquery/jquery-ui-timepicker-addon'
	},
	shim: {
		jquery: {
			exports : '$'
		},
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		}
	}


});
require([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'collections/appointments_list',
    'jqueryUI',
    'timePicker'
],function($,_,Backbone,route,appointments_list){
  var temp = Backbone.View.extend({
	el: 'body',
	events : {
        'click #edit' : 'edit_appointment',
        'click #save' : 'save_appointment'
	},
	initialize: function(){
		_.bindAll(this,"edit_appointment");
        route.initialize();
        route.exports.navigate("appointments",true,true);
        },
      edit_appointment: function(e){
          $(".form_input").removeAttr('disabled');
          $('#appointment_title_input').focus();
          $(e.target).html('save');
          $(e.target).attr('id','save');
          return false;
      },
      save_appointment: function(e){
          this.appointments_list = new appointments_list();
          var model_id =$('.container_content').children('div').attr('id');
          this.appointments_list.fetch();
          var model = this.appointments_list.get(model_id);
          var title = $('#appointment_title_input').val();
          var start_time = $('#appointment_start_time_input').val();
          var end_time = $('#appointment_end_time_input').val();
          var name = $('#appointment_name_input').val();
          var description = $('#appointment_description_input').val();
          var model_set = {title: title, id:model_id, start_time:start_time,end_time:end_time,name:name,description:description}
          if(title == "" || start_time =="" || end_time =="" || name =="" || description ==""){
              $('.validate_text').show();
          }else{
              model.set({title:title,start_time:start_time, end_time: end_time,name:name,description:description});
              model.save();
              this.appointments_list.fetch(model);
          }
          $('.form_input').attr('disabled','disabled');
          $(e.target).html('edit');
          $(e.target).attr('id','edit');
          return false;
      }

  });



  new temp();
});