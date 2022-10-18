import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Button, View, Dimensions, Platform } from "react-native";
import { API } from "../../api";
import { ArkadButton } from "../../components/Buttons";
import { ArkadText, NoButton } from "../../components/StyledText";
import Colors from "../../constants/Colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { EventStackParamlist } from "./EventsNavigator";
import ScreenActivityIndicator from "../../components/ScreenActivityIndicator";
import { Ticket } from "../../api/tickets";

interface ScanResult{
  type: string,
  data: string,
}

type QRScreenProps = {
  navigation: StackNavigationProp<EventStackParamlist, 'QRScreen'>;
  route: {
    params: {
      id: number;
    };
  };
}

export default function QRScreen({ route }: QRScreenProps) {
  const { id } = route.params;
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  
  async function getPermission() {
    // No support for the QR scanner on web yet
    if (Platform.OS === 'web') return;

    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  }
  useEffect(() => {
    setLoading(true);
    getPermission();
    setLoading(false);
  }, []);

  const handleBarCodeScanned = async ({ data }: ScanResult) => {
    try{
      setLoading(true);
      setScanned(true);
      const ticket = await API.tickets.getTicket(data);
      setTicket(ticket);
      if (ticket && ticket.eventId === id && ticket.isConsumed === false) {
        await API.tickets.updateTicket(ticket.id, {isConsumed: true});
      }
    } catch (error) {
      console.log(error);
      alert("could not update ticket");
    } finally {
      setLoading(false);
    }
  };

  if (Platform.OS === 'web') {
    return <View style={styles.container}>
      <Text>Scanning is not avaialable on the web yet, please install the standalone app from the app store for this functionality</Text>
    </View>;
  }

  if (hasPermission === null) {
    return <View style={styles.container}>
      <Text>Requesting for camera permission</Text>
    </View>;
  }
  if (hasPermission === false) {
    return <View style={styles.container}>
      <Text>No access to camera, press the button below to request camera permission again</Text>
      <ArkadButton onPress={getPermission} style={styles.button}>
        <ArkadText text="Get permission" />
      </ArkadButton>
    </View>;
  }
  if(loading) {
    return <View style={styles.container}>
      <ScreenActivityIndicator/>
    </View>;
  }
  if(scanned) {
    return (
      <View style={styles.container}>
        {ticket && ticket.eventId === id && ticket.isConsumed === false ? 
          <NoButton text={`Ticket for ${ticket.event.name} consumed!`} style={styles.success} /> :
          ticket && ticket.eventId === id ? <NoButton text={`ERR: Ticket already scanned`} style={styles.fail} />:
          ticket ? <NoButton text={`ERR: Ticket is not for this event\n its for ${ticket.event.name}`} style={styles.fail} /> :
          <NoButton text={`ERR: Ticket not found`} style={styles.fail} />
        }
        <ArkadButton 
          onPress={() => {setScanned(false); setTicket(null);}}
          style={styles.button}>
          <ArkadText text={"Click to scan again"} style={styles.scanAgain}/>
        </ArkadButton>
      </View>
    )
  }
  
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  success: {
    backgroundColor: Colors.lightGreen,
    width: "80%",
    borderRadius: 10,
    marginTop: 20,
  },
  fail: {
    backgroundColor: Colors.darkRed,
    width: "80%",
    borderRadius: 10,
    marginTop: 100,
    marginBottom: 0,
  },
  scanAgain: { 
    color: Colors.white,
    fontSize: 24
  },
  button: {
    marginTop: '20%',
    width: '86%',
  },
  permissionButton: {
    marginTop: 50,
  }
}); 
