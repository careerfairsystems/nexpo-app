import React, {Component} from "react";
import {Platform, StyleSheet, Text, View} from "react-native";
import CapacityComponent from "./CapacityComponent";
import DatePreviewComponent from "./DatePreviewComponent";
import FairEvent from "../eventList/FairEvent";

export interface Props {
    event: FairEvent
}

interface State{
}

class EventPreview extends Component<Props, State>{
    event: FairEvent

    constructor(props: Props) {
        super(props);
        this.event = this.props.event
    }

    /**
     * Returns the jsx element for ios
     */
    iosComponent(): JSX.Element {
        return (<View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.name} adjustsFontSizeToFit numberOfLines={2}>{this.event.getName()}</Text>
            </View>
            <View style={styles.bottom}>
                <DatePreviewComponent start={this.event.getDateStart()} end={this.event.getDateEnd()}/>
                <CapacityComponent capacity={this.event.getCapacity()} bookingCount={this.event.getBookingCount()}/>
            </View>
        </View>)
    }

    /*
    * Returns the layout and style for android
    */
    androidComponent(): JSX.Element{
        return(<View>

        </View>)
    }

    /*
    * Returns the rendered layout depending on the used OS
    */
    render(): JSX.Element {
        return Platform.OS == 'ios'? this.iosComponent(): this.androidComponent()
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#002652',
        height: 150,
        width: 180,
        borderRadius: 25,
        margin: 5,

        display: "flex",
        flexDirection: "column",

    },
    name: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        flexShrink: 2,
    },
    top:{
        width: "100%",
        height: "50%",
        padding: 10,

        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",

    },
    bottom:{
        width: "100%",
        height: "50%",
        padding: 10,

        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-around",

    },
});

export default EventPreview;