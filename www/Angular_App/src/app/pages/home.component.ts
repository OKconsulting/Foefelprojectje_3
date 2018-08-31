
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CalendarDay, CalendarDayPart } from '../components/calendar/calendar.type';

@Component({
    selector: 'myeok-home',
	templateUrl: './home.component.html',
	////providers: [DoccleService]
})

export class MyEOKHome {
	public days: CalendarDay[] = [
		{
			Day: moment("20180319", "YYYYMMDD"),
			Parts: [
				{
					Color: "#ffc107",
					DayPart: "D100"
				}
			]
		},
		{
			Day: moment("20180320", "YYYYMMDD"),
			Parts: [
				{
					Color: "#ffc107",
					DayPart: "D100"
				}
			]
		},
		{
			Day: moment("20180321", "YYYYMMDD"),
			Parts: [
				{
					Color: "#ffc107",
					DayPart: "V50"
				}
			]
		},
		{
			Day: moment("20180303", "YYYYMMDD"),
			Parts: [
				{
					Color: "#e9ecef",
					DayPart: "D100"
				}
			]
		},
		{
			Day: moment("20180304", "YYYYMMDD"),
			Parts: [
				{
					Color: "#e9ecef",
					DayPart: "D100"
				}
			]
		},
		{
			Day: moment("20180310", "YYYYMMDD"),
			Parts: [
				{
					Color: "#e9ecef",
					DayPart: "D100"
				}
			]
		},
		{
			Day: moment("20180311", "YYYYMMDD"),
			Parts: [
				{
					Color: "#e9ecef",
					DayPart: "D100"
				}
			]
		},
		{
			Day: moment("20180317", "YYYYMMDD"),
			Parts: [
				{
					Color: "#e9ecef",
					DayPart: "D100"
				}
			]
		},
		{
			Day: moment("20180318", "YYYYMMDD"),
			Parts: [
				{
					Color: "#e9ecef",
					DayPart: "D100"
				}
			]
		},
		{
			Day: moment("20180324", "YYYYMMDD"),
			Parts: [
				{
					Color: "#e9ecef",
					DayPart: "D100"
				}
			]
		},
		{
			Day: moment("20180325", "YYYYMMDD"),
			Parts: [
				{
					Color: "#e9ecef",
					DayPart: "D100"
				}
			]
		},
	];
}