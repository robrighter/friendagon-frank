var tw;

var insertUser = function (user){
    var template = $('.template').clone();
    template.find('.name a').html(user.screen_name);
    template.find('.name a').attr('href' ,'http://twitter.com/'+user.screen_name);
    template.find('img').attr('src' ,user.profile_image_url);
    template.find('.following .count').html(user.friends_count);
    template.find('.followers .count').html(user.followers_count);
    $(template).appendTo('#userlist').hide().removeClass('template').slideDown('slow');
}

var setProfile = function(userprofile){
  var template = $('.profiletemplate').clone();
  template.find('img').attr('src',userprofile.profile_image_url);
  template.find('following').html('Following: '+userprofile.friends_count);
  template.find('followers').html('Followers: '+userprofile.followers_count);
  $(template).appendTo('#profileinfo').hide().removeClass('profiletemplate').slideDown('slow');
};

$(document).ready(function() {
   
   
   tw = new tweetWrap('robrighter', function(){
       _.map(tw.followers,function(item){
              insertUser(item);
       });
       
       setProfile(tw.personalprofile);
   });
 
 
 });