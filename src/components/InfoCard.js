import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../constants/styles';

const InfoCard = ({ title, subtitle, details }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {details.map((detail, index) => (
        <Text key={index} style={styles.detail}>
          {detail}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: GlobalStyles.colors.secondaryColor,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 5,
  },
  detail: {
    fontSize: 14,
    color: '#666',
  },
});

export default InfoCard;