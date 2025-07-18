import React, { useEffect } from 'react';
import {StyleSheet,View,Text,Image,ImageBackground,Dimensions} from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Colors from './../shared/Colors';
import Button from './../components/shared/Button';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export default function Index() {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
      if (!loading && user) {
        // If user is already logged in, redirect to main app
        router.replace('/(tabs)');
      }
    }, [user, loading]);

    if (loading) {
      return (
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <Text style={styles.loadingText}>লোড হচ্ছে...</Text>
          </SafeAreaView>
        </SafeAreaProvider>
      );
    }

    // Only show welcome screen if user is not logged in
    if (user) {
      return null; // Will redirect in useEffect
    }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Background image */}
        <ImageBackground
          style={styles.backgroundImage}
          source={require('./../assets/images/ae.png')}
          resizeMode="contain"
        />

        {/* Logo + Title centered at top */}
        <View style={styles.logoContainer}>
          <Image
            source={require('./../assets/images/ae.png')}
            style={styles.topCenterLogo}
          />
          <Text style={styles.title}>Alayna Enterprise</Text>
          <Text style={styles.subtitle}>
            আমাদের ব্যাবসায়ের কাজের জন্য
          </Text>
        </View>

       <Button title="Get Started" onPress={() => router.push('/auth/SignIn')} />

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// Shared shadow style
const shadowStyle = {
  shadowColor: '#E4D9FC',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 5,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4D9FC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backgroundImage: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    borderRadius: 10,
    backgroundColor: '#0707075e',
    opacity: 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: 80,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  topCenterLogo: {
    width: 120,
    height: 120,
    borderRadius: 40,
    borderColor: '#FFF0F5',
    opacity: 0.8,
    marginBottom: 8,
    ...shadowStyle,
  },
  title: {
    color: Colors.primary,
    fontSize: 30,
    lineHeight: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginHorizontal: 20,
    fontSize: 14,
    color: Colors.primary,
    marginTop: 10,
    opacity: 0.8,
  },
  loadingText: {
    fontSize: 18,
    color: Colors.primary,
    textAlign: 'center',
  },
});