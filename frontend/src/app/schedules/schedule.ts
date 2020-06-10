export interface Range {
    start: number,
    end: number
}

export interface SubSchedule {
    id: string;
    name: string;
    daysOfWeek: number[];
    periods: ActivityPeriod[]
}

export interface ActivityPeriod {
    timeOfDayRange: Range;
    activity: string;
}

export interface Schedule {
    id: string;
    name: string;
    range: Range;
    exceptions: Range[];
    subSchedules: SubSchedule[];
}