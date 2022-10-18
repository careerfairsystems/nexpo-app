import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState, useCallback } from "react";
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    TouchableOpacity,
  } from "react-native";
import {useForm, Controller} from 'react-hook-form';


export default function DropDown() {
    const [positions, setPositions] = useState([
      { label: "Thesis", value: 0 },
      { label: "Trainee Employment", value: 1 },
      { label: "Internship", value: 2 },
      { label: "Summer job", value: 3 },
      { label: "Foreign opportunity", value: 4 },
      { label: "Part time", value: 5 },
    ]);

    const [industry, setIndustry] = useState([
      { label: "ElectricityEnergyPower"   , value: 0 },
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

    const [loading, setLoading] = useState(false);

    const { handleSubmit, control } = useForm();
    const onSubmit = (data: any) => {
      console.log(data, "data");
    };






    return (
      <View style={styles.container}>
        <Text style={styles.label}>Position</Text><Controller
          name="position"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={styles.dropdown}>
              <DropDownPicker
                style={styles.dropdown}
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
                zIndexInverse={1000} />
            </View>
        )} />

        <Text style={styles.label}>Industry</Text><Controller
        name="industry"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.dropdown}>
              <DropDownPicker
                style={styles.dropdown}
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
                zIndexInverse={1000} />
          </View>
        )} />
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

