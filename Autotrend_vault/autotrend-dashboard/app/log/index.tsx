import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import axios from 'axios';

export default function MutationLog() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/mutation-log')
      .then(res => setLogs(res.data))
      .catch(() => setLogs([{ timestamp: 'N/A', action: '⚠️ Failed to load log' }]));
  }, []);

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>📜 Mutation Log</Text>
      {logs.map((log, i) => (
        <View key={i} style={{ marginVertical: 10 }}>
          <Text>{log.timestamp}</Text>
          <Text>{log.action}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
