$(document).ready(function() {   
   $('#homesearch .go').bind('click', function() {
        window.location = '/' + $('#homesearch input').val();
   });   
 });