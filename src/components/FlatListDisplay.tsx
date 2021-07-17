// This component merges the EntryFlatList and EntryFlatListItem Component

import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button, ButtonGroup, Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Connection, createConnection } from 'typeorm';
import { RegistrationEntry } from './entities/registration-entry.entities';
import { IState } from './interfaces/registration-entry.interface';
import { deleteRegistrationEntry, getDbConnection, getRegistrationEntries } from './services/registration-entry.service';

const FlatListDisplay: React.FC = () => {

    const  [state, setState] = useState<IState> ({
        registrationEntries: [],
        onAddEntry: false
    })

    // create connection
    const [defaultConnection, setConnection] = useState<Connection | null>(null);

    {/** 
        const setupConnection = useCallback(async () => {
            try {
            const connection = await createConnection({
            type: 'expo',
            database: 'registration_entries.db',
            driver: require('expo-sqlite'),
            
            synchronize: true,
            entities: [RegistrationEntry],
            });
            setConnection(connection);
            getRegistrationEntries(state, setState);
            } catch (error) {
            console.log(error);
            }
        }, []);

        useEffect(() => {
            if (!defaultConnection) {
            setupConnection();
            } else {
            getRegistrationEntries(state, setState);
            }
        }, []);
    */}

    const setupConnection = useCallback( () => 
        getDbConnection(setConnection, state, setState
    ), []);

    useEffect(() => {
        if (!defaultConnection) {
            setupConnection();
        } else {
            getRegistrationEntries(state, setState);
        }
    }, []);

    const deleteEntry = (id: number) => { 
        deleteRegistrationEntry(id, state, setState);
    }

    return (
        <SafeAreaView>

            <Text style= {{backgroundColor: "#DA1884", fontSize: 20, color: "white",  padding: 10, alignItems: "stretch" }}>REGISTERED MOBILE SIMs </Text>

            <View>
                    <FlatList
                        style={{ width: '100%', padding: 3, backgroundColor: 'white' }}
                        data={state.registrationEntries}
                        renderItem={({ item }) => (
                            <ScrollView>
                                <View style={styles.inputContainerStyle}>
                                    <Text style={{fontSize: 18}}>National Identification Number (NIN): {item.nationalIdentityNumber}</Text>
                                    <Text style={{fontSize: 18}}>First Name: {item.firstName}</Text>
                                    <Text style={{fontSize: 18}}>Middle Name: {item.middleName}</Text>
                                    <Text style={{fontSize: 18}}>Last Name: {item.lastName}</Text>
                                    <Text style={{fontSize: 18}}>SIM Number: {item.simNumber}</Text>

                                    <ButtonGroup
                                        containerStyle={{ backgroundColor: 'white', width: '40%', borderColor: 'white' }}
                                        buttons={
                                            [<Button
                                                icon={<Icon
                                                    name="edit"
                                                    color="green"
                                                />}
                                                type="clear"
                                                title="Edit"
                                                titleStyle={{ fontSize: 15 }}
                                                onPress={() => {"Changes can not be made to saved entries"}} /** REVIEW THIS!!! */
                                            />,

                                            <Button
                                                icon={<Icon
                                                    name="delete"
                                                    color="red"
                                                />}
                                                type="clear"
                                                title="Delete"
                                                titleStyle={{ fontSize: 15 }}
                                                onPress={() => {
                                                    deleteEntry(item.id!)
                                                }}
                                            />
                                            ]
                                        }
                                    />
                                </View>
                            </ScrollView>
                        )}
                        /*
                            ListFooterComponent = { ()=> (
                                <View style={{backgroundColor:'#red', paddingBottom: 30, alignContent:"flex-start"}}>
                                    <Text style={{fontSize: 15, fontStyle: "italic"}}>Copyright: Chinezelum Okadigbo</Text>
                                </View>
                            )}
                        */
            
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={
                            () => {
                                return (<View style={{ backgroundColor: '#ccc', height: 3, width: '100%' }} />)
                            }
                        }
                    /> 
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    text:{
      color: '#fff',
      fontSize: 20,
      fontStyle: "italic", 
      backgroundColor: 'red',
      padding: 6,
      alignItems: 'center'
    },
  
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 30
    },

    title: { fontSize: 16, color: 'black' },
    inputContainerStyle: {
      width: '100%',
      padding: 10
    }
});

export default FlatListDisplay;