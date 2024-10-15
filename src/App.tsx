import React from 'react';
import { Container } from 'react-bootstrap';
import CountrySearch from './components/CountrySearch';
import './App.css';

const App: React.FC = () => {

  return (
      <Container>
          <CountrySearch/>
      </Container>
  );
};

export default App;