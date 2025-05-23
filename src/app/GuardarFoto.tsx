/*
//Aca seria para manejar las funciones de guardado en la camara: 
import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
//import { saveImage } from '../components/ImageHandler'; // Importamos la función de guardado

// Guardar la imagen en el almacenamiento interno
export const saveImage = async (imageUri) => {
  const directory = FileSystem.documentDirectory + 'photos/';
  await FileSystem.makeDirectoryAsync(directory, { intermediates: true }).catch(() => {});

  const filename = photo_${Date.now()}.jpg;
  const newPath = directory + filename;

const CameraComponent = () => {
  const [photoUri, setPhotoUri] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  
  
  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      const savedUri = await saveImage(photo.uri);
      setPhotoUri(savedUri);
    }
  };

  return (
    <View>
      <Camera style={{ height: 400 }} ref={(ref) => setCameraRef(ref)} />
      <Button title="Tomar Foto" onPress={takePicture} />
      {photoUri && <Image source={{ uri: photoUri }} style={{ width: 100, height: 100 }} />}
    </View>
  );
};

export default CameraComponent;

*/