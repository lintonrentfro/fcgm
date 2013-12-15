/*
Set "home' view at startup
 */
Session.set("current_view", "home");

/*
Global Handlebars Template Helpers
 */
Handlebars.registerHelper("logged_in", function() {
    return Meteor.user();
});
Handlebars.registerHelper("my_characters", function() {
    return player_characters.find({ "owner" : Meteor.userId()});
});
Handlebars.registerHelper("my_games", function() {
    return games.find({ "players" : Meteor.userId() });
});
Handlebars.registerHelper("current_game", function() {
    return Fate_Core.Games.read(Session.get("current_game"));
});
Handlebars.registerHelper("current_character", function() {
    return Fate_Core.Characters.read(Session.get("current_character"));
});
Handlebars.registerHelper("top_nav", function() {
    return Session.get("top_nav");
});

/*
Global Key/Value Helper
 */
Handlebars.registerHelper('key_value', function(context, options) {
    var result = [];
    _.each(context, function(value, key, list){
        result.push({key:key, value:value});
    })
    return result;
});

/*
Pass clicked navigation objects to "router".
 */
Template.nav.events({
    "click #nav_home" : function(){
        Fate_Core.router.route("home");
    },
    "click #new_game" : function(){
        Fate_Core.router.route("new_game");
    },
    "click #new_character" : function(){
        Fate_Core.router.route("new_character");
    },
    "click #manage_characters" : function(){
        Fate_Core.router.route("manage_characters");
    },
    "click #share_or_delete" : function(){
        Fate_Core.router.route("share_or_delete");
    },
    "click .game" : function(){
        Fate_Core.router.route(this);
    },
    "click #join_game" : function(){
        Fate_Core.router.route("join_game");
    },
    "click .character" : function(){
        Fate_Core.router.route(this);
    },
    "click #hide_menu" : function(){
        Session.set("top_nav", "hide");
    },
    "click #show_menu" : function(){
        Session.set("top_nav", "show");
    }
});


/*
Handlebars Template Helpers for Each View
 */
Template.main.home = function(){
    if(Session.get("current_view") == "home"){
        return 1
    }
};
Template.main.new_game = function(){
    if(Session.get("current_view") == "new_game"){
        return 1
    }
};
Template.main.new_character = function(){
    if(Session.get("current_view") == "new_character"){
        return 1
    }
};
Template.main.manage_characters = function(){
    if(Session.get("current_view") == "manage_characters"){
        return 1
    }
};
Template.main.share_or_delete_game = function(){
    if(Session.get("current_view") == "share_or_delete_game"){
        return 1
    }
};
Template.nav.hide = function(){
    if(Session.get("top_nav") == "hide"){
        return 1
    }
};

/*
 New Character Form
 */
Template.new_character.events({
    'submit #new_character_form' : function() {
        Fate_Core.Characters.create($("#inputCharacterName").val());
        Fate_Core.router.route("home");
        return false;
    }
});

/*
 Manage Characters View
 */
Template.manage_characters.events({
    'click .delete_character' : function() {
        player_characters.remove( {"_id": this._id} );
    }
});

/*
 As of Meteor 0.6.6.3, Meteor's implementation of Handlebars does not support
 accessing the parent template data, so this workaround was created to store
 data from the parent template temporarily in Session.
 This helper is currently not used, but could be implemented if player character
 information is ever included on the game worksheet. Characters will need to be
 linked to games.
 */
//Template.manage_characters.events({
//    'click .link_character_to_game_1' : function() {
//        Session.set("character", this._id);
//    },
//    'click .link_character_to_game_2' : function() {
//        if(Session.get("character") === this._id){
//            player_characters.update(
//                { _id: Session.get("character")},
//                { $set : {game : "" } }
//            )
//        } else {
//            player_characters.update(
//                { _id: Session.get("character")},
//                { $set : {game : this._id } }
//            )
//        }
//        Session.set("character", null);
//    }
//});

/*
 Share or Delete Games View
 */
Template.share_or_delete_game.events({
    'click .delete_game' : function() {
        games.remove( {"_id": this._id} );
    }
});

/*
 New Game Form
 */
Template.new_game.events({
    'submit #new_game_form' : function() {
        Fate_Core.Games.create($("#inputGameName").val());
        Fate_Core.router.route("home");
        return false;
    }
});