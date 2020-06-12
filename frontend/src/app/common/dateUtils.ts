export const parseSecondsInDay = (seconds) => {
    let hour = Math.floor(seconds % (3600*24) / 3600);
    return {
        day: Math.floor(seconds / (3600*24)),
        hour,
        minute: Math.floor(seconds % 3600 / 60),
        second: Math.floor(seconds % 60),
        aHour: hour % 12,
        a: (hour >= 12)? "PM": "AM"
    }
}

export const timeStrToSeconds = (timeStr) => {
    let aHour = parseInt(timeStr.substr(0, timeStr.indexOf(':')));
    let minute = parseInt(timeStr.substr(timeStr.indexOf(':') + 1, timeStr.indexOf(' ')));
    let a = timeStr.substr(timeStr.indexOf(' ') + 1);
    let hour = aHour;
    if (a.toLowerCase() == 'pm') {
        if (hour != 12) {
            hour += 12;
        }
    } else if (aHour == 12) {
        hour = 0;
    }
    return (hour * 60 + minute) * 60;
}