/*
 These functions draw the game and character sheets using the
 svg sheet designs and the game/character data object currently
 selected.

 Possible Issues:
 When any of the data changes, the entire sheet is redrawn.
 It might be an issue if many players are quickly editing the same
 game because it would cause the sheet to refresh constantly.
 */

Fate_Core.svg_character = {
    pc_data : function() {
        return Fate_Core.Characters.read(Session.get("current_character"));
    },
    draw_sheet : function() {
        /*
         remove any existing svg elements
         */
        d3.select("#svg_sheet_area").selectAll("svg").remove();

        /*
         set scale and create svg
         */
        var template_w = Fate_Core.sheet_data.width;
        var template_h = Fate_Core.sheet_data.height;
        var svg_width = document.getElementById("svg_sheet_area").clientWidth;
        var svg_height = svg_width * template_h / template_w;
        var scale = svg_width / template_w;
        var svg = d3
            .select("#svg_sheet_area")
            .append("svg")
            .attr("width", svg_width)
            .attr("height", svg_height);

        /*
         create black header bars
         */
        Fate_Core.svg_character.black_bars(scale, svg);

        /*
         fields that only effect a single attribute of the character data object
         */
        Fate_Core.svg_character.simple_fields(scale, svg);

        /*
         aspects
         */
        Fate_Core.svg_character.aspect_fields(scale, svg);

        /*
         skills
         */
        Fate_Core.svg_character.skills(scale, svg);

        /*
         text labels outside boxes
         */
        Fate_Core.svg_character.text_labels(scale, svg);

        /*
         physical stress boxes
         */
        Fate_Core.svg_character.physical_stress(scale, svg);

        /*
         mental stress boxes
         */
        Fate_Core.svg_character.mental_stress(scale, svg);

        /*
         consequences
         */
        Fate_Core.svg_character.consequences(scale, svg);

        /*
         change the scale when the window is resized
         */
        d3.select(window).on('resize', function() {
            Fate_Core.svg_character.draw_sheet();
        });
    },
    black_bars : function(scale, svg){
        var header_data = Fate_Core.sheet_data.headers;
        var header_h = Fate_Core.sheet_data.header_info.height * scale;
        var header_text_size = Fate_Core.sheet_data.header_info.text_size * scale + "px";
        var header_text_margin = Fate_Core.sheet_data.header_info.text_margin * scale;
        var header_bars = svg
            .selectAll("rect.header_bars")
            .data(header_data)
            .enter()
            .append("rect");
        header_bars.attr({
            x : function(d){
                return d.x * scale;
            },
            y : function(d) {
                return d.y * scale;
            },
            height : function(d) {
                return header_h;
            },
            width : function(d) {
                return d.width * scale;
            },
            fill : function() {
                return "black";
            }
        });
        var header_text = svg
            .selectAll("text.header_bars")
            .data(header_data)
            .enter()
            .append("text");
        header_text
            .attr("fill", "white")
            .attr("x", function(d) {
                return d.x * scale + header_text_margin;
            })
            .attr("y", function(d) {
                return d.y * scale + header_h - header_text_margin;
            })
            .text(function(d) {
                return d.text;
            })
            .attr("font-size", header_text_size);
    },
    simple_fields : function (scale, svg){
        var simple_fields_data = Fate_Core.sheet_data.simple_fields;
        var box_field_h = Fate_Core.sheet_data.field_box_info.height * scale;
        var box_field_text_size = Fate_Core.sheet_data.field_box_info.text_size * scale + "px";
        var box_field_text_margin_x = Fate_Core.sheet_data.field_box_info.text_margin_x * scale;
        var box_field_text_margin_y = Fate_Core.sheet_data.field_box_info.text_margin_y * scale;
        var simple_fields = svg
            .selectAll("rect.simple_fields")
            .data(simple_fields_data)
            .enter()
            .append("rect");
        simple_fields.attr({
            x : function(d){
                return d.x * scale;
            },
            y : function(d) {
                return d.y * scale;
            },
            height : function(d) {
                return box_field_h;
            },
            width : function(d) {
                return d.width * scale;
            },
            class : "simple_fields"
        });
        var box_fields_labels = svg
            .selectAll("text.simple_fields_labels")
            .data(simple_fields_data)
            .enter()
            .append("text");
        box_fields_labels
            .attr("fill", "gray")
            .attr("x", function(d) {
                return d.x * scale + box_field_text_margin_x;
            })
            .attr("y", function(d) {
                return (d.y * scale) + box_field_h - box_field_text_margin_y;
            })
            .text(function(d) {
                return d.text;
            })
            .attr("font-size", box_field_text_size);
        var box_fields_text_data = svg
            .selectAll("text.simple_fields_text_data")
            .data(simple_fields_data)
            .enter()
            .append("text");
        box_fields_text_data
            .attr("fill", "black")
            .attr("x", function(d) {
                return d.x * scale + (box_field_text_margin_x * 17);
            })
            .attr("y", function(d) {
                return (d.y * scale) + box_field_h - box_field_text_margin_y;
            })
            .text(function(d) {
                var attribute = d.db;
                return Fate_Core.svg_character.pc_data()[attribute];
            })
            .attr("font-size", box_field_text_size);
        d3.selectAll(".simple_fields")
            .on("click", function(d){

                var field = d.db;
                var obj = {};
                obj[field] = prompt(field, Fate_Core.svg_character.pc_data()[field]);
                player_characters.update(
                    { _id: Session.get("current_character") },
                    { $set: obj }
                );
                Fate_Core.svg_character.draw_sheet();
            })
    },
    aspect_fields : function (scale, svg){
        var simple_fields_data = Fate_Core.sheet_data.aspects;
        var box_field_h = Fate_Core.sheet_data.field_box_info.height * scale;
        var box_field_text_size = Fate_Core.sheet_data.field_box_info.text_size * scale + "px";
        var box_field_text_margin_x = Fate_Core.sheet_data.field_box_info.text_margin_x * scale;
        var box_field_text_margin_y = Fate_Core.sheet_data.field_box_info.text_margin_y * scale;
        var aspects_fields = svg
            .selectAll("rect.aspects")
            .data(simple_fields_data)
            .enter()
            .append("rect");
        aspects_fields.attr({
            x : function(d){
                return d.x * scale;
            },
            y : function(d) {
                return d.y * scale;
            },
            height : function(d) {
                return box_field_h;
            },
            width : function(d) {
                return d.width * scale;
            },
            class : "aspect_fields"
        });
        var aspects_fields_labels = svg
            .selectAll("text.aspects")
            .data(simple_fields_data)
            .enter()
            .append("text");
        aspects_fields_labels
            .attr("fill", "gray")
            .attr("x", function(d) {
                return d.x * scale + box_field_text_margin_x;
            })
            .attr("y", function(d) {
                return (d.y * scale) + box_field_h - box_field_text_margin_y;
            })
            .text(function(d) {
                return d.text;
            })
            .attr("font-size", box_field_text_size);
        var aspects_fields_text_data = svg
            .selectAll("text.simple_fields_text_data")
            .data(simple_fields_data)
            .enter()
            .append("text");
        aspects_fields_text_data
            .attr("fill", "black")
            .attr("x", function(d) {
                return d.x * scale + (box_field_text_margin_x * 20);
            })
            .attr("y", function(d) {
                return (d.y * scale) + box_field_h - box_field_text_margin_y;
            })
            .text(function(d) {
                var attribute = d.db;
                return Fate_Core.svg_character.pc_data().aspects[attribute];
            })
            .attr("font-size", box_field_text_size);
        d3.selectAll(".aspect_fields")
            .on("click", function(d){
                var attribute = "aspects";
                var field = "aspects." + d.db;
                var aspect = d.db;
                var obj = {};
                obj[field] = prompt(d.db, Fate_Core.svg_character.pc_data()[attribute][aspect]);
                player_characters.update(
                    { _id: Session.get("current_character") },
                    { $set: obj }
                );
                Fate_Core.svg_character.draw_sheet();
            })
    },
    skills : function(scale, svg){
        var skills_fields_data = Fate_Core.sheet_data.skills;
        var box_field_h = Fate_Core.sheet_data.field_box_info.height * scale;
        var box_field_text_size = Fate_Core.sheet_data.field_box_info.text_size * scale + "px";
        var box_field_text_margin_x = Fate_Core.sheet_data.field_box_info.text_margin_x * scale;
        var box_field_text_margin_y = Fate_Core.sheet_data.field_box_info.text_margin_y * scale;
        var skills_superb = svg
            .selectAll("rect.skill")
            .data(skills_fields_data)
            .enter()
            .append("rect");
        skills_superb.attr({
            x : function(d){
                return d.x * scale;
            },
            y : function(d) {
                return d.y * scale;
            },
            height : function(d) {
                return box_field_h;
            },
            width : function(d) {
                return d.width * scale;
            },
            class : "skills_fields"
        });
        var box_fields_text = svg
            .selectAll("text.skill")
            .data(skills_fields_data)
            .enter()
            .append("text");
        box_fields_text
            .attr("fill", "black")
            .attr("x", function(d) {
                return d.x * scale + box_field_text_margin_x;
            })
            .attr("y", function(d) {
                return (d.y * scale) + box_field_h - box_field_text_margin_y;
            })
            .text(function(d) {
                var element = d.db;
                var skill_type = "skills_" + d.type;
                return Fate_Core.svg_character.pc_data()[skill_type][element];
            })
            .attr("font-size", box_field_text_size);
        d3.selectAll(".skills_fields")
            .on("click", function(d){
                var attribute = "skills_" + d.type;
                var field = "skills_" + d.type + "." + d.db;
                var skill = d.db;
                var obj = {};
                obj[field] = prompt(d.type + " skill", Fate_Core.svg_character.pc_data()[attribute][skill]);
                player_characters.update(
                    { _id: Session.get("current_character") },
                    { $set: obj }
                );
                Fate_Core.svg_character.draw_sheet();
            })

    },
    text_labels : function(scale, svg) {
        var field_label_data = Fate_Core.sheet_data.field_labels;
        var field_label_text_size = Fate_Core.sheet_data.field_label_info.text_size * scale + "px";
        var field_label_info_margin_x = Fate_Core.sheet_data.field_label_info.text_margin_x * scale;
        var field_label_info_margin_y = Fate_Core.sheet_data.field_label_info.text_margin_y * scale;
        var field_labels_text = svg
            .selectAll("text.field_label")
            .data(field_label_data)
            .enter()
            .append("text");
        field_labels_text
            .attr("fill", "gray")
            .attr("x", function(d) {
                return d.x * scale + field_label_info_margin_x;
            })
            .attr("y", function(d) {
                return d.y * scale + field_label_info_margin_y;
            })
            .text(function(d) {
                return d.text;
            })
            .attr("font-size", field_label_text_size);
    },
    physical_stress : function(scale, svg) {
        var simple_fields_data = Fate_Core.sheet_data.physical_stress;
        var box_field_h = Fate_Core.sheet_data.field_box_info.height * scale;
        var simple_fields = svg
            .selectAll("rect.physical_stress")
            .data(simple_fields_data)
            .enter()
            .append("rect");
        simple_fields.attr({
            x : function(d){
                return d.x * scale;
            },
            y : function(d) {
                return d.y * scale;
            },
            height : function(d) {
                return box_field_h;
            },
            width : function(d) {
                return d.width * scale;
            },
            class : "physical_stress"
        });
        simple_fields.attr({
            fill : function(d){
                var stress_type = "physical_stress";
                var element = d.db;
                var data = Fate_Core.svg_character.pc_data()[stress_type][element];
                if(data === "ok"){
                    return "white";
                } else {
                    return "black";
                }
            }
        })
        d3.selectAll(".physical_stress")
            .on("click", function(d){
                var stress_type = "physical_stress";
                var element = d.db;
                var field = stress_type + "." + element;
                var data = Fate_Core.svg_character.pc_data()[stress_type][element];
                if(data === "ok"){
                    var new_value = "hurt";
                } else {
                    var new_value = "ok";
                }
                var obj = {};
                obj[field] = new_value;
                player_characters.update(
                    { _id: Session.get("current_character") },
                    { $set: obj }
                );
                Fate_Core.svg_character.draw_sheet();
            })
    },
    mental_stress : function(scale, svg) {
        var simple_fields_data = Fate_Core.sheet_data.mental_stress;
        var box_field_h = Fate_Core.sheet_data.field_box_info.height * scale;
        var simple_fields = svg
            .selectAll("rect.mental_stress")
            .data(simple_fields_data)
            .enter()
            .append("rect");
        simple_fields.attr({
            x : function(d){
                return d.x * scale;
            },
            y : function(d) {
                return d.y * scale;
            },
            height : function(d) {
                return box_field_h;
            },
            width : function(d) {
                return d.width * scale;
            },
            class : "mental_stress"
        });
        simple_fields.attr({
            fill : function(d){
                var stress_type = "mental_stress";
                var element = d.db;
                var data = Fate_Core.svg_character.pc_data()[stress_type][element];
                if(data === "ok"){
                    return "white";
                } else {
                    return "black";
                }
            }
        })
        d3.selectAll(".mental_stress")
            .on("click", function(d){
                var stress_type = "mental_stress";
                var element = d.db;
                var field = stress_type + "." + element;
                var data = Fate_Core.svg_character.pc_data()[stress_type][element];
                if(data === "ok"){
                    var new_value = "hurt";
                } else {
                    var new_value = "ok";
                }
                var obj = {};
                obj[field] = new_value;
                player_characters.update(
                    { _id: Session.get("current_character") },
                    { $set: obj }
                );
                Fate_Core.svg_character.draw_sheet();
            })
    },
    consequences : function(scale, svg) {
        var simple_fields_data = Fate_Core.sheet_data.consequences;
        var box_field_h = Fate_Core.sheet_data.field_box_info.height * scale;
        var box_field_text_size = Fate_Core.sheet_data.field_box_info.text_size * scale + "px";
        var box_field_text_margin_x = Fate_Core.sheet_data.field_box_info.text_margin_x * scale;
        var box_field_text_margin_y = Fate_Core.sheet_data.field_box_info.text_margin_y * scale;
        var simple_fields = svg
            .selectAll("rect.consequences")
            .data(simple_fields_data)
            .enter()
            .append("rect");
        simple_fields.attr({
            x : function(d){
                return d.x * scale;
            },
            y : function(d) {
                return d.y * scale;
            },
            height : function(d) {
                return box_field_h;
            },
            width : function(d) {
                return d.width * scale;
            },
            class : "consequences"
        });
        var box_fields_text_data = svg
            .selectAll("text.consequences_text_data")
            .data(simple_fields_data)
            .enter()
            .append("text");
        box_fields_text_data
            .attr("fill", "black")
            .attr("x", function(d) {
                return d.x * scale + (box_field_text_margin_x * 3);
            })
            .attr("y", function(d) {
                return (d.y * scale) + box_field_h - box_field_text_margin_y;
            })
            .text(function(d) {
                var attribute = d.db;
                return Fate_Core.svg_character.pc_data().consequences[attribute];
            })
            .attr("font-size", box_field_text_size);
        d3.selectAll(".consequences")
            .on("click", function(d){
                var attribute = "consequences";
                var field = "consequences." + d.db;
                var consequence = d.db;
                var obj = {};
                obj[field] = prompt(d.db, Fate_Core.svg_character.pc_data()[attribute][consequence]);
                player_characters.update(
                    { _id: Session.get("current_character") },
                    { $set: obj }
                );
                Fate_Core.svg_character.draw_sheet();
            })
    }
}


