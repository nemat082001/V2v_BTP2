// Import necessary dependencies
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import MapView, { Marker } from 'react-native-maps';

const FormPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [imageSource, setImageSource] = useState(null);

  // Function to handle image selection
  const selectImage = () => {
    const options = {
      title: 'Select an Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.uri) {
        setImageSource(response.uri);
      }
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TextInput
          style={styles.descInput}
          placeholder="Description"
          onChangeText={(text) => setDescription(text)}
          value={description}
        />
        <TextInput
          style={styles.input}
          placeholder="Latitude"
          onChangeText={(text) => setLatitude(text)}
          value={latitude}
        />
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          onChangeText={(text) => setLongitude(text)}
          value={longitude}
        />
        <Button title="Select Image" onPress={selectImage} />
        {imageSource && (
          <Image source={{ uri: imageSource }} style={styles.image} />
        )}
        <MapView
          style={styles.map}
          region={{
            latitude: parseFloat(latitude) || 0,
            longitude: parseFloat(longitude) || 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(latitude) || 0,
              longitude: parseFloat(longitude) || 0,
            }}
            title="Location"
          />
        </MapView>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );

  // Function to handle form submission
  const handleSubmit = () => {
    
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  descInput: {
    height: 120,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  map: {
    height: 200,
    marginBottom: 10,
  },
});

export default FormPage;
