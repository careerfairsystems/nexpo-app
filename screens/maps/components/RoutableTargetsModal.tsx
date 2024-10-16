import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { ReactAIIndoorNavigationSDK, ReactRoutableTarget } from "react-native-ai-navigation-sdk";
import Colors from "constants/Colors";
import { API } from "api/API";
import CompaniesList from "components/companies/CompaniesList";
import { PublicCompanyDto } from "api/Companies";
import { CompanyListItem } from "components/companies/CompanyListItem";
import { SearchBar } from "components/SearchBar";
import { filterData } from "components/companies/filterCompanies";

type RoutableTargetsModalProps = {
  sdk: ReactAIIndoorNavigationSDK | null;
  isVisible: boolean;
  onClose: () => void;
  onTargetSelect: (target: ReactRoutableTarget | null) => void;
};

const RoutableTargetsModal: React.FC<RoutableTargetsModalProps> = ({
                                                                     sdk,
                                                                     isVisible,
                                                                     onClose,
                                                                     onTargetSelect,
                                                                   }) => {
  const [allTargets, setAllTargets] = useState<Array<ReactRoutableTarget | null>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [allCompanies, setCompanies] = useState<PublicCompanyDto[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isVisible && sdk) {
      fetchRoutableTargets();
    }
  }, [isVisible, sdk]);

  const fetchRoutableTargets = async () => {
    setLoading(true);
    try {
      const companies = await API.companies.getAll().then(companies => companies.filter(company => company.name && company.name.trim() !== ""));
      setCompanies(companies);
      const targets = await sdk?.getRoutingProvider()?.queryTarget(" ");
      setAllTargets(targets || []);
    } catch (error) {
      console.error("Error fetching routable targets:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter companies based on the search query
  const filteredCompanies = filterData(searchQuery,allCompanies);


  const toggleFilter = () => {
    setModalVisible(!modalVisible);
    setIsFiltered(!isFiltered);
  };

  return (
    <Modal transparent={true} visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Routable Targets</Text>
          <View style={styles.searchBarContainer}>
            <SearchBar
              text={searchQuery}
              onChangeText={setSearchQuery}
              toggleFilter={toggleFilter}
              modalVisible={modalVisible}
              isFiltered={isFiltered}
             placeHolder={" Search for targets..."}/>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color={Colors.arkadTurkos} />
          ) : (
            <FlatList
              data={filteredCompanies}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <CompanyListItem
                  company={item}
                  onPress={() => {
                    onTargetSelect(null);
                    onClose();
                  }}
                />
              )}
            />
          )}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Colors.arkadNavy,
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.white
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: Colors.arkadOrange,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  searchBarContainer: {
    width: "100%",
    height: 50,
    marginBottom: 10,
  },

});

export default RoutableTargetsModal;
