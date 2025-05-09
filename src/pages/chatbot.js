import React, { useState, useRef, useEffect } from 'react';
import {
  Box, TextField, Button, Typography, List, ListItem, ListItemText, Paper
} from '@mui/material';
import { Send } from '@mui/icons-material';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! How can I assist you today?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = { text: input, isUser: true };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsTyping(true);

      try {
        const response = await fetch("https://mutaibamohsin845-cv-bot.hf.space/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: input }),
        });

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }

        const data = await response.json();
        console.log(data.response);  // Corrected console.log

        const botReply = data.response || "Sorry, I didn't understand that.";
        setMessages((prev) => [...prev, { text: botReply, isUser: false }]);

      } catch (error) {
        console.error("Fetch error:", error);
        setMessages((prev) => [
          ...prev,
          { text: "Error: Could not connect to the server.", isUser: false }
        ]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  return (
    <Box sx={{
      height: '100vh',
      width: '100vw',
      backgroundColor: '#f5f5f5',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      p: 1
    }}>
      <Paper sx={{
        flexGrow: 1,
        width: '100%',
        maxWidth: '800px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        boxShadow: 3,
      }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          CV Chatbot
        </Typography>

        <List sx={{
          flexGrow: 1,
          overflowY: 'auto',
          mb: 2
        }}>
          {messages.map((msg, index) => (
            <ListItem key={index} sx={{ justifyContent: msg.isUser ? 'flex-end' : 'flex-start' }}>
              <ListItemText
                primary={msg.text}
                sx={{
                  textAlign: msg.isUser ? 'right' : 'left',
                  backgroundColor: msg.isUser ? '#1976d2' : '#e0e0e0',
                  color: msg.isUser ? '#fff' : '#000',
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  maxWidth: '70%',
                  wordBreak: 'break-word',
                }}
              />
            </ListItem>
          ))}
          {isTyping && (
            <ListItem>
              <ListItemText primary="Typing..." sx={{ fontStyle: 'italic' }} />
            </ListItem>
          )}
          <div ref={messagesEndRef} />
        </List>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button variant="contained" onClick={handleSendMessage} endIcon={<Send />}>
            Send
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Chatbot;