Fate_Core.svg_game = {
    game_data : function() {
        return Fate_Core.Games.read(Session.get("current_game"));
    },
    draw_sheet : function() {

        /*
         remove any existing svg elements
         */
        d3.select("#svg_sheet_area").selectAll("svg").remove();

        /*
         variables used for both the sheet area and the players area
         */
        var svg_width = document.getElementById("svg_sheet_area").clientWidth;

        /*
         create empty svg for player area
         */
//        var template_w_p = Fate_Core.game_sheet_player_area.width;
//        var template_h_p = Fate_Core.game_sheet_player_area.height;
//        var svg_height_p = svg_width * template_h_p / template_w_p;
//        var scale_p = svg_width / template_w_p;
//        var svg_p = d3
//            .select("#svg_sheet_area")
//            .append("svg")
//            .attr("width", svg_width)
//            .attr("height", svg_height_p);

        /*
         create empty svg for sheet
         */
        var template_w = Fate_Core.game_sheet_data.width;
        var template_h = Fate_Core.game_sheet_data.height;
        var svg_height = svg_width * template_h / template_w;
        var scale = svg_width / template_w;
        var svg = d3
            .select("#svg_sheet_area")
            .append("svg")
            .attr("width", svg_width)
            .attr("height", svg_height);

        /*
         draw players section into svg_p element
         */
//        Fate_Core.svg_game.player_area(scale_p, svg_p, svg_width);
//        Fate_Core.svg_game.player_header(scale_p, svg_p);

        /*
         draw sheet sections
         */
        Fate_Core.svg_game.black_bars(scale, svg);
        Fate_Core.svg_game.simple_fields(scale, svg);
        Fate_Core.svg_game.current_issues(scale, svg);
        Fate_Core.svg_game.impending_issues(scale, svg);
        Fate_Core.svg_game.text_labels(scale, svg);
        Fate_Core.svg_game.faces_and_places_names(scale, svg);
        Fate_Core.svg_game.faces_and_places_aspects(scale, svg);
        Fate_Core.svg_game.dials(scale, svg);
        Fate_Core.svg_game.skills(scale, svg);

        /*
         redraw svg when the window is resized
         */
        d3.select(window).on('resize', function() {
            Fate_Core.svg_game.draw_sheet();
        });

        /*
         redraw svg when data changes
         */
        var query1 = games.find( {"_id" : Session.get("current_game") }).observeChanges({
            changed: function() {
                setTimeout(function(){Fate_Core.svg_game.draw_sheet()}, 10);
            }
        })
    },
    black_bars : function(scale, svg){
        var header_data = Fate_Core.game_sheet_data.headers;
        var header_h = Fate_Core.game_sheet_data.header_info.height * scale;
        var header_text_size = Fate_Core.game_sheet_data.header_info.text_size * scale + "px";
        var header_text_margin = Fate_Core.game_sheet_data.header_info.text_margin * scale;
        var header_bars = svg
            .selectAll("rect.header_bars")
            .data(header_data)
            .enter()
            .append("rect");
        header_bars.attr({
            x : function(d){
                return d.x * scale;
            },
            y : function(d) {
                return d.y * scale;
            },
            height : function(d) {
                return header_h;
            },
            width : function(d) {
                return d.width * scale;
            },
            fill : function() {
                return "black";
            }
        });
        var header_text = svg
            .selectAll("text.header_bars")
            .data(header_data)
            .enter()
            .append("text");
        header_text
            .attr("fill", "white")
            .attr("x", function(d) {
                return d.x * scale + header_text_margin;
            })
            .attr("y", function(d) {
                return d.y * scale + header_h - header_text_margin;
            })
            .text(function(d) {
                return d.text;
            })
            .attr("font-size", header_text_size);
    },
    simple_fields : function (scale, svg){
        var simple_fields_data = Fate_Core.game_sheet_data.simple_fields;
        var box_field_h = Fate_Core.game_sheet_data.field_box_info.height * scale;
        var box_field_text_size = Fate_Core.game_sheet_data.field_box_info.text_size * scale + "px";
        var box_field_text_margin_x = Fate_Core.game_sheet_data.field_box_info.text_margin_x * scale;
        var box_field_text_margin_y = Fate_Core.game_sheet_data.field_box_info.text_margin_y * scale;
        var simple_fields = svg
            .selectAll("rect.simple_fields")
            .data(simple_fields_data)
            .enter()
            .append("rect");
        simple_fields.attr({
            x : function(d){
                return d.x * scale;
            },
            y : function(d) {
                return d.y * scale;
            },
            height : function(d) {
                return box_field_h;
            },
            width : function(d) {
                return d.width * scale;
            },
            class : "simple_fields"
        });
        var box_fields_labels = svg
            .selectAll("text.simple_fields_labels")
            .data(simple_fields_data)
            .enter()
            .append("text");
        box_fields_labels
            .attr("fill", "gray")
            .attr("x", function(d) {
                return d.x * scale + box_field_text_margin_x;
            })
            .attr("y", function(d) {
                return (d.y * scale) + box_field_h - box_field_text_margin_y;
            })
            .text(function(d) {
                return d.text;
            })
            .attr("font-size", box_field_text_size);
        var box_fields_text_data = svg
            .selectAll("text.simple_fields_text_data")
            .data(simple_fields_data)
            .enter()
            .append("text");
        box_fields_text_data
            .attr("fill", "black")
            .attr("x", function(d) {
                return d.x * scale + (box_field_text_margin_x * 20);
            })
            .attr("y", function(d) {
                return (d.y * scale) + box_field_h - box_field_text_margin_y;
            })
            .text(function(d) {
                var attribute = d.db;
                return Fate_Core.svg_game.game_data()[attribute];
            })
            .attr("font-size", box_field_text_size);
        d3.selectAll(".simple_fields")
            .on("click", function(d){

                var field = d.db;
                var obj = {};
                obj[field] = prompt(field, Fate_Core.svg_game.game_data()[field]);
                games.update(
                    { _id: Session.get("current_game") },
                    { $set: obj }
                );
                Fate_Core.svg_game.draw_sheet();
            })
    },
    current_issues : function (scale, svg){
        var simple_fields_data = Fate_Core.game_sheet_data.current_issues;
        var box_field_h = Fate_Core.game_sheet_data.field_box_info.height * scale;
        var box_field_text_size = Fate_Core.game_sheet_data.field_box_info.text_size * scale + "px";
        var box_field_text_margin_x = Fate_Core.game_sheet_data.field_box_info.text_margin_x * scale;
        var box_field_text_margin_y = Fate_Core.game_sheet_data.field_box_info.text_margin_y * scale;
        var current_issues = svg
            .selectAll("rect.current_issues")
            .data(simple_fields_data)
            .enter()
            .append("rect");
        current_issues.attr({
            x : function(d){
                return d.x * scale;
            },
            y : function(d) {
                return d.y * scale;
            },
            height : function(d) {
                return box_field_h;
            },
            width : function(d) {
                return d.width * scale;
            },
            class : "current_issues"
        });
        var current_issues_labels = svg
            .selectAll("text.aspects")
            .data(simple_fields_data)
            .enter()
            .append("text");
        current_issues_labels
            .attr("fill", "gray")
            .attr("x", function(d) {
                return d.x * scale + box_field_text_margin_x;
            })
            .attr("y", function(d) {
                return (d.y * scale) + box_field_h - box_field_text_margin_y;
            })
            .text(function(d) {
                return d.text;
            })
            .attr("font-size", box_field_text_size);
        var current_issues_text_data = svg
            .selectAll("text.simple_fields_text_data")
            .data(simple_fields_data)
            .enter()
            .append("text");
        current_issues_text_data
            .attr("fill", "black")
            .attr("x", function(d) {
                return d.x * scale + (box_field_text_margin_x * 4);
            })
            .attr("y", function(d) {
                return (d.y * scale) + box_field_h - box_field_text_margin_y;
            })
            .text(function(d) {
                var attribute = d.db;
                return Fate_Core.svg_game.game_data().current_issues[attribute];
            })
            .attr("font-size", box_field_text_size);
        d3.selectAll(".current_issues")
            .on("click", function(d){
                var attribute = "current_issues";
                var field = "current_issues." + d.db;
                var aspect = d.db;
                var obj = {};
                obj[field] = prompt("Current Issue " + d.text, Fate_Core.svg_game.game_data()[attribute][aspect]);
                games.update(
                    { _id: Session.get("current_game") },
                    { $set: obj }
                );
                Fate_Core.svg_game.draw_sheet();
            })
    },
    impending_issues : function (scale, svg){
        var simple_fields_data = Fate_Core.game_sheet_data.impending_issues;
        var box_field_h = Fate_Core.game_sheet_data.field_box_info.height * scale;
        var box_field_text_size = Fate_Core.game_sheet_data.field_box_info.text_size * scale + "px";
        var box_field_text_margin_x = Fate_Core.game_sheet_data.field_box_info.text_margin_x * scale;
        var box_field_text_margin_y = Fate_Core.game_sheet_data.field_box_info.text_margin_y * scale;
        var current_issues = svg
            .selectAll("rect.impending_issues")
            .data(simple_fields_data)
            .enter()
            .append("rect");
        current_issues.attr({
            x : function(d){
                return d.x * scale;
            },
            y : function(d) {
                return d.y * scale;
            },
            height : function(d) {
                return box_field_h;
            },
            width : function(d) {
                return d.width * scale;
            },
            class : "impending_issues"
        });
        var impending_issues_labels = svg
            .selectAll("text.impending_issues")
            .data(simple_fields_data)
            .enter()
            .append("text");
        impending_issues_labels
            .attr("fill", "gray")
            .attr("x", function(d) {
                return d.x * scale + box_field_text_margin_x;
            })
            .attr("y", function(d) {
                return (d.y * scale) + box_field_h - box_field_text_margin_y;
            })
            .text(function(d) {
                return d.text;
            })
            .attr("font-size", box_field_text_size);
        var impending_issues_text_data = svg
            .selectAll("text.impending_issues_text_data")
            .data(simple_fields_data)
            .enter()
            .append("text");
        impending_issues_text_data
            .attr("fill", "black")
            .attr("x", function(d) {
                return d.x * scale + (box_field_text_margin_x * 4);
            })
            .attr("y", function(d) {
                return (d.y * scale) + box_field_h - box_field_text_margin_y;
            })
            .text(function(d) {
                var attribute = d.db;
                return Fate_Core.svg_game.game_data().pending_issues[attribute];
            })
            .attr("font-size", box_field_text_size);
        d3.selectAll(".impending_issues")
            .on("click", function(d){
                var attribute = "pending_issues";
                var field = "pending_issues." + d.db;
                var aspect = d.db;
                var obj = {};
                obj[field] = prompt("Pending Issue " + d.text, Fate_Core.svg_game.game_data()[attribute][aspect]);
                games.update(
                    { _id: Session.get("current_game") },
                    { $set: obj }
                );
                Fate_Core.svg_game.draw_sheet();
            })
    },
    text_labels : function(scale, svg) {
        var field_label_data = Fate_Core.game_sheet_data.field_labels;
        var field_label_text_size = Fate_Core.game_sheet_data.field_label_info.text_size * scale + "px";
        var field_label_info_margin_x = Fate_Core.game_sheet_data.field_label_info.text_margin_x * scale;
        var field_label_info_margin_y = Fate_Core.game_sheet_data.field_label_info.text_margin_y * scale;
        var field_labels_text = svg
            .selectAll("text.field_label")
            .data(field_label_data)
            .enter()
            .append("text");
        field_labels_text
            .attr("fill", "gray")
            .attr("x", function(d) {
                return d.x * scale + field_label_info_margin_x;
            })
            .attr("y", function(d) {
                return d.y * scale + field_label_info_margin_y;
            })
            .text(function(d) {
                return d.text;
            })
            .attr("font-size", field_label_text_size);
    },
    faces_and_places_names : function (scale, svg){
        var simple_fields_data = Fate_Core.game_sheet_data.faces_and_places_names;
        var box_field_h = Fate_Core.game_sheet_data.field_box_info.height * scale;
        var box_field_text_size = Fate_Core.game_sheet_data.field_box_info.text_size * scale + "px";
        var box_field_text_margin_x = Fate_Core.game_sheet_data.field_box_info.text_margin_x * scale;
        var box_field_text_margin_y = Fate_Core.game_sheet_data.field_box_info.text_margin_y * scale;
        var faces_and_places_names = svg
            .selectAll("rect.faces_and_places_names")
            .data(simple_fields_data)
            .enter()
            .append("rect");
        faces_and_places_names.attr({
            x : function(d){
                return d.x * scale;
            },
            y : function(d) {
                return d.y * scale;
            },
            height : function(d) {
                return box_field_h;
            },
            width : function(d) {
                return d.width * scale;
            },
            class : "faces_and_places_names"
        });
        var faces_and_places_names_labels = svg
            .selectAll("text.faces_and_places_names")
            .data(simple_fields_data)
            .enter()
            .append("text");
        faces_and_places_names_labels
            .attr("fill", "gray")
            .attr("x", function(d) {
                return d.x * scale + box_field_text_margin_x;
            })
            .attr("y", function(d) {
                return (d.y * scale) + box_field_h - box_field_text_margin_y;
            })
            .text(function(d) {
                return d.text;
            })
            .attr("font-size", box_field_text_size);
        var faces_and_places_names_text_data = svg
            .selectAll("text.faces_and_places_names_text_data")
            .data(simple_fields_data)
            .enter()
            .append("text");
        faces_and_places_names_text_data
            .attr("fill", "black")
            .attr("x", function(d) {
                return d.x * scale + (box_field_text_margin_x * 10);
            })
            .attr("y", function(d) {
                return (d.y * scale) + box_field_h - box_field_text_margin_y;
            })
            .text(function(d) {
                var attribute = "faces_and_places";
                var aspect = d.db;
                return Fate_Core.svg_game.game_data()[attribute][aspect][0].name;
            })
            .attr("font-size", box_field_text_size);
        d3.selectAll(".faces_and_places_names")
            .on("click", function(d){
                var attribute = "faces_and_places";
                var field = "faces_and_places." + d.db + ".0.name";
                var aspect = d.db;
                var obj = {};
                obj[field] = prompt("Name", Fate_Core.svg_game.game_data()[attribute][aspect][0].name);
                games.update(
                    { _id: Session.get("current_game") },
                    { $set: obj }
                );
                Fate_Core.svg_game.draw_sheet();
            })
    },
    faces_and_places_aspects : function (scale, svg){
        var simple_fields_data = Fate_Core.game_sheet_data.faces_and_places_aspects;
        var box_field_h = Fate_Core.game_sheet_data.field_box_info.height * scale;
        var box_field_text_size = Fate_Core.game_sheet_data.field_box_info.text_size * scale + "px";
        var box_field_text_margin_x = Fate_Core.game_sheet_data.field_box_info.text_margin_x * scale;
        var box_field_text_margin_y = Fate_Core.game_sheet_data.field_box_info.text_margin_y * scale;
        var faces_and_places_aspects = svg
            .selectAll("rect.faces_and_places_aspects")
            .data(simple_fields_data)
            .enter()
            .append("rect");
        faces_and_places_aspects.attr({
            x : function(d){
                return d.x * scale;
            },
            y : function(d) {
                return d.y * scale;
            },
            height : function(d) {
                return box_field_h;
            },
            width : function(d) {
                return d.width * scale;
            },
            class : "faces_and_places_aspects"
        });
        var faces_and_places_aspects_labels = svg
            .selectAll("text.faces_and_places_aspects_labels")
            .data(simple_fields_data)
            .enter()
            .append("text");
        faces_and_places_aspects_labels
            .attr("fill", "gray")
            .attr("x", function(d) {
                return d.x * scale + box_field_text_margin_x;
            })
            .attr("y", function(d) {
                return (d.y * scale) + box_field_h - box_field_text_margin_y;
            })
            .text(function(d) {
                return d.text;
            })
            .attr("font-size", box_field_text_size);
        var faces_and_places_aspects_text_data = svg
            .selectAll("text.faces_and_places_aspects_text_data")
            .data(simple_fields_data)
            .enter()
            .append("text");
        faces_and_places_aspects_text_data
            .attr("fill", "black")
            .attr("x", function(d) {
                return d.x * scale + (box_field_text_margin_x * 19);
            })
            .attr("y", function(d) {
                return (d.y * scale) + box_field_h - box_field_text_margin_y;
            })
            .text(function(d) {
                var attribute = "faces_and_places";
                var aspect = d.db;
                return Fate_Core.svg_game.game_data()[attribute][aspect][1].aspect;
            })
            .attr("font-size", box_field_text_size);
        d3.selectAll(".faces_and_places_aspects")
            .on("click", function(d){
                var attribute = "faces_and_places";
                var field = "faces_and_places." + d.db + ".1.aspect";
                var aspect = d.db;
                var obj = {};
                obj[field] = prompt("Name", Fate_Core.svg_game.game_data()[attribute][aspect][1].aspect);
                games.update(
                    { _id: Session.get("current_game") },
                    { $set: obj }
                );
                Fate_Core.svg_game.draw_sheet();
            })
    },
    dials : function (scale, svg){
        var simple_fields_data = Fate_Core.game_sheet_data.dials;
        var box_field_h = Fate_Core.game_sheet_data.field_box_info.height * scale;
        var box_field_text_size = Fate_Core.game_sheet_data.field_box_info.text_size * scale + "px";
        var box_field_text_margin_x = Fate_Core.game_sheet_data.field_box_info.text_margin_x * scale;
        var box_field_text_margin_y = Fate_Core.game_sheet_data.field_box_info.text_margin_y * scale;
        var dials = svg
            .selectAll("rect.dials")
            .data(simple_fields_data)
            .enter()
            .append("rect");
        dials.attr({
            x : function(d){
                return d.x * scale;
            },
            y : function(d) {
                return d.y * scale;
            },
            height : function(d) {
                return box_field_h;
            },
            width : function(d) {
                return d.width * scale;
            },
            class : "dials"
        });
        var dials_text_data = svg
            .selectAll("text.dials_text_data")
            .data(simple_fields_data)
            .enter()
            .append("text");
        dials_text_data
            .attr("fill", "black")
            .attr("x", function(d) {
                return d.x * scale + (box_field_text_margin_x);
            })
            .attr("y", function(d) {
                return (d.y * scale) + box_field_h - box_field_text_margin_y;
            })
            .text(function(d) {
                var attribute = d.db;
                return Fate_Core.svg_game.game_data().dials[attribute];
            })
            .attr("font-size", box_field_text_size);
        d3.selectAll(".dials")
            .on("click", function(d){
                var attribute = "dials";
                var field = "dials." + d.db;
                var aspect = d.db;
                var obj = {};
                obj[field] = prompt(d.db, Fate_Core.svg_game.game_data()[attribute][aspect]);
                games.update(
                    { _id: Session.get("current_game") },
                    { $set: obj }
                );
                Fate_Core.svg_game.draw_sheet();
            })
    },
    skills : function (scale, svg){
        var simple_fields_data = Fate_Core.game_sheet_data.skills;
        var box_field_h = Fate_Core.game_sheet_data.field_box_info.height * scale;
        var box_field_text_size = Fate_Core.game_sheet_data.field_box_info.text_size * scale + "px";
        var box_field_text_margin_x = Fate_Core.game_sheet_data.field_box_info.text_margin_x * scale;
        var box_field_text_margin_y = Fate_Core.game_sheet_data.field_box_info.text_margin_y * scale;
        var skills = svg
            .selectAll("rect.skills")
            .data(simple_fields_data)
            .enter()
            .append("rect");
        skills.attr({
            x : function(d){
                return d.x * scale;
            },
            y : function(d) {
                return d.y * scale;
            },
            height : function(d) {
                return box_field_h;
            },
            width : function(d) {
                return d.width * scale;
            },
            class : "skills_fields"
        });
        var skills_text_data = svg
            .selectAll("text.skills_text_data")
            .data(simple_fields_data)
            .enter()
            .append("text");
        skills_text_data
            .attr("fill", "black")
            .attr("x", function(d) {
                return d.x * scale + (box_field_text_margin_x);
            })
            .attr("y", function(d) {
                return (d.y * scale) + box_field_h - box_field_text_margin_y;
            })
            .text(function(d) {
                var attribute = d.db;
                return Fate_Core.svg_game.game_data().skills[attribute];
            })
            .attr("font-size", box_field_text_size);
        d3.selectAll(".skills_fields")
            .on("click", function(d){
                var attribute = "skills";
                var field = "skills." + d.db;
                var aspect = d.db;
                var obj = {};
                obj[field] = prompt("Skill", Fate_Core.svg_game.game_data()[attribute][aspect]);
                games.update(
                    { _id: Session.get("current_game") },
                    { $set: obj }
                );
                Fate_Core.svg_game.draw_sheet();
            })
    },
    player_header : function(scale, svg){
        var header_data = Fate_Core.game_sheet_player_area.headers;
        var header_h = Fate_Core.game_sheet_player_area.header_info.height * scale;
        var header_text_size = Fate_Core.game_sheet_player_area.header_info.text_size * scale + "px";
        var header_text_margin = Fate_Core.game_sheet_player_area.header_info.text_margin * scale;
        var header_bars = svg
            .selectAll("rect.header_bars")
            .data(header_data)
            .enter()
            .append("rect");
        header_bars.attr({
            x : function(d){
                return d.x * scale;
            },
            y : function(d) {
                return d.y * scale;
            },
            height : function(d) {
                return header_h;
            },
            width : function(d) {
                return d.width * scale;
            },
            fill : function() {
                return "black";
            }
        });
        var header_text = svg
            .selectAll("text.header_bars")
            .data(header_data)
            .enter()
            .append("text");
        header_text
            .attr("fill", "white")
            .attr("x", function(d) {
                return d.x * scale + header_text_margin;
            })
            .attr("y", function(d) {
                return d.y * scale + header_h - header_text_margin;
            })
            .text(function(d) {
                return d.text;
            })
            .attr("font-size", header_text_size);
    },
    player_area : function(scale, svg_p, svg_width){
        var characters = Fate_Core.game_sheet_player_area.characters;
        var box_field_h = Fate_Core.game_sheet_player_area.box_h * scale;
        var box_field_text_size = Fate_Core.game_sheet_player_area.field_box_info.text_size * scale + "px";
        var box_field_text_margin_x = Fate_Core.game_sheet_player_area.field_box_info.text_margin_x * scale;
        var box_field_text_margin_y = Fate_Core.game_sheet_player_area.field_box_info.text_margin_y * scale;

        var box_width = (svg_width *.94) * .8 / 6;
        var box_margin = (svg_width *.94) * .2 / 5;

        var boxes = svg_p
            .selectAll("rect")
            .data(characters)
            .enter()
            .append("rect");
        boxes.attr({
            x : function(d){
                return (svg_width *.03)
                    + (d.db * box_width)
                    + (d.db * box_margin);
            },
            y : function(d) {
                return 2
                    + (Fate_Core.game_sheet_player_area.header_info.height * scale)
                    + (5 * scale);
            },
            height : function(d) {
                return box_field_h;
            },
            width : function(d) {
                return box_width;
            },
            class : "players"
        });
        var box_fields_text_data = svg_p
            .selectAll("text")
            .data(characters)
            .enter()
            .append("text");
        box_fields_text_data
            .attr("fill", "black")
            .attr("x", function(d) {
                return (svg_width *.03)
                    + (d.db * box_width)
                    + (d.db * box_margin)
                    + (box_field_text_margin_x * 2);
            })
            .attr("y", function(d) {
                return 2
                    + (Fate_Core.game_sheet_player_area.header_info.height * scale)
                    + (5 * scale)
                    + box_field_h - box_field_text_margin_y;
            })
            .text(function(d) {
                var element = d.db;
                var player_id = Fate_Core.svg_game.game_data().players[element];
                var pc = Fate_Core.Characters.gamefind(player_id, Session.get("current_game"));
//                console.log(pc);
                if(player_id){

//                    if(pc){
//                        return pc.name;
//                    } else {
//                        return "unassigned"
//                    }
                } else {
                    return "";
                }
//                return pc.name;
//                return player_id;
            })
            .attr("font-size", box_field_text_size);
    }
}