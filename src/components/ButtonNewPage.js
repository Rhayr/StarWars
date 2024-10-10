import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { GlobalStyles } from '../constants/styles';

const ButtonNewPage = ({ title, onPress }) => {
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
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: GlobalStyles.colors.primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    color: GlobalStyles.colors.secondaryColor,
    fontSize: 16,
  },
});

export default ButtonNewPage;