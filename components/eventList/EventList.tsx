import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View
} from "react-native";
import FairEvent from "./FairEvent";
import EventPreview from "../eventPreview/EventPreview";
import Layout from "../../constants/Layout";

export interface Props {
}

interface State {
}

/**
 * TODO:
 *  - Don't display past events
 *  - Sort within the same day
 */

class EventList extends Component<Props, State> {
    eventDateMap: Map<string, FairEvent[]>

    constructor(props: Props) {
        super(props);
        let query = this.queryBackend();
        let eventList = this.parseQuery(JSON.stringify(query));
        this.eventDateMap = this.sortEventDateMap(this.groupByDate(eventList))
        this.eventDateMap = this.beautifyDates(this.eventDateMap)
    }

    /**
     * Queries the backend and returns the result
     */
    queryBackend(){
        return {'test': "String"}
    }

    /**
     * Parses a query with events and puts the results into an array
     * @param query The event query
     */
    parseQuery(query: string): Array<FairEvent>{
       return this.getDevArray()
    }

    /**
     * Generates an array to simulate a query
     */
    getDevArray(){
        let events = new Array<FairEvent>()
        let testEvent1 = new FairEvent("Motivatioasdfasdfadsfasdfasdfnal speech1 - Gandhi", new Date(2021, 5,6,21,30), new Date(2021, 6,10,22,30), 200, 5)
        let testEvent2 = new FairEvent("Motivational speech2 - Gandhi", new Date(2021, 5,7,21,30), new Date(2021, 6,10,22,30), 200, 333)
        let testEvent25 = new FairEvent("Motivational speech25 - Gandhi", new Date(2021, 6,10,21,30), new Date(2021, 6,10,22,30), 200, 123)
        let testEvent3 = new FairEvent("Motivational speech3 - Gandhi", new Date(2021, 6,11,21,30), new Date(2021, 6,11,22,30), 200, 50)
        let testEvent4 = new FairEvent("Motivational speech4 - Gandhi", new Date(2021, 5,6,20,30), new Date(2021, 6,12,22,30), 200, 195)
        events.push(testEvent1)
        events.push(testEvent2)
        events.push(testEvent25)
        events.push(testEvent3)
        events.push(testEvent4)

        return events;
    }

    /**
     * Puts given events into a map categorised by date
     * @param events The events that are going to be grouped
     */
    groupByDate(events: Array<FairEvent>): Map<string, FairEvent[]>{
        let eventDates = new Map<string, FairEvent[]>()

        events.forEach(event => {
            let date:string = event.getDateStart().toDateString()
            // @ts-ignore
            eventDates.has(date)? eventDates.get(date).push(event): eventDates.set(date, [event])
        })

        return eventDates
    }

    /**
     * Returns a new sorted map
     * @param eventDateMap An unsorted map containing the events to be displayed
     */
    sortEventDateMap(eventDateMap: Map<string, FairEvent[]>): Map<string, FairEvent[]>{
        eventDateMap.forEach((events) => {
            this.sortTimes(events)
        })

        return this.sortDates(eventDateMap);
    }

    /**
     * Sorts an array of events depending on their start-time in an
     * ascending order
     * @param events The array that will be sorted
     */
    sortTimes(events: FairEvent[]): FairEvent[]{
        return events.sort((a, b) =>{
            return a.getDateStart().getTime() - b.getDateStart().getTime()
        })
    }

    sortDates(eventDateMap: Map<string, FairEvent[]>): Map<string, FairEvent[]>{
        return new Map([...eventDateMap.entries()].sort((a, b) => {
            return Date.parse(a[0]).valueOf() - Date.parse(b[0]).valueOf()
        }))
    }

    /**
     * Changes the keys of the dates corresponding to the current and following day
     * into appropriate strings
     * @param eventDateMap Sorted eventDateMap
     */
    beautifyDates(eventDateMap: Map<string, FairEvent[]>):Map<string, FairEvent[]>{
        let beautified: Map<string, FairEvent[]> = new Map<string, FairEvent[]>()
        let todayString = new Date().toDateString()

        let tomorrow = new Date()
        tomorrow.setTime(tomorrow.getTime() + 86400000)
        let tomorrowString = tomorrow.toDateString()

        eventDateMap.forEach((events, date) => {
            if(date === todayString){
                beautified.set("Today:", events)
            }else if(date === tomorrowString){
                beautified.set("Tomorrow:", events)
            }else{
                beautified.set(date + ":", events)
            }
        })

        return beautified
    }

    /**
     * Generates the list that will be displayed on the screen
     * @param eventDateMap Map that contains the date and correlating events
     */
    generateList(eventDateMap: Map<string, FairEvent[]>): JSX.Element{
        return(<View>{
            Array.from(eventDateMap.keys()).map(date =>{
                return this.generateDateGroup(date, eventDateMap.get(date) || [])
            })
        }</View>)
    }

    /**
     * Generates a group of eventPreviews with their corresponding date
     * @param date The date the events are hosted
     * @param fairEvents The events that should be shown
     */
    generateDateGroup(date: string, fairEvents:FairEvent[]): JSX.Element{
        // Returns the dategroup if the date isn't empty
        return fairEvents?
            (<View key={date}>
                <Text style={styles.dateText}>{date}</Text>
                <View key={date} style={styles.eventGroup}>
                    {
                        fairEvents.map(e =>{
                            return (<EventPreview key={e.getName()} event={e}/>)
                        })
                    }
                </View>
            </View>)
            :
            <View/>
    }

    render(): JSX.Element {
        return (
            <View style={styles.container}>
                {this.generateList(this.eventDateMap)}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        width: Layout.window.width,
        height: "100%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        padding: 5,

    },
    dateText:{
        width: Layout.window.width,
        textAlign: "left",

        fontSize: 17,
        fontWeight: 'bold',
        color: "#002652",
    },
    eventGroup:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
});
export default EventList;