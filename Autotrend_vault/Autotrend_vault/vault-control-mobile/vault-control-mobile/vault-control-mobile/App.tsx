import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Image, Button } from 'react-native';
import { File } from 'expo-file-system';

const App = () => {
  const [topItems, setTopItems] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const file = new File(File.documentDirectory + 'yesterday_top_50.json');
        const json = await file.readTextAsync();
        const parsed = JSON.parse(json);
        setTopItems(parsed);
        parsed.forEach(item => Image.prefetch(item.image));
      } catch (err) {
        console.log('[ERROR] Failed to load top items:', err);
      }
    };
    loadData();
  }, []);

  const checkout = (item) => {
    console.log('Checkout:', item.name);
    // Inject Stripe/PayPal logic here
  };

  const renderItem = ({ item }) => (
    <View style={{ margin: 10 }}>
      <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
      <Text>{item.name}</Text>
      <Text>${item.price}</Text>
      <Button title="Buy Now" onPress={() => checkout(item)} />
    </View>
  );

  return (
    <FlatList
      data={topItems}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default App;
