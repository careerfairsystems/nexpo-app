// import React, { useEffect, useState } from "react";
// import { Linking, StyleSheet } from "react-native";
// import { UpdateUserDto, User } from "api/Users";
// import ProfilePicture from "../ProfilePicture";
// import { View, Text } from "../Themed";
// import Colors from "constants/Colors";
// import { TextInput } from "../TextInput";
// import { EditStatus } from "../../screens/profile/EditProfileScreen";
// import { ArkadButton } from "../Buttons";
// import { ArkadText } from "../StyledText";
// import { API } from "api/API";
// import * as FileSystem from "expo-file-system";
// import * as DocumentPicker from "expo-document-picker";
// import Toast from "react-native-toast-message";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// type EditUserProfileProps = {
//   user: User;
//   setUpdateUserDto: (dto: UpdateUserDto) => void;
//   setEditStatus: (status: EditStatus) => void;
// };

// export default function EditUserProfile({
//   user,
//   setUpdateUserDto,
//   setEditStatus,
// }: EditUserProfileProps) {
//   const [hasProfilePicture, setHasProfilePicture] = useState<boolean | null>(
//     user.hasProfilePicture
//   );
//   const [firstName, setFirstName] = useState<string | null>(user.firstName);
//   const [lastName, setLastName] = useState<string | null>(user.lastName);
//   const [phoneNr, setPhoneNr] = useState<string | null>(user.phoneNr);
//   const [foodPreferences, setFoodPreferences] = useState<string | null>(
//     user.foodPreferences
//   );
//   const [password, setPassword] = useState<string>("");
//   const [repeatPassword, setRepeatPassword] = useState<string>("");
//   const [hasCv, setCvURL] = useState<boolean | null>(user.hasCv);

//   useEffect(() => {
//     // TODO Validate password strength with zxvcbn
//     if (password && password.length < 8) {
//       setEditStatus({
//         ok: false,
//         message:
//           "Password is not strong enough. You need at least 9 characters",
//       });
//     } else if (password && password !== repeatPassword) {
//       setEditStatus({
//         ok: false,
//         message: "Passwords do not match",
//       });
//     } else {
//       setEditStatus({
//         ok: true,
//         message: null,
//       });
//     }
//     const dto = {
//       firstName,
//       lastName,
//       phoneNr,
//       password,
//       foodPreferences,
//     };
//     setUpdateUserDto(dto);
//   }, [firstName, lastName, phoneNr, password, repeatPassword, foodPreferences]);

//   const selectProfilePicture = async () => {
//     const resultFile = await DocumentPicker.getDocumentAsync({});
//     if (resultFile.type === "success") {
//       // Handle the selected file here
//       const { uri } = resultFile;
//       handleProfilePictureChange(uri);
//     }
//   };

//   const handleProfilePictureChange = async (uriOrFile: string | File) => {
//     console.log("Entering handleProfilePictureChange");

//     let file;
//     if (typeof uriOrFile === "string") {
//       // Handle the case when uriOrFile is a URI (mobile platform)
//       const uri = uriOrFile;
//       // Perform validations on the URI if needed
//       // ...

//       // For mobile, we can create a Blob from the URI
//       const response = await fetch(uri);
//       const blob = await response.blob();

//       file = new File([blob], "profile_picture.jpg", { type: blob.type });
//     } else {
//       // Handle the case when uriOrFile is a File (web platform)
//       file = uriOrFile;
//     }

//     console.log(file);

//     // Perform validations on the selected file (size, type, etc.)
//     if (file.size > 4000000) {
//       Toast.show({
//         type: "error",
//         text1: "Error",
//         text2: "Maximum file size of 4 Mb exceeded",
//         visibilityTime: 5000,
//       });
//       return;
//     }

//     console.log("im here");

