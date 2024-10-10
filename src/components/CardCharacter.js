import React from 'react';
import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { GlobalStyles } from '../constants/styles';

const CharacterCard = ({ name, image, onPress }) => {
  const playSound = async () => {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(require('../../assets/sounds/sabreDeLuz.mp3'));
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log('Erro ao reproduzir o som:', error);
    }
  };

  const handlePress = () => {
    playSound();  
    onPress();   
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginBottom: 10,
    backgroundColor: GlobalStyles.colors.backgroundColor,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.1)', 
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CharacterCard;