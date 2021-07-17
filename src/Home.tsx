import React, { useCallback, useEffect, useState }  from 'react';
import {StyleSheet, SafeAreaView, ImageBackground, View} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from 'react-native-elements';

type HomeScreenStackParamList = {
    HomeScreen: undefined; 
    AddRegistrationScreen: {title:string} | undefined;
    ViewRegistrationScreen: {title:string} | undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<HomeScreenStackParamList, 'HomeScreen'>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

const Home: React.FC<Props> = ({navigation}) => { 
  
  return(
    <SafeAreaView style={styles.container}>
      <ImageBackground style={{flex: 1}} source={require('./img/wallpaper.png')}>
        <View style={{flex: 1, alignItems: "center"}}>

        <View style={{padding: 130}}></View>

          <Button 
            type="solid"
            title="Register SIM Here"
            onPress={()=> navigation.navigate('AddRegistrationScreen')}/>

          <View style={{padding: 10}}></View>

          <Button 
            type="solid"
            title="View Registered SIMs"
            onPress={()=> navigation.navigate('ViewRegistrationScreen')}/>

          <View style={{padding: 10}}></View>

          </View>
      </ImageBackground>
    </SafeAreaView>
  )
  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'stretch',
      justifyContent: 'center',
      fontSize: 18,
    },
    logo:{
      width: 133,
      height: 55,
      paddingBottom: 50
  }
});

export default Home;