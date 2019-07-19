
class DatetimeUtils{

  formatDuration(startDate, endDate){

    let timeDelta = endDate.getTime() - startDate.getTime();

    let temp = timeDelta;

    let hours = Math.floor(temp / 1000 / 60 / 60);
    temp -= hours * 1000 * 60 * 60;

    let minutes = Math.floor(temp / 1000 / 60);
    temp -= minutes * 1000 * 60;

    let seconds = Math.floor(temp / 1000);
    temp -= seconds * 1000;

    return hours + ":" + minutes + ":" + seconds;
  }
};

export default DatetimeUtils;
