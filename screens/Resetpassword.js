import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo icons
import { NavigationContainer } from '@react-navigation/native';
import { createStaticNavigation, useNavigation, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function ResetPassword({ navigation }) {
    const [accessCode, setAccessCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleReset = () => {
        // Add your reset password logic here
        console.log('Reset password');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Reset password</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Access code</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your code here"
                        value={accessCode}
                        onChangeText={setAccessCode}
                        placeholderTextColor="#888"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>New Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Place the password here"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry={!showNewPassword}
                            placeholderTextColor="#888"
                        />
                        <TouchableOpacity
                            onPress={() => setShowNewPassword(!showNewPassword)}
                            style={styles.eyeIcon}
                        >
                            <Ionicons
                                name={showNewPassword ? 'eye-outline' : 'eye-off-outline'}
                                size={24}
                                color="#888"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Confirm Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Place the password here"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showConfirmPassword}
                            placeholderTextColor="#888"
                        />
                        <TouchableOpacity
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={styles.eyeIcon}
                        >
                            <Ionicons
                                name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                                size={24}
                                color="#888"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.resetButton}
                    onPress={handleReset}
                >
                    <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(245, 245, 248, 1)',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a2b4b',
        marginBottom: 35,
        marginTop: 25,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,

    },
    inputLabel: {
        fontSize: 16,
        color: '#1a2b4b',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e1e1e1',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: 'rgb(255, 255, 255)'
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e1e1e1',
        borderRadius: 8,
        backgroundColor: 'rgb(255, 255, 255)'
    },
    passwordInput: {
        flex: 1,
        padding: 12,
        fontSize: 16,
    },
    eyeIcon: {
        padding: 10,
    },
    resetButton: {
        backgroundColor: 'rgba(24, 117, 195, 1)',
        borderRadius: 120,
        padding: 16,
        alignItems: 'center',
        marginTop: 20,
    },
    resetButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ResetPassword;