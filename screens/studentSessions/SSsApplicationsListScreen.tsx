import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { API } from '../../api';
import { SSTimeslot } from '../../api/studentsessions';
import { TimeslotList } from '../../components/studentSessionList/SSList';
import SSCompInfo from '../../components/studentSessionList/SSCompInfo';
import { SSsStackParamlist } from '../../navigation/BottomTabNavigator';
import { ArkadButton } from '../../components/Buttons';
import { ArkadText } from '../../components/StyledText';
import { PublicCompanyDto } from '../../api/companies/Companies';
import { ScrollView } from 'react-native-gesture-handler';
import { getMe, User } from '../../api/users/Users';
import { sendApplication } from '../../api/studentsessions';
import ScreenActivityIndicator from '../../components/ScreenActivityIndicator';

type SSsNavigation = {
    navigation: StackNavigationProp<
      SSsStackParamlist,
      'SSsApplicationsListScreen'
    >;
    route: {
      params: {
        companyId: number;
        companyName: string;
        timeslotId: number;
      };
    };

    
};



export default function SSsApplicationsListScreen({navigation, route}: SSsNavigation) {
    const companyId = route.params.companyId;
    const companyName = route.params.companyName;
    const [isLoading, setLoading] = React.useState<boolean>(true);
    const [company, setCompany] = React.useState< PublicCompanyDto | null>(null);

    const openSSsApplication = () => {
          navigation.navigate('SSsListScreen',{companyId , companyName});
    }

    return (
        <View>
        {isLoading 
          ? <ScreenActivityIndicator />
          : <View style={styles.container}>
              <div><h1>Här ska listan vara</h1></div>
            </View>
        }
      </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center'
    },
    button: {
      width: '60%',
      alignSelf: 'center',
    },
});
