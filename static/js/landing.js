var startSearch = function(){
    window.location = '/' + $('#homesearch input').val();
}

$(document).ready(function() {   
   $('#homesearch .go').bind('click', function() {
        startSearch();
   });
   
   $('#searchform').submit(function(){
        startSearch();
        return false;
   });   
 });