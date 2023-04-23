import { View } from "components/Themed";
import { Dimensions, Modal, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { ArkadText } from "components/StyledText";
import Colors from "constants/Colors";
import { ArkadButton } from "components/Buttons";
import { Dispatch, SetStateAction } from "react";
import { Ticket } from "api/Tickets";

type TicketQRCodeProps = {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  title: string;
  ticket: Ticket | null;
};

export default function TicketQRCode({
  modalVisible,
  setModalVisible,
  title,
  ticket,
}: TicketQRCodeProps) {
  return (
    <>
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible && ticket !== null}
        style={{ backgroundColor: "transparent" }}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.outerContainer}>
          <ArkadButton onPress={() => setModalVisible(false)}>
            <ArkadText text="Close" style={styles.closeButton} />
          </ArkadButton>
          <View style={styles.container}>
            <ArkadText text={title} style={styles.ticketHeader} />
            <QRCode
              size={Dimensions.get("window").width * 0.25}
              value={ticket?.id.toString()}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: "30%",
    alignSelf: "center",
  },
  container: {
    display: "flex",
    alignItems: "center",
  },
  ticketHeader: {
    color: Colors.arkadNavy,
    fontSize: 50,
    fontFamily: "main-font-bold",
  },
  closeButton: {
    alignSelf: "center",
    padding: "4%",
    marginBottom: "2%",
    width: "45%",
  },
});
