import {StyleSheet,View, Text, Image,TouchableOpacity,ImageBackground,Dimensions, Pressable} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import React, { useState } from 'react';

import Colors from './../../shared/Colors';
import Button from './../../components/shared/Button';
import Input from './../../components/shared/Input';
import CustomAlert from './../../components/shared/Alert';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../services/FirebaseConfig'; // Adjust the import path as necessary




export default function SignIn()
{
     const router = useRouter();
       const [showAlert, setShowAlert] = useState(false);

    // const [mobileNumber, setMobileNumber] = React.useState('');
     const onSignIn = () => {
         // Handle sign-in logic here
         createUserWithEmailAndPassword(auth, email, password)
           .then((userCredential) => {
             // Signed up
             const user = userCredential.user;
             // ...
           })
           .catch((error) => {
             const errorCode = error.code;
             const errorMessage = error.message;
             // ..
           });
         router.push('/');
     };
    return (
        <SafeAreaProvider>
              <SafeAreaView style={styles.container}>
                {/* Background image */}
                <ImageBackground
                  style={styles.backgroundImage}
                  source={require('./../../assets/images/ae.png')}
                  resizeMode="contain"
                />

                {/* Logo + Title centered at top */}
                <View style={styles.logoContainer}>
                  <Image
                    source={require('./../../assets/images/ae.png')}
                    style={styles.topCenterLogo}
                  />
                  <Text style={styles.title}>নিবন্ধন করুন </Text>
                  <Text
                  style={{
                          textAlign: 'center',
                          marginHorizontal: 20,
                          fontSize: 14,
                          color: Colors.primary,
                          marginTop: 10,
                          opacity:0.8
                      }}
                  >আমাদের ব্যাবসায়ের কাজের জন্য</Text>
                   <Input
                   label="মোবাইল নম্বর"
                   disabled={true}
                   placeholder="আপনার মোবাইল নম্বর লিখুন"

                    />
                    <Input
                      label="পাসওয়ার্ড"
                      disabled={true}
                      placeholder="আপনার পাসওয়ার্ড লিখুন"
                      password={true} // ← this works only if secureTextEntry isn't passed
                    />

                    <View style={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 20,
                        marginBottom: 20,
                        }}>
                        <Button
                           title="নিবন্ধন"
                           onPress={() => setShowAlert(true)}
                         />
                         <CustomAlert
                         visible={showAlert}
                         onClose={() => setShowAlert(false)}
                          massage="এই পেইজের কাজ চলছে, দয়া করে পরে আবার চেষ্টা করুন।"
                          />
                           <TouchableOpacity
                                onPress={() =>
                                    onSignIn()
                                    }
                               style={{

                                   marginTop: 30,
                                   marginBottom: 10,
                                   alignItems: 'center',
                               }}>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                  <Text style={{ color: Colors.primary, fontSize: 16 }}>
                                    ইতিমধ্যে একটি অ্যাকাউন্ট আছে?
                                  </Text>
                                  <Pressable onPress={() => router.push('/auth/SignIn')}>
                                    <Text style={{ color: Colors.primary, fontSize: 16, fontWeight: 'bold', marginLeft: 5 }}>
                                      লগ ইন
                                    </Text>
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
      //borderWidth: 2,
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
});
