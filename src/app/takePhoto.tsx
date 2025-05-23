import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import React from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = "https://ocr.desarrollosia.com/upload"; // Reemplaza con tu URL del servidor socket.io

// Guardar la imagen en el almacenamiento interno
const saveImage = async (imageUri: string) => {
	const directory = FileSystem.documentDirectory + 'photos/';
	const filename = `photo_${Date.now()}.jpg`;
	const newPath = directory + filename;

	try {
		await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
		await FileSystem.moveAsync({ from: imageUri, to: newPath });
		
		// Guardar en la galería
		const { status } = await MediaLibrary.requestPermissionsAsync();
		if (status === 'granted') {
			await MediaLibrary.createAssetAsync(newPath);
			console.log('Imagen guardada en la galería y en:', newPath);
			return newPath;
		} else {
			console.log('Se necesitan permisos para guardar en la galería');
			return newPath;
		}
	} catch (error) {
		console.error('Error al guardar la imagen:', error);
		throw error;
	}
};

const TakePhoto: React.FC = () => {
	// Todos los Hooks deben estar aquí arriba
	const cameraRef = useRef<CameraView>(null);
	const [permission, requestPermission] = useCameraPermissions();
	const [notifications, setNotifications] = useState<any[]>([]);
	const [lastMessage, setLastMessage] = useState<string>('');
	const [apiResult, setApiResult] = useState<any>(null);
	const [socket, setSocket] = useState<any>(null);

	/*
	// useEffect para el socket
	useEffect(() => {
		const newSocket = socketIOClient(ENDPOINT);
		newSocket.emit('subscribe');
		
		newSocket.on('notification', (data: any) => {
			setNotifications(prev => [...prev, data]);
			setLastMessage(data.message || data);
		});

		return () => {
			newSocket.disconnect();
		};
	}, []);
    */
	if (!permission) {
		// Camera permissions are still loading.
		return <View />;
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet.
		return (
			<View style={styles.container}>
				<Text style={styles.message}>
					We need your permission to show the camera
				</Text>
				<Button onPress={requestPermission} title="grant permission" />
			</View>
		);
	}

	async function captureHandler() {
		try {
			const photo = await cameraRef.current?.takePictureAsync();
			if (photo) {
				const savedUri = await saveImage(photo.uri);
				console.log('Foto guardada en:', savedUri);

				const formData = new FormData();
				formData.append('file', {
					uri: savedUri,
					type: 'image/jpeg',
					name: 'photo.jpg'
				} as any);

				const response = await fetch('https://ocr.desarrollosia.com/upload', {
					method: 'POST',
					body: formData,
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				});

				if (response.ok) {
					const result = await response.json();
					setApiResult(result); // Actualizamos el estado con el resultado
				}
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	return (
		<View style={styles.container}>
			<CameraView ref={cameraRef} style={styles.camera} facing="back">
				{/* Mostrar resultado de la API */}
				{apiResult && (
					<View style={styles.resultContainer}>
						<Text style={styles.resultText}>
							Resultado: {JSON.stringify(apiResult)}
						</Text>
					</View>
				)}

				{/* Mostrar notificaciones */}
				<View style={styles.notificationsContainer}>
					<Text style={styles.notificationTitle}>Notificaciones</Text>
					<ScrollView style={styles.notificationsList}>
						{notifications.map((notification, index) => (
							<Text key={index} style={styles.notificationItem}>
								{notification.data}
							</Text>
						))}
					</ScrollView>
				</View>

				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button} onPress={captureHandler}>
						<Text style={styles.text}>Take Photo</Text>
					</TouchableOpacity>
				</View>
			</CameraView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	message: {
		textAlign: "center",
		paddingBottom: 10,
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "transparent",
		margin: 64,
	},
	button: {
		flex: 1,
		alignSelf: "flex-end",
		alignItems: "center",
	},
	text: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
	},
	notificationsContainer: {
		position: 'absolute',
		top: 40,
		left: 10,
		right: 10,
		backgroundColor: 'rgba(0,0,0,0.7)',
		padding: 10,
		borderRadius: 8,
	},
	notificationTitle: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
		textAlign: 'center',
	},
	notificationsList: {
		maxHeight: 200,
	},
	notificationItem: {
		color: 'white',
		fontSize: 14,
		marginVertical: 5,
		paddingHorizontal: 10,
	},
	resultContainer: {
		position: 'absolute',
		bottom: 150,
		left: 10,
		right: 10,
		backgroundColor: 'rgba(0,0,0,0.7)',
		padding: 10,
		borderRadius: 8,
	},
	resultText: {
		color: 'white',
		fontSize: 16,
		textAlign: 'center',
	},
});

export default TakePhoto;
