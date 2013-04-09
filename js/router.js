define([
    'jquery',
    'underscore',
    'backbone',
    'jqueryUI',
    'timePicker'
],function($,_,Backbone){
    var app = {};
    app.vent = _.extend({}, Backbone.Events);
    app.status = {
        historyAPI : !!(window.history && history.pushState)
    };
    var _pts = {
        'appointments' : 'show_appointments',
        'create' : 'create_appointment',
        'show_appointment/:title' : 'show_appointment'

    };
    app.router = Backbone.Router.extend({
        back_button: $('.back_button'),  //back button
        edit_button: $('.edit_button'),  //edit button
        routes: _pts,   // route url
        show_appointments: function(){
            this.back_button.hide();
            this.edit_button.hide();
            require(['view/appointment_list_view'], function(appointment_list_view){
                new appointment_list_view();
            });
        },
        create_appointment : function(){
            this.back_button.show();
            require([ 'view/appointment_form_view'], function(appointment_form_view){
                    new appointment_form_view();
            });
        },
        show_appointment : function(id){
            this.back_button.show();
            this.edit_button.show();
            console.log("router", id);
            require(['view/appointment_detail_view', ], function(appointment_detail_view){
                  new appointment_detail_view({id: id});
            });
            $('.edit_button_inner').children('.button_text').html('edit').attr('id','edit'); //initial edit button
        }
    });
    var initialize = function(){
        //initialize function
        var app_router = new app.router;
        Backbone.history.start();
        return{
            initialize : initialize
        };
    }
    //the object will export to public usage
    app.exports = {
        navigate : function(uri,trigger, replace){
            if(app.status.historyAPI){
                var app_router = new app.router;
                app_router.navigate(uri, {trigger: trigger,replace: replace});

            }else{
                window.location.href = uri;
            }
        },
        pub : function(event){
            app.vent.trigger(event, _.rest(arguments));
        },

        sub : function(event, callback, context){
            app.vent.on(event, callback, context);
        }
    };
    return {
        exports : app.exports,
        initialize : initialize
    }
});