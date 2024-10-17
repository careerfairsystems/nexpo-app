import React from 'react';
import { RenderListItemPropsInterface } from 'react-native-dropdown-picker';
import { TouchableOpacity, Text, StyleSheet, TextStyle } from 'react-native';
import Colors from 'constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'components/Themed';
import { PublicCompanyDto } from 'api/Companies';
import { ArkadText } from 'components/StyledText';


type RenderListItemProps<T> = {
  filteredCompanies: PublicCompanyDto[],
  itemFiltering: (company: PublicCompanyDto, value: any) => boolean,
} & RenderListItemPropsInterface<T>

export default function renderListItem ({ itemFiltering, filteredCompanies, item, label, value, onPress, isSelected, disabled, listItemLabelStyle, selectedItemLabelStyle }: RenderListItemProps<any>) {
    console.log("Label: ", label, " | Value: ", value, " | isSelected: ", isSelected, " | Disabled: ", disabled);

    const calculatedStyle = {...styles.label, ...(isSelected ? selectedItemLabelStyle as TextStyle : {})}; //Needed to circumvent type check error from ArkadText

    const filteredAmount = filteredCompanies.filter(company => itemFiltering(company, value)).length;

    return (
      <TouchableOpacity style={styles.container} onPress={(event) => {if (onPress) {onPress(item)}}} disabled={disabled}>
        <ArkadText style={calculatedStyle} text={label} />
        {isSelected
          ? (
            <View style={styles.tickIconContainer}>
              <Ionicons name="checkmark" style={styles.tickIcon} />
            </View>
          )
          : (<></>
            // <View style={styles.countBadge}>
            //   <ArkadText style={styles.countBadgeLabel} text={filteredAmount.toString()} />
            // </View>
          )
        }
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderBottomWidth: 0.5,    
    height: 54,
  },
  label: {
    color: Colors.white,
    fontSize: 18,
    flex: 1,
    textAlign: "left",
  },
  countBadge: {
    backgroundColor: Colors.lightGray,
    opacity: 0.3,
    width: 42,
    height: 28,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  countBadgeLabel: {
    fontSize: 16,
    color: Colors.gray,
    fontWeight: "bold",
  },
  tickIconContainer: {
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  tickIcon: {
    color: Colors.arkadTurkos,
    fontSize: 30,
  },
});