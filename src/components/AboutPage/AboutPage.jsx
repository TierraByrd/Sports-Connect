import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>

          <h2>Our Mission</h2>
            <p>Sports Connect, is  dedicated to enhancing transparency and fostering a 
            supportive environment in youth sports. I believe that informed decisions lead to 
            better experiences for everyone involved, especially the parents.</p>
            <br />
<h3>What Technologies Did I Use?</h3>
<p>Front-end Technologies:</p>
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>Javascript</li>
  <li>React/Redux</li>
  <li>Redux Saga</li>
</ul>
<p>Back-end Technologies:</p>
<ul>
  <li>Node.js</li>
  <li>PostgreSQL</li>
  <li>Express.js</li>
</ul>
<h3>What was the toughest challenge that I overcame ?</h3>
<p>The toughest challenge I faced was figuring out when to ask for help. I learned a lot about myself through this project. At first, I felt like I had to solve everything on my own, and it was hard to let go of that mindset. But once I finally reached out and asked for help, it turned out to be exactly what I needed. It was a real eye-opener about the value of asking for support and how much more effective teamwork can be. </p>
  <h3>What's Next?</h3>
  <ul>
    <li>User Profiles: Add detailed user profiles where users can track their reviews, favorite teams, and activity history.</li>
    <li>Search and Filters: Implement advanced search and filtering options for teams and reviews to help users find specific information more easily.</li>
  <li>Notifications: Set up notifications or alerts for users about new reviews, updates to their favorite teams, or messages from other users.</li>
  <li>Team Stats and Records: Provide detailed stats and records for teams, including past performance and achievements.</li>
 <li>Third-Party Integrations: Integrate with other sports or community apps to provide additional functionality or data.</li>
  </ul>
  <h3>Special Thanks to:</h3>
  <ul>
    <li>God - for keeping me mentally and physically healthy. </li>
    <li>My family - for the support and love when I needed it most.</li>
    <li>Prime Staff - Key, Dane, Bethany, Justice, and Siri, for all the help and support, motivational talks, kinds words, and reassurance. You guys are awesome! </li>
<li>Lastly, I would also like to thank my classmates for their help and support as well.</li>
  </ul>
  <h2>LinkedIn Profile</h2>
        <a href="https://www.linkedin.com/in/tierra-byrd/" target="_blank" rel="noopener noreferrer">
          https://www.linkedin.com/in/tierra-byrd/
        </a>
        <br />
        <h2>GitHub Profile</h2>
        <a href="https://github.com/TierraByrd" target="_blank" rel="noopener noreferrer">
          https://github.com/TierraByrd
        </a>
      </div>
    </div>
  );
}

export default AboutPage;
