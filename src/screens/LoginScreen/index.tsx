import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import AuthInput from '../../components/AuthInput';
import { useAuth } from '../../context/AuthContext';
import { RootStackParamList } from '../../navigation';
import { emailRules, passwordRules } from '../../utils/validationRules';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginScreen({ navigation }: Props) {
  const { login } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      Alert.alert(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Login</Text>

          <AuthInput
            control={control}
            name="email"
            label="Email"
            rules={emailRules}
          />
          {errors.email && (
            <Text style={styles.error}>{String(errors.email.message)}</Text>
          )}

          <AuthInput
            control={control}
            name="password"
            label="Password"
            rules={passwordRules}
            isPassword
          />
          {errors.password && (
            <Text style={styles.error}>{String(errors.password.message)}</Text>
          )}

          <Pressable
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </Pressable>

          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.link}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
