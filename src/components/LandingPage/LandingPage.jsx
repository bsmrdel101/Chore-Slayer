import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const history = useHistory();

  return (
    <>
      <h1 className="welcome-title">Chore Slayer</h1>
      <div className="welcome-btn">
        <button className="get-started-btn" onClick={() => history.push('/registration')}>Get Started</button>
      </div>
    </>
  );
}

export default LandingPage;
