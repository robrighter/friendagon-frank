$(document).ready(function() {
   tw = new tweetWrap(theuser, function(){
       populateList(tw.toogoodforme);
       setProfile(tw.personalprofile);
       $('#progressbox').slideUp('slow');
   },
   function(progress, status){
       setStatusBar(progress, status);
   },
   function(error){
       showError(error);
   });
   
   $('.profile .following').bind('click', function() {
     replaceList(tw.following);
     $('.profile .following').addClass('selected');
   });
   
   $('.profile .followers').bind('click', function() {
     replaceList(tw.followers);
     $('.profile .followers').addClass('selected');
   });
   
   $('.profile .followbacks').bind('click', function() {
     replaceList(tw.reciprications);
     $('.profile .followbacks').addClass('selected');
   });
   
   $('.profile .fans').bind('click', function() {
     replaceList(tw.fans);
     $('.profile .fans').addClass('selected');
   });

   $('.profile .nofollowback').bind('click', function() {
     replaceList(tw.toogoodforme);
     $('.profile .nofollowback').addClass('selected');
   });
   
 });
 