//     // Upload the selected file
//     try {
//       const uri = URL.createObjectURL(file);
//       console.log(uri);
//       const response = await API.s3bucket.postToS3(
//         uri,
//         user.id.toString(),
//         ".jpg"
//       );
//       console.log(response);
//       setHasProfilePicture(true);
//       Toast.show({
//         type: "success",
//         text2:
//           "Profile picture uploaded. Save profile to see the new profile picture",
//         visibilityTime: 5000,
//       });
//     } catch (error) {
//       console.log("hamnade i error lol, kan inte ladda upp till S3");
//       console.error(error);
//       Toast.show({
//         type: "error",
//         text1: "Error",
//         text2: "Failed to upload profile picture",
//         visibilityTime: 5000,
//       });
//     }
//   };

//   const removeProfilePicture = async () => {
//     if (hasProfilePicture === false) {
//       Toast.show({
//         type: "error",
//         text1: "You have no profile picture",
//         visibilityTime: 5000,
//       });
//     } else {
//       await API.s3bucket.deleteOnS3(user.id.toString(), ".jpg");
//       setHasProfilePicture(false);
//       Toast.show({
//         type: "success",
//         text2: "Profile picture deleted. Save profile to see the changes",
//         visibilityTime: 5000,
//       });
//     }
//   };

//   const setCV = async () => {
//     let resultFile = await DocumentPicker.getDocumentAsync({});
//     if (resultFile.type == "success") {
//       if (
//         resultFile.mimeType == "application/pdf" &&
//         (resultFile.size ? resultFile.size < 2000000 : false)
//       ) {
//         const r = resultFile.uri;
//         console.log(JSON.stringify(r));
//         try {
//           const res = await API.s3bucket.postToS3(
//             r,
//             user.id.toString(),
//             ".pdf"
//           );

//           Toast.show({
//             type: "success",
//             text2: "CV uploaded",
//           });
//           setCvURL(true);
//         } catch (error) {
//           console.log(error);
//           alert("Something went wrong");
//         }
//       } else {
//         Toast.show({
//           type: "error",
//           text1: "Error",
//           text2: "File needs to be in PDF format and must be smaller than 2 Mb",
//           visibilityTime: 5000,
//         });
//       }
//     }
//   };

//   const deleteCV = async () => {
//     try {
//       const dto = await API.s3bucket.deleteOnS3(user.id.toString(), ".pdf");
//       Toast.show({
//         type: "success",
//         text2: "CV deleted",
//         visibilityTime: 5000,
//       });
//       if (dto.valueOf() == true) {
//         setCvURL(false);
//       }
//     } catch (error) {
//       console.log(error);
//       setCvURL(false);
//       Toast.show({
//         type: "error",
//         text1: "Error",
//         text2: "Something went wrong",
//         visibilityTime: 5000,
//       });
//     }
//   };

//   const downloadCV = async () => {
//     const Uri = await API.s3bucket.getFromS3(user.id.toString(), ".pdf");
//     Linking.canOpenURL(Uri).then(() => {
//       return Linking.openURL(Uri);
//     });
//   };

//   return (
//     <KeyboardAwareScrollView>
//       <View style={styles.container}>
//         <ProfilePicture url={user.profilePictureUrl} />

//         <ArkadButton onPress={selectProfilePicture}>
//           {hasProfilePicture ? (
//             <ArkadText text="Change profile picture" />
//           ) : (
//             <ArkadText text="Set profile picture" />
//           )}
//         </ArkadButton>
//         {hasProfilePicture && (
//           <ArkadButton onPress={removeProfilePicture} style={styles.hasCv}>
//             <ArkadText text="Remove profile picture" />
//           </ArkadButton>
//         )}
//         <ArkadButton
//           onPress={setCV}
//           style={{ backgroundColor: Colors.arkadTurkos }}
//         >
//           {hasCv ? (
//             <ArkadText
//               text="Update CV"
//               style={{ backgroundColor: Colors.arkadTurkos }}
//             />
//           ) : (
//             <ArkadText
//               text="Upload CV"
//               style={{ backgroundColor: Colors.arkadTurkos }}
//             />
//           )}
//         </ArkadButton>
//         {hasCv && (
//           <ArkadButton onPress={deleteCV} style={styles.hasCv}>
//             <ArkadText text="Delete CV" />
//           </ArkadButton>
//         )}
//         {hasCv && (
//           <ArkadButton
//             onPress={downloadCV}
//             style={{ backgroundColor: Colors.arkadTurkos }}
//           >
//             <ArkadText text="Download CV" />
//           </ArkadButton>
//         )}

