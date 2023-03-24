import React, { useState } from "react";
import { UpdateStudentDto, Student, Programme } from "api/Students";
import { View, Text } from "../Themed";
import { StyleSheet } from "react-native";
import { TextInput } from "../TextInput";
import { EditStatus } from "../../screens/profile/templates/EditProfileScreen";
import { Picker } from "@react-native-picker/picker";
import Colors from "constants/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CategoriesDropdown } from "../companies/CategoriesDroppdown";
import { PROGRAMS } from "../companies/DroppdownItems";

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
  const [year, setYear] = React.useState<number | null>(student.year);
  const [masterTitle, setMasterTitle] = React.useState<string | null>(
    student.masterTitle
  );
  const [linkedIn, setLinkedIn] = React.useState<string>(
    student.linkedIn === null ? "" : student.linkedIn
  );
  const [programmes, setProgrammes] = useState(PROGRAMS);
  const [programmeOpen, programmeSetOpen] = useState(false);
  const [programme, setProgramme] = useState<Programme | null>(student.programme);

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
        <View style={styles.picker}>
          <CategoriesDropdown
            title="Desired program"
            items={programmes}
            setOpen={programmeSetOpen}
            setValue={setProgramme}
            open={programmeOpen}
            value={programme} 
            setItems={setProgrammes}
            categories={true}
            single={true}/>
        </View>

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
    width: "85%",
    maxWidth: 400,
    padding: 10,
    borderRadius: 3,
    borderColor: Colors.gray,
    margin: 12,
  },
  textInput: {
    width: "80%",
    maxWidth: 400,
  },
});
