/*
 This is all the d3.js data needed to draw the character
 and game sheets.
 */
Fate_Core.sheet_data = {
    "height" : 500,
    "width" : 500,
    "header_info" : {
        "height" : 20,
        "text_size" : 15,
        "text_margin" : 5
    },
    "headers" : [
        {
            "width" : 470,
            "x" : 15,
            "y" : 5,
            "text" : "ID"
        },
        {
            "width" : 160,
            "x" : 15,
            "y" : 90,
            "text" : "ASPECTS"
        },
        {
            "width" : 300,
            "x" : 185,
            "y" : 90,
            "text" : "SKILLS"
        },
        {
            "width" : 470,
            "x" : 15,
            "y" : 250,
            "text" : "EXTRAS"
        },
        {
            "width" : 470,
            "x" : 15,
            "y" : 310,
            "text" : "STUNTS"
        },
        {
            "width" : 150,
            "x" : 15,
            "y" : 370,
            "text" : "PHYSICAL STRESS"
        },
        {
            "width" : 150,
            "x" : 15,
            "y" : 430,
            "text" : "MENTAL STRESS"
        },
        {
            "width" : 310,
            "x" : 175,
            "y" : 370,
            "text" : "CONSEQUENCES"
        }
    ],
    "field_box_info" : {
        "text_size" : 8,
        "text_margin_x" : 3,
        "text_margin_y" : 7,
        "height" : 20
    },
    "simple_fields" : [
        {
            "width" : 385,
            "x" : 15,
            "y" : 30,
            "text" : "Name",
            "db" : "name"
        },
        {
            "width" : 470,
            "x" : 15,
            "y" : 55,
            "text" : "Description",
            "db" : "description"
        },
        {
            "width" : 80,
            "x" : 405,
            "y" : 30,
            "text" : "Refresh",
            "db" : "refresh"
        },
        {
            "width" : 470,
            "x" : 15,
            "y" : 275,
            "text" : "",
            "db" : "extras"
        },
        {
            "width" : 470,
            "x" : 15,
            "y" : 335,
            "text" : "",
            "db" : "stunts"
        }
    ],
    "aspects" : [
        {
            "width" : 160,
            "x" : 15,
            "y" : 115,
            "text" : "High Concept",
            "db" : "High Concept"
        },
        {
            "width" : 160,
            "x" : 15,
            "y" : 140,
            "text" : "Trouble",
            "db" : "Trouble"
        },
        {
            "width" : 160,
            "x" : 15,
            "y" : 165,
            "text" : "",
            "db" : "Phase 1"
        },
        {
            "width" : 160,
            "x" : 15,
            "y" : 190,
            "text" : "",
            "db" : "Phase 2"
        },
        {
            "width" : 160,
            "x" : 15,
            "y" : 215,
            "text" : "",
            "db" : "Phase 3"
        }
    ],
    "skills" : [
        {
            "width" : 45,
            "x" : 240,
            "y" : 115,
            "type" : "superb",
            "db" : 0
        },
        {
            "width" : 45,
            "x" : 290,
            "y" : 115,
            "type" : "superb",
            "db" : 1
        },
        {
            "width" : 45,
            "x" : 340,
            "y" : 115,
            "type" : "superb",
            "db" : 2
        },
        {
            "width" : 45,
            "x" : 390,
            "y" : 115,
            "type" : "superb",
            "db" : 3
        },
        {
            "width" : 45,
            "x" : 440,
            "y" : 115,
            "type" : "superb",
            "db" : 4
        },
        {
            "width" : 45,
            "x" : 240,
            "y" : 140,
            "type" : "great",
            "db" : 0
        },
        {
            "width" : 45,
            "x" : 290,
            "y" : 140,
            "type" : "great",
            "db" : 1
        },
        {
            "width" : 45,
            "x" : 340,
            "y" : 140,
            "type" : "great",
            "db" : 2
        },
        {
            "width" : 45,
            "x" : 390,
            "y" : 140,
            "type" : "great",
            "db" : 3
        },
        {
            "width" : 45,
            "x" : 440,
            "y" : 140,
            "type" : "great",
            "db" : 4
        },
        {
            "width" : 45,
            "x" : 240,
            "y" : 165,
            "type" : "good",
            "db" : 0
        },
        {
            "width" : 45,
            "x" : 290,
            "y" : 165,
            "type" : "good",
            "db" : 1
        },
        {
            "width" : 45,
            "x" : 340,
            "y" : 165,
            "type" : "good",
            "db" : 2
        },
        {
            "width" : 45,
            "x" : 390,
            "y" : 165,
            "type" : "good",
            "db" : 3
        },
        {
            "width" : 45,
            "x" : 440,
            "y" : 165,
            "type" : "good",
            "db" : 4
        },
        {
            "width" : 45,
            "x" : 240,
            "y" : 190,
            "type" : "fair",
            "db" : 0
        },
        {
            "width" : 45,
            "x" : 290,
            "y" : 190,
            "type" : "fair",
            "db" : 1
        },
        {
            "width" : 45,
            "x" : 340,
            "y" : 190,
            "type" : "fair",
            "db" : 2
        },
        {
            "width" : 45,
            "x" : 390,
            "y" : 190,
            "type" : "fair",
            "db" : 3
        },
        {
            "width" : 45,
            "x" : 440,
            "y" : 190,
            "type" : "fair",
            "db" : 4
        },
        {
            "width" : 45,
            "x" : 240,
            "y" : 215,
            "type" : "average",
            "db" : 0
        },
        {
            "width" : 45,
            "x" : 290,
            "y" : 215,
            "type" : "average",
            "db" : 1
        },
        {
            "width" : 45,
            "x" : 340,
            "y" : 215,
            "type" : "average",
            "db" : 2
        },
        {
            "width" : 45,
            "x" : 390,
            "y" : 215,
            "type" : "average",
            "db" : 3
        },
        {
            "width" : 45,
            "x" : 440,
            "y" : 215,
            "type" : "average",
            "db" : 4
        }
    ],
    "physical_stress" : [
        {
            "width" : 20,
            "x" : 15,
            "y" : 395,
            "text" : "",
            "db" : 1
        },
        {
            "width" : 20,
            "x" : 45,
            "y" : 395,
            "text" : "",
            "db" : 2
        },
        {
            "width" : 20,
            "x" : 75,
            "y" : 395,
            "text" : "",
            "db" : 3
        },
        {
            "width" : 20,
            "x" : 105,
            "y" : 395,
            "text" : "",
            "db" : 4
        }
    ],
    "mental_stress" : [
        {
            "width" : 20,
            "x" : 15,
            "y" : 455,
            "text" : "",
            "db" : 1
        },
        {
            "width" : 20,
            "x" : 45,
            "y" : 455,
            "text" : "",
            "db" : 2
        },
        {
            "width" : 20,
            "x" : 75,
            "y" : 455,
            "text" : "",
            "db" : 3
        },
        {
            "width" : 20,
            "x" : 105,
            "y" : 455,
            "text" : "",
            "db" : 4
        }
    ],
    "consequences" : [
        {
            "width" : 265,
            "x" : 220,
            "y" : 395,
            "text" : "",
            "db" : "Mild 1"
        },
        {
            "width" : 265,
            "x" : 220,
            "y" : 420,
            "text" : "",
            "db" : "Mild 2"
        },
        {
            "width" : 265,
            "x" : 220,
            "y" : 445,
            "text" : "",
            "db" : "Moderate"
        },
        {
            "width" : 265,
            "x" : 220,
            "y" : 470,
            "text" : "",
            "db" : "Severe"
        }
    ],
    "field_label_info" : {
        "text_size" : 8,
        "text_margin_x" : 0,
        "text_margin_y" : 13
    },
    "field_labels" : [

        // skill labels
        {
            "x" : 185,
            "y" : 115,
            "text" : "Superb (+5)"
        },
        {
            "x" : 185,
            "y" : 140,
            "text" : "Great (+4)"
        },
        {
            "x" : 185,
            "y" : 165,
            "text" : "Good (+3)"
        },
        {
            "x" : 185,
            "y" : 190,
            "text" : "Fair (+2)"
        },
        {
            "x" : 185,
            "y" : 215,
            "text" : "Average (+1)"
        },

        // consequence labels
        {
            "x" : 175,
            "y" : 395,
            "text" : "Mild 1"
        },
        {
            "x" : 175,
            "y" : 420,
            "text" : "Mild 2"
        },
        {
            "x" : 175,
            "y" : 445,
            "text" : "Moderate"
        },
        {
            "x" : 175,
            "y" : 470,
            "text" : "Severe"
        }
    ]
}


