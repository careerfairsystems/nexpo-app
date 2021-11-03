import React from 'react';
import { UpdateStudentDto, Student, Guild } from '../../api/students';
import { View, Text } from '../Themed';
import { StyleSheet } from 'react-native';
import { TextInput } from '../TextInput';
import { EditStatus } from '../../screens/EditProfileScreen';
import { Picker } from '@react-native-picker/picker';

type EditStudentProfileProps = {
  student: Student;
  setUpdateStudentDto: (dto: UpdateStudentDto) => void;
  setEditStatus: (status: EditStatus) => void;
}

export default function EditStudentProfile({ student, setUpdateStudentDto, setEditStatus }: EditStudentProfileProps) {
  const [guild, setGuild] = React.useState<Guild | null>(student.guild);
  const [year, setYear] = React.useState<number | null>(student.year);
  const [masterTitle, setMasterTitle] = React.useState<string | null>(student.masterTitle);
  const [linkedIn, setLinkedIn] = React.useState<string | null>(student.linkedIn);

  React.useEffect(() => {
    const dto = {
      guild,
      year,
      masterTitle,
      linkedIn,
    }
    setUpdateStudentDto(dto);

  }, [guild, linkedIn, masterTitle, year])

  return <>
    <View style={styles.container}>
      <Text>Guild</Text>
      <Picker
        style={styles.picker}
        selectedValue={guild}
        onValueChange={(value, index) => {
          if (index === 0) setGuild(null);
          else setGuild(Number(value));
        }}>
        <Picker.Item label="Select your guild"/>
        {Object.keys(Guild).map(Number).filter(key => !isNaN(key)).map(guild =>
          <Picker.Item label={Guild[guild]} value={guild} />
        )}
      </Picker>

      <Text>Year</Text>
      <Picker
        style={styles.picker}
        selectedValue={year}
        onValueChange={(value, index) => {
          if (index === 0) setYear(null);
          else setYear(Number(value));
        }}>
        <Picker.Item label="Select a year"/>
        <Picker.Item label="1" value={1} />
        <Picker.Item label="2" value={2} />
        <Picker.Item label="3" value={3} />
        <Picker.Item label="4" value={4} />
        <Picker.Item label="5" value={5} />
      </Picker>

      <Text>Master Title</Text>
      <TextInput value={masterTitle ? masterTitle : ''} onChangeText={setMasterTitle}/>

      <Text>LinkedIn</Text>
      <TextInput value={linkedIn ? linkedIn : ''} onChangeText={setLinkedIn}/>
    </View>
  </>;
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  picker: {
    width: 200,
    padding: 8,
  }
});
