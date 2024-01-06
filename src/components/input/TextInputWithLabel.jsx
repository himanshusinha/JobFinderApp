import {View, TextInput, Image, TouchableOpacity, Text} from 'react-native';
import React, {useState} from 'react';
import images from '../../constants/images';
import styles from './styles';
import strings from '../../constants/strings';

const TextInputWithLabel = ({
  value,
  onChangeText,
  placeholder,
  label,
  labelStyle,
  autoCorrect,
  autoCapitalize,
  editable,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const isPasswordField = placeholder === strings.TITLE_PLACE_HOLDER_PASSWORD;

  return (
    <View style={styles.container}>
      {label && (
        <View style={{padding: 10, backgroundColor: 'red'}}>
          <Text style={labelStyle}>{label}</Text>
        </View>
      )}

      <View style={styles.inputStyle}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={isPasswordField && !isPasswordVisible}
          autoCorrect={autoCorrect}
          autoCapitalize={autoCapitalize}
          editable={editable}
        />
        {isPasswordField && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.eyeIconContainer}>
            <Image
              source={isPasswordVisible ? images.HIDE : images.SHOW}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TextInputWithLabel;