Fate_Core.game_sheet_data = {
    "height" : 660,
    "width" : 500,
    "header_info" : {
        "height" : 20,
        "text_size" : 15,
        "text_margin" : 5
    },
    "headers" : [
        {
            "width" : 230,
            "x" : 15,
            "y" : 60,
            "text" : "CURRENT ISSUES"
        },
        {
            "width" : 230,
            "x" : 255,
            "y" : 60,
            "text" : "IMPENDING ISSUES"
        },
        {
            "width" : 470,
            "x" : 15,
            "y" : 145,
            "text" : "FACES AND PLACES"
        },
        {
            "width" : 230,
            "x" : 15,
            "y" : 325,
            "text" : "DIALS"
        },
        {
            "width" : 230,
            "x" : 255,
            "y" : 325,
            "text" : "SKILLS"
        }
        ,
        {
            "width" : 470,
            "x" : 15,
            "y" : 610,
            "text" : "STUNTS AND EXTRAS"
        }
    ],
    "field_box_info" : {
        "text_size" : 8,
        "text_margin_x" : 3,
        "text_margin_y" : 7,
        "height" : 20
    },
    "simple_fields" : [
        {
            "width" : 470,
            "x" : 15,
            "y" : 5,
            "text" : "Game Name",
            "db" : "name"
        },
        {
            "width" : 470,
            "x" : 15,
            "y" : 30,
            "text" : "Setting/Scale",
            "db" : "setting"
        },
        {
            "width" : 470,
            "x" : 15,
            "y" : 635,
            "text" : "",
            "db" : "stunts_and_extras"
        }
    ],
    "current_issues" : [
        {
            "width" : 230,
            "x" : 15,
            "y" : 85,
            "text" : "1",
            "db" : 0
        },
        {
            "width" : 230,
            "x" : 15,
            "y" : 110,
            "text" : "2",
            "db" : 1
        }
    ],
    "impending_issues" : [
        {
            "width" : 230,
            "x" : 255,
            "y" : 85,
            "text" : "1",
            "db" : 0
        },
        {
            "width" : 230,
            "x" : 255,
            "y" : 110,
            "text" : "2",
            "db" : 1
        }
    ],
    "faces_and_places_names" : [
        {
            "width" : 230,
            "x" : 15,
            "y" : 170,
            "text" : "Name",
            "db" : 0
        },
        {
            "width" : 230,
            "x" : 255,
            "y" : 170,
            "text" : "Name",
            "db" : 1
        },
        {
            "width" : 230,
            "x" : 15,
            "y" : 220,
            "text" : "Name",
            "db" : 2
        },
        {
            "width" : 230,
            "x" : 255,
            "y" : 220,
            "text" : "Name",
            "db" : 3
        },
        {
            "width" : 230,
            "x" : 15,
            "y" : 270,
            "text" : "Name",
            "db" : 4
        },
        {
            "width" : 230,
            "x" : 255,
            "y" : 270,
            "text" : "Name",
            "db" : 5
        }
    ],
    "faces_and_places_aspects" : [
        {
            "width" : 230,
            "x" : 15,
            "y" : 190,
            "text" : "Issue/Aspect",
            "db" : 0
        },
        {
            "width" : 230,
            "x" : 255,
            "y" : 190,
            "text" : "Issue/Aspect",
            "db" : 1
        },
        {
            "width" : 230,
            "x" : 15,
            "y" : 240,
            "text" : "Issue/Aspect",
            "db" : 2
        },
        {
            "width" : 230,
            "x" : 255,
            "y" : 240,
            "text" : "Issue/Aspect",
            "db" : 3
        },
        {
            "width" : 230,
            "x" : 15,
            "y" : 290,
            "text" : "Issue/Aspect",
            "db" : 4
        },
        {
            "width" : 230,
            "x" : 255,
            "y" : 290,
            "text" : "Issue/Aspect",
            "db" : 5
        }
    ],
    "field_label_info" : {
        "text_size" : 8,
        "text_margin_x" : 0,
        "text_margin_y" : 13
    },
    "field_labels" : [
        {
            "x" : 15,
            "y" : 350,
            "text" : "Number of Aspects"
        },
        {
            "x" : 15,
            "y" : 375,
            "text" : "Number of Phases"
        },
        {
            "x" : 15,
            "y" : 400,
            "text" : "Skill Cap"
        },
        {
            "x" : 15,
            "y" : 425,
            "text" : "Pyramid or Columns"
        },
        {
            "x" : 15,
            "y" : 450,
            "text" : "Number of Columns"
        },
        {
            "x" : 15,
            "y" : 475,
            "text" : "Refresh Rate"
        },
        {
            "x" : 15,
            "y" : 500,
            "text" : "Initial Stunts"
        },
        {
            "x" : 15,
            "y" : 525,
            "text" : "Types of Stress Tracks"
        },
        {
            "x" : 15,
            "y" : 550,
            "text" : "Default Stress Boxes"
        },
        {
            "x" : 15,
            "y" : 575,
            "text" : "Default Consequence Slots"
        }
    ],
    "dials" : [
        {
            "width" : 110,
            "x" : 135,
            "y" : 350,
            "text" : "Number of Aspects",
            "db" : "Number of Aspects"
        },
        {
            "width" : 110,
            "x" : 135,
            "y" : 375,
            "text" : "Number of Phases",
            "db" : "Number of Phases"
        },
        {
            "width" : 110,
            "x" : 135,
            "y" : 400,
            "text" : "Skill Cap",
            "db" : "Skill Cap"
        },
        {
            "width" : 110,
            "x" : 135,
            "y" : 425,
            "text" : "Pyramid or Columns",
            "db" : "Pyramid or Columns"
        },
        {
            "width" : 110,
            "x" : 135,
            "y" : 450,
            "text" : "Number of Columns",
            "db" : "Number of Columns"
        },
        {
            "width" : 110,
            "x" : 135,
            "y" : 475,
            "text" : "Refresh Rate",
            "db" : "Refresh Rate"
        },
        {
            "width" : 110,
            "x" : 135,
            "y" : 500,
            "text" : "Initial Stunts",
            "db" : "Initial Stunts"
        },
        {
            "width" : 110,
            "x" : 135,
            "y" : 525,
            "text" : "Types of Stress Tracks",
            "db" : "Types of Stress Tracks"
        },
        {
            "width" : 110,
            "x" : 135,
            "y" : 550,
            "text" : "Default Stress Boxes",
            "db" : "Default Stress Boxes"
        },
        {
            "width" : 110,
            "x" : 135,
            "y" : 575,
            "text" : "Default Consequence Slots",
            "db" : "Default Consequence Slots"
        }
    ],
    "skills" : [
        {
            "width" : 230,
            "x" : 255,
            "y" : 350,
            "db" : 0
        },
        {
            "width" : 230,
            "x" : 255,
            "y" : 375,
            "db" : 1
        },
        {
            "width" : 230,
            "x" : 255,
            "y" : 400,
            "db" : 2
        },
        {
            "width" : 230,
            "x" : 255,
            "y" : 425,
            "db" : 3
        },
        {
            "width" : 230,
            "x" : 255,
            "y" : 450,
            "db" : 4
        },
        {
            "width" : 230,
            "x" : 255,
            "y" : 475,
            "db" : 5
        },
        {
            "width" : 230,
            "x" : 255,
            "y" : 500,
            "db" : 6
        },
        {
            "width" : 230,
            "x" : 255,
            "y" : 525,
            "db" : 7
        },
        {
            "width" : 230,
            "x" : 255,
            "y" : 550,
            "db" : 8
        },
        {
            "width" : 230,
            "x" : 255,
            "y" : 575,
            "db" : 9
        }
    ]
}


/*
The player area is not currently enabled, but may
be included as a feature in the future.
 */
Fate_Core.game_sheet_player_area = {
    "height" : 50,
    "width" : 500,
    "box_h" : 20,
    "header_info" : {
        "height" : 20,
        "text_size" : 15,
        "text_margin" : 5
    },
    "field_box_info" : {
        "text_size" : 8,
        "text_margin_x" : 3,
        "text_margin_y" : 7,
        "height" : 20
    },
    "headers" : [
        {
            "width" : 470,
            "x" : 15,
            "y" : 2,
            "text" : "PLAYER CHARACTERS"
        }
    ],
    "characters" : [
        {
            "text" : "1234567890",
            "db" : 0
        },
        {
            "text" : "Character 2",
            "db" : 1
        },
        {
            "text" : "Character 3",
            "db" : 2
        },
        {
            "text" : "Character 4",
            "db" : 3
        },
        {
            "text" : "Character 5",
            "db" : 4
        },
        {
            "text" : "Character 6",
            "db" : 5
        }
    ]
}