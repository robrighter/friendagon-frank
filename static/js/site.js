//50506
var tw;

var insertUser = function (user){
    var template = $('.template').clone();
    template.find('.name a').html(user.screen_name);
    template.find('.name a').attr('href' ,'http://twitter.com/'+user.screen_name);
    template.find('img').attr('src' ,user.profile_image_url);
    template.find('.following .count').html(user.friends_count);
    template.find('.followers .count').html(user.followers_count);
    $(template).appendTo('#userlist').hide().removeClass('template').addClass('added').slideDown('slow');
}

var setProfile = function(user){
    var profile = $('.profile');
    profile.find('.name').html(user.screen_name);
    profile.find('img').attr('src' ,user.profile_image_url);
    profile.find('.following .count').html(user.friends_count);
    profile.find('.followers .count').html(user.followers_count);
    profile.find('.followbacks .count').html(tw.reciprications.length);
    profile.find('.fans .count').html(tw.fans.length);
    profile.find('.nofollowback .count').html(tw.toogoodforme.length);
};

var clearList = function() {
    $('.added').remove();
    $('.box').removeClass('selected');
}

var populateList = function(list){
    _.map(list,function(item){
              insertUser(item);
    });
}

var replaceList = function(list){
    $('.profile').find('img').attr('src' ,'/images/spinner.gif');
    clearList();
    populateList(list);
    $('.profile').find('img').attr('src' ,tw.personalprofile.profile_image_url);
}

$(document).ready(function() {
   tw = new tweetWrap('robrighter', function(){
       populateList(tw.toogoodforme);
       setProfile(tw.personalprofile);
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