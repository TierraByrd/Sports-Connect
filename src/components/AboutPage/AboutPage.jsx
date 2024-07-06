import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h2>About Sports Connect</h2>
          <p>Welcome to Sports Connect, your user-friendly platform that connects 
            parents by providing detailed information and reviews about 
            various youth sports teams/clubs. </p>
          <h3>Our Mission</h3>
            <p>At Sports Connect, we are dedicated to enhancing transparency and fostering a 
            supportive environment in youth sports. We believe that informed decisions lead to 
            better experiences for everyone involved, especially the parents.</p>
          <h3>What We Offer</h3>
            <p>Comprehensive Team and Sport Listings: Discover a wide variety of youth sports teams and clubs, 
              categorized into team sports and single sports. Our detailed listings provide essential information 
              to help you make informed decisions.</p>
            <p> User Reviews and Ratings: Empower your decision-making with real insights from the community. Users 
                can leave ratings and reviews, creating a transparent platform where 
              experiences shape opinions. </p>
            <p>Search and Navigation: Easily find what you're looking for with our intuitive search functionalities. Search by 
                sport, ratings, or location (city, state, or zip), ensuring you find the right fit for your needs.</p>
            <p> User-Friendly Experience: Designed with simplicity in mind, Sports Connect ensures that navigating through teams, 
              sports, and reviews is effortless, whether you're on a desktop or mobile device.</p>
          <h3>Join the Community</h3>
          <p>Join parents who trust Sports Connect to find and review youth sports programs. Whether you're starting your 
            journey in youth sports or looking to switch teams, Sports Connect is here to guide you every step of the way.</p>
      </div>
    </div>
  );
}

export default AboutPage;
