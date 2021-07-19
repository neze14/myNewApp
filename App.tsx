import 'react-native-gesture-handler';

import React, { useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text} from 'react-native-elements';
import { enableScreens } from 'react-native-screens';
enableScreens();

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './src/Home' ;
import RegistrationDisplay from './src/components/RegistrationDisplay';
import FlatListDisplay from './src/components/FlatListDisplay';

const Stack = createStackNavigator();

const AppStack = () => { 
    return(
        <Stack.Navigator //This header will display on every page of the mobile app
            initialRouteName='HomeScreen'
            mode='card'
            headerMode='screen'
            keyboardHandlingEnabled={true}
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#DA1884',
                    height: 120
                },
                headerTintColor:'#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    paddingTop:60,
                    paddingBottom: 10
                },
                headerRight: () => (
                    <Image style={styles.logo}
                        source={require('./src/img/Tmobile-Logo.png')}
                    />
                ),
                headerTitleAlign:'left',
                headerRightContainerStyle: {
                    paddingBottom: 33
                }
            }}
        >
            {/**Below is the stack that will be used throughout this project */}
            <Stack.Screen name="HomeScreen" component={Home} options={{title: '-T- Mobile REGISTRATION APP'}}/>
            <Stack.Screen name="AddRegistrationScreen" component={RegistrationDisplay} options={{title: ''}}/> 
            <Stack.Screen name="ViewRegistrationScreen" component={FlatListDisplay} options={{title: ''}}/>
        </Stack.Navigator>
    )
}

const App: React.FC = () => {  

    

    return(
        <NavigationContainer>
            {/** Below imports the AppStack created above for use in the mobile app */}
            <AppStack/>

            {/** This footer displays on every navigable page */}
            <View style={{paddingBottom: 20, paddingTop: 10, alignItems: "center"}}>
                <Text style={{fontSize: 15, fontStyle: "italic"}}>Copyright: Chinezelum Okadigbo</Text>
            </View>
        </NavigationContainer>

    );
}

const styles = StyleSheet.create({
    logo: {
        width: 133,
        height: 55,
        paddingBottom: 50
    }
});

export default App;

/** 
import { StatusBar } from 'expo-status-bar';
  import React from 'react';
  import { StyleSheet, Text, View } from 'react-native';

  export default function App() {
    return (
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
*/