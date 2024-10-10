import React, { useEffect, useState } from 'react';
import { GlobalStyles } from '../constants/styles';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import CharacterCard from '../components/CardCharacter';

const Principal = ({ navigation }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://swapi.dev/api/people/');
        const characterData = response.data.results.slice(0, 10);
        
        const characterDataWithImages = characterData.map((character, index) => ({
          ...character,
          image: `https://starwars-visualguide.com/assets/img/characters/${index + 1}.jpg`, 
        }));
        
        setCharacters(characterDataWithImages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const renderCharacter = ({ item }) => (
    <CharacterCard
      name={item.name}
      image={item.image}
      onPress={() => navigation.navigate('CharacterDetails', { character: item })}/>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#183D3D" />
      ) : (
        <FlatList
          data={characters}
          keyExtractor={(item) => item.name}
          renderItem={renderCharacter}
          contentContainerStyle={styles.list}/>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: GlobalStyles.colors.primaryBackground,
  },
  list: {
    paddingBottom: 20,
  },
});

export default Principal;