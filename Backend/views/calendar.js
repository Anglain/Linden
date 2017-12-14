function calendar(date) {
    // If no parameter is passed use the current date.
    if(date == null)
        date = new Date();

    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');

    var this_month = new Date(year, month, 1);
    var next_month = new Date(year, month + 1, 1);

    // Find out when this month starts and ends.
    var first_week_day = this_month.getDay();
    var days_in_this_month = Math.round((next_month.getTime() - this_month.getTime()) / (1000 * 60 * 60 * 24));

    var calendar_html = '<table style="background-color:#666699; color:#ffffff;">';
    calendar_html += '<tr><td colspan="7" style="background-color:#9999cc; color:#000000; text-align: center;">' + months[month] + ' ' + year + '</td></tr>';
    calendar_html += '<tr>';

    // Fill the first week of the month with the appropriate number of blanks.
    for(week_day = 0; week_day < first_week_day; week_day++) {
        calendar_html += '<td style="background-color:#9999cc; color:#000000;"> </td>';
    }

    var week_day = first_week_day;
    for(var day_counter = 1; day_counter <= days_in_this_month; day_counter++) {
        week_day %= 7;
        if(week_day === 0)
            calendar_html += '</tr><tr>';

        // Do something different for the current day.
        if(day === day_counter)
            calendar_html += '<td style="text-align: center;"><b>' + day_counter + '</b></td>';
        else
            calendar_html += '<td style="background-color:#9999cc; color:#000000; text-align: center;"> ' + day_counter + ' </td>';

        week_day++;
    }

    calendar_html += '</tr>';
    calendar_html += '</table>';

    // Display the calendar.
    document.write(calendar_html);
}