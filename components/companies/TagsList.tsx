import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Industry, Position, PublicCompanyDto } from "api/Companies";

import Colors from "constants/Colors";
import { ArkadText } from "../StyledText";

export enum ShowOptions {
  All,
  Industries,
  Positions
}

type TagsListProps = {
  company: PublicCompanyDto,
  showOptions?: ShowOptions
  onlyFirst?: boolean
};

export const TagsList = ({ company, showOptions, onlyFirst }: TagsListProps) => {
  const allIndustries = company.industries ?? [];
  const industryTags = allIndustries.map((industry: Industry) => {
    return {
      text: Industry[industry],
      color: Colors.arkadOrange,
    };
  });
  const allPositions = company.positions ?? [];
  const positionTags = allPositions.map((position: Position) => {
    return {
      text: Position[position],
      color: Colors.arkadTurkos,
    };
  });


  let allTags;
  switch (showOptions) {
    case ShowOptions.Industries: {
      allTags = industryTags;
      break;
    }
    case ShowOptions.Positions: {
      allTags = positionTags;
      break;
    }
    default: {
      allTags = industryTags.concat(positionTags);
      break;
    }


  }

  if (onlyFirst) {
    allTags = allTags.slice(0, 1);
  }

  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        data={allTags}
        keyExtractor={(item) => item.text}
        renderItem={({ item: item }) => (
          <View style={{ ...styles.item, backgroundColor: item.color }}>
            <ArkadText style={styles.text} text={item.text} />
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    // padding: 5,
  },
  // item: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   // flex: 1,
  //   borderRadius: 20,
  //   margin: 3,
  //   paddingHorizontal: 12,
  //   // paddingVertical: 7,
  // },
  item: {
    height: "auto",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    
  },
  text: {
    color: Colors.white,
    fontSize: 18,
  },
});
