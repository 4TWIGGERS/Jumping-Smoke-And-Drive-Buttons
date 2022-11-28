import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import DriveAnimation from "./src/DriveAnimation";
import JumpingAnimation from "./src/JumpingAnimation";
import SmokeAnimation from "./src/SmokeAnimation";

const Colors = {
  sky: "#275efe",
  white: "#ffff",
  dark: "#363D51",
};

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <JumpingAnimation {...{ Colors }} />
      <SmokeAnimation {...{ Colors }} />
      <DriveAnimation {...{ Colors }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECEFFC",
    alignItems: "center",
    justifyContent: "center",
  },
});
