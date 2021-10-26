import { BarCodeScanner } from "expo-barcode-scanner";
import { AirbnbRating } from 'react-native-ratings';
import React, { useEffect, useState } from "react";
import { TextInput, StyleSheet, Text, Button, View, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { API } from "../api";
import { CompanyCompanyConnectionDto, CreateCompanyConnectionDto } from "../api/companyconnections";
import { ArkadButton } from "../components/Buttons";
import { ArkadText } from "../components/StyledText";
import Colors from "../constants/Colors";
import { profileNavigation } from "./ProfileScreen";

const { width, height } = Dimensions.get("window");

interface QRProps{
  type: string,
  data: string,
}

export default function QRScreen({ navigation }: profileNavigation) {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);
  const [studentID, setStudentID] = useState<number>(-1);
  const [rating, setRating] = useState<number>(3);
  const [description, setDescription] = useState<string>("");
  
  async function getPermission() {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  }

  useEffect(() => {
    getPermission();
  }, []);

  async function createCompanyConnection() {
    const connection: CreateCompanyConnectionDto = {
      studentId: studentID,
      rating: rating,
      comment: description
    }
    const response: CompanyCompanyConnectionDto = await API.companyconnections.createConnection(connection)
    if(response) {
      alert(`Successfully connected with student!`);
    } else {
      alert(`Could not connect with student.`);
    }
    navigation.goBack()
  }

  const handleBarCodeScanned = ({ type, data }: QRProps) => {
    setScanned(true);
    setStudentID(Number(data));
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if(scanned) {
    return (
      <View style={styles.container}>
        <ArkadText text={"Student ID: " + studentID.toString()} style={styles.id} />

        <AirbnbRating
          count={5}
          defaultRating={3}
          size={32}
          selectedColor={Colors.lightBlue}
          reviews={[]}
          onFinishRating={(rating: number) => setRating(rating)} />
        
        <ArkadText text={"Comments"} style={styles.header} />

        <View style={styles.descriptionContainer}>
          <ScrollView showsVerticalScrollIndicator={false} style={{height: height * 0.2}}>
            <TextInput 
              style={styles.description}
              defaultValue={''}
              multiline={true}
              numberOfLines={8}
              editable={true}
              onChangeText={text => setDescription(text)} />
          </ScrollView>
        </View>
        
        <ArkadButton 
          onPress={createCompanyConnection} 
          style={styles.button}>
          <ArkadText text={"Connect with student"} style={{}}/>
        </ArkadButton>
      </View>
    )
  }
  
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject} />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  id: {
    paddingTop: '4%',
    color: Colors.darkBlue,
    fontSize: 24
  },
  header: {
    paddingTop: '20%',
    paddingLeft: '7%',
    width: '100%',
    textAlign: 'left',
    fontSize: 16,
    color: Colors.darkBlue,
  },
  descriptionContainer: {
    marginTop: '4%',
    width: '86%',
    borderRadius: 8,
    borderColor: Colors.black,
    borderWidth: 1,
    backgroundColor: Colors.lightGray
  },
  scroll: {
    width: '86%',
  },
  description: {
    color: Colors.darkBlue,
    width: '100%',
    fontSize: 14,
    padding: 12,
    textAlign: 'left',
    textAlignVertical: 'top',
    justifyContent: "center",
    fontFamily: 'montserrat',
  },
  button: {
    marginTop: '20%',
    width: '86%',
  },
}); 