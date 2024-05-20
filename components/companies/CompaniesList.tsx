import {
  FlatList,
  Linking,
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
    modalVisible: any,
    toggleFilter: any,
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

  return Object.entries(resultObj);
}



export default function CompaniesList({modalVisible, toggleFilter, navigation, sortedCompanies}: CompaniesListProps) {
  const openCompanyDetails = (id: number) => {
      navigation.navigate("CompanyDetailsScreen", { id });
  };


  const groupedCompanies = groupCompanies(sortedCompanies)
  

return (
  <FlatList
    style={styles.outerList}
    data={groupedCompanies}
    keyExtractor={(companyGroup) => companyGroup[0]}
    onScrollBeginDrag={modalVisible ? () => toggleFilter() : () => { }}
    
    renderItem={({ item: group}) => {
      console.log(group[0])

      return (
        <>
        <CompanyListDivider text={group[0]}/>
        <FlatList
          style={styles.innerList}
          data={group[1]}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item: company }) => {
          if (company.name === "Accenture") {
              return (
              <View>
                  <ArkadText
                  text={"Corporate Partner"}
                  style={styles.accenture}
                  />
                  <CompanyListItem
                  company={company}
                  onPress={() => openCompanyDetails(company.id)}
                  />
                  <ArkadButton
                  onPress={() =>
                      Linking.openURL("https://www.accenture.com/se-en")
                  }
                  style={styles.accentureButton}
                  >
                  <Text style={styles.accentureText}>Link to Accenture</Text>
                  </ArkadButton>
              </View>
              );
          } else {
              return (
              <CompanyListItem
                  company={company}
                  onPress={() => openCompanyDetails(company.id)}
              />
              );
          }
          }}
      />
      </>)
    }}
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
