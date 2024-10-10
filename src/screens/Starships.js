import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { GlobalStyles } from '../constants/styles';

const Starships = ({ route }) => {
  const { character } = route.params; 

  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStarships = async () => {
      try {
        const starshipUrls = character.starships;
        
        if (starshipUrls.length === 0) {
          setLoading(false);
          return;
        }
        
        const starshipPromises = starshipUrls.map(async (url) => {
          const starshipResponse = await axios.get(url);
          return starshipResponse.data;
        });

        const starshipData = await Promise.all(starshipPromises);
        setStarships(starshipData);
      } catch (error) {
        console.error('Erro ao carregar naves:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStarships();
  }, [character]);

  const renderStarshipItem = ({ item }) => (
    <View style={styles.starshipItem}>
      <Text style={styles.name}>Nome: {item.name}</Text>
      <Text style={styles.model}>Modelo: {item.model}</Text>
      <Text style={styles.passengers}>Passageiros: {item.passengers}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#183D3D" />
      </View>
    );
  }

  if (starships.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Nenhuma nave disponível para este personagem.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={starships}
        keyExtractor={(item) => item.url}
        renderItem={renderStarshipItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: GlobalStyles.colors.primaryBackground,
    justifyContent: 'center',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    color: GlobalStyles.colors.primaryText,
  },
  starshipItem: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  model: {
    fontSize: 16,
    marginVertical: 5,
  },
  passengers: {
    fontSize: 14,
    color: '#666',
  },
});

export default Starships;