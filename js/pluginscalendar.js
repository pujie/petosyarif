$(document).ready(function(){
    /* CALENDAR */
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

		    $('#calendar').fullCalendar({
			header:{
				left: 'prev,next',
				center: 'title',
				//right: ''
				right: 'month,agendaWeek,agendaDay'				
			},
			events:[{
				title:"meeting",
				start:"2015-04-28T08:00:00.000Z",
				end:"2015-04-28T09:00:00.000Z"    
			}]
		    })

/*
    var calendar = $('#calendar').fullCalendar({
            header: {		
                    left: 'prev,next',
                    center: 'title',
                    //right: ''
                    right: 'month,agendaWeek,agendaDay'
            },
            selectable: true,
            selectHelper: true,
            select: function(start, end, allDay) {
                    var title = prompt('Event Title:');
                    if (title) {
                            calendar.fullCalendar('renderEvent',
                                    {
                                            title: title,
                                            start: start,
                                            end: end,
                                            allDay: allDay
                                    },
                                    true // make the event "stick"
                            );
                    }
                    calendar.fullCalendar('unselect');
            },
            editable: true,
            events: [
                    {
                            title: 'All Day Event',
                            start: new Date(y, m, 20),
                            end: new Date(y, m, 21)
                    },
                    {
                            title: 'Long Event',
                            start: new Date(y, m, 1),
                            end: new Date(y, m, 10)
                    },{
			title:'Puji',
			start:"2015-04-28T08:00:00.000Z",
			end:"2015-04-28T10:00:00.000Z"
		}
            ]
    });
*/
                  
         
});
