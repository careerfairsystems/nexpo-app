import {
  FlatList,
  Linking,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SectionList,
  StyleSheet,
} from "react-native";
import { View, Text } from "components/Themed";
import { PublicCompanyDto } from "api/Companies";
import { CompanyListItem } from "components/companies/CompanyListItem";
import Colors from "constants/Colors";
import { ArkadButton } from "components/Buttons";
import { ArkadText } from "components/StyledText";
import CompanyListDivider from "./CompanyListDivider";


interface ICompanyGroup {
  [key: string]: PublicCompanyDto[];
}

type CompaniesListProps = {
    onBeginScrollDrag: (event: NativeSyntheticEvent<NativeScrollEvent>) => void,
    navigation: any,
    sortedCompanies: any
} //FIXA


const groupCompanies = (array: PublicCompanyDto[]) => {
  let resultObj: ICompanyGroup = {};

  array.forEach(company => {
    let firstLetter = company.name[0].toUpperCase();
    firstLetter = firstLetter.replace(/\d/, "0-9")

    if (resultObj[firstLetter] === undefined) {
      resultObj[firstLetter] = [];      
    }

    resultObj[firstLetter].push(company);
    
  });

  return Object.entries(resultObj).map(([key, companies]) => ({
    title: key,
    data: companies,
  }))
}



export default function CompaniesList({onBeginScrollDrag, navigation, sortedCompanies}: CompaniesListProps) {
  const openCompanyDetails = (id: number) => {
      navigation.navigate("CompanyDetailsScreen", { id });
  };

  const groupedCompanies = groupCompanies(sortedCompanies)

  return (
    <SectionList
      sections={groupedCompanies}
      renderItem={({item}) => (
        <CompanyListItem company={item} onPress={() => openCompanyDetails(item.id)} />
      )}
      renderSectionHeader={({section: {title}}) => (
        <CompanyListDivider text={title} />
      )}
      // onScrollBeginDrag={(event) => console.log("hej")}
      // onScrollBeginDrag={modalVisible ? () => toggleFilter() : () => { }}
      onScrollBeginDrag={onBeginScrollDrag}
      style={styles.outerList}
    />
      
    );
}

const styles = StyleSheet.create({
  outerList: {
    width: "100%",
    paddingHorizontal: 16,
    flexDirection: "column",
    // gap: 24,
  },
  innerList: {
    flexDirection: "column",
    gap: 8,
  },
  accenture: {
    marginTop: 20,
    paddingBottom: 8,
    fontSize: 32,
    fontFamily: "main-font-bold",
    color: Colors.white,
  },
  accentureButton: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    margin: 8,
    marginBottom: 30,
    width: "50%",
  },
  accentureText: {
    fontFamily: "main-font-bold",
    fontSize: 20,
    color: Colors.white,
  },
});
