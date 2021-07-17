import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, FlatList, StyleSheet } from 'react-native';
import { Badge, Button, ButtonGroup, Icon } from 'react-native-elements';
import { Connection, createConnection } from 'typeorm';
import AddRegistration from './AddRegistration';
import { RegistrationEntry } from './entities/registration-entry.entities';
import { IRegistrationEntry, IState } from './interfaces/registration-entry.interface';
import { createRegistrationEntry, getRegistrationEntries, deleteRegistrationEntry } from './services/registration-entry.service';

type TestScreenStackParamList = {
  HomeScreen: undefined; 
  AddRegistrationScreen: {title:string} | undefined;
  ViewRegistrationScreen: {title:string} | undefined; 
  TestScreen: {title:string} | undefined; 
};

type TestScreenNavigationProp = StackNavigationProp<TestScreenStackParamList, 'TestScreen'>;

type Props = {
  navigation: TestScreenNavigationProp;
};

const TestDisplay: React.FC <Props> = ( {navigation} ) => {

  //database connection
  const [defaultConnection, setConnection] = useState<Connection | null>(null)

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

  // const navigation = useNavigation();

  const [state, setState] = useState<IState>({
    registrationEntries: [],
    onAddEntry: false
  })

  const createEntryDemo = (registrationEntryData: IRegistrationEntry) => {
    createRegistrationEntry(registrationEntryData, state, setState);
    navigation.navigate('ViewRegistrationScreen')
  }

  const cancelCreateEntryDemo = () => {
    navigation.goBack()
  }

  const deleteEntry = (id: number) => { 
    deleteRegistrationEntry(id, state, setState);
  }

  
    return (
        <SafeAreaView>

            <Text style= {{backgroundColor: "#DA1884", fontSize: 20, color: "white",  padding: 10, alignItems: "stretch" }}>REGISTERED MOBILE SIMs <Badge status="primary" value={state.registrationEntries} /></Text>

            <View style={{ flexDirection: 'row' }}>
            {!state.onAddEntry &&
              <Button
                icon={
                  <Icon
                    reverse
                    name="add"
                    color="red"
                  />
                }
                title="Click to register"
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                type="clear"
                onPress={() => { setState({ ...state, onAddEntry: true }) }}
              />
            }
          </View>

          {state.onAddEntry && <AddRegistration createEntry={createEntryDemo} cancelCreateEntry={cancelCreateEntryDemo} />}


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
  text: {
    color: '#fff',
    fontSize: 20,
    fontStyle: "italic",
    backgroundColor: '#DA1884',
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

export default TestDisplay;