//         <Text style={styles.inputLabel}>First name</Text>
//         <TextInput
//           style={styles.textInput}
//           value={firstName ? firstName : ""}
//           placeholder="John"
//           onChangeText={setFirstName}
//         />

//         <Text style={styles.inputLabel}>Last name</Text>
//         <TextInput
//           style={styles.textInput}
//           value={lastName ? lastName : ""}
//           placeholder="Doe"
//           onChangeText={setLastName}
//         />

//         <Text style={styles.inputLabel}>Phone number</Text>
//         <TextInput
//           style={styles.textInput}
//           value={phoneNr ? phoneNr : ""}
//           placeholder="076-1234567"
//           onChangeText={setPhoneNr}
//         />

//         <Text style={styles.inputLabel}>Food preferences</Text>
//         <TextInput
//           style={styles.textInput}
//           value={foodPreferences ? foodPreferences : ""}
//           placeholder="Vegetarian"
//           onChangeText={setFoodPreferences}
//         />

//         <Text style={styles.inputLabel}>Password</Text>
//         <TextInput
//           style={styles.textInput}
//           secureTextEntry
//           placeholder="New password"
//           onChangeText={setPassword}
//         />
//         <TextInput
//           style={styles.textInput}
//           secureTextEntry
//           placeholder="Repeat password"
//           onChangeText={setRepeatPassword}
//         />
//       </View>
//     </KeyboardAwareScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     display: "flex",
//     alignItems: "center",
//   },
//   hasCv: {
//     backgroundColor: Colors.darkRed,
//   },
//   nameLabel: {
//     paddingTop: 8,
//     paddingBottom: 16,
//     fontSize: 32,
//     color: Colors.arkadNavy,
//   },
//   header: {
//     fontFamily: "main-font-bold",
//     color: Colors.arkadNavy,
//     fontSize: 22,
//     marginTop: 12,
//     marginBottom: 4,
//   },
//   textInput: {
//     width: "80%",
//     maxWidth: 400,
//     borderColor: Colors.white,
//     color: Colors.white,
//     placeholderTextColor: Colors.lightGray,
//   },
//   inputLabel: {
//     color: Colors.white,
//     paddingTop: 5,
//     fontFamily: "main-font",
//     fontSize: 20,
//   },
// });

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
    alert("chosen image");
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });

    alert("result achieved");

    if (result.canceled) {
      return;
    }

    alert("result not cancelled");

    const fileInfo = await FileSystem.getInfoAsync(result.uri);

    alert("file info gotten");

    if (!result.uri.includes("data:image")) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "You must select an image",
      });
      alert("You must select an image");
      return;
    }

    if (fileInfo.size ? fileInfo.size > 4000000 : false) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Maximum file size of 4 Mb exceeded",
      });
      alert("Maximum file size of 4 Mb exceeded");
      return;
    }

    alert("file info size ok");

    await API.s3bucket
      .postToS3(result.uri, user.id.toString(), ".jpg")
      .catch((e) => {
        console.log(e);
      });

    alert("post to s3 done");

    setHasProfilePicture(true);
    Toast.show({
      type: "success",
      text2:
        "Profile picture uploaded. Save profile to see the new profile picture",
      visibilityTime: 4000,
    });
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
        (resultFile.size ? resultFile.size < 2000000 : false)
      ) {
        const r = resultFile.uri;
        console.log(JSON.stringify(r));
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
    placeholderTextColor: Colors.lightGray,
  },
  inputLabel: {
    color: Colors.white,
    paddingTop: 5,
    fontFamily: "main-font",
    fontSize: 20,
  },
});

