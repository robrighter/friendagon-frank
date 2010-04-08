tw = new tweetWrap();

var insertUserByUserId = function (userid){
    tw.getUserDetailByUserId(userid,function(data){
           var template = $('.template').clone();
           template.find('.name').html(data.name);
           template.find('img').attr('src' ,data.profile_image_url);
           $(template).appendTo('#userlist').hide().removeClass('template').slideDown('slow');
    })
    
}

$(document).ready(function() {
   tw.getUserDetailByScreenName("robrighter",function(data){
       console.log(data);
   })
   tw.getFollowersByScreenName('robrighter',function(data){
       //console.log('FOUND ' + data.length + ' users');
       _.map(data,function(item){
           insertUserByUserId(item);
       });
       
   })
 });