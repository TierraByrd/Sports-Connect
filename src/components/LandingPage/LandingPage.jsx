import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>Welcome to Sports Connect, your user-friendly platform that connects 
            parents by providing detailed information and reviews about 
            various youth sports teams/clubs. </p>
      <h3> Explore, Connect, Review </h3>
          <p>
          Explore diverse sports options, from team sports like soccer and basketball to individual pursuits like swimming and gymnastics. 
          Connect with detailed team profiles, including coach information and contact details. Review and share your experiences to help 
          build a supportive community where transparency thrives.
          </p>
      <h3>Start Your Journey Today</h3>
          <p>
          Join other parents who trust Sports Connect to navigate the world of youth sports. 
          Begin exploring now and find the perfect match for your sporting ambitions.
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
