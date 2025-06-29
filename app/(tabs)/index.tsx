import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';
import Colors from '../../shared/Colors';

export default function HomeTab() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      router.replace('/');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>স্বাগতম!</Text>
        <Text style={styles.subtitle}>
          {user?.displayName || user?.email}
        </Text>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>আপনার তথ্য:</Text>
          <Text style={styles.infoText}>নাম: {user?.displayName || 'নাম নেই'}</Text>
          <Text style={styles.infoText}>ই-মেইল: {user?.email}</Text>
          <Text style={styles.infoText}>UID: {user?.uid}</Text>
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>লগ আউট</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4D9FC',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: Colors.primary,
    marginBottom: 30,
    textAlign: 'center',
    opacity: 0.8,
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 8,
  },
  signOutButton: {
    backgroundColor: Colors.red,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  signOutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});