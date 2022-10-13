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

const Signup = ({navigation}) => {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
//context
const[state, setState] = useContext(AuthContext);

const handleSubmit = async () => {
    setLoading(true);
    if(!name || !email || !password){
        alert ("Please fill all the required fields");
        setLoading(false);
        return;
    }
    console.log("SIGNUP REQUEST =>", name, email, password)
    try{
        const {data} = await axios.post(`/signup`, {
            name, 
            email, 
            password
        })
       
        if(data.error){
        alert(data.error);
        setLoading(false);
       } else{
        //save to context
        setState(data);
        //save response in AsyncStorage
        await AsyncStorage.setItem('@auth', JSON.stringify(data));
        setLoading(false);
        console.log("SIGN IN SUCCESS =>",data);
        alert ("Account created successfully");
        navigation.navigate("Signin");
       }
    }
    catch(err){
        alert("Signup failed. Try again");
        console.log(err);
        setLoading(false);
    }
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
                Sign Up
            </Text>
    <UserInput 
        name="NAME" 
        value={name} 
        setValue={setName} 
        autoCapitalize="words" 
        autoCorrect={false}/>    
        
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
        title="Sign Up" 
        handleSubmit={handleSubmit} 
        loading={loading}
        />   
       <Text small center style={{marginTop:10}}>Already have an account?
        <Text onPress={() => navigation.navigate('Signin')} color="#ff2222">Sign In</Text>
      </Text> 
    </View>
    </KeyboardAwareScrollView>
    );
}

export default Signup;
