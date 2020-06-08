import React, {useState, useEffect} from 'react';

import {StyleSheet, ImageBackground, View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import axios from 'axios';

import {Picker} from '@react-native-community/picker';

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const Home = () => {
  const navigation = useNavigation();

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  useEffect(() => {
    async function loadUf() {
      const {data} = await axios.get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      );
      const ufInitials = data.map((uf) => uf.sigla);
      setUfs(ufInitials);
    }

    loadUf();
  }, []);

  useEffect(() => {
    async function loadCities() {
      if (selectedUf === '0') {
        return;
      }

      const {data} = await axios.get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`,
      );
      const cityNames = data.map((city) => city.nome);
      setCities(cityNames);
    }

    loadCities();
  }, [selectedUf]);

  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      uf: selectedUf,
      city: selectedCity,
    });
  }
  return (
    <ImageBackground
      source={require('../../assets/home-background.png')}
      imageStyle={{width: 274, height: 368}}
      style={styles.container}>
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>
          Ajudamos pessoas a encontrarem pontos de coletas de forma eficiente.
        </Text>
      </View>

      <Picker
        selectedValue={selectedUf}
        style={styles.input}
        onValueChange={(itemValue) => {
          setSelectedUf(String(itemValue));
        }}>
        <Picker.Item key={0} label={'Selecione um estado'} value={0} />
        {ufs.map((uf) => (
          <Picker.Item key={uf} label={uf} value={uf} />
        ))}
      </Picker>

      <Picker
        selectedValue={selectedCity}
        style={styles.input}
        onValueChange={(itemValue) => {
          setSelectedCity(String(itemValue));
        }}>
        <Picker.Item key={0} label={'Selecione uma cidade'} value={0} />
        {cities.map((city) => (
          <Picker.Item key={city} label={city} value={city} />
        ))}
      </Picker>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleNavigateToPoints}
          disabled={selectedCity === '0' || selectedUf === '0' ? true : false}>
          <View style={styles.buttonIcon}>
            <Icon name="arrow-right" size={20} color="#fff" />
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu-Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto-Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    color: '#6C6C80',
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },
});

export default Home;
