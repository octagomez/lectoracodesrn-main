import { useState, useEffect } from "react";
import { Dimensions, Alert, Vibration } from "react-native";
import { Camera, CameraView, BarcodeScanningResult } from "expo-camera";
import { router } from "expo-router";
import * as Linking from "expo-linking";

const QRScanner: React.FC = () => {
  const [hasCameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [hasAudioPermission, setAudioPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const requestPermissions = async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const audioPermission = await Camera.requestMicrophonePermissionsAsync();

      setCameraPermission(cameraPermission.status === "granted");
      setAudioPermission(audioPermission.status === "granted");
    };

    requestPermissions();
  }, []);

  const handleBarCodeScanned = async ({ data }: BarcodeScanningResult) => {
    Vibration.vibrate();
    console.log("data", data);
  };

  if (hasCameraPermission && hasAudioPermission) {
    return (
      <CameraView
        onBarcodeScanned={handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "upc_e", "code128", "code39", "code93", "codabar"],
        }}
        style={{ height: Dimensions.get("window").height }}
      />
    );
  }

  return null;
};

export default QRScanner; 