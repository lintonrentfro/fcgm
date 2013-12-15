/*
 There is currently nothing to prevent a user from running
 a console command to modify a game for which they should
 not have access.
 The update and remove methods had a test to see if the
 currently logged in user's id was in the doc.'players'
 array, but I could not get the syntax correct.
 */
games = new Meteor.Collection("games");
games.allow({
    insert: function () {
        return true;
    },
    update: function(userId, doc) {
        return true;
    },
    remove: function(userId, doc) {
        return true;
    }
});

/*
 Only the owner of a character can update/remove it.
 */
player_characters = new Meteor.Collection("player_characters");
player_characters.allow({
    insert: function() {
        return true;
    },
    update: function(userId, doc) {
        return (userId && doc.owner === userId);
    },
    remove: function(userId, doc) {
        return (userId && doc.owner === userId);
    }
});