/*
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

// Guardar la imagen en el almacenamiento interno
export const saveImage = async (imageUri) => {
  const directory = FileSystem.documentDirectory + 'photos/';
  await FileSystem.makeDirectoryAsync(directory, { intermediates: true }).catch(() => {});

  const filename = photo_${Date.now()}.jpg;
  const newPath = directory + filename;

  try {
    await FileSystem.moveAsync({ from: imageUri, to: newPath });
    console.log('Imagen guardada en:', newPath);
    return newPath;
  } catch (error) {
    console.error('Error al guardar la imagen:', error);
  }
};

// Borrar la imagen
export const deleteImage = async (imageUri) => {
  try {
    await FileSystem.deleteAsync(imageUri, { idempotent: true });
    console.log('Imagen eliminada:', imageUri);
  } catch (error) {
    console.error('Error al eliminar la imagen:', error);
  }
};

// Subir la imagen a una API
export const uploadImage = async (imageUri) => {
  let formData = new FormData();
  formData.append('photo', {
    uri: imageUri,
    name: 'photo.jpg',
    type: 'image/jpeg'
  });

  try {
    const response = await fetch('https://tu-api.com/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: formData
    });

    const result = await response.json();
    console.log('Imagen subida con éxito:', result);
  } catch (error) {
    console.error('Error al subir la imagen:', error);
  }
};
*/