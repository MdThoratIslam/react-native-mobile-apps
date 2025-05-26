import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from './../../shared/Colors';

const Button = ({title, onPress}) => {
    return (
        <TouchableOpacity
        onPress={onPress}
        style={{
            backgroundColor: Colors.primary,
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
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
// This code defines a Button component in React Native. The button has a blue background, white text, and rounded corners. When pressed, it triggers the onPress function passed as a prop. The button's title is customizable through the title prop.