// import React, { useEffect, useState } from "react";
// import { UpdateUserDto, User } from "api/Users";
// import ProfilePicture from "../ProfilePicture";
// import { View, Text } from "../Themed";
// import { Linking, Platform, StyleSheet } from "react-native";
// import Colors from "constants/Colors";
// import { TextInput } from "../TextInput";
// import { EditStatus } from "screens/profile/EditProfileScreen";
// import { ArkadButton } from "../Buttons";
// import { ArkadText } from "../StyledText";
// import { API } from "api";
// import * as ImagePicker from "expo-image-picker";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import * as DocumentPicker from "expo-document-picker";
// import * as FileSystem from "expo-file-system";

// type EditUserProfileProps = {
//   user: User;
//   setUpdateUserDto: (dto: UpdateUserDto) => void;
//   setEditStatus: (status: EditStatus) => void;
// };

// export default function EditUserProfile({
//   user,
//   setUpdateUserDto,
//   setEditStatus,
// }: EditUserProfileProps) {
//   const [hasProfilePicture, setHasProfilePicture] = useState<boolean | null>(
//     user.hasProfilePicture
//   );
//   const [firstName, setFirstName] = useState<string | null>(user.firstName);
//   const [lastName, setLastName] = useState<string | null>(user.lastName);
//   const [phoneNr, setPhoneNr] = useState<string | null>(user.phoneNr);
//   const [foodPreferences, setFoodPreferences] = useState<string | null>(
//     user.foodPreferences
//   );
//   const [hasCv, setCvURL] = useState<boolean | null>(user.hasCv);
//   const [password, setPassword] = useState<string>("");
//   const [repeatPassword, setRepeatPassword] = useState<string>("");

//   useEffect(() => {
//     // TODO Validate password strength with zxvcbn
//     if (password && password.length < 8) {
//       setEditStatus({
//         ok: false,
//         message: "Password is not strong enough",
//       });
//     } else if (password && password !== repeatPassword) {
//       setEditStatus({
//         ok: false,
//         message: "Passwords does not match",
//       });
//     } else {
//       setEditStatus({
//         ok: true,
//         message: null,
//       });
//     }
//     const dto = {
//       firstName,
//       lastName,
//       phoneNr,
//       password,
//       foodPreferences,
//     };
//     setUpdateUserDto(dto);
//   }, [firstName, lastName, phoneNr, password, repeatPassword, foodPreferences]);

//   const setProfilePicture = async () => {
//     if (Platform.OS !== "web") {
//       const { status } =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== "granted") {
//         alert(
//           "We need camera roll permissions to upload a new profile picture"
//         );
//         return;
//       }
//     }
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//     });
//     if (result.cancelled) return;
//     const fileInfo = await FileSystem.getInfoAsync(result.uri);
//     if (result.type != "image") {
//       alert("Only images allowed");
//       return;
//     }
//     if (fileInfo.size ? fileInfo.size > 4000000 : false) {
//       alert("Maximum filesize is 1Mb");
//       return;
//     }

//     await API.s3bucket
//       .postToS3(result.uri, user.id.toString(), ".jpg")
//       .catch((e) => {
//         console.log(e);
//       });
//     setHasProfilePicture(true);
//     alert("save profile to see profile picture");
//   };

//   const removeProfilePicture = async () => {
//     if (hasProfilePicture == false) {
//       alert("You have no profile picture");
//     } else {
//       await API.s3bucket.deleteOnS3(user.id.toString(), ".jpg");
//       setHasProfilePicture(false);
//       alert("save profile to remove profile picture");
//     }
//   };
//   const setCV = async () => {
//     let resultFile = await DocumentPicker.getDocumentAsync({});
//     if (resultFile.type == "success") {
//       if (
//         resultFile.mimeType == "application/pdf" &&
//         (resultFile.size ? resultFile.size < 2000000 : false)
//       ) {
//         const r = resultFile.uri;
//         console.log(JSON.stringify(r));
//         try {
//           const res = await API.s3bucket.postToS3(
//             r,
//             user.id.toString(),
//             ".pdf"
//           );

