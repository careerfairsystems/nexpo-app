import React from "react";
import { Company, UpdateCompanySelfDto } from "api/Companies";
import { View, Text } from "../Themed";
import { Pressable, StyleSheet } from "react-native";
import Colors from "constants/Colors";
import { TextInput } from "../TextInput";
import { EditStatus } from "../../screens/profile/templates/EditProfileScreen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import { ArkadText } from "components/StyledText";
//import { Checkbox } from "components/Checkbox";

type EditCompanyProfileProps = {
  company: Company;
  setUpdateCompanyDto: (dto: UpdateCompanySelfDto) => void;
  setEditStatus: (status: EditStatus) => void;
};

type CheckboxProps = {
  checked: boolean; 
  onChange: () => void;
  text: string;
};

enum days {
  day1 = "2023-11-14T00:00:00",
  day2 = "2023-11-15T00:00:00",
};

const Checkbox = ({checked, onChange, text}: CheckboxProps) => (
  <Pressable onPress={onChange} style={styles.checkboxContainer}>
      <View style={[styles.checkboxBase, checked && styles.checkboxChecked]}>
        {checked && <Ionicons name="checkmark" size={30} style={styles.checkmark} />}
      </View>
      <ArkadText style={styles.checkboxText} text={text} />
    </Pressable>
);

export default function EditCompanyProfile({
  company,
  setUpdateCompanyDto,
  setEditStatus,
}: EditCompanyProfileProps) {
  const [description, setDescription] = React.useState<string | null>(company.description);
  const [website, setWebsite] = React.useState<string | null>(company.website);
  const [daysAtArkad, setDaysAtArkad] = React.useState<string[]>(company.daysAtArkad);

  const handlecheckboxChange = (value: string) => {
    // TODO
    console.log(daysAtArkad);
    if (daysAtArkad.includes(value)) {
      setDaysAtArkad(daysAtArkad.filter((day) => day !== value));
    } else {
      setDaysAtArkad([...daysAtArkad, value]);
    }
  };

  React.useEffect(() => {
    if (website && !website.startsWith("http")) {
      setEditStatus({
        ok: false,
        message: 'Please provide a valid website, including "https://"',
      });
    } else {
      setEditStatus({
        ok: true,
        message: null,
      });
    }

    const dto = {
      description,
      website,
      daysAtArkad,
    };
    setUpdateCompanyDto(dto);
  }, [description, website, daysAtArkad]);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Text style={styles.nameLabel}>{company.name}</Text>

        <Text>About us</Text>
        <TextInput
          style={[styles.textInput, styles.descriptionInput]}
          multiline
          value={description ? description : ""}
          placeholder="Write something eye catching about your company"
          onChangeText={setDescription}
        />

        <Text>Website</Text>
        <TextInput
          style={styles.textInput}
          value={website ? website : ""}
          placeholder="https://example.com"
          onChangeText={setWebsite}
        />

        <Text>Fair days</Text>
        <Checkbox 
          checked={daysAtArkad.includes(days.day1)} 
          onChange={()=>handlecheckboxChange(days.day1)} 
          text="Day 1"/>
        <Checkbox 
          checked={daysAtArkad.includes(days.day2)} 
          onChange={()=>handlecheckboxChange(days.day2)} 
          text="Day 2"
        />

      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    marginTop: 24,
  },
  nameLabel: {
    paddingTop: 8,
    paddingBottom: 16,
    fontSize: 32,
    color: Colors.arkadNavy,
  },
  textInput: {
    width: "80%",
    maxWidth: 400,
  },
  descriptionInput: {
    height: 180,
    textAlignVertical: "top",
  },
  checkboxView: {
    fontSize: 40,
    justifyContent: "center",
    textAlign: "right",
    fontFamily: "main-font-bold",
    color: Colors.black,
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
});
