import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform  } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

type Props = {
    createEntry: Function,
    cancelCreateEntry: Function // This component is not used. However it is necessary for the RegistrationDisplay.tsx component.
}
type IState = {
    id?: number;
    nationalIdentityNumber?: number;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    simNumber?: number;
}

const AddRegistration: React.FC<Props> = ({ createEntry, cancelCreateEntry }) => {
    const [state, setState] = useState<IState>({
        nationalIdentityNumber: 0,
        firstName: '',
        middleName: '',
        lastName: '',
        simNumber: 0,

    })

    const navigation = useNavigation();

    // const createEntry = (registrationEntryData: IRegistrationEntry) => {
    //     createRegistrationEntry(registrationEntryData, state2, setState2);
    // }

    return (
        <SafeAreaView >

            <View style={styles.container}>
                <ScrollView>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.container}
                    >
        
                        <Text h3 style={styles.inputContainerStyle}>Registration Form: </Text>
                    
                        <Input
                            label="National Identity Number (NIN)"
                            placeholder="Enter 11 digit number here"
                            keyboardType="numeric"
                            inputContainerStyle={styles.inputContainerStyle}
                            leftIcon={{ type: 'font-awesome', name: 'id-card' }}
                            onChangeText={nationalIdentityNumber => setState({ ...state, nationalIdentityNumber: +nationalIdentityNumber })}
                        />

                        <Input
                            label="First Name"
                            placeholder="Enter your first name here"
                            multiline
                            inputContainerStyle={styles.inputContainerStyle}
                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                            onChangeText={firstName => setState({ ...state, firstName })}
                        />

                        <Input
                            label="Middle Name"
                            placeholder="Enter your middle name here"
                            multiline
                            inputContainerStyle={styles.inputContainerStyle}
                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                            onChangeText={middleName => setState({ ...state, middleName })}
                        />

                        <Input
                            label="Last Name"
                            placeholder="Enter your surname here"
                            multiline
                            inputContainerStyle={styles.inputContainerStyle}
                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                            onChangeText={lastName => setState({ ...state, lastName })}
                        />

                        <Input
                            label="SIM number"
                            placeholder="Enter 11 digit number here"
                            keyboardType="numeric"
                            inputContainerStyle={styles.inputContainerStyle}
                            leftIcon={{ type: 'font-awesome', name: 'mobile' }}
                            onChangeText={simNumber => setState({ ...state, simNumber: +simNumber })}
                        />

                        <View style={{ flexDirection: 'row' }}>
                            <Button style={[styles.inputContainerStyle, { paddingRight: 1 }]}
                                title="Register"
                                onPress={() => {
                                    createEntry(state);
                                }}
                                buttonStyle={{ backgroundColor: 'green' }}
                            />
                            
                            <Button style={[styles.inputContainerStyle, { paddingLeft: 1 }]}
                                title="Cancel"
                                onPress={() => { navigation.goBack() }}
                                buttonStyle={{ backgroundColor: 'red' }}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 30
    },

    inputContainerStyle: {
        width: '100%',
        padding: 10,
        backgroundColor: 'white'
    }
});

export default AddRegistration;