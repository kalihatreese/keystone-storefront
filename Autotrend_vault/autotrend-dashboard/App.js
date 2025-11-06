// SPDX-License-Identifier: Proprietary
// Copyright (c) 2025 ReeseLimitedLLC. All rights reserved.
// SPDX-License-Identifier: LicenseRef-ReeseLimitedLLC-Proprietary
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Button } from 'react-native';
import axios from 'axios';

export default function App() {
  const [products, setProducts] = useState([]);
  const [botStatus, setBotStatus] = useState('⏳ Checking...');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const top50 = await axios.get('http://localhost:8080/storefront/products/top50.json');
        const electronics = await axios.get('http://localhost:8080/storefront/products/electronics25.json');
        setProducts([...top50.data, ...electronics.data]);
        setBotStatus('✅ Autotrend Bot Active');
      } catch (err) {
        setBotStatus('⚠️ Bot Offline or Feed Error');
      }
    };
    fetchData();
  }, []);

  const restartBot = () => {
    axios.post('http://localhost:3000/restart-bot')
      .then(() => setBotStatus('🔁 Bot Restarted'))
      .catch(() => setBotStatus('❌ Restart Failed'));
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>🧬 Autotrend Dashboard</Text>
      <Text style={{ marginVertical: 10 }}>{botStatus}</Text>
      <Button title="Restart Bot" onPress={restartBot} />
      {products.map((p, i) => (
        <View key={i} style={{ marginVertical: 10, borderBottomWidth: 1 }}>
          <Text>{p.name}</Text>
          <Text>${p.price}</Text>
          <Text>{p.momentum || ''}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
