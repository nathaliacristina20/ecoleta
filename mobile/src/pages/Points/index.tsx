import React, {useState, useEffect, useCallback} from 'react';

import {useNavigation, useRoute} from '@react-navigation/native';

import Geolocation from 'react-native-geolocation-service';

import Icon from 'react-native-vector-icons/Feather';

import MapView, {Marker} from 'react-native-maps';
import {SvgUri} from 'react-native-svg';
import api from '../../services/api';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  Alert,
  PermissionsAndroid,
} from 'react-native';

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface Point {
  id: number;
  image: string;
  name: string;
  latitude: string;
  longitude: string;
  items: {
    title: string;
  };
}

interface Params {
  uf: string;
  city: string;
}

const Points = () => {
  const navigation = useNavigation();

  const [items, setItems] = useState<Item[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    async function loadPosition() {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permissão de Localização',
          message: 'A aplicação precisa da permissão de localização.',
          buttonPositive: 'Ok',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (pos) => {
            setInitialPosition([pos.coords.latitude, pos.coords.longitude]);
          },
          (error) => {
            Alert.alert('Houve um erro ao pegar a latitude e longitude.');
          },
        );
      } else {
        Alert.alert('Permissão de localização não concedida');
      }

      /* const {status} = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Oooops...',
          'Precisamos de sua permissao para obter a localizacao',
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync();

      const {latitude, longitude} = location.coords;

      setInitialPosition([latitude, longitude]); */
    }
    loadPosition();
  }, []);

  useEffect(() => {
    async function loadItems() {
      const response = await api.get('items');

      setItems(response.data);
    }
    loadItems();
  }, []);

  useEffect(() => {
    async function loadPoints() {
      const response = await api.get('points', {
        params: {
          city: routeParams.city,
          uf: routeParams.uf,
          items: selectedItems,
        },
      });

      setPoints(response.data);
    }
    loadPoints();
  }, [routeParams, selectedItems]);

  const handlenavigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSelectItem = useCallback(
    (itemId: number) => {
      const alreadySelected = selectedItems.findIndex(
        (item) => item === itemId,
      );

      if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter((item) => item !== itemId);
        setSelectedItems(filteredItems);
      } else {
        setSelectedItems([...selectedItems, itemId]);
      }
    },
    [selectedItems],
  );

  const handleNavigationToDetail = useCallback(
    (id: number) => {
      navigation.navigate('Detail', {point_id: id});
    },
    [navigation],
  );

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
        {initialPosition[0] !== 0 && (
          <MapView
            loadingEnabled={initialPosition[0] === 0}
            style={styles.map}
            initialRegion={{
              latitude: initialPosition[0],
              longitude: initialPosition[1],
              latitudeDelta: 0.014,
              longitudeDelta: 0,
            }}>
            {points.map((point) => (
              <Marker
                key={String(point.id)}
                style={styles.mapMarker}
                coordinate={{
                  latitude: Number(point.latitude),
                  longitude: Number(point.longitude),
                }}
                onPress={() => handleNavigationToDetail(point.id)}>
                <View style={styles.mapMarkerContainer}>
                  <Image
                    style={styles.mapMarkerImage}
                    source={{
                      uri: point.image,
                    }}
                  />
                  <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                </View>
              </Marker>
            ))}
          </MapView>
        )}
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 20}}>
          {items.map((item) => (
            <TouchableOpacity
              key={String(item.id)}
              style={[
                styles.item,
                String(selectedItems).includes(String(item.id))
                  ? styles.selectedItem
                  : {},
              ]}
              onPress={() => handleSelectItem(item.id)}
              activeOpacity={0.6}>
              <SvgUri width={42} height={42} uri={item.image_url} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
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
