
var tweetWrap = function (screenname, initcallback, notifyprogress, abandon){
    //TRY THIS http://api.twitter.com/1/statuses/friends.json to get around the rate limit
    
    var initializationcallback = initcallback;
    this.followers = [];
    this.following = [];
    this.reciprications = [];
    this.fans = [];
    this.toogoodforme = [];
    this.personalprofile = {};
    this.userscreenname = screenname;
    this.notifyprogresscallback = notifyprogress;
    this.abandoncallback = abandon;
    
    var progress = 0;
    
    var that = this;
    
    var getFollowers = function (cursor){
        $.ajax({
            'url': ('http://api.twitter.com/1/statuses/followers.json?callback=?&screen_name='+ that.userscreenname +'&cursor='+cursor),
            success: function(result) {
                if(result.error){
                    that.abandoncallback(result.error);
                }
                progress += pageProgressPercentage(parseInt(that.personalprofile.followers_count)); 
                that.followers = that.followers.concat(result.users);
                that.notifyprogresscallback(progress,"Followers recieved: "+ that.followers.length);
                if(result.next_cursor == 0){
                    getFollowing(-1); //ok we got everyone, lets move on to grab all of the followING
                }
                else{
                    getFollowers(result.next_cursor);   
                }
            },
            dataType:'json'
        });
    }
    
    var getFollowing = function (cursor){
        $.ajax({
            'url': ('http://api.twitter.com/1/statuses/friends.json?callback=?&screen_name='+ that.userscreenname + '&cursor=' + cursor),
            success: function(result) {
                if(result.error){
                    that.abandoncallback(result.error);
                }
                console.log(result);
                console.log("Following recieved: "+ result.users.length +" users and a cursor of: " + result.next_cursor);
                progress += pageProgressPercentage(parseInt(that.personalprofile.friends_count));
                that.following = that.following.concat(result.users);
                that.notifyprogresscallback(progress,"Following recieved: "+ that.following.length);
                if(result.next_cursor == 0){
                    computeRemainingArrays();
                }
                else{
                    getFollowing(result.next_cursor);   
                }
            },
            dataType:'json'
        });
    }
    
    var computeRemainingArrays = function(){
        var followersnames = _.map(that.followers, function(item){
           return item.screen_name; 
        });
        var followingnames = _.map(that.following, function(item){
           return item.screen_name; 
        });
        var recipricationnames = _.intersect(followersnames, followingnames);
        
        that.notifyprogresscallback(78,"Reciprications:" + recipricationnames.length);
        //Now that we have the reciprication list, we can process the remaining arrays
        _.each(that.followers, function(user){
           if(_.detect(recipricationnames, function(name){return (user.screen_name === name);}) ){
               that.reciprications.push(user);
           }
           else{
               that.fans.push(user);
           }
        });
        
        _.each(that.following, function(user){
           if(!_.detect(recipricationnames, function(name){return (user.screen_name === name);}) ){
               that.toogoodforme.push(user);
           }
        });
        that.notifyprogresscallback(100,"All Done!");
        initializationcallback();
         
    }
    
    
   var pageProgressPercentage = function(totalnumbertopage){
       var basepercent = 33;
       var percentperpage = (100/totalnumbertopage);
       if(percentperpage > 1){
           percentperpage = 1;
       }
       
       console.log('CHECK IT=> ' + (percentperpage*basepercent));
       return percentperpage*basepercent;
   }
    
    
    var getFollowersByUserId = function (userid, callback){
        $.getJSON('http://api.twitter.com/1/followers/ids.json?callback=?&user_id='+userid, callback);
    }
    
    var getUserDetailByScreenName = function (screenname, callback){
        console.log('You are here: http://api.twitter.com/1/users/show.json?callback=?&screen_name='+screenname);
        $.getJSON('http://api.twitter.com/1/users/show.json?callback=?&screen_name='+screenname,callback);
    }
    
    var getUserDetailByUserId = function (userid, callback){
        $.getJSON('http://api.twitter.com/1/users/show.json?callback=?&user_id='+userid,callback);
    }
    
    var init = function(){
        getUserDetailByScreenName(that.userscreenname,function(data){
            if(data.error){
                that.abandoncallback(data.error);
            }
            that.personalprofile = data;
            console.log('Recieved the UserProfile:');
            console.log(that.personalprofile);
            getFollowers(-1);
        });
    };
    
    init();
    
}