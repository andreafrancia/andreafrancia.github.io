// Copyright (c) Andrea Francia 2009
// Licensed under the GPLv2

function padWithZeros(number)
{
    if(number<0) {
        return String(number);
    } else if (number<10) {
        return "0" + number;
    } else {
        return String(number);
    }
}

function parseDate(hash) {
    try {
        return parseIso8601Date(hash.substr(1));
    } catch(e) {
        return Number.NaN;
    }
}

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60 * 1000);
}

function secondsToMmSsString(seconds) {
    var mm = Math.floor(seconds / 60);
    var ss = Math.floor(seconds % 60);
    return padWithZeros(mm) + ':' + padWithZeros(ss);
}

function timeLeftToString(now,endTime) {
    var diff_in_secs = differenceInSeconds(endTime,now);
    return secondsToMmSsString(diff_in_secs);
}

function differenceInSeconds(date1, date2) {
    var date1InSecs = date1.getTime() / 1000;
    var date2InSecs = date2.getTime() / 1000;
    return date1InSecs - date2InSecs;
}

function to25MinutesInFuture() {
    var now = new Date();
    return addMinutes(now, 25);
}

function linkToLocation(location,text) {
    return '<a href="' + location+ '">' + text + '</a>';
}

function displayTimeLeftIfPossible(endTime, now, updateDisplay) {
    if (now() < endTime()) {
        updateDisplay(timeLeftToString(now(), endTime()));
    } else {
        updateDisplay('');
    }
}

function printObject(obj) {
    document.write("<pre>");
    //document.write("obj: " + obj.toString());
    for(var name in obj) {
        document.write(name + ":" + obj[name] + "\n");
    }
    document.write("</pre>");
}

function locationWithReplacedHashPart(old_location, newHashPart) {
    return old_location.protocol
           + "//"
           + old_location.host
           + old_location.pathname
           + old_location.search
           + newHashPart;
}

function parseIso8601Date(iso8601Date) {
    var result = iso8601Date.match(/^(\d*)-(\d*)-(\d*)T(\d*):(\d*):(\d*)/);

    var year = result[1];
    var month = Number(result[2]);
    var day = result[3];
    var hours = result[4];
    var minutes = result[5];
    var seconds = result[6];

    return new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));

}

function dateInISO8601(date) {
    return date.getUTCFullYear() + "-"
           + padWithZeros(Number(date.getUTCMonth() + 1)) + "-"
           + padWithZeros(date.getUTCDate()) + "T"
           + padWithZeros(date.getUTCHours()) + ":"
           + padWithZeros(date.getUTCMinutes()) + ":"
           + padWithZeros(date.getUTCSeconds());
}

function createTimer() {
    var timer = new Object();
    timer.updateDisplay =  function() {
        var timeLeft = differenceInSeconds(timer.getEndTime(), timer.now());
        if(timeLeft >= 0) {
            timer.display(secondsToMmSsString(timeLeft));
        } else {
            timer.display("");
        }
    }
    timer.start = function(minutes) {
        timer.setEndTime(addMinutes(timer.now(), minutes));
    }
    timer.stop = function() {
        timer.clearEndTime();
    }
    timer.boot = function () {
        if(timer.hasEndTime()) {
            timer.setEndTime(timer.getEndTime());
        } else {
            timer.clearEndTime();
        }
    }
    return timer;
}
