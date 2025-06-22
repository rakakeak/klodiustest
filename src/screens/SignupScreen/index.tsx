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

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

type SignupFormData = {
  name: string;
  email: string;
  password: string;
};

export default function SignupScreen({ navigation }: Props) {
  const { signup } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit = async ({ name, email, password }: SignupFormData) => {
    setLoading(true);
    try {
      await signup(name, email, password);
      navigation.replace('Home');
    } catch (err: any) {
      Alert.alert(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Sign Up</Text>

          <AuthInput
            control={control}
            name="name"
            label="Name"
            rules={{ required: 'Name is required' }}
          />
          {errors.name && (
            <Text style={styles.error}>{String(errors.name.message)}</Text>
          )}

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
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </Pressable>

          <TouchableOpacity
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              })
            }
          >
            <Text style={styles.link}>Already have an account? Log in</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
