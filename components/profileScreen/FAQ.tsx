import { ArkadText } from "components/StyledText";
import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import Colors from "constants/Colors";

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

    function MockData() {
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

    // Skapa dropdown objekt (med hjälp av dropdockpicker?)
    return (
        <ScrollView style={styles.container}>
            <ArkadText text={"Frequently Asked Questions"} style={styles.title}></ArkadText>
            {questions?.map((data) => {
                {console.log(data.question)}
                <View key={data.id} style={styles.containerQuestion}>
                    <ArkadText text={data.question} style={styles.title}></ArkadText>
                </View>
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
		paddingVertical: 24,
		backgroundColor: Colors.arkadNavy,
	},
    containerQuestion: {
        flex: 1,
        padding: 20,
		alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "200px",
        backgroundColor: Colors.arkadGreen
    },
    title: {
        fontFamily: "main-font-bold",
        fontSize: 30,
        color: Colors.white
    }
})