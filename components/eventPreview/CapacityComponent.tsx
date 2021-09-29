import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";

const ALMOST_FULL_RATIO = 0.75


export interface Props{
    bookingCount: number,
    capacity: number
}

interface State{

}

class CapacityComponent extends Component<Props, State>{
    ratio: number;      // Used to decide background color and text

    constructor(props: Props) {
        super(props);
        this.ratio = this.props.bookingCount/this.props.capacity
    }

    private genText():string{
        return this.ratio < 1? this.props.bookingCount + "/" + this.props.capacity: "Full"
    }

    /*
    returns the correct background color depending on the ratio of
    booked tickets
     */
    //TODO: Add correct HEX-values
    private genBackgroundColor() {
        return this.ratio < ALMOST_FULL_RATIO ? "green" : this.ratio < 1 ? "#8a791e" : "red";
    }

    render() {
        return (<View style={[styles.container, {backgroundColor: this.genBackgroundColor()}]}>
            <Text style={styles.text}>{this.genText()}</Text>
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        paddingHorizontal: 4
    },

    text: {
        textAlign:'center',
        color: '#fff',
        fontSize: 11,
        fontWeight: 'normal',
        minWidth: 40,
    },

});
export default CapacityComponent;