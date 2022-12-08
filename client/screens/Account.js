import React, {useState, useContext, useEffect} from 'react';
import {ScrollView, View, Image, TouchableOpacity} from 'react-native';
import Text from '@kaloraat/react-native-text';
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import axios from 'axios';
import ProfileLogo from "../components/auth/ProfileLogo";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/auth';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';

const Account = ({navigation}) => {
const [name, setName] = useState("")    
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [uploadImage, setUploadImage] = useState("");
const [image, setImage] = useState({url: "", public_id:""});
const [state,setState] = useContext(AuthContext);

useEffect(() => {
if(state){
    const {name, email, image} = state.user;
    setName(name);
    setEmail(email);
    setImage(image);
}
}, [state])

const handleSubmit = async () => {
    setLoading(true);
    if(!email || !password){
        alert ("Please fill all the required fields");
        setLoading(false);
        return;
    }
    // console.log("SIGNUP REQUEST =>" email, password)
    try{
       
    }
    catch(err){
        alert("Password update failed. Try again");
        console.log(err);
        setLoading(false);
    };
}

const handleUpload = async() => { 
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if(permissionResult.granted === false){
        alert("Media access is required");
        return;
    } 
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsediting : true,
        aspect: [4,3],
        base64: true,
    });
    if(pickerResult.cancelled === true){
        return;
    }
    let base64Image = `data:image/jpg;base64,${pickerResult.base64}`;

    setUploadImage(base64Image);

    const {data} = await axios.post('/upload-image',{
        image: base64Image
    });
    console.log("UPLOADED RESPONSE", data);
    //update AsyncStorage
    const as = JSON.parse(await AsyncStorage.getItem("@auth"));
    as.user = data;
    await AsyncStorage.setItem("@auth", JSON.stringify(as));
    //update context
    setState({...state, user:data});
    setImage(data.image);
    alert("Profile picture saved successfully👍");
};
    
    return(
    <KeyboardAwareScrollView 
    contentContainerStyle={{
        flexGrow:1, 
        justifyContent:'center'
        }}>
    <View style={{mariginVertical:100}}>
    <ProfileLogo>
        { image && image.url ? (
             <Image source={{uri: image.url}}
             style={{width:190, height:190, borderRadius:100, marginVertical:20}}
             />
        ): uploadImage ? (
            <Image source={{uri: uploadImage}}
             style={{width:190, height:190, borderRadius:100, marginVertical:20}}
            />
        ):(
        <TouchableOpacity onPress={()=> handleUpload()}>
            <FontAwesome5 name="camera" size={50} color="orange"/>
        </TouchableOpacity>
        )}
    </ProfileLogo>
    {image && image.url ?(
     <TouchableOpacity onPress={()=> handleUpload()}>
          <FontAwesome5 name="camera" size={40} color="orange"
          style={{marginTop:-5, marginBottom:10, alignSelf: 'center'}}
          />
      </TouchableOpacity>
    ): (<></>)}

    <Text title center style={{ paddingBottom: 10}}>
            {name}
    </Text>
    <Text medium center style={{ paddingBottom: 50}}>
            {email}
    </Text>   
        <UserInput 
        name="PASSWORD" 
        value={password} 
        setValue={setPassword}
        secureTextEntry={true}
        autoCompleteType="password"/> 

        <SubmitButton
        title="Update Password" 
        handleSubmit={handleSubmit} 
        loading={loading}
        />   
    </View>
    </KeyboardAwareScrollView>
    );
}

export default Account;
