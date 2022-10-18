import React from "react";
import { Company, UpdateCompanySelfDto } from "../../api/companies";
import { View, Text } from "../Themed";
import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { TextInput } from "../TextInput";
import { EditStatus } from "../../screens/profile/templates/EditProfileScreen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type EditCompanyProfileProps = {
  company: Company;
  setUpdateCompanyDto: (dto: UpdateCompanySelfDto) => void;
  setEditStatus: (status: EditStatus) => void;
};

export default function EditCompanyProfile({
  company,
  setUpdateCompanyDto,
  setEditStatus,
}: EditCompanyProfileProps) {
  const [description, setDescription] = React.useState<string | null>(
    company.description
  );
  const [website, setWebsite] = React.useState<string | null>(company.website);

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
    };
    setUpdateCompanyDto(dto);
  }, [description, website]);

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
    fontSize: 24,
    fontFamily: "montserrat",
    color: Colors.darkBlue,
  },
  textInput: {
    width: "80%",
    maxWidth: 400,
  },
  descriptionInput: {
    height: 200,
  },
});
