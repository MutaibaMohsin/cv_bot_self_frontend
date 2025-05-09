import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Container } from '@mui/material';
import PrimarySearchAppBar from '../component/appbar';
const Dashboard = () => {
  const cardTitles = [
    'Welcome to CV Bot',
    'Features',
    'Use Cases',
    'How It Works',
  ];
  const cardContents = [
    `CV Bot is an AI-powered assistant that analyzes your resume content, understands your skills, and helps recruiters or systems fetch important data efficiently.\n\nAsk: "What's the latest project?" or "What are my skills?"`,

    `Natural Language Querying\nSmart Resume Parsing\n Editable Experience & Projects\n AI-Powered Recommendations\n Cloud Integration`,

    `Job-seekers: Quickly highlight key skills\n HR: Get structured data from CVs\n Bots: Integrate with AI assistants\n Portfolios: Turn CV into queryable data`,

    `NLP analyzes CV content\n Parsed into structured sections\n  Data is stored & editable\n AI responds to your queries\n Updates adapt in real-time`,
  ];

  const gradientByIndex = (i) => {
    const gradients = [
      'linear-gradient(135deg, #1565c0, #42a5f5)',
      'linear-gradient(135deg, #1e88e5, #90caf9)',
      'linear-gradient(135deg, #0d47a1, #64b5f6)',
      'linear-gradient(135deg, #1976d2, #64b5f6)',
    ];
    return gradients[i % gradients.length];
  };

  return (
    <>
      <PrimarySearchAppBar />
      <Box height={70} />

      <Box sx={{ display: 'flex', minHeight: '100vh' }}>

        <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
          <Container maxWidth="lg">
            

            <Grid container spacing={4} justifyContent="flex-start" alignItems="flex-start">
              {cardTitles.map((title, i) => (
                <Grid item xs={12} md={6} key={i}>
                  <Card
                    sx={{
                      height: '100%',
                      minHeight: 280,
                      background: gradientByIndex(i),
                      color: 'white',
                      p: 2,
                      borderRadius: 3,
                      boxShadow: 6,
                      '&:hover': {
                        transform: 'scale(1.03)',
                        boxShadow: 12,
                      },
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    <CardContent>
                      <Typography variant="h4" gutterBottom>
                        {title}
                      </Typography>
                      <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
                        {cardContents[i]}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
