//A react native modal that can be used to display a list of companies

import React, { useCallback, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet, View, Modal } from 'react-native';
import { Industry, Position, PublicCompanyDto } from '../../api/companies';
import Colors from '../../constants/Colors';
import { ArkadButton } from '../Buttons';
import { ArkadText } from '../StyledText';
import { Guild } from '../../api/students';

type CompaniesModalProps = {
  companies: PublicCompanyDto[];
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  setFilteredCompanies: (value: PublicCompanyDto[]) => void;
}

export default function CompaniesModal({ companies, modalVisible, setModalVisible, setFilteredCompanies }: CompaniesModalProps) {
  const [positions, setPositions] = useState([
    { label: "Thesis", value: Position.Thesis },
    { label: "Trainee Employment", value: Position.TraineeEmployment },
    { label: "Internship", value: Position.Internship },
    { label: "Summer job", value: Position.SummerJob },
    { label: "Foreign opportunity", value: Position.ForeignOppurtunity },
    { label: "Part time", value: Position.PartTime },
  ]);
  const [industry, setIndustry] = useState([
    { label: "ElectricityEnergyPower"   , value: Industry.ElectricityEnergyPower },
    { label: "Environment"              , value: Industry.Environment },
    { label: "BankingFinance"           , value: Industry.BankingFinance },
    { label: "Union"                    , value: Industry.Union },
    { label: "Investment"               , value: Industry.Investment},
    { label: "Insurance"                , value: Industry.Insurance },
    { label: "Recruitment"              , value: Industry.Recruitment },
    { label: "Construction"             , value: Industry.Construction },
    { label: "Architecture"             , value: Industry.Architecture },
    { label: "GraphicDesign"            , value: Industry.GraphicDesign },
    { label: "DataIT"                   , value: Industry.DataIT },
    { label: "FinanceConsultancy"       , value: Industry.FinanceConsultancy },
    { label: "Telecommunication"        , value: Industry.Telecommunication },
    { label: "Consulting"               , value: Industry.Consulting },
    { label: "Management"               , value: Industry.Management },
    { label: "Media"                    , value: Industry.Media },
    { label: "Industry"                 , value: Industry.Industry },
    { label: "NuclearPower"             , value: Industry.NuclearPower },
    { label: "LifeScience"              , value: Industry.LifeScience },
    { label: "MedicalTechniques"        , value: Industry.MedicalTechniques },
    { label: "PropertyInfrastructure"   , value: Industry.PropertyInfrastructure },
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
    setFilteredCompanies(companies);
    setModalVisible(false);
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
    setModalVisible(!modalVisible);
  }
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
      >
      <View style={styles.centeredView}>
        <View style={styles.header}>
          <ArkadButton
            style={styles.closeButton}
            onPress={() => 
            setModalVisible(!modalVisible)}>
            <ArkadText text="X "/>
          </ArkadButton>
        </View>
        <View style={[styles.modalView, {zIndex: 3}]}>
          <ArkadText text="Desired program" style={styles.label}/>
          <DropDownPicker
            multiple={true}
            open={guildOpen}
            onOpen={onGuildOpen}
            value={guildValue}
            items={guilds}
            setOpen={guildSetOpen}
            setValue={guildSetValue}
            setItems={setGuilds}
            selectedItemContainerStyle={{
              backgroundColor: Colors.lightGray
            }}
            listItemLabelStyle={{
              color: Colors.darkBlue,
              fontFamily: 'montserrat',
            }}
            maxHeight={130}
            mode = 'BADGE'
          />
        </View>
        <View style={[styles.modalView, {zIndex: 1}]}>
          <ArkadText text="Positions" style={styles.label}/>
          <DropDownPicker
            multiple={true}
            open={positionOpen}
            onOpen={onPositionOpen}
            value={positionValue}
            items={positions}
            setOpen={positionSetOpen}
            setValue={positionSetValue}
            setItems={setPositions}
            selectedItemContainerStyle={{
              backgroundColor: Colors.lightGray
            }}
            listItemLabelStyle={{
              color: Colors.darkBlue,
              fontFamily: 'montserrat',
            }}
            maxHeight={130}
            mode = 'BADGE'
          />
        </View>
        <View style={[styles.modalView, {zIndex: 0}]}>
          <ArkadText text="Industries" style={styles.label}/>
          <DropDownPicker
            multiple={true}
            open={industryOpen}
            value={industryValue}
            items={industry}
            setOpen={industrySetOpen}
            onOpen={onIndustryOpen}
            setValue={industrySetValue}
            setItems={setIndustry}
            selectedItemContainerStyle={{
              backgroundColor: Colors.lightGray
            }}
            listItemLabelStyle={{
              color: Colors.darkBlue,
              fontFamily: 'montserrat',
            }}
            dropDownDirection= {'BOTTOM'}
            maxHeight={130}
            mode = 'BADGE'
       />
        </View>
        <View style={styles.footer}>
          <ArkadButton
            onPress={resetFilters}>
            <ArkadText text="Reset filters"/>
          </ArkadButton>
          <ArkadButton
            onPress={filterCompanies}>
            <ArkadText text="Apply filters"/>
          </ArkadButton>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    borderWidth: 3,
    borderColor: Colors.lightGray,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.93)",
    padding: 10,
  },
  label: {
    fontSize: 20,
    fontFamily: 'montserrat',
    color: Colors.darkBlue,
    marginBottom: 10,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  closeButton: {
    backgroundColor: Colors.gray,
    borderRadius: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    padding: 1,
  },
  footer: {
    marginTop: "auto",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    zIndex: -1,
  },
});

