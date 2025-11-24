// app/call.tsx
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import { pipeline, env } from '@xenova/transformers';

// Configure for React Native (no browser cache, remote models only)
env.allowLocalModels = false;
env.useBrowserCache = false;
env.allowRemoteModels = true;

const GROQ_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY!;

const callGroq = async (userText: string) => {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: [{ role: 'user', content: `You are a friendly support agent. User said: "${userText}". Answer kindly in 1-2 sentences.` }],
      model: 'llama-3.1-70b-versatile',
      max_tokens: 120,
    }),
  });
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || 'Hello! How can I help you?';
};

export default function CallScreen() {
  const [transcript, setTranscript] = useState('Hold to speak');
  const [aiResponse, setAiResponse] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [transcriber, setTranscriber] = useState<any>(null);
  const [loadingStatus, setLoadingStatus] = useState('Loading model... (first time ~80MB)');

  useEffect(() => {
    (async () => {
      try {
        setLoadingStatus('Downloading tokenizer...');
        const model = await pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny.en');
        setTranscriber(model);
        setLoadingStatus('Model ready! Hold to speak.');
        console.log('Whisper Tiny loaded');
      } catch (err) {
        console.error('Model error:', err);
        setLoadingStatus('Download failed — retry or check internet');
      }
    })();
  }, []);

  const startRecording = async () => {
    setIsRecording(true);
    setTranscript('Recording...');
    setAiResponse('');
    await Audio.requestPermissionsAsync();
    const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
    setRecording(recording);
  };

  const stopRecording = async () => {
    setIsRecording(false);
    if (!recording || !transcriber) {
      setTranscript('Model not ready yet');
      return;
    }

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    if (!uri) {
      setTranscript('No audio recorded');
      return;
    }

    setTranscript('Transcribing...');
    try {
      const result = await transcriber(uri, { language: 'en', task: 'transcribe' });
      const text = result.text?.trim() || 'Nothing heard';
      setTranscript(text);

      const reply = await callGroq(text);
      setAiResponse(reply);
      Speech.speak(reply);
    } catch (err) {
      setTranscript('Transcription failed');
      console.error(err);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>AI Support</Text>
        <Text style={styles.subtitle}>How can I help you?</Text>

        <View style={styles.userBubble}>
          <Text style={styles.userText}>{transcript}</Text>
        </View>

        {aiResponse ? (
          <View style={styles.aiBubble}>
            <Text style={styles.aiText}>{aiResponse}</Text>
          </View>
        ) : null}

        <TouchableOpacity
          style={[styles.micButton, isRecording && styles.micButtonActive]}
          onPressIn={startRecording}
          onPressOut={stopRecording}
          disabled={!transcriber}
        >
          <Text style={styles.micText}>
            {isRecording ? 'Release' : 'Hold to Speak'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.loadingText}>{loadingStatus}</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4f46e5' },
  inner: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  title: { fontSize: 48, fontWeight: 'bold', color: 'white', marginBottom: 8 },
  subtitle: { fontSize: 20, color: 'rgba(255,255,255,0.8)', marginBottom: 40 },
  userBubble: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 16, borderRadius: 20, maxWidth: '85%', marginBottom: 20, alignSelf: 'flex-end' },
  userText: { color: 'white', fontSize: 18 },
  aiBubble: { backgroundColor: 'white', padding: 16, borderRadius: 20, maxWidth: '85%', marginBottom: 40, alignSelf: 'flex-start', elevation: 8 },
  aiText: { color: '#6366f1', fontSize: 18, fontWeight: '600' },
  micButton: { backgroundColor: 'white', width: 180, height: 180, borderRadius: 90, justifyContent: 'center', alignItems: 'center', elevation: 15 },
  micButtonActive: { backgroundColor: '#f472b6', transform: [{ scale: 0.95 }] },
  micText: { fontSize: 22, fontWeight: 'bold', color: '#6366f1' },
  loadingText: { position: 'absolute', bottom: 60, color: 'rgba(255,255,255,0.7)', fontSize: 13, textAlign: 'center' },
});