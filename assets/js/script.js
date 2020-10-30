//Variables
let currentHour = moment().startOf('hour');

//Add current day/time to the jumbotron (live time)
function currentTime() {
    $('#currentDay').html(moment().format('dddd[:] LL[ at] h[:]mm[:]ss A'));

    //Update past/present/future colors if start of new hour
    if(moment().startOf('second').isSame(moment().startOf('hour'))){
        //Update currentHour if changed;
        currentHour = moment().startOf('hour');
        updatePastPresentFuture(currentHour);
    };
};
setInterval(currentTime, 1000);

//Function for updating classes (initially when opening website, and at the start of a new hour)
function updatePastPresentFuture(hour) {
    for (let k = 8; k < 18; k++){
        let rowHour = moment().set('hour', k).startOf('hour');
        if(rowHour.isBefore(hour)){
            $(`#${k}user-text-box`).removeClass('present');
            $(`#${k}user-text-box`).removeClass('future');
            $(`#${k}user-text-box`).addClass('past');
        } else if(rowHour.isSame(hour)){
            $(`#${k}user-text-box`).removeClass('past');
            $(`#${k}user-text-box`).removeClass('future');
            $(`#${k}user-text-box`).addClass('present');
        } else if(rowHour.isAfter(hour)){
            $(`#${k}user-text-box`).removeClass('past');
            $(`#${k}user-text-box`).removeClass('present');
            $(`#${k}user-text-box`).addClass('future');
        };
    };
};

//append timeblocks between 8-5
//Create/Append rows for each timeblock (8-18 is for the hours for the timeblocks)
for (let i = 8; i < 18; i++){
    $('.container').append(`<div class="row" id="${i}"></div>`)
};

//Create/Append columns for each timeblock (first column is time; second column is text area; third column for save button)
for (let j = 8; j < 18; j++){
    //Add columns to the rows
    //Adds column with hour
    $(`#${j}`).append(`<div class="col-1 pt-3 hour">${moment(j, ["HH"]).format("h A")}</div>`);
    //Adds column with textbox
    $(`#${j}`).append(`<div class="col-10 px-0" id="${j}user-text-box"><textarea></textarea></div>`);
    //Adds column with save button
    $(`#${j}`).append(`<div class="col-1 saveBtn"><i class="fas fa-save save-icon" id="${j}user-text" type="submit"></i></div>`);

   //Add past/present/future classes by comparing current hour with row's hour
   updatePastPresentFuture(currentHour);
};

//Pulls data from local storage to add to container
function retrieveUserData(){
    
    //If null, won't add anything;
    for(k = 8; k < 18; k++){
        let savedText = localStorage.getItem(`${k}user-text-box`);
        $(`#${k}user-text-box textarea`).val(savedText);
    };

};

//Calls function upon opening page
retrieveUserData();

//Save button needs to save to local storage
$(`.save-icon`).click(function() {
    let userDataID;
    let userTextContent;

    //To pull ID of specific textarea
    userDataID = $(this).attr('id');
    //To show content listed in specific textarea
    userTextContent = $(`#${userDataID}-box textarea`).val();
    //Add an item to localStorage
    localStorage[`${userDataID}-box`] = userTextContent;

    //To remove items
    if(!userTextContent){
        localStorage.removeItem(`${userDataID}-box`);
        return;
    };

});