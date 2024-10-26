import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator, SectionList
} from "react-native";
import { ReactAIIndoorNavigationSDK, ReactRoutableTarget } from "react-native-ai-navigation-sdk";
import Colors from "constants/Colors";
import { API } from "api/API";
import CompaniesList from "components/companies/CompaniesList";
import { PublicCompanyDto } from "api/Companies";
import { CompanyListItem } from "components/companies/CompanyListItem";
import { SearchBar } from "components/SearchBar";
import { filterData } from "components/companies/filterCompanies";
import { RoutingItem } from "./Routing/RoutingItem";

type RoutableTargetsModalProps = {
  sdk: ReactAIIndoorNavigationSDK | null;
  isVisible: boolean;
  onClose: () => void;
  onTargetSelect: (target: ReactRoutableTarget | null) => void;
};

type GroupedTargets = {
  title: string;
  data: { target: ReactRoutableTarget | null; company: PublicCompanyDto | null }[];
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
      const filteredTargets = (targets || []).filter(
        (target) => target?.name && !target.name.includes("Footway") && !target.name.includes("Node")
      );
      setAllTargets(filteredTargets);
    } catch (error) {
      console.error("Error fetching routable targets:", error);
    } finally {
      setLoading(false);
    }
  };

  const groupTargets = (
    items: { target: ReactRoutableTarget | null; company: PublicCompanyDto | null }[]
  ): GroupedTargets[] => {
    const result: { [key: string]: GroupedTargets['data'] } = {};
    const loungeCategory: GroupedTargets['data'] = [];

    items.forEach((item) => {
      const { target } = item;
      if (target?.name.toLowerCase() === "lounge") {
        loungeCategory.push(item);
      } else {
        let firstLetter = target?.name[0]!.toUpperCase();
        firstLetter = firstLetter?.replace(/\d/, "0-9");

        if (!result[firstLetter!]) {
          result[firstLetter!] = [];
        }
        result[firstLetter!].push(item);
      }
    });

    const groupedData = Object.entries(result)
      .map(([key, data]) => ({
        title: key,
        data,
      }))
      .sort((a, b) => a.title.localeCompare(b.title));
    if (loungeCategory.length > 0) {
      groupedData.push({
        title: "Lounge",
        data: loungeCategory,
      });
    }
    return groupedData;
  };

  const filteredCompanies = filterData(searchQuery,allCompanies);
  const filteredTargets = allTargets.filter(x=> x?.name.trim().toLowerCase().includes(searchQuery.trim().toLowerCase()));

  const matchedTargets = filteredTargets.map((target) => {
    const matchedCompany = filteredCompanies?.find(
      (company) => company.name.toLowerCase() === target?.name.toLowerCase()
    );
    return { target, company: matchedCompany ?? null };
  });

  const validMatchedTargets = matchedTargets.filter(item => item.target !== null);



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
            <SectionList
              sections={groupTargets(validMatchedTargets)}
              renderItem={({ item }) => (
                <RoutingItem
                  target={item.target!}
                  company={item.company}
                  onPress={() => {
                    onTargetSelect(item.target);
                    onClose();
                  }}
                />
              )}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.sectionHeader}>{title}</Text>
              )}
              keyExtractor={(item, index) => item.target!.name + index}
              style={styles.list}
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
  sectionHeader: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.white,
    padding: 8,
  },
  list: {
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },


});

export default RoutableTargetsModal;
