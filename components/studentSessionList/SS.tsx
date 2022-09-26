export default class SS {
  name: string;
  dateStart: Date;
  dateEnd: Date;
  capacity: number;
  bookingCount: number;
  speaker: string;
  description: string;
  language: string;

  constructor() {
      this.name = ""
      this.dateStart = new Date(0)
      this.dateEnd = new Date(0)
      this.capacity = 0
      this.bookingCount = 0
      this.description = ""
      this.speaker = ""
      this.language = ""
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
      return this.bookingCount
  }

  getDescription(): string{
      return this.description
  }

  getSpeaker(): string{
      return this.speaker
  }

  getLanguage(): string{
      return this.language
  }

}