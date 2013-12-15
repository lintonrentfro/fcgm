/*
This application is intended to be "pure" Meteor (no Meteorite),
so IronRouter could not be used. This custom router was created
as a substitute.
 */

Fate_Core.router = {
    route : function(route) {
        /*
        Some of the reactivity of Meteor.js depends on changing a Session attribute so
        resetting them guarantees that the view will update and only one view will be
        seen at a time.
         */
        Session.set("current_character", null);
        Session.set("current_view", null);
        Session.set("current_game", null);

        /*
        If 'route' is a string, show the corresponding view.
         */
        if(typeof route === 'string'){
            switch (route) {
                case "home" :
                    Session.set("current_view", "home");
                    d3.select(window).on('resize', function() { });
                    break;
                case "new_game" :
                    Session.set("current_view", "new_game");
                    break;
                case "new_character" :
                    Session.set("current_view", "new_character");
                    break;
                case "manage_characters" :
                    Session.set("current_view", "manage_characters");
                    break;
                case "share_or_delete" :
                    Session.set("current_view", "share_or_delete_game");
                    break;
                case "join_game" :
                    Fate_Core.Games.join(prompt("Enter Game Code", ""));
                    break;
            }
        } else {
            /*
             If 'route' is an object, see if it's a game object or a character
             object and load the corresponding view for that type of object.
             */

            var value = route._id;
            var field = "_id";
            var obj = {};
            obj[field] = value;

            if (games.find(obj).count() === 1) {
                Session.set("current_game", route._id);
                setTimeout(function(){Fate_Core.svg_game.draw_sheet()}, 50);
            }
            if (player_characters.find(obj).count() === 1) {
                Session.set("current_character", route._id);
                setTimeout(function(){Fate_Core.svg_character.draw_sheet()}, 50);
            }
        }
    }
}