import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Industry, Position, PublicCompanyDto } from '../../api/companies';
import Colors from '../../constants/Colors';
import { ArkadButton } from '../Buttons';
import { ArkadText } from '../StyledText';
import { Guild } from '../../api/students';
import { CategoriesDropdown } from './CategoriesDroppdown';
import { INDUSTRIES, POSITIONS, PROGRAMS } from './DroppdownItems';

type CompaniesModalProps = {
  companies: PublicCompanyDto[];
  setFilteredCompanies: (value: PublicCompanyDto[]) => void;
  setIsFiltered: (value: boolean) => void;
  isVisable: boolean;
}

export default function CompaniesModal({ companies, setFilteredCompanies, setIsFiltered, isVisable }: CompaniesModalProps) {
  const [positions, setPositions] = useState(POSITIONS);
  const [industry, setIndustry] = useState(INDUSTRIES);
  const [guilds, setGuilds] = useState(PROGRAMS);

  const [positionOpen, positionSetOpen] = useState(false);
  const [positionValue, positionSetValue] = useState<Position[]>([]);

  const [industryOpen, industrySetOpen] = useState(false);
  const [industryValue, industrySetValue] = useState<Industry[]>([]);

  const [guildOpen, guildSetOpen] = useState(false);
  const [guildValue, guildSetValue] = useState<Guild[]>([]);

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
  if(!isVisable) { 
    return null;
  }
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <CategoriesDropdown
          title="Desired program"
          items={guilds}
          setOpen={guildSetOpen}
          setValue={guildSetValue}
          open={guildOpen}
          value={guildValue} 
          setItems={setGuilds}
          filterCompanies={filterCompanies}/>
      </View>
      <View style={styles.modalView}>
      <CategoriesDropdown
          title="Select position"
          items={positions}
          setOpen={positionSetOpen}
          setValue={positionSetValue}
          open={positionOpen}
          value={positionValue} 
          setItems={setPositions}
          filterCompanies={filterCompanies}/>
      </View>
      <View style={styles.modalView}>
      <CategoriesDropdown
          title="Select industry"
          items={industry}
          setOpen={industrySetOpen}
          setValue={industrySetValue}
          open={industryOpen}
          value={industryValue} 
          setItems={setIndustry}
          filterCompanies={filterCompanies}/>
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
  footer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  button: {
    margin: 0,
    padding: 15,
  },
});

