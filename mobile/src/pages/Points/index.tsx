import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';

import MapView, {Marker} from 'react-native-maps';

import {SvgUri} from 'react-native-svg';

const Points = () => {
  const navigation = useNavigation();

  function handlenavigateBack() {
    navigation.goBack();
  }

  function handleNavigationToDetail() {
    navigation.navigate('Detail');
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlenavigateBack}>
        <Icon name="arrow-left" size={20} color="#34cb79" />
      </TouchableOpacity>
      <Text style={styles.title}>Bem vindo.</Text>
      <Text style={styles.description}>
        Encontre no mapa um ponto de coleta.
      </Text>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -27.2092052,
            longitude: -49.6401092,
            latitudeDelta: 0.014,
            longitudeDelta: 0,
          }}>
          <Marker
            style={styles.mapMarker}
            coordinate={{
              latitude: -27.2092052,
              longitude: -49.6401092,
            }}
            onPress={handleNavigationToDetail}>
            <View style={styles.mapMarkerContainer}>
              <Image
                style={styles.mapMarkerImage}
                source={{
                  uri:
                    'https://img.estadao.com.br/resources/jpg/8/8/1581881728288.jpg',
                }}
              />
              <Text style={styles.mapMarkerTitle}>Mercado</Text>
            </View>
          </Marker>
        </MapView>
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 20}}>
          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <SvgUri
              width={42}
              height={42}
              uri="http://192.168.0.12:3333/uploads/lampadas.svg"
            />
            <Text style={styles.itemTitle}>Lampadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <SvgUri
              width={42}
              height={42}
              uri="http://192.168.0.12:3333/uploads/lampadas.svg"
            />
            <Text style={styles.itemTitle}>Lampadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <SvgUri
              width={42}
              height={42}
              uri="http://192.168.0.12:3333/uploads/lampadas.svg"
            />
            <Text style={styles.itemTitle}>Lampadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <SvgUri
              width={42}
              height={42}
              uri="http://192.168.0.12:3333/uploads/lampadas.svg"
            />
            <Text style={styles.itemTitle}>Lampadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <SvgUri
              width={42}
              height={42}
              uri="http://192.168.0.12:3333/uploads/lampadas.svg"
            />
            <Text style={styles.itemTitle}>Lampadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <SvgUri
              width={42}
              height={42}
              uri="http://192.168.0.12:3333/uploads/lampadas.svg"
            />
            <Text style={styles.itemTitle}>Lampadas</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu-Bold',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto-Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80,
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto-Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});

export default Points;
