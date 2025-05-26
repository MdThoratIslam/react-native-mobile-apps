import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Pressable,
  Alert
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import Colors from './../../shared/Colors';
import Button from './../../components/shared/Button';
import Input from './../../components/shared/Input';
import CustomAlert from './../../components/shared/Alert';
import { useRouter } from 'expo-router';

export default function SignIn() {
  const router = useRouter();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [LoginIdentifier, setLoginIdentifier] = useState('');
  const [Password, setPassword] = useState('');

  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const onSignIn = () => {
    let hasError = false;

    if (!LoginIdentifier.trim()) {
        Alert.alert('Missing Information', 'ই-মেইল বা মোবাইল নম্বর আবশ্যক');
        setLoginError('মোবাইল নম্বর আবশ্যক');
        hasError = true;
    } else {
      setLoginError('');
    }
    if (!Password.trim()) {
        Alert.alert('Missing Information', 'পাসওয়ার্ড আবশ্যক');
        setPasswordError('পাসওয়ার্ড আবশ্যক');
        hasError = true;
    } else {
      setPasswordError('');
    }
    if (hasError) return;
    setAlertMessage('এই পেইজের কাজ চলছে, দয়া করে পরে আবার চেষ্টা করুন।');
    setShowAlert(true);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('./../../assets/images/ae.png')}
          resizeMode="contain"
        />

        <View style={styles.logoContainer}>
          <CustomAlert
            visible={showAlert}
            onClose={() => setShowAlert(false)}
            massage={alertMessage}
          />

          <Image
            source={require('./../../assets/images/ae.png')}
            style={styles.topCenterLogo}
          />

          <Text style={styles.title}>লগ ইন করুন</Text>
          <Text style={styles.subtitle}>আমাদের ব্যাবসায়ের কাজের জন্য</Text>

          <Input
            //label="মোবাইল নম্বর"
            placeholder="ই-মেইল/মোবাইল নম্বর"
            onChangeText={(text) => {
              setLoginIdentifier(text);
              if (text.trim()) setLoginError('');
            }}
            errorMessage={loginError}
          />

          <Input
            //label="পাসওয়ার্ড"
            placeholder="পাসওয়ার্ড"
            password={true}
            onChangeText={(text) => {
              setPassword(text);
              if (text.trim()) setPasswordError('');
            }}
            errorMessage={passwordError}
          />

          <View style={styles.buttonContainer}>
            <Button title="লগ ইন" onPress={onSignIn} />

            <TouchableOpacity style={styles.registerPrompt}>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text style={styles.normalText}>অ্যাকাউন্ট নেই?</Text>
                <Pressable onPress={() => router.push('/auth/SignUp')}>
                  <Text style={styles.registerLink}>নিবন্ধন করুন</Text>
                </Pressable>
              </View>
            </TouchableOpacity>
          </View>
        </View>
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
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  registerPrompt: {
    marginTop: 30,
    marginBottom: 10,
    alignItems: 'center',
  },
  normalText: {
    color: Colors.primary,
    fontSize: 16,
  },
  registerLink: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
