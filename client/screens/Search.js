import React from 'react';
import { SafeAreaView} from 'react-native-safe-area-context';
import {View} from 'react-native';
import Text from '@kaloraat/react-native-text';
import FooterTabs from '../components/nav/FooterTabs';

export default function Search () {

   return( 
        <SafeAreaView style={{flex:1}}>
            <Text>Search Screen</Text>
            <View style={{flex:1, justifyContent:'flex-end'}} >
            <FooterTabs/>
            </View>
        </SafeAreaView>
)}