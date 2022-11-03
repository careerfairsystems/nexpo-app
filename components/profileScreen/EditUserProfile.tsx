import React, { useEffect, useState } from "react";
import { UpdateUserDto, User } from "@/api/users";
import ProfilePicture from "../ProfilePicture";
import { View, Text } from "../Themed";
import { Linking, Platform, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { TextInput } from "../TextInput";
import { EditStatus } from "../../screens/profile/templates/EditProfileScreen";
import { ArkadButton } from "../Buttons";
import { ArkadText } from "../StyledText";
import { API } from "@/api";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from 'expo-file-system'

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
  const [hasCv, setCvURL] = useState<boolean| null> (
    user.hasCv
  );
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  useEffect(() => {
    // TODO Validate password strength with zxvcbn
    if (password && password.length < 8) {
      setEditStatus({
        ok: false,
        message: "Password is not strong enough",
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
      aspect: [1, 1]
    });
    if (result.cancelled) return
    const fileInfo = await FileSystem.getInfoAsync(result.uri)
    if (result.type != 'image') {
      alert("Only images allowed")
      return
    }
    if (fileInfo.size ? fileInfo.size > 4000000: false) {
      alert("Maximum filesize is 1Mb")
      return
    }

    await API.s3bucket.postToS3(result.uri, user.id.toString(), ".jpg").catch(e => {console.log(e)});
    setHasProfilePicture(true);
    alert("save profile to see profile picture");
    
  };
  
  const removeProfilePicture = async () => {
    if (hasProfilePicture == false) {
      alert("You have no profile picture")
    } else{
      await API.s3bucket.deleteOnS3(user.id.toString(), ".jpg");
      setHasProfilePicture(false);
      alert("save profile to remove profile picture");
    }
  };
  const setCV = async () => {
    let resultFile = await DocumentPicker.getDocumentAsync({});
    if (resultFile.type == "success" ) {
      if(resultFile.mimeType == "application/pdf"  && (resultFile.size ? resultFile.size < 2000000 : false)) {
        const r = resultFile.uri
        console.log(JSON.stringify(r))
        try {
          const res = await API.s3bucket.postToS3(r, user.id.toString(), ".pdf")
        
          alert("CV uploaded")
          setCvURL(true)
        } catch (error) {
          console.log(error)
          alert("Something went wrong")
        }
      } else {
        alert("File needs to be in PDF format and must be smaller than 2Mb")
      }
    }
}

  const deleteCV = async () => {
    try {
      const dto = await API.s3bucket.deleteOnS3(user.id.toString() , ".pdf")
      alert("CV deleted")
      if (dto.valueOf() == true) {
        setCvURL(false)
      }
    } catch (error) {
      console.log(error)
      setCvURL(false)
      alert("CV deleted")
    }
  }

  const downloadCV = async () => {
    const Uri = await API.s3bucket.getFromS3(user.id.toString(), ".pdf")
    Linking.canOpenURL(Uri).then(() => {
      return Linking.openURL(Uri);
    });
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <ProfilePicture url={user.profilePictureUrl}
        />   
        
        <ArkadButton onPress={setProfilePicture}>
          {hasProfilePicture ? (
            <ArkadText text="Change profile picture" />
          ) : (
            <ArkadText text="Set profile picture" />
          )}
        </ArkadButton>
        {hasProfilePicture && (
          <ArkadButton onPress={removeProfilePicture}>
            <ArkadText text="Remove profile picture" />
          </ArkadButton>
          
        )}
        <ArkadButton onPress={setCV}>
          {hasCv ? (
            <ArkadText text="Update CV" />
            ) : (
            <ArkadText text="Upload CV" />
          )}
        </ArkadButton>
        {hasCv &&
          <ArkadButton onPress={deleteCV} style={styles.hasCv}>
            <ArkadText text="Delete CV" />
          </ArkadButton>
        }
        {hasCv &&
        <ArkadButton onPress ={downloadCV}><ArkadText text="Download CV" /></ArkadButton>
        } 
        
        <Text>First name</Text>
        <TextInput
          style={styles.textInput}
          value={firstName ? firstName : ""}
          placeholder="John"
          onChangeText={setFirstName}
        />

        <Text>Last name</Text>
        <TextInput
          style={styles.textInput}
          value={lastName ? lastName : ""}
          placeholder="Doe"
          onChangeText={setLastName}
        />

        <Text>Phone number</Text>
        <TextInput
          style={styles.textInput}
          value={phoneNr ? phoneNr : ""}
          placeholder="076-1234567"
          onChangeText={setPhoneNr}
        />

        <Text>Food preferences</Text>
        <TextInput
          style={styles.textInput}
          value={foodPreferences ? foodPreferences : ""}
          placeholder="Vegetarian.."
          onChangeText={setFoodPreferences}
        />

        <Text>Password</Text>
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
    backgroundColor: Colors.darkRed
  },
  nameLabel: {
    paddingTop: 8,
    paddingBottom: 16,
    fontSize: 32,
    color: Colors.darkBlue,
  },
  textInput: {
    width: "80%",
    maxWidth: 400,
  },
});
