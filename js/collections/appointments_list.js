define([
    'jquery',
    'underscore',
    'backbone',
    'models/appointments_model',
    'libs/backbone/backbone-localStorage'
], function($, _, Backbone,appointments_model ){
    var appointment_list = Backbone.Collection.extend({
        model: appointments_model,
        localStorage: new Backbone.LocalStorage("appointmentList") //local storage name appointmentList
    });
    return appointment_list;
});