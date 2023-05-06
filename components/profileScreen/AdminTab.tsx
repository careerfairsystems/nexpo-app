import Colors from "constants/Colors";
import React from "react";
import { useState } from "react";
import { TextInput, View, StyleSheet, Modal, Pressable } from "react-native";
import { ArkadButton } from "components/Buttons";
import { ArkadText } from "components/StyledText";
import { Ionicons } from "@expo/vector-icons";
import { Message, sendMessage } from "api/Messages";


const comittees = [
	"Economics & Sustainability",
	"Business Relations",
	"Marketing & Public Relations",
	"Event & Recruitment",
	"Fair & Logistics",
	"Information Technology",
];

export default function AdminTab() {
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const [checkboxState, setCheckBoxState] = useState(
		new Array(comittees.length).fill(false)
	);

	const handleCheckState = (position: number) => {
    setCheckBoxState(checkboxState.map((item, index) => (index === position ? !item : item)));    
	};
  const selectAll = () => {
    setCheckBoxState(checkboxState.map(() => true));
  }

	const send = () => {

    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes();

    const message: Message = {
      title: title,
      content: text,
      date: date,
      time: time,
      receiver: "TODO",
      sender: "TODO",
    }

    sendMessage(message);

    console.log("Sending message: " );
    console.log(text);
	};

	return (
		<View style={styles.container}>
			<SelectComitteeModal />
			<TextInput
        style={styles.titleInput}
				onChangeText={setTitle}
				value={title}
				placeholder={"Title..."}
				placeholderTextColor={Colors.lightGray}
				multiline={false}
        textAlign="center"
			/>
			<TextInput
				style={styles.textInput}
				onChangeText={setText}
				value={text}
				placeholder={"Message to send..."}
				placeholderTextColor={Colors.lightGray}
				multiline={true}
				textAlignVertical="top"
				numberOfLines={10}
			/>
			<ArkadButton onPress={send} style={styles.buttonContainer1}>
				<ArkadText text="Send" style={styles.buttonText} />
			</ArkadButton>
			<ArkadButton
				onPress={() => setModalVisible(true)}
				style={styles.buttonContainer2}
			>
				<ArkadText text="Select committee" style={styles.buttonText} />
			</ArkadButton>
		</View>
	);

	function SelectComitteeModal() {
		return (
			<Modal
				animationType="none"
				transparent={false}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.modalHeader}>
          <ArkadButton style={styles.selectAll} onPress={selectAll}>
						<ArkadText text={"Select all"} />
					</ArkadButton>
					<View style={styles.centeredView}>
						{comittees.map((item, index) => 
							<Checkbox key={item}
							checked={checkboxState[index]}
							onChange={() => handleCheckState(index)}
							text={item}
							/>
						)}
					</View>
					<ArkadButton style={styles.buttonContainer1} onPress={() => setModalVisible(false)}>
						<ArkadText text={"Save"} />
					</ArkadButton>
				</View>
			</Modal>
		);
	}
}

type CheckboxProps = {checked: boolean, onChange: () => void, text: string}

const Checkbox = ({checked, onChange, text}: CheckboxProps) => (
  <Pressable onPress={onChange} style={styles.checkboxContainer}>
      <View style={[styles.checkboxBase, checked && styles.checkboxChecked]}>
        {checked && <Ionicons name="checkmark" size={30} style={styles.checkmark} />}
      </View>
      <ArkadText style={styles.checkboxText} text={text} />
    </Pressable>
);

const styles = StyleSheet.create({

  modalHeader: {
	flex: 1,
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
  },
  selectAll: {
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 10,
    backgroundColor: Colors.arkadNavy,
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.arkadNavy,
    backgroundColor: "transparent",
    marginLeft: 12,
  },
  checkboxText: {
    fontSize: 25,
    color: Colors.arkadNavy,
    marginLeft: 12,
	  marginBottom: 10,
  },
  checkboxChecked: {
    backgroundColor: Colors.arkadNavy,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkmark: {
    color: Colors.white,
    alignSelf: "center",
  },
	container: {
		flex: 1,
		alignItems: "center",
	},
	textInput: {
		height: "60",
		margin: 12,
		borderColor: Colors.arkadNavy,
		color: Colors.arkadNavy,
		borderRadius: 7,
		borderWidth: 2,
		fontSize: 20,
		fontFamily: "main-font-bold",
		padding: 10,
		width: "80%",
	},
  titleInput: {
    height: "20",
    marginTop: "10%",
    borderColor: Colors.arkadNavy,
    color: Colors.arkadNavy,
    borderRadius: 7,
    borderWidth: 2,
    fontSize: 20,
    fontFamily: "main-font-bold",
    padding: 10,
    width: "80%",
  },
	buttonText: {
		padding: "1%",
		alignItems: "center",
	},
	buttonContainer1: {
		alignSelf: "center",
		padding: "4%",
		marginBottom: "4%",
		width: "45%",
		backgroundColor: Colors.arkadOrange,
	},
	buttonContainer2: {
		alignSelf: "center",
		padding: "4%",
		marginBottom: "2%",
		width: "45%",
		backgroundColor: Colors.arkadNavy,
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "transparent",
	},
  checkboxView: {
    fontSize: 40,
    justifyContent: "center",
    textAlign: "right",
    fontFamily: "main-font-bold",
    color: Colors.black,
  },
});
