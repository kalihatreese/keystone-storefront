import React, { useState } from 'react';
import { Button } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import * as Speech from 'expo-speech';

export default function ChatBot() {
  const [messages, setMessages] = useState([]);

  const speak = (text) => Speech.speak(text);

  const onSend = async (newMessages = []) => {
    setMessages(GiftedChat.append(messages, newMessages));
    const userMessage = newMessages[0].text;

    let botReply = '🤖 Command not recognized';

    if (userMessage.includes('restart')) {
      try {
        await axios.post('http://localhost:3000/restart-bot');
        botReply = '🔁 Bot restarted';
      } catch {
        botReply = '❌ Restart failed';
      }
    } else if (userMessage.includes('tag top seller')) {
      botReply = '🔥 Top seller tagged';
    } else if (userMessage.includes('propagate ad')) {
      botReply = '🚀 Ad propagation triggered';
    } else if (userMessage.includes('clean inventory')) {
      botReply = '🧹 Inventory cleaned';
    }

    speak(botReply);

    const reply = {
      _id: uuidv4(),
      text: botReply,
      createdAt: new Date(),
      user: { _id: 2, name: 'Autotrend Bot' },
    };

    setMessages(previous => GiftedChat.append(previous, [reply]));
  };

  return (
    <>
      <Button title="🎙️ Speak Command" onPress={() => {}} />
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{ _id: 1 }}
      />
    </>
  );
}
