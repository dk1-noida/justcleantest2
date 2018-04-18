/*
 +-----------------------------------------------------------+
 | Module Name: GENERAL HELPER                               | 
 | Module Purpose: Manage the general functions              |
 | Author: Manuraj.M                                         |
 +-----------------------------------------------------------+
*/

'use strict';
var moment = require("moment");
var uniqid = require('uniqid');

//var uniqid = require('uniqid');
var FlakeIdGen = require('flake-idgen')
    , intformat = require('biguint-format')
    , generator = new FlakeIdGen;

 

/**
 * Get today date
 * @author Manuraj M
 * @return json
 * @createdOn 14-Mar-2017
 */

var today = function(){
    return new Date();
};

/**
 * Get today date in Milliseconds
 * @author Manuraj M
 * @return json
 * @createdOn 14-Mar-2017
 */

var todayMilliseconds = function(){
    return new Date().getTime();
};

/**
 * valid email
 * @author Manuraj M
 * @return json
 * @createdOn 14-Mar-2017
 */

var isvalidEmail = function(email){
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
};

/**
 * valid date format as YYYY/MM/DD
 * @author Karthika G
 * @return json
 * @createdOn 14-Mar-2017
 */

var isValidDate = function(date)
{
    var matches = /(\d{4})[-\/](\d{2})[-\/](\d{2})/.exec(date);
    if (matches == null) return false;
    var day = matches[3];
    var month = matches[2] - 1;
    var year = matches[1];
    var composedDate = new Date(year, month, day);
    return composedDate.getDate() == day &&
             composedDate.getMonth() == month &&
             composedDate.getFullYear() == year;
};

/**
 * convert_arbic_to_english_date
 * @author Dinesh
 * @return json
 * @createdOn 08-Jan-2017
 */

var convert_arbic_to_english_date = function(dateStr)
{    
    if(!dateStr && dateStr == '')
    {           
        return dateStr;
    }
    var finalDate = "";
    var standard = ["0","1","2","3","4","5","6","7","8","9"];
    var eastern_arabic_symbols = ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"]; 
    for(var i in dateStr)
    {
        if(eastern_arabic_symbols.indexOf(dateStr[i])>=0)
        {
            finalDate += standard[eastern_arabic_symbols.indexOf(dateStr[i])];
        }
        else
        {
            finalDate += dateStr[i];
        }
    }        
    return finalDate;
};

/**
 * generate a unique number
 * @author Dinesh
 * @return json
 * @createdOn 08-Jan-2017
 */

var generate_unique_number = function()
{
    var id1 = generator.next();    
    return intformat(id1, 'dec');
};


/**
 * Change date format
 * @author Dinesh
 * @return json
 * @createdOn 08-Jan-2017
 */

var change_date_format = function(dateStr)
{
    if(!dateStr)
    {
        return dateStr;
    }
    var temp_date = dateStr.split("-");
    if(temp_date.length<3)
    {
        return dateStr;   
    }
    return temp_date[2]+"-"+temp_date[1]+"-"+temp_date[0];
};

var getDateTime = function() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;

}

var calculateDays = function(current,before)
{
    var diff = moment.duration(moment(current).diff(moment(before)));
    var minutes = parseInt(diff.asMinutes());
    return minutes;
}

/*using for unique order id*/

var uniqueId = function(){
    //console.log(uniqid('JC-').toUpperCase());
    return (uniqid.process('JC-').toUpperCase());
}

module.exports = {
    today : today,
    todayMilliseconds:todayMilliseconds,
    isvalidEmail:isvalidEmail,
    isValidDate:isValidDate,
    convert_arbic_to_english_date : convert_arbic_to_english_date,
    generate_unique_number : generate_unique_number,
    change_date_format: change_date_format,
    getDateTime : getDateTime,
    calculateDays : calculateDays,
    uniqueId : uniqueId
}   