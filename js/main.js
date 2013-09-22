$.getJSON( "data/schedule.json", function( data ) {
	$('#headline').html(data.conference);

	var list = "";
	for (var day in data.schedule) {
		list += '<li data-day="' + day + '"" class="schedule-tab">' + day + '</li>';
	}

	$('#schedule-tabs').addClass('tabs-' + Object.keys(data.schedule).length);
	$('#schedule-tabs').html(list);

	var schedule_container = "";
	for (var day in data.schedule) {
		var day_string = '<div id="' +  day + '" class="day-schedule">';

		var schedule = data.schedule[day];

		var schedule_length = schedule.length;
		for (var i = 0; i < schedule_length; i++) {
			var slot = schedule[i];
			day_string += '<h2>' + slot.time.start + ' - ' + slot.time.end + '</h2>';

			var talk_length = slot.talks.length;
			for (var j = 0; j < talk_length; j++) {
				var talk = slot.talks[j];
				var talk_id = day + '-' + i + '-' + j;
				day_string += '<h3 data-talk-id="' + talk_id + '">' + talk.speaker + ' - ' +  talk.topic + '</h3>';
				day_string += '<div>Location: ' + talk.location + '</div>';
				day_string += '<div id="' + talk_id + '" class="description">' +talk.description + '</div>';
			}
		}

		day_string += '</div>';

		schedule_container += day_string;
	}

	$('#schedule').html(schedule_container);

	selectTab(day);

	$('.description').hide();
	$('.schedule-tab').on('click', function (event) {
		var selected_day = $(this).data('day');
		selectTab(selected_day);
	});

	$('h3').on('click', function(event) {
		$('.description').hide();
		var talk_id = $(this).data('talk-id');
		$('#' + talk_id).show();
	});

});

var selectTab = function (day) {
	$('.day-schedule').hide();
	$('#' + day).show();
};
