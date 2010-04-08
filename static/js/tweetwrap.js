
var tweetWrap = function (screenname, initcallback){
    //TRY THIS http://api.twitter.com/1/statuses/friends.json to get around the rate limit
    
    var initializationcallback = initcallback;
    this.followers = [];
    this.following = [];
    this.reciprications = [];
    this.fans = [];
    this.toogoodforme = [];
    this.personalprofile = {};
    this.userscreenname = screenname;
    
    var that = this;
    
    var getFollowers = function (cursor){
        $.ajax({
            'url': 'http://api.twitter.com/1/statuses/followers.json?callback=?&cursor='+cursor,
            success: function(result) {
                console.log(result);
                console.log("Followers recieved: "+ result.users.length +" users and a cursor of: " + result.next_cursor);
                that.followers = that.followers.concat(result.users);
                if(result.next_cursor == 0){
                    console.log("Found all of the followers. A total of " + that.followers.length);
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
            'url': 'http://api.twitter.com/1/statuses/friends.json?callback=?&cursor='+cursor,
            success: function(result) {
                console.log(result);
                console.log("Following recieved: "+ result.users.length +" users and a cursor of: " + result.next_cursor);
                that.following = that.following.concat(result.users);
                if(result.next_cursor == 0){
                    console.log("Found all of the following. A total of " + that.following.length);
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
        console.log("Followers: "+that.followers.length + " Following:"+that.following.length);
        var followersnames = _.map(that.followers, function(item){
           return item.screen_name; 
        });
        var followingnames = _.map(that.following, function(item){
           return item.screen_name; 
        });
        var recipricationnames = _.intersect(followersnames, followingnames);
        console.log("Reciprications:" + recipricationnames.length);
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
        
        $.getJSON('http://api.twitter.com/1/users/show.json?callback=?&screen_name='+this.userscreenname,function(data){
            that.personalprofile = data;
            console.log('Recieved the UserProfile:');
            console.log(that.personalprofile);
            // Ok initialization is done, go ahead and call the callback
            initializationcallback(); 
        }); 
    }
    
    
    
    
    this.getFollowersByUserId = function (userid, callback){
        $.getJSON('http://api.twitter.com/1/followers/ids.json?callback=?&user_id='+userid, callback);
    }
    
    this.getUserDetailByScreenName = function (screenname, callback){
        $.getJSON('http://api.twitter.com/1/users/show.json?callback=?&screen_name='+screenname,callback);
    }
    
    this.getUserDetailByUserId = function (userid, callback){
        $.getJSON('http://api.twitter.com/1/users/show.json?callback=?&user_id='+userid,callback);
    }
    
    var init = function(){
        getFollowers(-1);
    };
    
    init();
    
}