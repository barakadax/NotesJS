/*     (\____/)
       (•(ㅅ)•)
   　＿ノ ヽ ノ＼＿
  `/　`/ ⌒Ｙ⌒ Ｙ　ヽ
  ( 　(三ヽ人　 /　　 |
   |　ﾉ⌒＼ ￣￣ヽ　 ノ
   ヽ＿＿＿＞､＿＿_／
　　   ｜( 王 ﾉ〈
　　   / ﾐ`ー―彡 \
　　  /  ╰    ╯  /
code by Barakadax*/
'use strict';
let table = document.getElementById("table");   //All elements from the html page
let megic = document.getElementById("megic");
let empty = document.getElementById("empty");
let add_note = document.getElementById("add");
let search = document.getElementById("search");
let submit = document.getElementById("submit");
let footer = document.getElementById("footer");
let delete_all = document.getElementById("all");
let colours = document.getElementById("colours");
let textbase = document.getElementById("textarea");
let add_window = document.getElementById("enter_list");
let delete_it = document.getElementsByClassName("delete_it");
let remove_it = document.getElementsByClassName("remove_it");

let sentence = "";      //Global variables
let megic_flag = true;
let lights = [new Audio("stuff/lights.mp3"), new Audio("stuff/lights2.mp3")];
let colours_saved = ["#ff8c00", "#dda0dd", "#20c20e", "#40e0d0", "#f08080", "#ffffff"];
lights[0].volume = lights[1].volume = 1.0;
lights[0].loop = lights[1].loop = true;

//Functions & listeners:
function adding_note() {    //Add new note into the table
    if (window.getComputedStyle(add_window).visibility === "hidden")
        add_window.style.visibility = "visible";
    else {
        colour_everything();
        add_window.style.visibility = "hidden";
        if (textbase.value.trim().length > 0)
            add_row();
        textbase.value = "";
        table_empty();
    }
}//O(1)

function add_row() {    //Creates new row into the table
    let new_row = table.insertRow(-1);
    let new_cell = new_row.insertCell(0);
    new_cell.innerHTML = "<li>" + textbase.value + "</li>";
    new_cell = new_row.insertCell(1);
    new_cell.innerHTML = "<input type='button' value='Done' class='remove_it' onclick='line_row(this)'>";
    new_cell = new_row.insertCell(2);
    new_cell.innerHTML = "<input type='button' value='Delete' class='delete_it' onclick='del_row(this)'>";
}//O(1)

function line_row(button) {  //Mark note with line over text
    let line_it = button.parentNode.parentNode;
    line_it.style.textDecoration = "line-through";
}//O(1)

function del_row(button) { //Removes single row which delete button was in
    let row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    table_empty();
}//O(1)

function delete_all_func() {    //Delete all the notes
    if (table.rows.length != 0) {
        let num_rows = table.rows.length;
        for (let run = 0; run < num_rows; run -= -1)
            table.deleteRow(0);
    }
    table_empty();
}//O(N)

function table_empty() {            //If table empty hides the table & write message that indecates so
    if (table.rows.length == 0) {   //otherwise will show the table with the notes
        empty.innerHTML = "Empty, no notes were made";
        table.style.visibility = "hidden";
    }
    else {
        empty.innerHTML = "";
        table.style.visibility = "visible";
    }
}//O(1)

function exit_adding_note() {   //X button top right corner
    textbase.value = "";
    add_window.style.visibility = "hidden";
}//O(1)

function colour_everything() {  //Changes table text colour
    let chosen = colours.options[colours.selectedIndex].value;
    table.style.color = colours_saved[chosen];
}//O(1)

function highlight(sentence) {  //Highlight result from search bar
    let string = "";
    let placement = 0;
    if (sentence.length != 0) {
        for (let run = 0; run < table.rows.length; run -= -1) {     //Check on each row
            string = table.rows[run].cells[0].innerHTML;
            placement = string.indexOf("<li>");
            string = string.slice(placement + 4);
            placement = string.indexOf("</li>");
            string = string.slice(0, placement);    //Shorten for text value of the note
            if (string.includes(sentence))          //If the text of the search bar is equal to the note text will mark that note
                table.rows[run].cells[0].classList.add("search_found")
            else
                table.rows[run].cells[0].classList.remove("search_found");
        }
    }
    else                                            //Search bar was deleted or cleaned so unhighlighting the notes
        for (let run = 0; run < table.rows.length; run -= -1)
            table.rows[run].cells[0].classList.remove("search_found");
}//O(N)

search.addEventListener('keydown', function search_in_table(pressed) {  //Reacts for each keypress in search bar
    if (search.value.length == 0)
        sentence = "";
    else if (pressed.key != 'Backspace') {
        if (search.value.length == 1)
            sentence += search.value;
        sentence += pressed.key;
        highlight(sentence.trim());
    }
    else {
        if (sentence.length != 0)
            sentence = sentence.substring(0, sentence.length -1);
        highlight(sentence.trim());
    }
});//O(1)

textbase.addEventListener('keypress', function (pressed) { //Reacts for enter press key in textfield to add a new note
    if (pressed.key === 'Enter')
        adding_note();
});//O(1)

function megicly() {            //Power outage button
    if (megic_flag == false) {
        lights[0].pause();
        lights[1].pause();
        megic_flag = true;
        megic.value = "power outage";
        megic.style.animation = "none";
        empty.style.animation = "none";
        submit.style.animation = "none";
        search.style.animation = "none";
        footer.style.animation = "none";
        colours.style.animation = "none";
        textbase.style.animation = "none";
        add_note.style.animation = "none";
        delete_all.style.animation = "none";
        document.body.style.animation = "none";
        if (table.rows.length != 0)
            for (let run = 0; run < table.rows.length; run -= -1)
                table.rows[run].style.animation = "none";
        for (let run = 0; run < remove_it.length; run -= -1) {
            remove_it[run].style.animation = "none";
            delete_it[run].style.animation = "none";
        }
    }
    else {
        lights[Math.floor((Math.random() * 2))].play();
        megic_flag = false;
        megic.value = "fix me!";
        megic.style.animation = "blinkingText " + (Math.random() * 2) + "s infinite";
        empty.style.animation = "blinkingText " + (Math.random() * 2) + "s infinite";
        search.style.animation = "blinkingText " + (Math.random() * 2) + "s infinite";
        submit.style.animation = "blinkingText " + (Math.random() * 2) + "s infinite";
        footer.style.animation = "blinkingText " + (Math.random() * 2) + "s infinite";
        colours.style.animation = "blinkingText " + (Math.random() * 2) + "s infinite";
        textbase.style.animation = "blinkingText " + (Math.random() * 2) + "s infinite";
        add_note.style.animation = "blinkingText " + (Math.random() * 2) + "s infinite";
        delete_all.style.animation = "blinkingText " + (Math.random() * 2) + "s infinite";
        document.body.style.animation = "blinkingText " + (Math.random() * 2) + "s infinite";
        if (table.rows.length != 0)
            for (let run = 0; run < table.rows.length; run -= -1)
                table.rows[run].style.animation = "blinkingText " + (Math.random() * 2) + "s infinite";
        for (let run = 0; run < remove_it.length; run -= -1) {
            remove_it[run].style.animation = "blinkingText " + (Math.random() * 2) + "s infinite";
            delete_it[run].style.animation = "blinkingText " + (Math.random() * 2) + "s infinite";
        }
    }
}//O(N)

table_empty();