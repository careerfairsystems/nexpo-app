import { ArkadText } from "components/StyledText";
import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import Colors from "constants/Colors";
import Expandable from "./Expandable";
import { API } from "api/API";
import { FAQs } from "api/FAQs";

export default function FAQ() {
    const [questions, setQuestions] = React.useState<FAQs[]>();

    React.useEffect(() => {
        fetch_faq();
    }, []);

    async function fetch_faq() {
        const faq = await API.faqs.faq();
        setQuestions(faq);
    }

    // Currently backend only provides the question
    return (
        <ScrollView style={styles.container}>
            <ArkadText text={"Frequently Asked Questions"} style={styles.title}></ArkadText>
            {questions?.reverse().map((data) => {
                return (
                    <Expandable key={data.id} title={data.question} desc={data.question}/>
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
        color: Colors.arkadNavy,
        paddingBottom: 24
    }
})