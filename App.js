import React from 'react';
import  { useState } from 'react';
import { View, Text, StyleSheet, FlatList,Image, TextInput,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { CATEGORIES, Livres } from './models/data';



// Étape 1: Créer des écrans (screens)
// onPress={() => navigation.navigate('Livres', { categorieId: item.id })}
const AccueilScreen = ({ navigation }) => {
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catégories</Text>
      <FlatList
        data={CATEGORIES}
        renderItem={(item) => {
          return(
            <Text style={styles.categoryItem} onPress={() => navigation.navigate('Livres', { categorieId: item.item.id })}>
            {item.item.genre}
          </Text>
          
  )}}
  />
 
    </View>
  );
};

const LivresScreen = ({ route }) => {
  const { categorieId } = route.params;

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const results = Livres.filter((livre) =>
      livre.titre.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(results);
  };

  // Filtrer les livres par catégorie
  const livresFiltres = Livres.filter(((item) => item.categorieId[0] === categorieId || item.categorieId[1] === categorieId));
  if (categorieId ==='c5') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Livres</Text>
        <FlatList
          data={Livres}
          renderItem={(item) => {
            return(
             <View style={styles.container}> 
              <Image source={{uri: item.item.imageUrl}} style={styles.ImageStyle}/>
              <Text style={styles.livreItem}>{item.item.titre} - {item.item.description}</Text>
             </View>
               )
          }
        }   
        />
      </View>
    );
  }else if (categorieId ==='c6') { 
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Livres</Text>
        <TextInput
          style={styles.input}
          placeholder="Rechercher par titre"
          value={searchText}
          onChangeText={setSearchText}
        />
         <View style ={styles.categoryItem}>
         <Button  title="Rechercher" onPress={handleSearch} />
         </View>
          <FlatList
          data={searchResults}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <Image source={{ uri: item.imageUrl }} style={styles.ImageStyle} />
              <Text style={styles.livreItem}>
                {item.titre} - {item.description}
              </Text>
            </View>
          )}
        />
    </View>
  );
  }else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Livres</Text>
        <FlatList
          data={livresFiltres}
          renderItem={(item) => {
            return(
             <View style={styles.container}> 
              <Image source={{uri: item.item.imageUrl}} style={styles.ImageStyle}/>
              <Text style={styles.livreItem}>{item.item.titre} - {item.item.description}</Text>
             </View>
               )
          }
        }   
        />
      </View>
    );
  }
  
};

// Étape 2: Créer un navigateur et configurer les écrans

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Accueil" component={AccueilScreen} />
        <Stack.Screen name="Livres" component={LivresScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    marginVertical: 10,
  },
  categoryItem: {
    fontSize: 30,
    marginBottom: 20,
    backgroundColor:'blue',
    alignContent:'center',
    textAlign:'center',
    color: '#FFF',
  },
  livreItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  ImageStyle: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    marginVertical: 20,
  },
  input: {
    width: '70%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default App;
