import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
      },
      title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
      },
      error: {
        color: 'red',
        marginBottom: 10,
        fontSize: 13,
      },
      button: {
        backgroundColor: '#4A90E2',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
      },
      buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
      },
      link: {
        color: '#4A90E2',
        marginTop: 20,
        textAlign: 'center',
      },
});
