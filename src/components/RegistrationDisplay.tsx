import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IRegistrationEntry, IState } from '../components/interfaces/registration-entry.interface';
import { createRegistrationEntry, getRegistrationEntries } from './services/registration-entry.service';
import AddRegistration from '../components/AddRegistration';
import { Button, Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { RegistrationEntry } from './entities/registration-entry.entities';
import { createConnection, Connection } from 'typeorm';
import { StackNavigationProp } from '@react-navigation/stack';


type RegistrationScreenStackParamList = {
  HomeScreen: undefined; 
  AddRegistrationScreen: {title:string} | undefined;
  ViewRegistrationScreen: {title:string} | undefined; 
};

type RegistrationScreenNavigationProp = StackNavigationProp<RegistrationScreenStackParamList, 'AddRegistrationScreen'>;

type Props = {
  navigation: RegistrationScreenNavigationProp;
};


const RegistrationDisplay: React.FC<Props> = ({ navigation }) => {

  // Original navigation method attempted. Did not work. Changed to navigation using props
  // const navigation = useNavigation();

  const [state, setState] = useState<IState>({
    registrationEntries: [],
    onAddEntry: false 
    // This sets the initial view state of the AddRegistration form to false. this ensure the whne the components mounts, the form is not visible
  })

  const createEntryDemo = (registrationEntryData: IRegistrationEntry) => {
    createRegistrationEntry(registrationEntryData, state, setState);
    navigation.navigate('ViewRegistrationScreen') 
    // This pushes the user from the RegistrationDisplay screen to the ViewRegistration screen to view what has been submitted to the database.
  }

  const cancelCreateEntryDemo = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style= {{backgroundColor: "red", fontSize: 20, color: "white", padding: 10 }}>ENTER DETAILS BELOW: </Text>  */}

        <ScrollView>
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
          {/** This is for the conditional display of the AddRegistration form */}

        </ScrollView>

    </SafeAreaView>
  );
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
  }
});

export default RegistrationDisplay;