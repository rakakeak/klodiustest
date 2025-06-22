import React, { memo, useCallback, useState } from 'react';
import {
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { HIDE_EYE, SHOW_EYE } from '../../assets/icon';
import { styles } from './styles';

interface AuthInputProps<T extends FieldValues> {
  control: any;
  name: FieldPath<T>;
  label: string;
  rules?: RegisterOptions<T, FieldPath<T>>;
  isPassword?: boolean;
}

function AuthInput<T extends FieldValues>({
  control,
  name,
  label,
  rules,
  isPassword = false,
}: AuthInputProps<T>) {
  const [secure, setSecure] = useState(isPassword);
  const toggleSecure = useCallback(() => setSecure(prev => !prev), []);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={isPassword ? styles.passwordContainer : styles.inputContainer}
      >
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              style={[styles.input, isPassword && { flex: 1 }]}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              secureTextEntry={secure}
              autoCapitalize="none"
              placeholder={label}
            />
          )}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={toggleSecure}
            style={styles.eyeIconWrapper}
          >
            <Image
              source={secure ? HIDE_EYE : SHOW_EYE}
              style={styles.eyeIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default memo(AuthInput);
