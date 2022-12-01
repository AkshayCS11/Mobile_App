import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Text from '@kaloraat/react-native-text';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Divider} from 'react-native-elements';

export const Tab = ({name, text, handlePress, screenName, routeName}) => {
const activeScreenColor = screenName === routeName && "orange";
    
return(
        <TouchableOpacity onPress={handlePress}>
                <FontAwesome5 
                name={name} 
                size={25}
                style={{
                    marginBotton: 3,
                    alignSelf: 'center'
                }}
                color={activeScreenColor}
                />
                <Text>{text}</Text>
        </TouchableOpacity>
    )
}

export default function FooterTabs() {
const navigation = useNavigation();
const route = useRoute();
console.log("ROUTE==>",route);

   return(
    <>
    <Divider width={1}/>
    <View 
    
        style={{
            flexDirection: 'row',
            margin: 10,
            marginHorizontal: 30,
            justifyContent: 'space-between'
        }}>
      
      <Tab 
      text="Home" 
      name="home" 
      handlePress={()=> navigation.navigate("Home")}
      screenName="Home"
      routeName={route.name}
      />
      <Tab 
      text="Search" 
      name="search" 
      handlePress={()=> navigation.navigate("Search")}
      screenName="Search"
      routeName={route.name}
      />  
      <Tab 
      text="Upload File" 
      name="upload" 
      handlePress={()=> navigation.navigate("Upload")} 
      screenName="Upload"
      routeName={route.name}
      />  
      <Tab 
      text="Account" 
      name="user" 
      handlePress={()=> navigation.navigate("Account")} 
      screenName="Account"
      routeName={route.name}
      />
    </View>
    </>
   )
}