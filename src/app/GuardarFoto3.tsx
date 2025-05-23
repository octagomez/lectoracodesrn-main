/*
//Importar todo a la pantalla principal: 
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import CameraComponent from './components/CameraComponent';
import { deleteImage, uploadImage } from './components/ImageHandler';

export default function App() {
  const [imageUri, setImageUri] = useState(null);

  return (
    <View>
      <CameraComponent setImageUri={setImageUri} />
      {imageUri && (
        <>
          <Button title="Borrar Imagen" onPress={() => deleteImage(imageUri)} />
          <Button title="Subir Imagen" onPress={() => uploadImage(imageUri)} />
        </>
      )}
    </View>
  );
}
*/