import { ArkadText } from "components/StyledText";
import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import Colors from "constants/Colors";
import Expandable from "./Expandable";

export default function FAQ() {
    const [questions, setQuestions] = React.useState<Mock[]>();

    React.useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        /*
            Fetch data from API
            Waiting for mock data
        */
       MockData();
    }

    interface Mock {
        id: number;
        question: string;
        answer: string;
    }

    async function MockData() {
        // Local mock data
        const mock : Mock[] = new Array();
        mock.push({
            id: 0,
            question: "blir det kul?",
            answer: "ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja ja"
        } as Mock);
        mock.push({
            id: 1,
            question: "finns det gratis mat?",
            answer: "yes"
        } as Mock);
        mock.push({
            id: 2,
            question: "1",
            answer: "one"
        } as Mock)

        setQuestions(mock);
    }

    return (
        <ScrollView style={styles.container}>
            <ArkadText text={"Frequently Asked Questions"} style={styles.title}></ArkadText>
            {questions?.map((data) => {
                return (
                    <Expandable key={data.id} title={data.question} desc={data.answer}></Expandable>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
		paddingVertical: 24,
		backgroundColor: Colors.white,
	},
    title: {
        fontFamily: "main-font-bold",
        fontSize: 30,
        color: Colors.arkadNavy
    }
})