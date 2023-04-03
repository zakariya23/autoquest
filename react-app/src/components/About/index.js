import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h2>About the Project</h2>
      <p>
        This is a sample car listings project demonstrating how to use
        React and Redux to create a car listing website.
      </p>
      <p>
        This project is created and maintained by{' '}
        <a
          href="https://github.com/zakariya23"
          target="_blank"
          rel="noopener noreferrer"
        >
          Zakariya
        </a>
        . Check out the GitHub profile for more projects.
      </p>
      <p>
        LinkedIn can be found{' '}
        <a
          href="https://www.linkedin.com/in/zakariya-beg-74919a201/"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
      </p>
    </div>
  );
};

export default About;
