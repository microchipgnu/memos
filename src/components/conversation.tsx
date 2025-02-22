'use client';

import { createMemoStorage, Memo, saveMemo, searchMemos, getMemos } from "@/lib/core/storage";
import { firstMessage, systemPrompt } from "@/lib/elevenlabs/config";
import { Role, useConversation } from '@11labs/react';
import { useCallback, useState } from 'react';
import Microphone from "./microphone";

interface Message {
  role: string;
  content: string;
}

export function Conversation() {

  const [messages, setMessages] = useState<Message[]>([]);

  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: async () => {
        console.log('Disconnected')
        try {
            const response = await fetch('/api/agent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ messages, localStorage: createMemoStorage().getAll() })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data.response);

            const memos = data.memos;
            // Create new storage instance and overwrite with received memos
            const storage = createMemoStorage();
            const existingMemos = storage.getAll();
            
            memos.forEach((memo: Memo) => {
                // Only save if memo doesn't exist or has different content
                const existing = existingMemos.find(m => m.name === memo.name);
                if (!existing || existing.content !== memo.content) {
                    saveMemo({
                        ...memo,
                        memoId: memo.id
                    }, storage);
                }
            });
        } catch (error) {
            console.error('Error:', error)
        }
    },
    onMessage: (message: {
        message: string;
        source: Role;
    }) => {
        setMessages(prev => [...prev, {
            role: message.source,
            content: message.message
        }])
    },
    onError: (error: Error) => console.error('Error:', error),
    clientTools: {
        listMemos: async () => {
            const storage = createMemoStorage();
            const memos = storage.getAll();
            return JSON.stringify(memos.map((memo) => memo.name).join("\n"))
        },
        findMemo: async ({memo_name}: {memo_name: string}) => {
            return JSON.stringify(searchMemos(memo_name))
        },
        saveMemo: async ({name, content}: {name: string, content: string}) => {
            console.log("Saving memo:", name, content);
            // Implementation here
        },
        runMemo: async ({memo_name}: {memo_name: string}) => {
            const memo = searchMemos(memo_name)[0]
            if (!memo) {
                return "Memo not found"
            }

            return `
                Started executing memo ${JSON.stringify(memo)}
            `
        }
    },
  });

  const startConversation = useCallback(async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Start the conversation with your agent
      await conversation.startSession({
        agentId: 'Z0b5WwZMWetil3PQdgxf',
        overrides: {
          agent: {
            prompt: {
              prompt: systemPrompt
            },
            firstMessage: firstMessage,
          },
          tts: {
            voiceId: "bIHbv24MWmeRgasZH58o"
          }
        },
      });

    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const memoCount = getMemos().length;

  return (
    <Microphone
      updateCount={memoCount}
      statusText={conversation.status === 'connected' ? 
        (conversation.isSpeaking ? 'PROCESSING' : 'LISTENING...') : 
        'READY TO LISTEN'
      }
      onSpeakClick={conversation.status === 'connected' ? stopConversation : startConversation}
      buttonText={conversation.status === 'connected' ? 'STOP' : 'START'}

      conversationStatus={conversation.status}
      isSpeaking={conversation.isSpeaking}
    />
  );
}
