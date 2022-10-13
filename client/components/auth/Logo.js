import React from 'react';
import {View, Image} from 'react-native';

const Logo = () => (
<View
  style={{
    justifyContent: 'center',
    alignItems: 'center'
  }}
>
    <Image source={require("../../assets/logoup.png")}
    style={{width:300, height:300, marginVertical:20,borderRadius:10}}
    />
</View>

)

export default Logo;