import { ArkadText } from "components/StyledText";
import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import Colors from "constants/Colors";
import Expandable from "./Expandable";
import { API } from "api/API";
import { FAQs } from "api/FAQs";

export default function FAQ() {
  const [questions, setQuestions] = React.useState<TransformedItem[]>();

  React.useEffect(() => {
    fetch_faq();
  }, []);

  async function fetch_faq() {
    const faq = await API.faqs.faq();
    const transformedFAQ = transformFAQData(faq);
    setQuestions(transformedFAQ);
  }

  interface FAQItem {
    id: number;
    question: string;
    answer: string;
  }

  interface TransformedItem {
    id: number;
    title: string;
    content: string;
  }

  function transformFAQData(backendData: FAQItem[]): TransformedItem[] {
    const transformedData: TransformedItem[] = backendData.map((item) => ({
      id: item.id,
      title: item.question,
      content: item.answer,
    }));
    return transformedData;
  }

  return (
    <ScrollView style={styles.container}>
      <ArkadText
        text={"Frequently Asked Questions"}
        style={styles.title}
      ></ArkadText>
      <Expandable data={questions || []} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    backgroundColor: Colors.arkadNavy,
  },
  title: {
    fontFamily: "main-font-bold",
    fontSize: 30,
    color: Colors.white,
    paddingBottom: 24,
  },
});
