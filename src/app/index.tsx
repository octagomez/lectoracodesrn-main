import { View, Pressable, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

const Home: React.FC = () => {
  const startScan = () => {
    router.push("scannerBar");
  };

  const takePhoto = () => {
    router.push("takePhoto");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={startScan}>
          <Text style={styles.text}>Scan code</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={takePhoto}>
          <Text style={styles.text}>Take a Photo</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    gap: 16,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "black",
    width: '100%',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default Home;
