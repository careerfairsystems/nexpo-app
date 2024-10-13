import React, { useState } from "react";
import { UpdateStudentDto, Student, Programme } from "api/Students";
import { View, Text } from "../Themed";
import { StyleSheet } from "react-native";
import { TextInput } from "../TextInput";
import { EditStatus } from "../../screens/profile/EditProfileScreen";
import { Picker } from "@react-native-picker/picker";
import Colors from "constants/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CategoriesDropdown } from "../companies/CategoriesDroppdown";
import { PROGRAMS, YEARS } from "../companies/DroppdownItems";

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
  const [masterTitle, setMasterTitle] = React.useState<string | null>(
    student.masterTitle
  );
  const [linkedIn, setLinkedIn] = React.useState<string>(
    student.linkedIn === null ? "" : student.linkedIn
  );

  const [programmes, setProgrammes] = useState(PROGRAMS);
  const [programmeOpen, programmeSetOpen] = useState(false);
  const [programme, setProgramme] = useState<Programme | null>(
    student.programme
  );

  const [years, setYears] = useState(YEARS);
  const [yearsOpen, yearsSetOpen] = useState(false);
  const [year, setYear] = React.useState<number | null>(student.year);

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
    if(text.includes("..")){
      setEditStatus({
        ok: false,
        message: 'LinkedIn link can not contain ".."'
      });
    }
    else if ((text.length > 0 && !text.startsWith("https://www.linkedin.com/in/"))) {
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
        <Text
          style={{
            color: Colors.white,
            fontFamily: "main-font",
            fontSize: 20,
            paddingTop: 5,
          }}
        >
          Programme
        </Text>
        <View style={styles.programmepicker}>
          <CategoriesDropdown
            title="Desired program"
            items={programmes}
            setOpen={programmeSetOpen}
            setValue={setProgramme}
            open={programmeOpen}
            value={programme}
            setItems={setProgrammes}
            categories={false}
            single={true}
          />
        </View>

        <Text
          style={{
            color: Colors.white,
            fontFamily: "main-font",
            fontSize: 20,
            paddingTop: 5,
          }}
        >
          Year
        </Text>
        <View style={styles.programmepicker}>
          <CategoriesDropdown
            title="Year of study"
            items={years}
            setOpen={yearsSetOpen}
            setValue={setYear}
            open={yearsOpen}
            value={year}
            setItems={setYears}
            categories={false}
            single={true}
          />
        </View>

        <Text
          style={{
            color: Colors.white,
            fontFamily: "main-font",
            fontSize: 20,
            paddingTop: 5,
          }}
        >
          Master Title
        </Text>
        <TextInput
          style={styles.textInput}
          value={masterTitle ? masterTitle : ""}
          onChangeText={setMasterTitle}
        />

        <Text
          style={{
            color: Colors.white,
            fontFamily: "main-font",
            fontSize: 20,
            paddingTop: 5,
          }}
        >
          LinkedIn
        </Text>
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
    backgroundColor: Colors.arkadNavy,
  },
  picker: {
    width: "80%",
    maxWidth: 400,
    padding: 10,
    borderRadius: 7,
    borderWidth: 5,
    borderColor: Colors.white,
    margin: 12,
    backgroundColor: Colors.white,
    color: Colors.white,
  },
  programmepicker: {
    width: "80%",
    maxWidth: 400,
    padding: 10,
    borderColor: Colors.white,
    margin: 12,
    backgroundColor: Colors.white,
    color: Colors.black,
    fontFamily: "main-font-bold",
    borderRadius: 7,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  textInput: {
    width: "80%",
    maxWidth: 400,
    borderColor: Colors.white,
    color: Colors.white,
    backgroundColor: Colors.white
  },
});
