import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { GlobalStyles } from '../constants/styles';

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
    <View style={styles.movieItem}>
      <Text style={styles.title}>Título: {item.title}</Text>
      <Text style={styles.director}>Diretor: {item.director}</Text>
      <Text style={styles.releaseDate}>Data de lançamento: {item.release_date}</Text>
    </View>
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
  movieItem: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  director: {
    fontSize: 16,
    marginVertical: 5,
  },
  releaseDate: {
    fontSize: 14,
    color: '#666',
  },
});

export default Movies;