import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    ScrollView
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStaticNavigation, useNavigation,} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../Welcome';  // Adjust path as needed
import Login from './Login';

function Register({ navigation }) {    

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const validatePassword = (password) => {
        const conditions = [
            { met: password.length >= 8, text: 'At least 8 characters' },
            { met: /[a-z]/.test(password) && /[A-Z]/.test(password), text: 'Both uppercase and lowercase characters' },
            { met: /[0-9!@#$%^&*(),.?":{}|<>]/.test(password), text: 'At least one number or symbol' },
        ];
        return conditions;
    };

    // const InsertRecord = () => {
    //     navigation.navigate(Stack);
    // };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.content}>
                    <Text style={styles.title}>Create an account</Text>

                    {/* Full Name Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Full Name</Text>
                        <View style={styles.inputWrapper}>
                            <Feather name="user" size={20} color="#666" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your name"
                                value={formData.fullName}
                                onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                            />
                        </View>
                    </View>

                    {/* Email Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>E-mail</Text>
                        <View style={styles.inputWrapper}>
                            <Feather name="mail" size={20} color="#666" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your e-mail here"
                                keyboardType="email-address"
                                value={formData.email}
                                onChangeText={(text) => setFormData({ ...formData, email: text })}
                            />
                        </View>
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.inputWrapper}>
                            <Feather name="lock" size={20} color="#666" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Place the password here"
                                secureTextEntry={!showPassword}
                                value={formData.password}
                                onChangeText={(text) => setFormData({ ...formData, password: text })}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Feather
                                    name={showPassword ? "eye" : "eye-off"}
                                    size={20}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Password Requirements */}
                        <View style={styles.requirements}>
                            {validatePassword(formData.password).map((condition, index) => (
                                <View key={index} style={styles.requirementRow}>
                                    <Feather
                                        name={condition.met ? "check-circle" : "x-circle"}
                                        size={16}
                                        color={condition.met ? "#4CAF50" : "#FF3B30"}
                                    />
                                    <Text style={[styles.requirementText,
                                    { color: condition.met ? "#4CAF50" : "#FF3B30" }]}>
                                        {condition.text}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Terms and Conditions */}
                    <TouchableOpacity
                        style={styles.termsContainer}
                        onPress={() => setAcceptedTerms(!acceptedTerms)}
                    >
                        <View style={styles.checkbox}>
                            {acceptedTerms && <Feather name="check" size={14} color="#0066CC" />}
                        </View>
                        <Text style={styles.termsText}>
                            By continuing you accept our Privacy Policy and Term of Use
                        </Text>
                    </TouchableOpacity>

                    {/* Sign Up Button */}
                    <TouchableOpacity
                        style={[styles.signUpButton,
                        { opacity: acceptedTerms ? 1 : 0.5 }]}
                        disabled={!acceptedTerms}
                    >
                        <Text style={styles.signUpText}>Sign Up</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: -10 }}>
                        <View
                            style={{
                                flex: 1,
                                height: 1,
                                backgroundColor: '#CCCCCC',
                                marginHorizontal: 10
                            }}
                        />
                        <Text style={{ fontSize: 14 }}>Or</Text>
                        <View
                            style={{
                                flex: 1,
                                height: 1,
                                backgroundColor: '#CCCCCC',
                                marginHorizontal: 10
                            }}
                        />
                    </View>
                    {/* Login Link */}
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.loginLink}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(245, 245, 248, 1)',
    },
    content: {
        padding: 24,
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#1B1B1B',
        marginBottom: 25,
        marginTop: 65,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 48,
        backgroundColor: 'rgb(255, 255, 255)'

    },
    icon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: 'black',
        backgroundColor: 'rgb(255, 255, 255)',
    },
    requirements: {
        marginTop: 12,
    },
    requirementRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    requirementText: {
        marginLeft: 8,
        fontSize: 12,
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#0066CC',
        borderRadius: 4,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    termsText: {
        flex: 1,
        fontSize: 14,
        color: '#666',
    },
    signUpButton: {
        backgroundColor: 'rgba(24, 117, 195, 1)',
        borderRadius: 120,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    signUpText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 14,
        color: '#666',
    },
    loginLink: {
        fontSize: 14,
        color: '#0066CC',
        fontWeight: '600',
    },
});

export default Register;