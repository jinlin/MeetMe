

DEMO Link: 
   http://ec2-54-224-138-29.compute-1.amazonaws.com/jinlin/meetup/home.html#appointments

Requirement:
    Create an appointment  ->  clicking Create button 
    View Appointments   ->  shows home page after create
    view a single appointment ->  clicking the specific appoinemnt
    Edit an appointment -> edit button on single appoinement page right corner top 
    Delete an appoinment -> delete button on single appoinemnt page bottom

Code structure: 
  Backbone
     Model  -> appointment
     Collection -> List of appointment
     localStorage -> data storage for front -end since no db need
     router -> redirect         
     temp ->  global string variable to read the html templates file
              (The best way to initial template is to use text.js to include the extenal template html file, however text.js was creating the way by using http ajax to load the external template html file.  It only works under localhost or webserver host. since it is front-end project, so I use the global string way) 

  Require.js -> a way to organize files
  Text.js ->  removed  
  underscore -> use with backbone
  Jquery -> mutiple operations
  JqueryUI/Jquery_time_picker -> use for time picker
  HTML5/CSS3 for webapp design 
	
	
    
  
       
