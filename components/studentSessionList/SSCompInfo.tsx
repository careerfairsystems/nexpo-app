import { StyleSheet, Image } from 'react-native';

import { Text, View } from '../Themed';

import { PublicCompanyDto } from 'api/Companies'
import Colors from 'constants/Colors';


type CompanyDetailsScreenProps= {
  company: PublicCompanyDto;
}

export default function SSCompInfo({ company }: CompanyDetailsScreenProps) {

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image 
            source={company.logoUrl 
              ? {uri: company.logoUrl}
              : require('../../assets/images/icon.png')}
            defaultSource={require('../../assets/images/icon.png')}
            style={styles.logo} />
        </View>

        <Text style={styles.title}>{company?.name}</Text>

        <Text style={styles.descHeader}>About us</Text>
        <Text style={styles.desc}>{ company.description ? company.description : '\u2013'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    display: 'flex',
    flex: 1,
    padding: '8%',
    alignItems: 'center',
  },
  logoContainer: {
    paddingTop: 20,
    height: 120,
    width: '100%',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    marginTop: 24,
    paddingBottom: 8,
    fontSize: 32,
    fontFamily: 'main-font-bold',
    color: Colors.darkBlue,
  },
  contactInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 4,
  },
  contactInfoText: {
    fontSize: 18,
    paddingLeft: 8,
    fontFamily: 'main-font-bold',
    color: Colors.darkBlue,
  },
  descHeader: {
    alignSelf: 'center',
    textDecorationLine: 'underline',
    paddingTop: 16,
    fontSize: 22,
    fontFamily: 'main-font-bold',
    color: Colors.darkBlue,
  },
  desc: {
    paddingTop: 6,
    fontSize: 18,
    fontFamily: 'main-font-bold',
    color: Colors.darkBlue,
  },
});

