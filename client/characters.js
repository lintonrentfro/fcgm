Fate_Core.Characters = {
    create : function(name){
        player_characters.insert({
            "name" : name,
            "owner" : Meteor.userId(),
            "game" : "",
            "description" : "",
            "refresh" : "",
            "aspects" : {
                "High Concept" : "",
                "Trouble" : "",
                "Phase 1" : "",
                "Phase 2" : "",
                "Phase 3" : ""
            },
            "skills_superb" : [ "","","","","" ],
            "skills_fair" : [ "","","","","" ],
            "skills_great" : [ "","","","","" ],
            "skills_good" : [ "","","","","" ],
            "skills_average" : [ "","","","","" ],
            "extras" : "",
            "stunts" : "",
            "physical_stress" : {
                "1" : "ok",
                "2" : "ok",
                "3" : "ok",
                "4" : "ok"
            },
            "mental_stress" : {
                "1" : "ok",
                "2" : "ok",
                "3" : "ok",
                "4" : "ok"
            },
            "consequences" : {
                "Mild 1" : "",
                "Mild 2" : "",
                "Moderate" : "",
                "Severe" : ""
            }
        });
    },
    read : function(character_id){
        return player_characters.findOne({"_id":character_id});
    }
};