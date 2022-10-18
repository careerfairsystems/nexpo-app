import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';


import { Text, View } from '../components/Themed';


import { API } from '../api';
import { PublicCompanyDto } from '../api/companies';
import { CompanyListItem } from '../components/companies/CompanyListItem';
import { CompanyStackParamList } from "../navigation/CompaniesNavigator";
import ScreenActivityIndicator from '../components/ScreenActivityIndicator';
import Colors from '../constants/Colors';
import { Controller, useForm } from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';

type companiesNavigation = {
  navigation: StackNavigationProp<
    CompanyStackParamList,
    'CompaniesScreen'
  >
};

export default function CompaniesScreen({navigation}: companiesNavigation) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [companies, setCompanies] = useState<PublicCompanyDto[] | null>(null);
  const [text, onChangeText] = React.useState("");
  const [filterIndustries, setFilterIndustries] = useState<number[] | null>(null);
  const [filterPositions, setFilterPositions] = useState<number[] | null>(null);

  const [positions, setPositions] = useState([
    { label: "Thesis", value: 0 },
    { label: "Trainee Employment", value: 1 },
    { label: "Internship", value: 2 },
    { label: "Summer job", value: 3 },
    { label: "Foreign opportunity", value: 4 },
    { label: "Part time", value: 5 },
  ]);

  const [industry, setIndustry] = useState([
    { label: "Electricity Energy Power"   , value: 0 },
    { label: "Environment"              , value: 1 },
    { label: "BankingFinance"           , value: 2 },
    { label: "Union"                    , value: 3 },
    { label: "Investment"               , value: 4 },
    { label: "Insurance"                , value: 5 },
    { label: "Recruitment"              , value: 6 },
    { label: "Construction"             , value: 7 },
    { label: "Architecture"             , value: 8 },
    { label: "GraphicDesign"            , value: 9 },
    { label: "DataIT"                   , value: 10 },
    { label: "FinanceConsultancy"       , value: 11 },
    { label: "Telecommunication"        , value: 12 },
    { label: "Consulting"               , value: 13 },
    { label: "Management"               , value: 14 },
    { label: "Media"                    , value: 15 },
    { label: "Industry"                 , value: 16 },
    { label: "NuclearPower"             , value: 17 },
    { label: "LifeScience"              , value: 18 },
    { label: "MedicalTechniques"        , value: 19 },
    { label: "PropertyInfrastructure"   , value: 20 },
    { label: "Research"                 , value: 21 },
    { label: "Coaching"                 , value: 22 },
  ]);

  const [positionOpen, setPositionOpen] = useState(false);
  const [positionValue, setPositionValue] = useState([]);
  const onPositionOpen = useCallback(() => {
    setIndustryOpen(false);
  }, []);

  const [industryOpen, setIndustryOpen] = useState(false);
  const [industryValue, setIndustryValue] = useState([]);
  const onIndustryOpen = useCallback(() => {
    setPositionOpen(false);
  }, []);


  const { handleSubmit, control } = useForm();
  const onSubmit = (data: any) => {
    console.log(data, "data");
  };



  const getCompanies = async () => {
    setLoading(true);
    const companies = await API.companies.getAll();
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
    return (<View style={styles.container}>
      <ScreenActivityIndicator />
    </View>)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder={"Search for company here!"}
      />
      <View style = {styles.rowContainer}>
     <Controller
          name="position"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={styles.dropdown}>
              <DropDownPicker
                multiple={true}
                min = {0}
                max = {6}
                open={positionOpen}
                value={positionValue}
                items={positions}
                setOpen={setPositionOpen}
                setValue={setPositionValue}
                setItems={setPositions}
                placeholder="Select position"
                placeholderStyle={styles.placeholderStyles}
                onOpen={onPositionOpen}
                onChangeValue={onChange}
                zIndex={3000}
                zIndexInverse={1000}
                mode = "BADGE"
                />
            </View>
        )} />

      <Controller
        name="industry"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.dropdown}>
            <DropDownPicker
              dropDownContainerStyle = {styles.dropDownContainerStyle}
              multiple={true}
              min = {0}
              max = {23}
              open={industryOpen}
              value={industryValue}
              items={industry}
              setOpen={setIndustryOpen}
              setValue={setIndustryValue}
              setItems={setIndustry}
              placeholder="Select industry"
              placeholderStyle={styles.placeholderStyles}
              onOpen={onIndustryOpen}
              onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
              mode = "BADGE"
               />
          </View>
        )} />
        </View>

      <FlatList
        style={styles.list}
        data={API.companies.filterData(text, companies, positionValue, industryValue)}
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
  rowContainer: {
    flexDirection: 'row',
    width: '50%',
  },
  list: {
    width: '100%',
    zIndex: -3000,
  },
  input: {
    width: '90%',
    borderColor: Colors.darkBlue,
    borderWidth: 3,
    color: Colors.darkBlue,
    padding: '0.1%',
    height: 45,
    borderRadius: 7,
    margin: 10,
    fontSize: 15,
    fontFamily: 'montserrat',
    paddingHorizontal: 10
  },
  dropdown: {
    width: '50%',
    alignSelf: 'center',
    borderColor: Colors.darkBlue,
    borderWidth: 3,
    color: Colors.darkBlue,
    padding: '0.1%',
    height: 45,
    borderRadius: 7,
    margin: 10,
    fontSize: 15,
    fontFamily: 'montserrat',
    paddingHorizontal: 10,
  },
  dropDownContainerStyle: {
    width: '100%',
    alignSelf: 'center',
    borderColor: Colors.darkBlue,
    borderWidth: 3,
    borderRadius: 7,
    margin: 10,
    fontSize: 15,
    fontFamily: 'montserrat',

  },
  label: {
    marginBottom: 7,
    marginStart: 10,
  },
  placeholderStyles: {
    color: "grey",
  },


});
