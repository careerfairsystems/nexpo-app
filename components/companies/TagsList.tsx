import React from "react";
import { StyleSheet, View } from "react-native";
import { Industry, Position, PublicCompanyDto } from "api/Companies";

import Colors from "constants/Colors";
import { ArkadText } from "../StyledText";
import { Programme } from "api/Students";

export enum ShowOptions {
  All,
  Industries,
  Positions,
  DesiredProgrammes,
}

type TagsListProps = {
  company: PublicCompanyDto,
  showOptions?: ShowOptions,
};

export const TagsList = ({ company, showOptions }: TagsListProps) => {
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
  const allDesired = company.desiredProgramme ?? [];
  const desiredTags = allDesired.map((desired: Programme) => {
    return {
      text: Programme[desired].replaceAll("_", " "),
      color: Colors.arkadTurkos,
    }
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
    case ShowOptions.DesiredProgrammes: {
      allTags = desiredTags;
      break;
    }
    default: {
      allTags = industryTags.concat(positionTags);
      break;
    }


  }

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        {allTags.map((item, index) => {return (
          <View key={index} style={{ ...styles.item, backgroundColor: item.color }}>
            <ArkadText style={styles.text} text={item.text} />
          </View>
        )})}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    gap: 5,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start"
  },
  item: {
    height: "auto",
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 12,
    
  },
  text: {
    color: Colors.white,
    fontSize: 16,
  },
});
