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
    $(`#${j}`).append(`<div class="col-10 px-0" id="${j}user-text"><textarea></textarea></div>`);
    //Adds column with save button
    $(`#${j}`).append(`<div class="col-1 saveBtn"><i class="fas fa-save save-icon" for="${j}user-text" type="submit"></i></div>`);


   //Add past/present/future classes by comparing current hour with row's hour
    let rowHour = moment().set('hour', j).startOf("hour");
    if(rowHour.isBefore(currentHour)){
        $(`#${j}user-text`).addClass('past');
    } else if(rowHour.isSame(currentHour)){
        $(`#${j}user-text`).addClass('present');
    } else if(rowHour.isAfter(currentHour)){
        $(`#${j}user-text`).addClass('future');
    };

};

//Pulls data from local storage to add to container
function retrieveUserData(){
    
    //If null, won't add anything;
    for(k = 8; k < 18; k++){
        let test = localStorage.getItem(`${k}user-text`);
        $(`#${k}user-text textarea`).val(test);
    };

};

//Calls function upon opening page
retrieveUserData();

//Save button needs to save to local storage
$(`.save-icon`).click(function(e) {
    let userDataID;
    let userTextContent;

    //To pull ID of specific textarea
    userDataID = $(this).attr('for');
    //To show content listed in specific textarea
    userTextContent = $(`#${userDataID} textarea`).val();
    //Add an item to localStorage
    localStorage[`${userDataID}`] = userTextContent;

    //To remove items
    if(!userTextContent){
        localStorage.removeItem(`${userDataID}`);
        return;
    };

});