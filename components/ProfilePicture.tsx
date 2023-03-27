import React from 'react';
import { Image, StyleSheet } from 'react-native';

type ProfilePictureProps = {
  url: string | null;
}

export default function ProfilePicture({ url }: ProfilePictureProps) {
  return <>
    <Image 
        source={ url ? {uri: url} : require('../assets/images/icon.png')}
        defaultSource={require('../assets/images/icon.png')}
        style={styles.image}
    />
  </>;
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    resizeMode: 'cover',
  }
});
