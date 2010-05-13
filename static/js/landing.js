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
   
   getupdate(-1);
      
 });
 
var lastrecieved = "-1";
function getupdate(since){
    var url = "/__update";
	if(since != ""){
        url = url + "?since="+ escape(since);
	}

    $.getJSON(url,
	    function(data){
		    var itemstoadd = _.map(data.reverse(), function(item){
			    lastrecieved = item["offset"];
			    return recentmarkup(item['value']); 
			 });

			var uc = $("#recent");
			_.map(itemstoadd, function(item){     
				uc.prepend(item).show('slow');
			});
			//removeoutofframeboxes();
			setTimeout('getupdate(lastrecieved)', 1000);
		});
}

function recentmarkup(data){
    return "<div class='item' stype='display:none;'><a href='/"+data.screenname+"' ><img src='"+data.profile_image_url+"' /></a></div>";
}