//           alert("CV uploaded");
//           setCvURL(true);
//         } catch (error) {
//           console.log(error);
//           alert("Something went wrong");
//         }
//       } else {
//         alert("File needs to be in PDF format and must be smaller than 2Mb");
//       }
//     }
//   };

//   const deleteCV = async () => {
//     try {
//       const dto = await API.s3bucket.deleteOnS3(user.id.toString(), ".pdf");
//       alert("CV deleted");
//       if (dto.valueOf() == true) {
//         setCvURL(false);
//       }
//     } catch (error) {
//       console.log(error);
//       setCvURL(false);
//       alert("CV deleted");
//     }
//   };

//   const downloadCV = async () => {
//     const Uri = await API.s3bucket.getFromS3(user.id.toString(), ".pdf");
//     Linking.canOpenURL(Uri).then(() => {
//       return Linking.openURL(Uri);
//     });
//   };

//   return (
//     <KeyboardAwareScrollView>
//       <View style={styles.container}>
//         <ProfilePicture url={user.profilePictureUrl} />

//         <ArkadButton onPress={setProfilePicture}>
//           {hasProfilePicture ? (
//             <ArkadText text="Change profile picture" />
//           ) : (
//             <ArkadText text="Set profile picture" />
//           )}
//         </ArkadButton>
//         {hasProfilePicture && (
//           <ArkadButton onPress={removeProfilePicture}>
//             <ArkadText text="Remove profile picture" />
//           </ArkadButton>
//         )}
//         <ArkadButton onPress={setCV}>
//           {hasCv ? (
//             <ArkadText text="Update CV" />
//           ) : (
//             <ArkadText text="Upload CV" />
//           )}
//         </ArkadButton>
//         {hasCv && (
//           <ArkadButton onPress={deleteCV} style={styles.hasCv}>
//             <ArkadText text="Delete CV" />
//           </ArkadButton>
//         )}
//         {hasCv && (
//           <ArkadButton onPress={downloadCV}>
//             <ArkadText text="Download CV" />
//           </ArkadButton>
//         )}

//         <Text>First name</Text>
//         <TextInput
//           style={styles.textInput}
//           value={firstName ? firstName : ""}
//           placeholder="John"
//           onChangeText={setFirstName}
//         />

//         <Text>Last name</Text>
//         <TextInput
//           style={styles.textInput}
//           value={lastName ? lastName : ""}
//           placeholder="Doe"
//           onChangeText={setLastName}
//         />

//         <Text>Phone number</Text>
//         <TextInput
//           style={styles.textInput}
//           value={phoneNr ? phoneNr : ""}
//           placeholder="076-1234567"
//           onChangeText={setPhoneNr}
//         />

//         <Text>Food preferences</Text>
//         <TextInput
//           style={styles.textInput}
//           value={foodPreferences ? foodPreferences : ""}
//           placeholder="Vegetarian.."
//           onChangeText={setFoodPreferences}
//         />

//         <Text>Password</Text>
//         <TextInput
//           style={styles.textInput}
//           secureTextEntry
//           placeholder="New password"
//           onChangeText={setPassword}
//         />
//         <TextInput
//           style={styles.textInput}
//           secureTextEntry
//           placeholder="Repeat password"
//           onChangeText={setRepeatPassword}
//         />
//       </View>
//     </KeyboardAwareScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     display: "flex",
//     alignItems: "center",
//   },
//   hasCv: {
//     backgroundColor: Colors.darkRed,
//   },
//   nameLabel: {
//     paddingTop: 8,
//     paddingBottom: 16,
//     fontSize: 32,
//     color: Colors.white,
//   },
//   textInput: {
//     width: "80%",
//     maxWidth: 400,
//   },
// });
