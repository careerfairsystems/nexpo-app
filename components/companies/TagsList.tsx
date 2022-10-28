import React from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { Industry, Position, PublicCompanyDto } from '../../api/companies';

import { Event } from '../../api/events';
import Colors from '../../constants/Colors';
import { EventListItem } from '../eventList/EventListItem';
import { ArkadText } from '../StyledText';

type BookedEventListProps = {
  company: PublicCompanyDto,
}

export const TagsList = ({ company }: BookedEventListProps) => {
  //collect all industries and positions as strings from the company and create a list of all of them
  const allIndustries = company.industries?.map(industry => Industry[industry]) ?? [];
  const allPositions = company.positions?.map(position => Position[position]) ?? [];
  const allIndustriesAndPositions = [...allIndustries, ...allPositions];
  return(
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={allIndustriesAndPositions}
        keyExtractor={(item) => item}
        renderItem={({ item: item }) => 
          <View style={styles.item}>
            <ArkadText style={styles.text} text={item}/>
          </View>
        }
      />
    </View>)
}
  

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    item: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: Colors.orange,
      borderRadius: 10,
    },
    text: {
      color: Colors.white,
      fontSize: 16,
      padding: 10,
    }
  });
