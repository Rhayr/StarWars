import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { GlobalStyles } from '../constants/styles';
import InfoCard from '../components/InfoCard';

const Movies = ({ route }) => {
  const { character } = route.params;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieUrls = character.films;
        if (movieUrls.length === 0) {
          setLoading(false);
          return;
        }

        const moviePromises = movieUrls.map(async (url) => {
          const movieResponse = await axios.get(url);
          return movieResponse.data;
        });

        const movieData = await Promise.all(moviePromises);
        setMovies(movieData);
      } catch (error) {
        console.error('Erro ao carregar filmes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [character]);

  const renderMovieItem = ({ item }) => (
    <InfoCard
      title={`Título: ${item.title}`}
      subtitle={`Diretor: ${item.director}`}
      details={[`Data de lançamento: ${item.release_date}`]}
    />
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#183D3D" />
      </View>
    );
  }

  if (movies.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Nenhum filme disponível para este personagem.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.url}
        renderItem={renderMovieItem}
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
});

export default Movies;