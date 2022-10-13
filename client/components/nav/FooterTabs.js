import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Text from '@kaloraat/react-native-text';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const Tab = ({name,text}) => (
    <TouchableOpacity>
            <>
            <FontAwesome5 name={name} size={25}
            style={{
                marginBotton: 3,
                alignSelf: 'center'
            }}/>
            <Text>{text}</Text>
            </>
    </TouchableOpacity>
)

export default function FooterTabs() {
   return(
    <View 
        style={{
            flexDirection: 'row',
            margin: 10,
            marginHorizontal: 30,
            justifyContent: 'space-between'
        }}>
      
      <Tab text="Home" name="home"/>
      <Tab text="Search" name="search"/>  
      <Tab text="Upload File" name="upload"/>  
      <Tab text="Account" name="user"/>  
    </View>

   )
}