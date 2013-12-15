/*
Publishing all the game and character data is sending all of it
to all of the users.  This is insecure in that a user could view
the data belonging to another user.
 */

Meteor.publish("my_games", function(){
    return games.find();
});

Meteor.publish("my_player_characters", function(){
    return player_characters.find();
});

