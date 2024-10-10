import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../constants/styles';

const About = () => {

    const students = [
        { name: 'Bruno Silveira Serena Benevenuto dos Santos', ra:'1129601' ,email: 'brunosilveiraserena@gmail.com' },
        { name: 'Rhayra Rodrigues Fiorentin', ra:'1135147', email: 'rhayra.fiorentin@gmail.com' },
        { name: 'Stefano Augusto Mossi', ra: '1131685', email: 'stefanoaugustomossi@gmail.com' },
      ];


      return (
        <View style={styles.container}>

          <Text style={styles.centeredText}>Desenvolvido por:</Text>
    
          {students.map((student, index) => (
            <View key={index} style={styles.personContainer}>
              <Text style={styles.title}>Nome:</Text>
              <Text style={styles.content}>{student.name}</Text>
    
              <Text style={styles.title}>RA:</Text>
              <Text style={styles.content}>{student.ra}</Text>
    
              <Text style={styles.title}>E-mail:</Text>
              <Text style={styles.content}>{student.email}</Text>
            </View>
          ))}
    
          <Text style={[styles.centeredText, styles.footer]}>
            Desenvolvido para fins acadêmicos
          </Text>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: GlobalStyles.colors.primaryBackground,
      },
      personContainer: {
        marginVertical: 5,  
      },
      title: {
        fontWeight: 'bold', 
        textAlign: 'center', 
      },
      content: {
        textAlign: 'center', 
        marginBottom: 5, 
      },
      centeredText: {
        textAlign: 'center', 
        marginBottom: 10, 
      },
      footer: {
        marginTop: 20,
        color: '#93B1A6',
      },
    });
    
    export default About;