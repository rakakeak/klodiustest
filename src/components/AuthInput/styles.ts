import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 16,
      },
      label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 6,
        color: '#333',
      },
      inputContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
      },
      passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
      },
      input: {
        fontSize: 16,
        paddingVertical: 8,
        color: '#000',
      },
      eyeIconWrapper: {
        padding: 8,
      },
      eyeIcon: {
        width: 18,
        height: 18,
      },
});
