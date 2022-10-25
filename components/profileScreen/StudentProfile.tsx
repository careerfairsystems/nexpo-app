import React, { useCallback } from 'react';
import { View, Text } from '../Themed';
import { Linking, Pressable, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { Programme, Student } from '../../api/students';

type StudentProfileProps = {
  student: Student;
}

export default function StudentProfile({ student }: StudentProfileProps) {
  return <>
    <View style={styles.container}>
      <Text style={styles.label}>Programme</Text>
      <Text style={styles.text}>{student.programme ? `${Programme[student.programme]}-Programme` : '\u2013'}</Text>

      <Text style={styles.label}>Year</Text>
      <Text style={styles.text}>{student.year ? student.year : '\u2013'}</Text>

      <Text style={styles.label}>Master</Text>
      <Text style={styles.text}>{student.masterTitle ? student.masterTitle : '\u2013'}</Text>

      <Text style={styles.label}>LinkedIn</Text>
      {student.linkedIn ? 
      OpenURLButton(student.linkedIn) : 
      <Text style={styles.text}>{'\u2013'}</Text>}
    </View>
  </>;
}
const OpenURLButton = ( url: string ) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <Pressable onPress={handlePress} >
      <Text style={styles.url}>{url}</Text>
    </Pressable>
    );
};

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
  url: {
    fontFamily: 'montserrat',
    color: Colors.lightBlue,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
