import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import '../component_style/imagestyle.css'; // Import the CSS file

import fitnessWomenTrainingImage from '../images/fitness-women-training.jpg';

function Photo() {
  return (
    <div className='centered-container'>
      <Container>
        <Row>
          <Col xs={6} md={4}>
            <Image src={fitnessWomenTrainingImage} rounded className="custom-image" />
          </Col>
          {/* Add more Image components as needed */}
        </Row>
      </Container>
    </div>
  );
}

export default Photo;