export default class FairEvent {
    private name: string;
    private dateStart: Date;
    private dateEnd: Date;
    private capacity: number;
    private bookings: number;

    constructor(name: string, dateStart: Date, dateEnd: Date, capacity: number, bookings: number) {
        this.name = name
        this.dateStart = dateStart
        this.dateEnd = dateEnd
        this.capacity = capacity
        this.bookings = bookings
    }

    getName(): string{
        return this.name
    }

    getDateStart(): Date{
        return this.dateStart
    }

    getDateEnd(): Date{
        return this.dateEnd
    }

    getCapacity(): number{
        return this.capacity
    }

    getBookingCount(): number{
        return this.bookings
    }

}