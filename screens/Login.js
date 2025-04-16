import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Modal,
    Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import ApiServer from './../Services/ApiServer';

function Login({ navigation }) {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        resetEmail: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [resetEmail, setResetEmail] = useState('');

    const handleResetPassword = () => {
        navigation.navigate('ResetPassword')
    };

    const login = () => {
        navigation.navigate('EnterActivityTime');

        // const endpoint = '/api/auth/login';

        // const body = {
        //     username: formData.email,
        //     password: formData.password,
        // }

        // ApiServer.call(endpoint, 'POST', body)
        //     .then(data => {
        //         if (data.message == "Login successful") {
        //             navigation.navigate('BottomTabNavigation');
        //             Alert.alert('Login successful', data.message);
        //         }else{
        //             Alert.alert('Login failed', data.message);
        //         }
        //     })
        //     .catch(error => {
        //         console.error('Login failed:', error);
        //         Alert.alert('Login failed', data.message);

        //     });
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.content}>
                    <Text style={styles.title}>Log In</Text>

                    {/* Email Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Username</Text>
                        <View style={styles.inputWrapper2}>
                            <Feather name="mail" size={20} color="#666" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your username here"
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
                    </View>

                    {/* Log In Button */}
                    <TouchableOpacity
                        onPress={() => login()}
                        style={styles.loginInButton}>
                        <Text style={styles.loginInText}>Log In</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: -4 }}>
                        <View style={styles.separator} />
                        <Text style={{ fontSize: 14 }}>Or</Text>
                        <View style={styles.separator} />
                    </View>

                    {/* Register Link */}
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.loginLink}>Register</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Forgot Password Link */}
                    <View style={styles.loginContainer2}>
                        <Text style={styles.loginText}>Forgot Password? </Text>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Text style={styles.loginLink}>Reset</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Modal for Reset Password */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Reset Password</Text>

                        <View style={styles.inputWrapper3}>
                            <Feather name="mail" size={20} color="#666" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your e-mail here"
                                keyboardType="email-address"
                                value={formData.resetEmail}
                                onChangeText={(text) => setFormData({ ...formData, resetEmail: text })}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={handleResetPassword}>
                            <Text style={styles.submitButtonText}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

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
    inputWrapper2: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 48,
        backgroundColor: 'rgb(255, 255, 255)'
    },
    inputWrapper3: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 48,
        backgroundColor: 'rgb(255, 255, 255)',
        marginTop: 0,
        marginBottom: 22

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
    loginInButton: {
        backgroundColor: 'rgba(24, 117, 195, 1)',
        borderRadius: 120,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 15,
    },
    loginInText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 9
    },
    loginContainer2: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
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
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: 'rgba(245, 245, 248, 1)',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    submitButton: {
        width: '100%',
        height: 40,
        backgroundColor: 'rgb(29, 130, 213)',
        borderRadius: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    closeButton: {
        width: '100%',
        height: 40,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 120,
        marginBottom: 10,
        marginTop: 5
    },
    closeButtonText: {
        color: '#333',
        fontSize: 16,
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: '#CCCCCC',
        marginHorizontal: 10,
    }
});

export default Login;
