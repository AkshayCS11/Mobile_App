import React, {useState, useContext} from 'react';
import {ScrollView, View} from 'react-native';
import Text from '@kaloraat/react-native-text';
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import axios from 'axios';
import Logo from "../components/auth/Logo";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/auth';

const Signin = ({navigation}) => {
const [email, setEmail] = useState("test@gmail.com");
const [password, setPassword] = useState("123456");
const [loading, setLoading] = useState(false);
const [state,setState] = useContext(AuthContext);

const handleSubmit = async () => {
    setLoading(true);
    if(!email || !password){
        alert ("Please fill all the required fields");
        setLoading(false);
        return;
    }
    // console.log("SIGNUP REQUEST =>" email, password)
    try{
        const {data} = await axios.post(`/signin`, {
            email, 
            password
        })
        if(data.error){
            alert(data.error);
            setLoading(false);
        }else{
            //save in context
            setState(data);
            //save response in async storage
            await AsyncStorage.setItem('@auth', JSON.stringify(data));
            setLoading(false);
            console.log("SIGN IN SUCCESS =>",data);
            alert ("Sign in successfull");
            //redirect
            navigation.navigate("Home");
        }
    }
    catch(err){
        alert("Signin failed. Try again");
        console.log(err);
        setLoading(false);
    };
}

    return(
    <KeyboardAwareScrollView 
    contentContainerStyle={{
        flexGrow:1, 
        justifyContent:'center'
        }}>
    <View style={{mariginVertical:100}}>
    <Logo/>
    <Text title center>
                Sign In
            </Text>

        <UserInput 
        name="EMAIL"
        value={email} 
        setValue={setEmail} 
        autoCompleteType="email" 
        keyboardType="email-address"/>    
        
        <UserInput 
        name="PASSWORD"
        value={password} 
        setValue={setPassword}
        secureTextEntry={true}
        autoCompleteType="password"/> 

        <SubmitButton
        title="Sign In" 
        handleSubmit={handleSubmit} 
        loading={loading}
        />   
       <Text small center style={{marginTop:10}}>Not yet registered?
        <Text onPress={() => navigation.navigate('Signup')} color="#ff2222"> Sign Up</Text>
      </Text>
      <Text small center color="blue" style={{marginTop:10}}>Forgot Password?</Text> 
    </View>
    </KeyboardAwareScrollView>
    );
}

export default Signin;
