import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from './../../shared/Colors';

const Button = ({title, onPress, disabled = false}) => {
    return (
        <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={{
            backgroundColor: disabled ? Colors.gray : Colors.primary,
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
            opacity: disabled ? 0.6 : 1,
        }}
        >
        <Text
            style={{
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: 'bold',
            }}
        >
            {title}
        </Text>
        </TouchableOpacity>
    );
    }
export default Button;