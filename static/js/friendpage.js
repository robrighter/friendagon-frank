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
   
   $('.profile .details .follow').bind('click', function() {
      follow(tw.userscreenname, function(){
          $('.profile .details .follow').css('background-color', '#D8F2AC');
      });
    });
   
    $('.profile .details .unfollow').bind('click', function() {
       unfollow(tw.userscreenname, function(){
       $('.profile .details .unfollow').css('background-color', '#E59B97');
      });
    });
    
    //tooltips
    $('.profile .following').bind('mouseenter', function() {
        $('.profile .following .tooltip').fadeIn('fast');
     });

     $('.profile .following').bind('mouseleave', function() {
        $('.profile .following .tooltip').fadeOut('fast');
     });    
     $('.profile .followers').bind('mouseenter', function() {
        $('.profile .followers .tooltip').fadeIn('fast');
     });

     $('.profile .followers').bind('mouseleave', function() {
        $('.profile .followers .tooltip').fadeOut('fast');
     });    
     $('.profile .fans').bind('mouseenter', function() {
        $('.profile .fans .tooltip').fadeIn('fast');
     });

     $('.profile .fans').bind('mouseleave', function() {
        $('.profile .fans .tooltip').fadeOut('fast');
     });
     $('.profile .followbacks').bind('mouseenter', function() {
        $('.profile .followbacks .tooltip').fadeIn('fast');
     });

     $('.profile .followbacks').bind('mouseleave', function() {
        $('.profile .followbacks .tooltip').fadeOut('fast');
     });
       
     $('.profile .nofollowback').bind('mouseenter', function() {
        $('.profile .nofollowback .tooltip').fadeIn('fast');
     });

     $('.profile .nofollowback').bind('mouseleave', function() {
        $('.profile .nofollowback .tooltip').fadeOut('fast');
     });
     
     $('.profile .details .followbackpercent').bind('mouseenter', function() {
         $('.profile .details .followbackpercent .tooltip').fadeIn('fast');
      });

      $('.profile .details .followbackpercent').bind('mouseleave', function() {
         $('.profile .details .followbackpercent .tooltip').fadeOut('fast');
      });
      $('.profile .details .topsyinfluence').bind('mouseenter', function() {
           $('.profile .details .topsyinfluence .tooltip').fadeIn('fast');
      });
  
      $('.profile .details .topsyinfluence').bind('mouseleave', function() {
           $('.profile .details .topsyinfluence .tooltip').fadeOut('fast');
      });
      
      //compare
      $('.profile #compare #gocompare').bind('click', function() {
          startCompare();
      });

      $('.profile #compare form').submit(function(){
          startCompare();
          return false;
      });
      
      $('.profile #compare #tab').bind('click', function() {
            $('.profile #compare').animate({
                top: '0px'
            }, 400, 'linear');
      });   
       
                
 });
 