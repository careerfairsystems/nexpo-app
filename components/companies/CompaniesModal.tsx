//A react native modal that can be used to display a list of companies

import React, { useCallback, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet, View, Modal } from 'react-native';
import { Industry, Position, PublicCompanyDto } from '../../api/companies';
import Colors from '../../constants/Colors';
import { ArkadButton } from '../Buttons';
import { ArkadText } from '../StyledText';
import { Guild } from '../../api/students';
import { Ionicons } from '@expo/vector-icons';

type CompaniesModalProps = {
  companies: PublicCompanyDto[];
  setFilteredCompanies: (value: PublicCompanyDto[]) => void;
  setIsFiltered: (value: boolean) => void;
  isVisable: boolean;
}

export default function CompaniesModal({ companies, setFilteredCompanies, setIsFiltered, isVisable }: CompaniesModalProps) {
  const [positions, setPositions] = useState([
    { label: "Thesis", value: Position.Thesis },
    { label: "Trainee Employment", value: Position.TraineeEmployment },
    { label: "Internship", value: Position.Internship },
    { label: "Summer job", value: Position.SummerJob },
    { label: "Foreign opportunity", value: Position.ForeignOppurtunity },
    { label: "Part time", value: Position.PartTime },
  ]);
  const [industry, setIndustry] = useState([
    { label: "Electricity/energy/power"   , value: Industry.ElectricityEnergyPower },
    { label: "Environment"              , value: Industry.Environment },
    { label: "Banking/finance"           , value: Industry.BankingFinance },
    { label: "Union"                    , value: Industry.Union },
    { label: "Investment"               , value: Industry.Investment},
    { label: "Insurance"                , value: Industry.Insurance },
    { label: "Recruitment"              , value: Industry.Recruitment },
    { label: "Construction"             , value: Industry.Construction },
    { label: "Architecture"             , value: Industry.Architecture },
    { label: "Graphic design"            , value: Industry.GraphicDesign },
    { label: "Data/IT"                   , value: Industry.DataIT },
    { label: "Finance consultancy"       , value: Industry.FinanceConsultancy },
    { label: "Telecommunication"        , value: Industry.Telecommunication },
    { label: "Consulting"               , value: Industry.Consulting },
    { label: "Management"               , value: Industry.Management },
    { label: "Media"                    , value: Industry.Media },
    { label: "Industry"                 , value: Industry.Industry },
    { label: "Nuclear power"             , value: Industry.NuclearPower },
    { label: "Life science"              , value: Industry.LifeScience },
    { label: "Medical techniques"        , value: Industry.MedicalTechniques },
    { label: "Property infrastructure"   , value: Industry.PropertyInfrastructure },
    { label: "Research"                 , value: Industry.Research },
    { label: "Coaching"                 , value: Industry.Coaching },
  ]);
  const [guilds, setGuilds] = useState([
    { label: "A"   , value: Guild.A }, 
    { label: "D"   , value: Guild.D },
    { label: "E"   , value: Guild.E },
    { label: "F"   , value: Guild.F },
    { label: "I"   , value: Guild.I },
    { label: "ING"   , value: Guild.ING },
    { label: "K"   , value: Guild.K },
    { label: "M"   , value: Guild.M },
    { label: "V"   , value: Guild.V },
    { label: "W"   , value: Guild.W },
  ]);

  const [positionOpen, positionSetOpen] = useState(false);
  const [positionValue, positionSetValue] = useState<Position[]>([]);

  const [industryOpen, industrySetOpen] = useState(false);
  const [industryValue, industrySetValue] = useState<Industry[]>([]);

  const [guildOpen, guildSetOpen] = useState(false);
  const [guildValue, guildSetValue] = useState<Guild[]>([]);

  const onIndustryOpen = useCallback(() => {
    positionSetOpen(false);
    guildSetOpen(false);
  }, []);

  const onPositionOpen = useCallback(() => {
    industrySetOpen(false);
    guildSetOpen(false);
  }, []);

  const onGuildOpen = useCallback(() => {
    positionSetOpen(false);
    industrySetOpen(false);
  }, []);

  const onAllClose = useCallback(() => {
    positionSetOpen(false);
    industrySetOpen(false);
    guildSetOpen(false);
  }, []);

  function resetFilters() {
    positionSetValue([]);
    industrySetValue([]);
    guildSetValue([]);
    setIsFiltered(false);
    setFilteredCompanies(companies);
  }
  function filterCompanies() {
    let filteredCompanies = companies;
    if (positionValue.length > 0) {
      filteredCompanies = filteredCompanies.filter(company => company.positions ? company.positions.some(position => positionValue.includes(position)): false);
    }
    if (industryValue.length > 0) {
      filteredCompanies = filteredCompanies.filter(company => company.industries ? company.industries.some(industry => industryValue.includes(industry)): false);
    }
    if (guildValue.length > 0) {
      filteredCompanies = filteredCompanies.filter(company => company.desiredGuilds ? company.desiredGuilds.some(guild => guildValue.includes(guild)): false);
    }
    setFilteredCompanies(filteredCompanies);
    setIsFiltered(industryValue.length > 0 || positionValue.length > 0 || guildValue.length > 0);
  }
  // if(isVisable) { 
  //   return null;
  // }
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <DropDownPicker
          style={styles.dropdown}
          multiple={true}
          open={guildOpen}
          onOpen={onGuildOpen}
          value={guildValue}
          items={guilds}
          setOpen={guildSetOpen}
          setValue={guildSetValue}
          setItems={setGuilds}
          placeholder="Desired program"
          placeholderStyle={{ 
            color: Colors.darkBlue,
            fontFamily: 'montserrat'}}
          selectedItemContainerStyle={{
            backgroundColor: Colors.lightGray
          }}
          closeIconContainerStyle={styles.closeButton}
          listItemContainerStyle={styles.container}
          showArrowIcon={false}
          listItemLabelStyle={{
            color: Colors.darkBlue,
            fontFamily: 'montserrat',
          }}
          mode = 'BADGE'
          listMode="MODAL"
          onClose={filterCompanies}
        />
      </View>
      <View style={styles.modalView}>
        <DropDownPicker
          style={styles.dropdown}
          multiple={true}
          open={positionOpen}
          onOpen={onPositionOpen}
          value={positionValue}
          items={positions}
          setOpen={positionSetOpen}
          setValue={positionSetValue}
          setItems={setPositions}
          placeholder="Select Positions"
          placeholderStyle={{ 
            color: Colors.darkBlue,
            fontFamily: 'montserrat'}}
          selectedItemContainerStyle={{
            backgroundColor: Colors.lightGray
          }}
          listItemLabelStyle={{
            color: Colors.darkBlue,
            fontFamily: 'montserrat',
          }}
          closeIconContainerStyle={styles.closeButton}
          listItemContainerStyle={styles.container}
          showArrowIcon={false}
          mode = 'BADGE'
          listMode="MODAL"
          onClose={filterCompanies}
        />
      </View>
      <View style={styles.modalView}>
        <DropDownPicker
          style={styles.dropdown}
          multiple={true}
          open={industryOpen}
          value={industryValue}
          items={industry}
          setOpen={industrySetOpen}
          onOpen={onIndustryOpen}
          setValue={industrySetValue}
          setItems={setIndustry}
          placeholder="Select Industries"
          placeholderStyle={{ 
            color: Colors.darkBlue,
            fontFamily: 'montserrat'}}
          selectedItemContainerStyle={{
            backgroundColor: Colors.lightGray
          }}
          listItemLabelStyle={{
            color: Colors.darkBlue,
            fontFamily: 'montserrat',
          }}
          closeIconContainerStyle={styles.closeButton}
          listItemContainerStyle={styles.container}
          showArrowIcon={false}
          mode = 'BADGE'
          listMode="MODAL"
          badgeDotStyle={{
            backgroundColor: Colors.darkBlue,
          }}
          onClose={filterCompanies}
          
      />
      </View>
      <View style={styles.footer}>
        <ArkadButton
        style={styles.button}
          onPress={resetFilters}>
          <ArkadText text="Reset filters"/>
        </ArkadButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "flex-start",
    borderWidth: 0,
    borderColor: Colors.lightGray,
    borderRadius: 15,
    padding: 0,
    margin: 0,
    width: '90%',
  },
  modalView: {
    marginBottom: 12,
    borderRadius: 20,
    padding: 0,
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: Colors.lightGray,
    borderRadius: 48,
    padding: 12,
    margin: 0,
  },
  dropdown: {
    borderColor: Colors.darkBlue,
    borderWidth: 2,
  },
  container: {
    borderBottomColor: Colors.darkBlue,
    borderBottomWidth: 1,
    height: 60,
  },
  footer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  button: {
    margin: 0,
    padding: 15,
  }
});

