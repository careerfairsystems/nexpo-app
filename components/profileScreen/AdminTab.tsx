import Colors from "constants/Colors";
import React from "react";
import { useState } from "react";
import { TextInput, View, StyleSheet, Modal, Pressable } from "react-native";
import { ArkadButton } from "components/Buttons";
import { ArkadText } from "components/StyledText";
import { Ionicons } from "@expo/vector-icons";


const comittees = [
	"Economics & Sustainability",
	"Business Relations",
	"Marketing & Public Relations",
	"Event & Recruitment",
	"Fair & Logistics",
	"Information Technology",
];

export default function AdminTab() {
	const [text, onChangeText] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const [checkboxState, setCheckBoxState] = useState(
		new Array(comittees.length).fill(false)
	);

	const handleCheckState = (position: number) => {
    setCheckBoxState(checkboxState.map((item, index) => (index === position ? !item : item)));    
	};

	const send = () => {
		console.log(text);
	};

	return (
		<View style={styles.container}>
			<SelectComitteeModal />
			<TextInput
				style={styles.textInput}
				onChangeText={onChangeText}
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
					<View style={styles.centeredView}>
						{comittees.map((item, index) => 
							<Checkbox key={item}
							checked={checkboxState[index]}
							onChange={() => handleCheckState(index)}
							text={item}
							/>
						)}
					</View>
					<ArkadButton style={styles.buttonContainer1} onPress={() => setModalVisible(!modalVisible)}>
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
        {checked && <Ionicons name="checkmark" size={20} style={styles.checkmark} />}
      </View>
      <ArkadText style={styles.checkboxText} text={text} />
    </Pressable>
)

/* const Checkbox = ({checked, onChange, text}: CheckboxProps) => {
  return (
    <View style={styles.checkboxView}>
      <label>
        <input 
          type="checkbox" 
          checked={checked} 
          onChange={onChange} 
          key={text}
          style={{
            width: 25, 
            height: 25, 
            borderColor: Colors.arkadNavy, 
            marginRight: 10,
         }}
        />
        {text}
      </label>
    </View>
  );
} */

const styles = StyleSheet.create({

  modalHeader: {
	flex: 1,
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
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
    fontSize: 40,
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
		height: "40%",
		margin: 12,
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
		marginBottom: "2%",
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
