import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from './../../shared/Colors';

const CustomAlert = ({ visible, onClose, massage, type = 'error' }) => {
  const isSuccess = type === 'success';
  
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.container, isSuccess && styles.successContainer]}>
          <Text style={[styles.message, isSuccess && styles.successMessage]}>
            {massage}
          </Text>
          <TouchableOpacity 
            onPress={onClose} 
            style={[styles.button, isSuccess && styles.successButton]}
          >
            <Text style={styles.buttonText}>ঠিক আছে</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 10,
    borderLeftWidth: 4,
    borderLeftColor: Colors.red,
  },
  successContainer: {
    borderLeftColor: Colors.green,
  },
  message: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  successMessage: {
    color: '#2d5a2d',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 5,
  },
  successButton: {
    backgroundColor: Colors.green,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});