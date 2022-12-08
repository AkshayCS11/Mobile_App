import { View, Text, TextInput } from 'react-native'
import React from 'react'
import SearchComponent from '../components/search'
import { Searchbar } from 'react-native-paper';


const Search = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
  return (
    <View>
      {/* <Text>Search</Text> */}
      <SearchComponent/>
      {/* <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery} */}
    


    </View>
  )
}

export default Search