import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import '../component_style/imagestyle.css'; // Import the CSS file

import fitnessWomenTrainingImage from '../images/fitness-women-training.jpg';

function Photo(props) {
  return (
    <div className='centered-container'>
      {props.img !== null && props.img !== undefined ? (
        <Container>
          <Row>
            <Col xs={6} md={4}>
              <Image src={props.img} rounded className="custom-image" />
            </Col>
            {/* Add more Image components as needed */}
          </Row>
        </Container>
      ) : null}
    </div>
  );
}

export default Photo;