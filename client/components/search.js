import * as React from 'react';
import { Searchbar, TextInput } from 'react-native-paper';

const searchComponent = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
console.log(searchQuery);

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <>

    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
    </>
  );
};

export default searchComponent;