//50506
var tw;
var twcompare;

var marked = new function(){
    this.nofollowbacks = false;
    this.followbacks = false;
    this.fans = false;
    this.following = false;
    this.followers = false;
}

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
    profile.find('#compare').slideDown('slow');
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
    setTimeout("$('#userlist').slideDown('slow');applyAllMarks();",1);
    
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

var setMiniStatusBar = function(percent, message){
    $('#miniprogressbar').css('width', (percent+'%'));
    $('#miniprogressstatus span').html( (message || '') );
}

var showError = function(error){
    var profile = $('.profile');
    profile.find('.name').html(theuser);
    profile.find('img').attr('src' ,'/images/fail-avatar.png');
    $('#errorbox span').html(error);
    $('#progressbox').slideUp('slow');
    $('#errorbox').slideDown('slow');
}

var startCompare = function(){
    //if(twcompare && (twcompare.userscreenname == $('.profile #compare input').val())){
        //do nothing
    //}
    //else{
        //Show the progress bar and clear out any controls that may be visible
        $('#miniprogressbox').slideDown('slow');
        $('#compare #controls').slideUp('slow');
        //calculate the graph of twcompare
        compareuser = $('.profile #compare input').val();
        $('#miniprogressbox').slideDown('slow');
        twcompare = new tweetWrap(compareuser, function(){
            $('#miniprogressbox').slideUp('slow');
            $('#compare #controls').slideDown('slow');
            setMiniStatusBar(0, 'Calculating...');
        },
        function(progress, status){
            setMiniStatusBar(progress, status);
        },
        function(error){
            showMiniError(error);
        });
    //}  
};

var applyAllMarks = function(){
    if(marked.nofollowbacks)
        markNoFollowbacks(false);
    if(marked.followbacks)
        markFollowbacks(false);
    if(marked.fans)
        markFans(false);
    if(marked.following)
        markFollowing(false);
    if(marked.followers)
        markFollowers(false);
}

var markNoFollowbacks = function(toggle){
    if(toggle && marked.nofollowbacks){
        _.map(twcompare.toogoodforme, unmarkUser);
        $('#marknofollowbacks').removeClass('selected');
    }
    else{
        _.map(twcompare.toogoodforme, markUser);
        $('#marknofollowbacks').addClass('selected');
    }
    if(toggle)
        marked.nofollowbacks = !marked.nofollowbacks;
}

var markFollowbacks = function(toggle){
    if(toggle && marked.followbacks){
        _.map(twcompare.reciprications, unmarkUser);
        $('#markfollowbacks').removeClass('selected');
    }
    else{
        _.map(twcompare.reciprications, markUser);
        $('#markfollowbacks').addClass('selected');
    }
    if(toggle)
        marked.followbacks = !marked.followbacks;
}

var markFans = function(toggle){
    if(toggle && marked.fans){
        _.map(twcompare.fans, unmarkUser);
        $('#markfans').removeClass('selected');
    }
    else{
        _.map(twcompare.fans, markUser);
        $('#markfans').addClass('selected');
    }
    if(toggle)
        marked.fans = !marked.fans;
}

var markFollowers = function(toggle){
    if(toggle && marked.followers){
        _.map(twcompare.followers, unmarkUser);
        $('#markfollowers').removeClass('selected');
    }
    else{
        _.map(twcompare.followers, markUser);
        $('#markfollowers').addClass('selected');
    }
    if(toggle)
        marked.followers = !marked.followers;
}

var markFollowing = function(toggle){
    if(toggle && marked.following){
        _.map(twcompare.following, unmarkUser);
        $('#markfollowing').removeClass('selected');
    }
    else{
        _.map(twcompare.following, markUser);
        $('#markfollowing').addClass('selected');
    }
    if(toggle)
        marked.following = !marked.following;
}

var markUser = function(user){
    $('.userclass' + user.screen_name + ' .name a').css('color', '#62146C');
    $('.userclass' + user.screen_name).addClass('markeduser');
}

var unmarkUser = function(user){
    $('.userclass' + user.screen_name + ' .name a').css('color', '#58B33F');
    $('.userclass' + user.screen_name).removeClass('markeduser');
}

