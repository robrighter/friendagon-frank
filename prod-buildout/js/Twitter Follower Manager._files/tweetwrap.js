
var tweetWrap = function (){
    
    this.getFollowersByScreenName = function (screenname, callback){
        $.getJSON('http://api.twitter.com/1/followers/ids.json?callback=?&screen_name='+screenname, callback);
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
    
}