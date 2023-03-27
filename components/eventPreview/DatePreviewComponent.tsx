import React, {Component} from "react";
import {Image, StyleSheet, Text, View} from "react-native";

export interface Props{
    start: Date;
    end: Date;
}

interface State{}

class DatePreviewComponent extends Component<Props, State>{
    text: string;

    constructor(props: Props) {
        super(props);
        this.text = this.props.start.getDate() + " " + this.getMonthByNumber(this.props.start.getMonth()) + " " + this.props.start.getHours() + ":" + this.props.start.getMinutes() + " - " + this.props.end.getHours() + ":" + this.props.end.getMinutes()
    }

    getMonthByNumber(month: number) {
        // @ts-ignore
        return Object.keys(Months).find(key => Months[key] === month);
    }

    
    //TODO: Get a proper logo for the calendar
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.smallImage} source={require("../../assets/images/calendar.png")}/>
                <Text style={styles.text}>{this.text}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        paddingHorizontal: 4,

        display:"flex",
        flexDirection: "row",
        alignItems: 'flex-end',
        
    },

    smallImage:{
        width: 15,
        height: 15
    },

    text: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'normal',
        minWidth: 40,
        marginLeft: 5,
    },

});

enum Months {
    'January',
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
}

export default DatePreviewComponent;