import React from 'react';
import { View, Text } from '../Themed';
import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { Guild, Student } from '../../api/students';

type StudentProfileProps = {
  student: Student;
}

export default function StudentProfile({ student }: StudentProfileProps) {
  return <>
    <View style={styles.container}>
      <Text style={styles.label}>Guild</Text>
      <Text style={styles.text}>{student.guild ? `${Guild[student.guild]}-Guild` : '\u2013'}</Text>

      <Text style={styles.label}>Year</Text>
      <Text style={styles.text}>{student.year ? student.year : '\u2013'}</Text>

      <Text style={styles.label}>Master</Text>
      <Text style={styles.text}>{student.masterTitle ? student.masterTitle : '\u2013'}</Text>

      <Text style={styles.label}>LinkedIn</Text>
      <Text style={styles.text}>{student.linkedIn ? student.linkedIn : '\u2013'}</Text>
    </View>
  </>;
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    fontFamily: 'montserrat',
    color: Colors.darkBlue,
  },
  text: {
    fontFamily: 'montserrat',
    color: Colors.darkBlue,
  },
});
