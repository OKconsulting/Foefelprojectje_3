import { Moment } from 'moment';

export interface CalendarDay {
    Day: Moment,
    Parts: CalendarDayPart[]
}

export interface CalendarDayPart {
    Color: string;
    DayPart: string;
}