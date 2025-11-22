// app/index.tsx
import { Link } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";

export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.inner}>
        {/* Logo */}
        <Image
          source={{ uri: "https://via.placeholder.com/150/6366f1/ffffff?text=LOGO" }}
          style={styles.logo}
        />

        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Start your journey with us today</Text>

        {/* Email */}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          placeholderTextColor="rgba(255,255,255,0.7)"
        />

        {/* Password */}
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="rgba(255,255,255,0.7)"
        />

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign Up Free</Text>
        </TouchableOpacity>

        {/* Links */}
        <View style={styles.linksContainer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Link href="/login" style={styles.linkText}>
            Log in
          </Link>
        </View>

        <Text style={styles.terms}>
          By signing up you agree to our Terms & Privacy
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4f46e5", // Indigo fallback
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  logo: {
    width: 128,
    height: 128,
    borderRadius: 32,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    marginBottom: 48,
  },
  input: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 20,
    color: "white",
    fontSize: 18,
    marginBottom: 16,
  },
  button: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 16,
    paddingVertical: 20,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#6366f1",
    fontWeight: "bold",
    fontSize: 20,
  },
  linksContainer: {
    flexDirection: "row",
    marginTop: 32,
    alignItems: "center",
  },
  footerText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 16,
  },
  linkText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  terms: {
    position: "absolute",
    bottom: 50,
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    textAlign: "center",
    left: 32,
    right: 32,
  },
});