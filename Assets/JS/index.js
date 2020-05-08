$(document).ready(function () {
    var schedule = ""

    var currentTime = function () {
        timeEL = document.querySelector('#currentDay')
        timeEL.innerHTML = moment().format('MMMM Do YYYY, H:mm:ss');
    }
    setInterval(currentTime, 1000);

    var hoursUpdater = function () {
        var currentHour = moment().hours();
        $('.time-block').each(function () {
            var blockHour = parseInt($(this).attr("data-hour"))

            if (blockHour < currentHour) {
                $(this).addClass("past");
            } else if (blockHour > currentHour) {
                $(this).addClass("future");

            } else {
                $(this).addClass("present");
            }

        })
    }
    setInterval(hoursUpdater, 10000)


    function saveschedule() {
        schedule = []
        $('.description').each(function () {
            var hour = $(this).attr("data-task")
            var task = $.trim($(this).val())

            schedule.push({
                hour: hour,
                task: task,
            })

            var setschedule = localStorage.setItem('scheduleItems', JSON.stringify(schedule))
        })

    }

    function loadschedule() {
        i = 0
        $('.description').each(function () {
            var readschedule = JSON.parse(localStorage.getItem('scheduleItems'))
            var hour = $(this).attr("data-task")

            if (readschedule[i].hour === hour) {
                $(this).val(readschedule[i].task)
            } else {
                return ""
            }

            i++
        })
    }


    $(".saveBtn").click(saveschedule)

    hoursUpdater()
    loadschedule()

});