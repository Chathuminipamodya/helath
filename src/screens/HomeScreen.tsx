import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import axios from 'axios';
import useStore from '../store/useStore';

type RootStackParamList = {
  Home: { username: string };
};

type HomeScreenProps = {
  route: RouteProp<RootStackParamList, 'Home'>;
};

interface HealthItem {
  id: string;
  title: string;
  description?: string;
  image?: string;
  category?: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ route }) => {
  const [healthData, setHealthData] = useState<HealthItem[]>([]);
  const { username } = route.params;
  const { clickCount, incrementClick } = useStore();

  useEffect(() => {
    fetchHealthData();
  }, []);

  const fetchHealthData = async () => {
    try {
      const response = await axios.get('https://api.sampleapis.com/health/recipes');
      setHealthData(response.data.slice(0, 10));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderItem = ({ item }: { item: HealthItem }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        incrementClick();
      }}
    >
      <Image
        source={{ uri: item.image??'https://via.placeholder.com/150' }}
        style={styles.cardImage}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.tagContainer}>
          <Text style={styles.tag}>{item.category??'General'}</Text>
        </View>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description??'No description available'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome, {username}!</Text>
      </View>
      <FlatList
        data={healthData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>{clickCount}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    color: '#666',
    fontSize: 14,
  },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  tag: {
    backgroundColor: '#E8F5E9',
    color: '#4CAF50',
    padding: 5,
    borderRadius: 5,
    fontSize: 12,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 15,
  },
});

export default HomeScreen;