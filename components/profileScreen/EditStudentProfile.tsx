import React from "react";
import { UpdateStudentDto, Student, Programme } from "../../api/students";
import { View, Text } from "../Themed";
import { StyleSheet } from "react-native";
import { TextInput } from "../TextInput";
import { EditStatus } from "../../screens/profile/templates/EditProfileScreen";
import { Picker } from "@react-native-picker/picker";
import Colors from "../../constants/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type EditStudentProfileProps = {
  student: Student;
  setUpdateStudentDto: (dto: UpdateStudentDto) => void;
  setEditStatus: (status: EditStatus) => void;
};

export default function EditStudentProfile({
  student,
  setUpdateStudentDto,
  setEditStatus,
}: EditStudentProfileProps) {
  const [programme, setProgramme] = React.useState<Programme | null>(student.programme);
  const [year, setYear] = React.useState<number | null>(student.year);
  const [masterTitle, setMasterTitle] = React.useState<string | null>(
    student.masterTitle
  );
  const [linkedIn, setLinkedIn] = React.useState<string>(
    student.linkedIn === null ? "" : student.linkedIn
  );

  React.useEffect(() => {
    const dto = {
      programme,
      year,
      masterTitle,
      linkedIn,
    };
    setUpdateStudentDto(dto);
  }, [programme, linkedIn, masterTitle, year]);

  const _setLinkedIn = (text: string) => {
    setLinkedIn(text);
    if (text.length > 0 && !text.startsWith("https://www.linkedin.com/in/")) {
      setEditStatus({
        ok: false,
        message: "LinkedIn Needs to start with: https://www.linkedin.com/in/",
      });
    } else {
      setEditStatus({ ok: true, message: null });
    }
  };


  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Text>Programme</Text>
        <Picker
          style={styles.picker}
          selectedValue={programme}
          key={programme}
          onValueChange={(value, index) => {
            if (index === 0) setProgramme(null);
            else setProgramme(Number(value));
          }}
        >
          <Picker.Item label="Select your programme" />
          {Object.keys(Programme)
            .map(Number)
            .filter((key) => !isNaN(key))
            .map((programme) => (
              <Picker.Item label={Programme[programme]} value={programme} key={programme} />
            ))}
        </Picker>

        <Text>Year</Text>
        <Picker
          style={styles.picker}
          selectedValue={year}
          onValueChange={(value, index) => {
            if (index === 0) setYear(null);
            else setYear(Number(value));
          }}
        >
          <Picker.Item label="Select a year" />
          <Picker.Item label="1" value={1} />
          <Picker.Item label="2" value={2} />
          <Picker.Item label="3" value={3} />
          <Picker.Item label="4" value={4} />
          <Picker.Item label="5" value={5} />
        </Picker>

        <Text>Master Title</Text>
        <TextInput
          style={styles.textInput}
          value={masterTitle ? masterTitle : ""}
          onChangeText={setMasterTitle}
        />

        <Text>LinkedIn</Text>
        <TextInput
          style={styles.textInput}
          value={linkedIn ? linkedIn : ""}
          onChangeText={_setLinkedIn}
          placeholder="https://www.linkedin.com/in/..."
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
  picker: {
    width: "80%",
    maxWidth: 400,
    padding: 10,
    borderRadius: 3,
    borderColor: Colors.gray,
    fontFamily: "montserrat",
    margin: 12,
  },
  textInput: {
    width: "80%",
    maxWidth: 400,
  },
});
