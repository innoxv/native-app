// app/login.tsx
import { Link } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>

      <Link href="/" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Go back to Home</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    marginBottom: 60,
  },
  button: {
    backgroundColor: "white",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
  },
});