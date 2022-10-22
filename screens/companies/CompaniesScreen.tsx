import React, { useEffect, useRef, useState } from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons'; 
import { Animated, Easing, FlatList, StyleSheet, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, View } from '../../components/Themed';
import { API } from '../../api';
import { PublicCompanyDto } from '../../api/companies';
import { CompanyListItem } from '../../components/companies/CompanyListItem';
import { CompanyStackParamList } from "./CompaniesNavigator";
import ScreenActivityIndicator from '../../components/ScreenActivityIndicator';
import Colors from '../../constants/Colors';
import CompaniesModal from '../../components/companies/CompaniesModal';
import { ArkadButton } from '../../components/Buttons';
import { useAnimatedScrollHandler } from 'react-native-reanimated';

type companiesNavigation = {
  navigation: StackNavigationProp<
    CompanyStackParamList,
    'CompaniesScreen'
  >
};

export default function CompaniesScreen({navigation}: companiesNavigation) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [companies, setCompanies] = useState<PublicCompanyDto[] | null>(null);
  const [filteredCompanies, setFilteredCompanies] = useState<PublicCompanyDto[] | null>(null);
  const [text, onChangeText] = React.useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const height: number = -252;

  const fadeAnim = useRef(new Animated.Value(height)).current;

  const fade = () => {
    !modalVisible ? fadeIn() : fadeOut();
    setModalVisible(!modalVisible);
  }

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start();
  };
  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: false
    }).start();
  };
  const fastFadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    setModalVisible(false);
    fadeAnim.setValue(height);
  };
 

  const getCompanies = async () => {
    setLoading(true);
    const companies = await API.companies.getAll();
    setFilteredCompanies(companies);
    setCompanies(companies);
    setLoading(false);
  }

  const openCompanyDetails = (id: number) => {
    navigation.navigate('CompanyDetailsScreen', { id });
  }

  useEffect(() => {
    getCompanies();
  }, []);

  if (isLoading) {
    return (<ScreenActivityIndicator />)
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder={"Search for a company..."}
        />
        <ArkadButton style={styles.filterbutton} onPress={() => fade()} >
          {modalVisible ? <Ionicons name="close" size={24} color="white" />
          : <AntDesign name="filter" size={24} color="white" />}
          {isFiltered && <View style={styles.filterBadge} />}
        </ArkadButton>  
      </View>
      <Animated.View
        style={[{translateY: fadeAnim,height: Animated.add(-height, fadeAnim) }, styles.animationContainer]}
      >
        <CompaniesModal
          companies={companies ? companies : []}
          setFilteredCompanies={setFilteredCompanies}
          setIsFiltered={setIsFiltered}
          isVisable={modalVisible}
        />
      </Animated.View>
      <FlatList
        style={styles.list}  
        onScroll={() => modalVisible && fastFadeOut()}
        data={API.companies.filterData(text, filteredCompanies)}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item: company }) =>
          <CompanyListItem
            company={company}
            onPress={() => openCompanyDetails(company.id)} />
        } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    width: '100%',
  },
  input: {
    borderColor: Colors.darkBlue,
    borderWidth: 2,
    color: Colors.darkBlue,
    padding: '0.1%',
    height: 48,
    borderRadius: 7,
    marginRight: 16,
    fontSize: 15,
    fontFamily: 'montserrat',
    paddingHorizontal: 10,
    flexGrow: 1,
  },
  filterbutton: {
    height: 45,
    padding: 10, 
    margin: 0
  },
  filterBadge: {
    position: 'absolute',
    top: -5,
    left: -5,
    backgroundColor: Colors.lightRed,
    borderRadius: 50,
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: 'white'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'space-between',
    paddingTop: 5,
    marginBottom: 16,
    zIndex: 1,
    backgroundColor: Colors.white,
  },
  animationContainer: {
    width: "100%",
    justifyContent: "center", 
    alignItems: "center",
    zIndex: 0,
  },
  label: {
    marginBottom: 7,
    marginStart: 10,
  },

  placeholderStyles: {
    color: "grey",
  },
  dropdown: {
    marginHorizontal: 10,
    width: "80%",
    marginBottom: 15,
  },
});
