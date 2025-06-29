import { View, TextInput, Text, StyleSheet } from 'react-native';
import React from 'react';
import Colors from './../../shared/Colors';

const Input = ({
  label,
  onChangeText,
  placeholder,
  password = false,
  secureTextEntry = false,
  errorMessage,
  disabled = false,
  value,
  style,
  ...props
}) => {
  return (
    <View style={{ width: '100%' }}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Colors.primary}
        secureTextEntry={password || secureTextEntry}
        editable={!disabled}
        value={value}
        onChangeText={onChangeText}
        style={[
          {
            padding: 14,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: errorMessage ? Colors.red : Colors.primary,
            borderRadius: 10,
            fontSize: 18,
            marginTop: 15,
            width: '100%',
            backgroundColor: disabled ? '#f5f5f5' : 'white',
            color: disabled ? Colors.gray : Colors.primary,
          },
          style
        ]}
        {...props}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 5,
  },
  error: {
    color: Colors.red,
    fontSize: 14,
    marginTop: 5,
  },
});