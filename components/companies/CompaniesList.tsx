import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  SectionList,
  StyleSheet,
} from "react-native";
import { PublicCompanyDto } from "api/Companies";
import { CompanyListItem } from "components/companies/CompanyListItem";
import CompanyListDivider from "./CompanyListDivider";
import { ArkadText } from "components/StyledText";

interface ICompanyGroup {
  [key: string]: PublicCompanyDto[];
}

type CompaniesListProps = {
    openCompanyDetails: (id: number) => void,
    onScrollBeginDrag: (event: NativeSyntheticEvent<NativeScrollEvent>) => void,
    sortedCompanies: PublicCompanyDto[] | null,
}


const groupCompanies = (array: PublicCompanyDto[] | null) => {
  if (!array) {
    return null;
  }

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



export default function CompaniesList({openCompanyDetails, onScrollBeginDrag, sortedCompanies}: CompaniesListProps) {
  const groupedCompanies = groupCompanies(sortedCompanies)

  if (!groupedCompanies) {
    return (
      <ArkadText text="No company found" />
    )
  }

  return (
    <SectionList
      sections={groupedCompanies}
      renderItem={({item}) => (
        <CompanyListItem company={item} onPress={() => openCompanyDetails(item.id)} />
      )}
      renderSectionHeader={({section: {title}}) => (
        <CompanyListDivider text={title} />
      )}
      onScrollBeginDrag={onScrollBeginDrag}
      style={styles.list}
    />
      
    );
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
    paddingHorizontal: 16,
    flexDirection: "column",
    paddingBottom: 16,
  },
});
