import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Pressable,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import Colors from './../../shared/Colors';
import Button from './../../components/shared/Button';
import Input from './../../components/shared/Input';
import CustomAlert from './../../components/shared/Alert';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';

export default function SignUp() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'error' | 'success'>('error');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSignUp = async () => {
    let hasError = false;

    // Reset errors
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Validation
    if (!name.trim()) {
      setNameError('নাম আবশ্যক');
      hasError = true;
    }

    if (!email.trim()) {
      setEmailError('ই-মেইল আবশ্যক');
      hasError = true;
    } else if (!validateEmail(email.trim())) {
      setEmailError('বৈধ ই-মেইল ঠিকানা লিখুন');
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError('পাসওয়ার্ড আবশ্যক');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
      hasError = true;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError('পাসওয়ার্ড নিশ্চিত করুন');
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('পাসওয়ার্ড মিলছে না');
      hasError = true;
    }

    if (hasError) return;

    setIsLoading(true);

    try {
      const result = await signUp(email.trim(), password, name.trim());
      
      if (result.success) {
        setAlertType('success');
        setAlertMessage(result.message);
        setShowAlert(true);
        
        // Navigate to main app after successful registration
        setTimeout(() => {
          setShowAlert(false);
          router.replace('/(tabs)');
        }, 1500);
      } else {
        setAlertType('error');
        setAlertMessage(result.error);
        setShowAlert(true);
      }
    } catch (error) {
      setAlertType('error');
      setAlertMessage('একটি অপ্রত্যাশিত সমস্যা হয়েছে');
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
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
            type={alertType}
          />

          <Image
            source={require('./../../assets/images/ae.png')}
            style={styles.topCenterLogo}
          />
          <Text style={styles.title}>নিবন্ধন করুন</Text>
          <Text style={styles.subtitle}>আমাদের ব্যাবসায়ের কাজের জন্য</Text>

          <Input
            placeholder="আপনার নাম লিখুন"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (text.trim()) setNameError('');
            }}
            errorMessage={nameError}
          />

          <Input
            placeholder="ই-মেইল ঠিকানা"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (text.trim()) setEmailError('');
            }}
            errorMessage={emailError}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            placeholder="পাসওয়ার্ড"
            value={password}
            password={true}
            onChangeText={(text) => {
              setPassword(text);
              if (text.trim()) setPasswordError('');
            }}
            errorMessage={passwordError}
          />

          <Input
            placeholder="পাসওয়ার্ড নিশ্চিত করুন"
            value={confirmPassword}
            password={true}
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (text.trim()) setConfirmPasswordError('');
            }}
            errorMessage={confirmPasswordError}
          />

          <View style={styles.buttonContainer}>
            <Button
              title={isLoading ? "নিবন্ধন হচ্ছে..." : "নিবন্ধন"}
              onPress={onSignUp}
              disabled={isLoading}
            />

            {isLoading && (
              <ActivityIndicator 
                size="small" 
                color={Colors.primary} 
                style={styles.loadingIndicator}
              />
            )}

            <TouchableOpacity style={styles.loginPrompt}>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text style={styles.normalText}>ইতিমধ্যে একটি অ্যাকাউন্ট আছে?</Text>
                <Pressable onPress={() => router.push('/auth/SignIn')}>
                  <Text style={styles.loginLink}>লগ ইন</Text>
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
    top: 60,
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
  loadingIndicator: {
    marginTop: 10,
  },
  loginPrompt: {
    marginTop: 30,
    marginBottom: 10,
    alignItems: 'center',
  },
  normalText: {
    color: Colors.primary,
    fontSize: 16,
  },
  loginLink: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});