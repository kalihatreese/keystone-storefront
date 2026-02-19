import React from 'react';
import { ScrollView } from 'react-native';
import ProductVault from './components/ProductVault';
import MutationMonitor from './components/MutationMonitor';
import BotChatPanel from './components/BotChatPanel';
import MutationLog from './components/MutationLog';
import CommitDiff from './components/CommitDiff';
import PRStatus from './components/PRStatus';
import SettingsPanel from './components/SettingsPanel';

export default function App() {
  return (
    <ScrollView style={{ padding: 16 }}>
      <ProductVault />
      <MutationMonitor />
      <BotChatPanel />
      <MutationLog />
      <CommitDiff />
      <PRStatus />
      <SettingsPanel />
    </ScrollView>
  );
}
