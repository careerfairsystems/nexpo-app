import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Industry, Position, PublicCompanyDto } from 'api/Companies';

import Colors from 'constants/Colors';
import { ArkadText } from '../StyledText';

type TagsListProps = {
  company: PublicCompanyDto,
}

export const TagsList = ({ company }: TagsListProps) => {
  const allIndustries = company.industries ?? [];
  const industryTags = allIndustries.map((industry: Industry) => {
    return {
      text: Industry[industry],
      color: Colors.arkadOrange,
    }
  }); 
  const allPositions = company.positions ?? [];
  const positionTags = allPositions.map((position: Position) => {
    return {
      text: Position[position],
      color: Colors.arkadTurkos,
    }
  });

  const allTags = industryTags.concat(positionTags);
  
  return(
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        data={allTags}
        keyExtractor={(item) => item.text}
        renderItem={({ item: item }) => 
          <View style={{...styles.item, backgroundColor: item.color }}>
            <ArkadText style={styles.text} text={item.text}/>
          </View>
        }
      />
    </View>)
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 20,
    margin:3,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  text: {
    color: Colors.white,
    fontSize: 18,
  }
});
