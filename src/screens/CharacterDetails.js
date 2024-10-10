import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import ButtonNewPage from "../components/ButtonNewPage";


const CharacterDetails = ({ route, navigation }) => {
  const { character } = route.params;

  const goToMovies = () => {
    navigation.navigate('Movies', { character });
  };

  const goToStarships = () => {
    navigation.navigate('Starships', { character });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{character.name}</Text>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.detail}>Altura: {character.height} cm</Text>
      <Text style={styles.detail}>Peso: {character.mass} kg</Text>
      <Text style={styles.detail}>Cor do Cabelo: {character.hair_color}</Text>
      <Text style={styles.detail}>Cor da Pele: {character.skin_color}</Text>
      <Text style={styles.detail}>Cor dos Olhos: {character.eye_color}</Text>
      <Text style={styles.detail}>Gênero: {character.gender}</Text>

      <View style={styles.buttonContainer}>
        <ButtonNewPage title="Filmes" onPress={goToMovies} />
        <ButtonNewPage title="Naves" onPress={goToStarships} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: GlobalStyles.colors.primaryBackground,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: '80%',
    height: '45%',
    marginBottom: 20,
    borderRadius: 8,
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default CharacterDetails;