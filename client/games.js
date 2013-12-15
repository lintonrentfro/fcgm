Fate_Core.Games = {
    random_password : function(length){
        var random_password = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < length; i++ )
            random_password += possible.charAt(Math.floor(Math.random() * possible.length));
        return random_password;
    },
    create : function(name){
        var password = Fate_Core.Games.random_password(10);
        games.insert({
            "name" : name,
            "setting" : "",
            "players" : [ Meteor.userId() ],
            "owner" : Meteor.userId(),
            "secret_code_to_join" : password,
            "current_issues" : [ "", "" ],
            "pending_issues" : [ "", "" ],
            "faces_and_places" : [
                [ {"name" : "" }, { "aspect" : "" } ],
                [ {"name" : "" }, { "aspect" : "" } ],
                [ {"name" : "" }, { "aspect" : "" } ],
                [ {"name" : "" }, { "aspect" : "" } ],
                [ {"name" : "" }, { "aspect" : "" } ],
                [ {"name" : "" }, { "aspect" : "" } ]
            ],
            "dials" : {
                "Number of Aspects" : 5,
                "Number of Phases" : 3,
                "Skill Cap" : "Great +4",
                "Pyramid or Columns" : "Pyramid",
                "Number of Columns" : "N/A",
                "Refresh Rate" : 3,
                "Initial Stunts" : 3,
                "Types of Stress Tracks" : "Physical, Mental",
                "Default Stress Boxes" : 2,
                "Default Consequence Slots" : "2/4/6"
            },
            "skills" : [
                "", "", "", "", "",
                "", "", "", "", ""
            ],
            "stunts_and_extras" : ""
        });
    },
    read : function(game_id){
        return games.findOne({"_id":game_id});
    },
    join : function(password){
//        console.log("running join method");
        var game = games.findOne( { "secret_code_to_join" : password } );
        if(game){
//            console.log("found the game");
            var already_in_game = games.findOne(
                { "players" : Meteor.userId(), "_id" : game._id } );
            if(already_in_game){
//                console.log("player already in this game");
            } else {
                if(game.players.length < 7){
//                    console.log("i'm trying to add you!");
                    games.update(
                        { "_id" : game._id },
                        { $push : { players : Meteor.userId() } }
                    );
                }
            }
        }
    }
};