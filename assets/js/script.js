//Variables
const currentMoment = moment();
const currentHour = moment().startOf('hour');

//Add current day/time to the jumbotron
$('#currentDay').append(currentMoment.format('dddd[:] LL[ at] LT'));

//append timeblocks between 8-5
//Create/Append rows for each timeblock (8-18 is for the hours for the timeblocks)
for (i = 8; i < 18; i++){
    $('.container').append(`<div class="row" id="${i}"></div>`)
};

//Create/Append columns for each timeblock (first column is time; second column is text area; third column for save button)
for (j = 8; j < 18; j++){
    //Add columns to the rows
    //Adds column with hour
    $(`#${j}`).append(`<div class="col-1 pt-3 hour">${moment(j, ["HH"]).format("h A")}</div>`);
    //Adds column with textbox
    $(`#${j}`).append(`<div class="col-10 pl-0 user-text${j}"><textarea name="" id="" cols="" rows=""></textarea></div>`);
    //Adds column with save button
    $(`#${j}`).append(`<div class="col-1 saveBtn"><i class="fas fa-save fa-lg save-icon"></i></div>`);


   //Add past/present/future classes    
    let rowHour = moment().set('hour', j).startOf("hour");
    console.log(rowHour);
    console.log(currentHour);
    if(rowHour.isBefore(currentHour)){
        $(`.user-text${j}`).addClass('past');
    } else if(rowHour.isSame(currentHour)){
        $(`.user-text${j}`).addClass('present');
    } else if(rowHour.isAfter(currentHour)){
        $(`.user-text${j}`).addClass('future');
    };

};

//must add classes, hours (parseInt for later), maybe attributes
//Middle column must be a textarea

//compare times with current time to to add past/present/future class

//save button needs to save to local storage