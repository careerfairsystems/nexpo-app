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
import {ArkadCheckbox} from "components/ArkadCheckbox";

type EditCompanyProfileProps = {
  company: Company;
  setUpdateCompanyDto: (dto: UpdateCompanySelfDto) => void;
  setEditStatus: (status: EditStatus) => void;
};

enum days {
  day1 = "2023-11-14T00:00:00",
  day2 = "2023-11-15T00:00:00",
};


export default function EditCompanyProfile({
  company,
  setUpdateCompanyDto,
  setEditStatus,
}: EditCompanyProfileProps) {
  const [description, setDescription] = React.useState<string | null>(company.description);
  const [website, setWebsite] = React.useState<string | null>(company.website);
  const [daysAtArkad, setDaysAtArkad] = React.useState<string[]>(company.daysAtArkad);

  const handlecheckboxChange = (value: string) => {
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
        <ArkadText text={company.name} style={styles.nameLabel}/>

        <ArkadText text={"About us"} style={styles.header}/>
        <TextInput
          style={[styles.textInput, styles.descriptionInput]}
          multiline
          value={description ? description : ""}
          placeholder="Write something eye catching about your company"
          onChangeText={setDescription}
        />

        <ArkadText text={"Website"} style={styles.header}/>
        <TextInput
          style={styles.textInput}
          value={website ? website : ""}
          placeholder="https://example.com"
          onChangeText={setWebsite}
        />

        <ArkadText text={"Fair days"} style={styles.header}/>
        <ArkadCheckbox 
          checked={daysAtArkad.includes(days.day1)} 
          onChange={()=>handlecheckboxChange(days.day1)} 
          text="Day 1"/>
        <ArkadCheckbox 
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
    fontSize: 35,
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
  header: {
    fontFamily: "main-font-bold",
    color: Colors.arkadNavy,
    fontSize: 22,
    marginTop: 12,
    marginBottom: 4,
  },
});
