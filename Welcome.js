import { View, Text, Pressable, Image, Dimensions } from 'react-native';
import React from 'react';
import COLORS from './constants/colors';
import Button from './components/Button';
import Login from './screens/Login'; // Import the Login screen
const { width, height } = Dimensions.get('window');
import { NavigationContainer } from '@react-navigation/native';

export function Welcome({ navigation }) {
    return (
        <View style={{ flex: 1 }}>
            <Image
                source={require('./assets/background.png')} // Adjust the path to where your background image is stored
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover'
                }}
            />

            <View style={{
                flex: 1,
                paddingTop: height * 0.15
            }}>
                <View style={{
                    paddingHorizontal: width * 0.08,
                    flex: 1,
                }}>
                    <View>
                        <Text style={{
                            fontSize: height * 0.1,
                            fontWeight: '700',
                            color: COLORS.white,
                            lineHeight: height * 0.09
                        }}>Your{'\n'}Health{'\n'}Matter.</Text>

                        <Text style={{
                            fontSize: 19,
                            fontWeight: '700',
                            color: '#4A9BFF',
                            marginTop: height * 0.005,
                            marginLeft: height * 0.005,

                        }}>Let's Get you Onboarded</Text>
                    </View>

                    <View style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        paddingBottom: height * 0.05
                    }}>
                        <Button
                            title="Get started"
                            onPress={() => navigation.navigate('Login')}
                            style={{
                                backgroundColor: COLORS.white,
                                paddingVertical: height * 0.02,
                                borderRadius: 30,
                                width: '100%',
                                borderColor: COLORS.white,
                            }}
                            textStyle={{
                                color: '#4A9BFF',
                                fontSize: height * 0.02,
                                fontWeight: '800',
                                textAlign: 'center',
                            }}
                        />

                    </View>
                </View>
            </View>
        </View>
    );
}

export default Welcome;