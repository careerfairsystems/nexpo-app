import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Industry, Locations, Position, PublicCompanyDto } from "api/Companies";
import Colors from "constants/Colors";
import { ArkadButton } from "../Buttons";
import { ArkadText } from "../StyledText";
import { Programme } from "api/Students";
import { CompanyCategoriesDropdown } from "./CompanyCategoriesDropdown";
import { INDUSTRIES, LOCATIONS, POSITIONS, PROGRAMS } from "./DroppdownItems";
import { companyLocations } from "./CompanyLocationsMap";
import CompanyListDivider from "./CompanyListDivider";

type CompaniesModalProps = {
  companies: PublicCompanyDto[];
  filteredCompanies: PublicCompanyDto[],
  setFilteredCompanies: (value: PublicCompanyDto[]) => void;
  setIsFiltered: (value: boolean) => void;
  isVisable: boolean;
};

export default function CompaniesModal({
  companies,
  filteredCompanies,
  setFilteredCompanies,
  setIsFiltered,
  isVisable,
}: CompaniesModalProps) {
  const [positions, setPositions] = useState(POSITIONS);
  const [industry, setIndustry] = useState(INDUSTRIES);
  const [programmes, setProgrammes] = useState(PROGRAMS);
  const [location, setLocation] = useState(LOCATIONS);

  const [locationOpen, setLocationOpen] = useState(false);
  const [locationValue, setLocationValue] = useState<Locations[]>([]);

  const [positionOpen, positionSetOpen] = useState(false);
  const [positionValue, positionSetValue] = useState<Position[]>([]);

  const [industryOpen, industrySetOpen] = useState(false);
  const [industryValue, industrySetValue] = useState<Industry[]>([]);

  const [programmeOpen, programmeSetOpen] = useState(false);
  const [programmeValue, programmeSetValue] = useState<Programme[]>([]);

  const setSetFilteredCompanies = () => {
    filterCompanies();
    setIsFiltered(
      locationValue.length > 0 ||
        industryValue.length > 0 ||
        positionValue.length > 0 ||
        programmeValue.length > 0
    );
  };

  function resetFilters() {
    positionSetValue([]);
    industrySetValue([]);
    programmeSetValue([]);
    setLocationValue([]);
    setFilteredCompanies(companies);
  }
  function filterCompanies() {
    let filteredCompanies = companies;
    if (positionValue.length > 0) {
      filteredCompanies = filteredCompanies.filter((company) =>
        company.positions
          ? company.positions.some((position) =>
              positionValue.includes(position)
            )
          : false
      );
    }
    if (industryValue.length > 0) {
      filteredCompanies = filteredCompanies.filter((company) =>
        company.industries
          ? company.industries.some((industry) =>
              industryValue.includes(industry)
            )
          : false
      );
    }
    if (programmeValue.length > 0) {
      filteredCompanies = filteredCompanies.filter((company) =>
        company.desiredProgramme
          ? company.desiredProgramme.some((programme) =>
              programmeValue.includes(programme)
            )
          : false
      );
    }
    if (locationValue.length > 0) {
      filteredCompanies = filteredCompanies.filter(
        (company) =>
          locationValue.includes(companyLocations[company.id]) ?? false
      );
    }
    setFilteredCompanies(filteredCompanies);
  }


  if (!isVisable) {
    return null;
  }
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <CompanyListDivider text="Desired program"/>
        <CompanyCategoriesDropdown
          title="Desired program"
          items={programmes}
          setOpen={programmeSetOpen}
          setValue={programmeSetValue}
          open={programmeOpen}
          value={programmeValue}
          setItems={setProgrammes}
          filterCompanies={filterCompanies}
          filteredCompanies={filteredCompanies}
          itemFiltering={(company, value) => company.desiredProgramme?.includes(value) ?? false}
          onChangeValue={setSetFilteredCompanies}
          categories={false}
        />
      </View>
      <View style={styles.modalView}>
        <CompanyListDivider text="Position" style={{padding: 0}}/>
        <CompanyCategoriesDropdown
          title="Select position"
          items={positions}
          setOpen={positionSetOpen}
          setValue={positionSetValue}
          open={positionOpen}
          value={positionValue}
          setItems={setPositions}
          filterCompanies={filterCompanies}
          itemFiltering={(company, value) => (company.positions?.includes(value) ?? false)}
          filteredCompanies={filteredCompanies}
          onChangeValue={setSetFilteredCompanies}
          categories={false}
        />
      </View>
      <View style={styles.modalView}>
        <CompanyListDivider text="Industry" style={{padding: 0}} />
        <CompanyCategoriesDropdown
          title="Select industry"
          items={industry}
          setOpen={industrySetOpen}
          setValue={industrySetValue}
          open={industryOpen}
          value={industryValue}
          setItems={setIndustry}
          filterCompanies={filterCompanies}
          itemFiltering={(company, value) => (company.industries?.includes(value) ?? false)}
          filteredCompanies={filteredCompanies}
          onChangeValue={setSetFilteredCompanies}
          categories={false}
        />
      </View>
      <View style={styles.modalView}>
        <CompanyListDivider text="Location" style={{padding: 0}}/>
        <CompanyCategoriesDropdown
          title="Select location"
          items={location}
          setOpen={setLocationOpen}
          setValue={setLocationValue}
          open={locationOpen}
          value={locationValue}
          setItems={setLocation}
          filterCompanies={filterCompanies}
          itemFiltering={(company, value) => (locationValue.includes(companyLocations[company.id]) ?? false)} //Fixa!
          filteredCompanies={filteredCompanies}
          onChangeValue={setSetFilteredCompanies}
          categories={false}
        />
        <CompanyListDivider text="" style={{padding: 0}}/>
      </View>
      <View style={styles.footer}>
        <ArkadButton style={styles.button} onPress={resetFilters}>
          <ArkadText text="Reset filters" />
        </ArkadButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "flex-start",
    borderWidth: 0,
    borderColor: Colors.arkadTurkos,
    borderRadius: 15,
    padding: 16,
    margin: 0,
    width: "100%",
  },
  modalView: {
    justifyContent: "flex-start",
    borderRadius: 20,
    alignItems: "center",
  },
  footer: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    paddingTop: 16,
  },
  button: {
    margin: 0,
    padding: 15,
  },
});
