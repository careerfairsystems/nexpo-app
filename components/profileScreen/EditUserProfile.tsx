import React, { useEffect, useState } from "react";
import { UpdateUserDto, User } from "api/Users";
import ProfilePicture from "../ProfilePicture";
import { View, Text } from "../Themed";
import { Alert, Linking, Platform, StyleSheet } from "react-native";
import Colors from "constants/Colors";
import { TextInput } from "../TextInput";
import { EditStatus } from "../../screens/profile/EditProfileScreen";
import { ArkadButton } from "../Buttons";
import { ArkadText } from "../StyledText";
import { API } from "api/API";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import Toast from "react-native-toast-message";

type EditUserProfileProps = {
  user: User;
  setUpdateUserDto: (dto: UpdateUserDto) => void;
  setEditStatus: (status: EditStatus) => void;
};

export default function EditUserProfile({
  user,
  setUpdateUserDto,
  setEditStatus,
}: EditUserProfileProps) {
  const [hasProfilePicture, setHasProfilePicture] = useState<boolean | null>(
    user.hasProfilePicture
  );
  const [firstName, setFirstName] = useState<string | null>(user.firstName);
  const [lastName, setLastName] = useState<string | null>(user.lastName);
  const [phoneNr, setPhoneNr] = useState<string | null>(user.phoneNr);
  const [foodPreferences, setFoodPreferences] = useState<string | null>(
    user.foodPreferences
  );
  const [hasCv, setCvURL] = useState<boolean | null>(user.hasCv);
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  useEffect(() => {
    // TODO Validate password strength with zxvcbn
    if (password && password.length < 8) {
      setEditStatus({
        ok: false,
        message:
          "Password is not strong enough. You need at least 9 characters",
      });
    } else if (password && password !== repeatPassword) {
      setEditStatus({
        ok: false,
        message: "Passwords does not match",
      });
    } else {
      setEditStatus({
        ok: true,
        message: null,
      });
    }
    const dto = {
      firstName,
      lastName,
      phoneNr,
      password,
      foodPreferences,
    };
    setUpdateUserDto(dto);
  }, [firstName, lastName, phoneNr, password, repeatPassword, foodPreferences]);

  const setProfilePicture = async () => {
    alert("starting profile picture");
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert(
          "We need camera roll permissions to upload a new profile picture"
        );
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });

    alert("result: " + JSON.stringify(result["assets"]));
    let uri;
    if (
      result &&
      result["assets"] &&
      result["assets"][0] &&
      result["assets"][0]["uri"]
    ) {
      uri = result["assets"][0]["uri"];
    } else {
      alert("Error: No image found");
      return;
    }

    alert("cancel?");

    if (result.canceled) {
      return;
    }

    // alert("result not cancelled");

    // alert("file info: " + JSON.stringify(fileInfo));

    if (!uri.includes("data:image")) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "You must select an image",
      });
      return;
    }

    alert("omg image");
    // const fileInfo = await FileSystem.getInfoAsync(uri);
    // if (fileInfo.size ? fileInfo.size > 4000000 : false) {
    //   Toast.show({
    //     type: "error",
    //     text1: "Error",
    //     text2: "Maximum file size of 4 Mb exceeded",
    //   });
    //   return;
    // }

    // alert("file info size: " + fileInfo.size);
    try {
      const response = await API.s3bucket.postToS3(
        uri,
        user.id.toString(),
        ".jpg"
      );

      alert("response: " + JSON.stringify(response));

      setHasProfilePicture(true);
      Toast.show({
        type: "success",
        text2:
          "Profile picture uploaded. Save profile to see the new profile picture",
        visibilityTime: 4000,
      });
    } catch (error) {
      console.log(error);
      console.log("bror det blev knas");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong",
      });
    }
  };

  const removeProfilePicture = async () => {
    if (hasProfilePicture == false) {
      Toast.show({
        type: "error",
        text1: "You have no profile picture",
      });
    } else {
      await API.s3bucket.deleteOnS3(user.id.toString(), ".jpg");
      setHasProfilePicture(false);
      Toast.show({
        type: "success",
        text2: "Profile picture deleted. Save profile to see the changes",
        visibilityTime: 3000,
      });
    }
  };

  const setCV = async () => {
    let resultFile = await DocumentPicker.getDocumentAsync({});
    if (resultFile.type == "success") {
      if (
        resultFile.mimeType == "application/pdf" &&
        (resultFile.size ? resultFile.size < 5000000 : false)
      ) {
        const r = resultFile.uri;
        try {
          const res = await API.s3bucket.postToS3(
            r,
            user.id.toString(),
            ".pdf"
          );

          Toast.show({
            type: "success",
            text2: "CV uploaded",
          });
          setCvURL(true);
        } catch (error) {
          console.log(error);
          alert("Something went wrong");
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "File needs to be in PDF format and must be smaller than 2 Mb",
          visibilityTime: 4000,
        });
      }
    }
  };

  const deleteCV = async () => {
    try {
      const dto = await API.s3bucket.deleteOnS3(user.id.toString(), ".pdf");
      Toast.show({
        type: "success",
        text2: "CV deleted",
      });
      if (dto.valueOf() == true) {
        setCvURL(false);
      }
    } catch (error) {
      console.log(error);
      setCvURL(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong",
      });
    }
  };

  const downloadCV = async () => {
    const Uri = await API.s3bucket.getFromS3(user.id.toString(), ".pdf");
    Linking.canOpenURL(Uri).then(() => {
      return Linking.openURL(Uri);
    });
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <ProfilePicture url={user.profilePictureUrl} />

        <ArkadButton onPress={setProfilePicture} style={{ width: "50%" }}>
          {hasProfilePicture ? (
            <ArkadText text="Change profile picture" />
          ) : (
            <ArkadText text="Set profile picture" />
          )}
        </ArkadButton>
        {hasProfilePicture && (
          <ArkadButton
            onPress={removeProfilePicture}
            style={styles.hasCv && { width: "50%" }}
          >
            <ArkadText text="Remove profile picture" />
          </ArkadButton>
        )}
        <ArkadButton
          onPress={setCV}
          style={{ backgroundColor: Colors.arkadTurkos, width: "50%" }}
        >
          {hasCv ? (
            <ArkadText
              text="Update CV"
              style={{ backgroundColor: Colors.arkadTurkos }}
            />
          ) : (
            <ArkadText
              text="Upload CV"
              style={{ backgroundColor: Colors.arkadTurkos }}
            />
          )}
        </ArkadButton>
        {hasCv && (
          <ArkadButton
            onPress={deleteCV}
            style={styles.hasCv && { width: "50%" }}
          >
            <ArkadText text="Delete CV" />
          </ArkadButton>
        )}
        {hasCv && (
          <ArkadButton
            onPress={downloadCV}
            style={{ backgroundColor: Colors.arkadTurkos, width: "50%" }}
          >
            <ArkadText text="Download CV" />
          </ArkadButton>
        )}

        <Text style={styles.inputLabel}>First name</Text>
        <TextInput
          style={styles.textInput}
          value={firstName ? firstName : ""}
          placeholder="John"
          onChangeText={setFirstName}
        />

        <Text style={styles.inputLabel}>Last name</Text>
        <TextInput
          style={styles.textInput}
          value={lastName ? lastName : ""}
          placeholder="Doe"
          onChangeText={setLastName}
        />

        <Text style={styles.inputLabel}>Phone number</Text>
        <TextInput
          style={styles.textInput}
          value={phoneNr ? phoneNr : ""}
          placeholder="076-1234567"
          onChangeText={setPhoneNr}
        />

        <Text style={styles.inputLabel}>Food preferences</Text>
        <TextInput
          style={styles.textInput}
          value={foodPreferences ? foodPreferences : ""}
          placeholder="Vegetarian"
          onChangeText={setFoodPreferences}
        />

        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.textInput}
          secureTextEntry
          placeholder="New password"
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.textInput}
          secureTextEntry
          placeholder="Repeat password"
          onChangeText={setRepeatPassword}
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
  hasCv: {
    backgroundColor: Colors.darkRed,
  },
  nameLabel: {
    paddingTop: 8,
    paddingBottom: 16,
    fontSize: 32,
    color: Colors.arkadNavy,
  },
  header: {
    fontFamily: "main-font-bold",
    color: Colors.arkadNavy,
    fontSize: 22,
    marginTop: 12,
    marginBottom: 4,
  },
  textInput: {
    width: "80%",
    maxWidth: 400,
    borderColor: Colors.white,
    color: Colors.white,
    placeholderTextColor: "#606060",
  },
  inputLabel: {
    color: Colors.white,
    paddingTop: 5,
    fontFamily: "main-font",
    fontSize: 20,
  },
});
