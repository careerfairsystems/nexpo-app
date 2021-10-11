import FairEvent from "./FairEvent"

export class FairEventBuilder{
    private readonly fairEvent: FairEvent

    constructor() {
        this.fairEvent = new FairEvent
    }

    name(n: string): FairEventBuilder{
        this.fairEvent.name = n
        return this
    }

    dateStart(date: Date): FairEventBuilder{
        this.fairEvent.dateStart = date
        return this
    }

    dateEnd(date: Date): FairEventBuilder{
        this.fairEvent.dateEnd = date
        return this
    }

    capacity(capacity: number): FairEventBuilder{
        this.fairEvent.capacity = capacity
        return this
    }

    bookingCount(bookingCount: number): FairEventBuilder{
        this.fairEvent.bookingCount = bookingCount
        return this
    }

    description(description: string): FairEventBuilder{
        this.fairEvent.description = description
        return this
    }

    speaker(speaker: string): FairEventBuilder{
        this.fairEvent.speaker = speaker
        return this
    }

    language(language:string): FairEventBuilder{
        this.fairEvent.language = language
        return this
    }

    build(){
        return this.fairEvent
    }
}