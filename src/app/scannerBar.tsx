import { useState, useEffect } from "react";
import { Dimensions, Alert, Vibration, View, Text, StyleSheet, ScrollView } from "react-native";
import { Camera, CameraView, BarcodeScanningResult } from "expo-camera";
import { router } from "expo-router";
import * as Linking from "expo-linking";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const BarScanner: React.FC = () => {
  const [hasCameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [hasAudioPermission, setAudioPermission] = useState<boolean | null>(null);
  const [lastScannedCode, setLastScannedCode] = useState<string>("");
  const [scannedCodes, setScannedCodes] = useState<string[]>([]);

  useEffect(() => {
    const requestPermissions = async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const audioPermission = await Camera.requestMicrophonePermissionsAsync();

      setCameraPermission(cameraPermission.status === "granted");
      setAudioPermission(audioPermission.status === "granted");
    };

    requestPermissions();
  }, []);

  useEffect(() => {
    if (hasCameraPermission !== null && hasAudioPermission !== null) {
      // Check permissions and execute logic when both permissions are set
      if (!hasCameraPermission || !hasAudioPermission) {
        Alert.alert(
          "Camera Permissions Required",
          "You must grant access to your camera to scan codes",
          [
            { text: "Go to settings", onPress: goToSettings },
            {
              text: "Cancel",
              onPress: () => {
                router.dismissAll();
              },
              style: "cancel",
            },
          ]
        );
      }
    }
  }, [hasCameraPermission, hasAudioPermission]);

  const handleBarCodeScanned = async ({ data }: BarcodeScanningResult) => {
    Vibration.vibrate();
    
    // Ignorar si es el mismo código que el último escaneado
    if (data === lastScannedCode) {
      return;
    }

    // Actualizar el último código escaneado
    setLastScannedCode(data);
    
    // Agregar el nuevo código a la lista
    setScannedCodes(prevCodes => [data, ...prevCodes]);
  };

  const goToSettings = () => {
    Linking.openSettings();
  };

  if (hasCameraPermission && hasAudioPermission) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <CameraView
            onBarcodeScanned={handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["ean13", "ean8", "upc_e", "code128", "code39", "code93", "codabar", "datamatrix", "qr"],
            }}
            style={styles.camera}
          />
          <View style={styles.overlay}>
            <ScrollView style={styles.scrollView}>
              {scannedCodes.map((code, index) => (
                <View key={index} style={styles.codeItem}>
                  <Text style={styles.codeText}>{code}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return null; // Add explicit return for when permissions are not granted
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    height: Dimensions.get("window").height,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    maxHeight: '40%',
  },
  scrollView: {
    padding: 16,
  },
  codeItem: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  codeText: {
    fontSize: 16,
    color: 'black',
  },
});

export default BarScanner;
