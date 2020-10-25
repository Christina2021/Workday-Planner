//Variables
const currentMoment = moment();
const currentHour = moment().startOf('hour');
//Retreiving local Storage
let userData;
//Saving to local Storage
let userDataID;
let userTextContent;
let textObj;
let allText;

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
    $(`#${j}`).append(`<div class="col-10 pl-0" id="user-text${j}"><textarea></textarea></div>`);
    //Adds column with save button
    $(`#${j}`).append(`<div class="col-1 saveBtn"><i class="fas fa-save save-icon" for="user-text${j}" type="submit"></i></div>`);


   //Add past/present/future classes by comparing current hour with row's hour
    let rowHour = moment().set('hour', j).startOf("hour");
    if(rowHour.isBefore(currentHour)){
        $(`#user-text${j}`).addClass('past');
    } else if(rowHour.isSame(currentHour)){
        $(`#user-text${j}`).addClass('present');
    } else if(rowHour.isAfter(currentHour)){
        $(`#user-text${j}`).addClass('future');
    };

};

//Pulls data from local storage to add to container
function retrieveUserData(){

    userData = JSON.parse(localStorage.getItem("usersCurrentPlanner"));

    //If there is no user Data
    if(!userData){
        return;
    }else{
        //Check each item in local Storage and stick it in the appropriate textareas
        for(k = 0; k < userData.length; k++){
            if(userData[k].TextID) {
                $(`#${userData[k].TextID} textarea`).val(userData[k].Content);
            }else {
                return;
            };
        };
    };
};

retrieveUserData();

//Save button needs to save to local storage
$(`.save-icon`).click(function(e) {

    //To pull ID of specific textarea
    userDataID = $(this).attr('for');
    //To show content listed in specific textarea
    userTextContent = $(`#${userDataID} textarea`).val();

    if(!userTextContent){
        localStorage.removeItem(`${userDataID}`);
        return;
    } else {
        alert("works");
    };

    //Put user's text into an object
    textObj = {TextID: userDataID, Content: userTextContent};
    //Get previous text items
    allText = JSON.parse(localStorage.getItem("usersCurrentPlanner"))
    //If nothing is currently in local Storage
    if(!allText){
        allText = [];
        allText[0] = textObj;
    } else {
        allText.push(textObj);
    };
    //Convert object to string and put in local Storage
    localStorage.setItem("usersCurrentPlanner", JSON.stringify(allText));
});