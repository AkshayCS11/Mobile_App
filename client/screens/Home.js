import React, {useContext} from 'react';
import { SafeAreaView} from 'react-native-safe-area-context';
import {View} from 'react-native';
import Text from '@kaloraat/react-native-text';
import {AuthContext} from '../context/auth';
import FooterTabs from '../components/nav/FooterTabs';

const Home = () => {
const [state,setState] = useContext(AuthContext);
    return (
        <SafeAreaView style={{flex:1}}>
            {/* <Text>{JSON.stringify(state, null, 4)}</Text> */}
            <Text>Welcome</Text>
            <View style={{flex:1, justifyContent:'flex-end'}} >
            <FooterTabs/>
            </View>
        </SafeAreaView>
    )
}
export default Home;
