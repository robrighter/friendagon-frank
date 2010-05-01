//50506
var tw;

var insertUser = function (user){
    var template = $('.template').clone();
    template.find('.name a').html(user.screen_name + '<span><strong>' + user.location + '</strong><br/>' + user.description + '</span>');
    template.find('.name a').attr('href' ,'http://friendagon.com/'+user.screen_name + '/');
    template.find('img').attr('src' ,user.profile_image_url);
    template.find('.following .count').html(user.friends_count);
    template.find('.followers .count').html(user.followers_count);
    template.find('.minus').attr('onClick','unfollow("'+ user.screen_name +'",function() {notifyUnfollowed("'+user.screen_name+'");});');
    template.find('.plus').attr('onClick','follow("'+ user.screen_name +'",function() {notifyFollowed("'+user.screen_name+'");});');
    $(template).appendTo('#userlist').hide().removeClass('template').addClass('added').addClass('userclass' + user.screen_name).show();
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
    profile.find('.details .followbackpercent .count').html(tw.followbackprobability + '%');
    profile.find('.details .topsyinfluence .count').html(tw.topsyinfluence + '');
    profile.find('.details').slideDown('slow');
    document.title = user.name + ' - Friendagon'
};

var unfollow = function(screenname,callback){
    $.getJSON('/__unfollow?screen_name='+screenname, function(data){
        if(data.error){
            authenticate();
        }
        else{
            callback();
        }
    });
}

var follow = function(screenname,callback){
    $.getJSON('/__follow?screen_name='+screenname, function(data){
        if(data.error){
            authenticate();
        }
        else{
            callback();
        }
    });
}

var notifyUnfollowed = function(screen_name){
    $('.userclass' + screen_name).find('.notify').html('- Unfollowed');
    $('.userclass' + screen_name).addClass('unfolloweduser');
    $('.userclass' + screen_name + ' .name a').css('color', '#7C1316');
}

var notifyFollowed = function(screen_name){
    $('.userclass' + screen_name).find('.notify').html('- Followed');
    $('.userclass' + screen_name).addClass('followeduser');
}

var authenticate = function(){
    $("body").animate({ scrollTop: 0 }, 500);
    $("#authbox").fadeIn('slow');
}

var openAuthenticateBox = function(){
    window.open('./oauth','Connect with Twitter','menubar=no,location=no,resizable=yes,scrollbars=yes,status=yes,width=800,height=400');
    hideAuthenticate();
}

var hideAuthenticate = function(){
    $("#authbox").fadeOut('slow');
}

var clearList = function() {
    $('.added').remove();
    $('.box').removeClass('selected');
}

var populateList = function(list){
    $('#userlist').hide();
    _.map(list,function(item){
              insertUser(item);
    });
    setTimeout("$('#userlist').slideDown('slow');",1);
    
}

var replaceList = function(list){
    $('.profile').find('img').attr('src' ,'/images/spinner.gif');
    clearList();
    populateList(list);
    $('.profile').find('img').attr('src' ,tw.personalprofile.profile_image_url);
}

var setStatusBar = function(percent, message){
    $('#progressbar').css('width', (percent+'%'));
    $('#progressstatus span').html( (message || '') );
}

var showError = function(error){
    var profile = $('.profile');
    profile.find('.name').html(theuser);
    profile.find('img').attr('src' ,'/images/fail-avatar.png');
    $('#errorbox span').html(error);
    $('#progressbox').slideUp('slow');
    $('#errorbox').slideDown('slow');
}