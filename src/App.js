import React from 'react';
import Clarifai from 'clarifai';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navigation from './Components/Navigation';
import SignIn from './Components/Sign In/SignIn';
import Register from './Components/Register/Register';
import UserScore from './Components/UserScore';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/Face Recognition/FaceRecognition';
import bgImg from './assets/bg-img.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'edde4e65d57d4ae5b35aeab79b52cfb1'
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxes: [], 
      route: 'signin', 
      faces: 0, 
      name: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  calculateNumberOfFaces = (data) => {
    const numberOfFaces = data.outputs[0].data.regions.length;
    this.setState({ faces: numberOfFaces });
    console.log(numberOfFaces);
    return numberOfFaces;
  }

  calculateFaceLocation = (data, index) => {
    const clarafaiFace = data.outputs[0].data.regions[index].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);
    console.log(imageHeight, imageWidth);

    return {
      leftCol: clarafaiFace.left_col * imageWidth,
      topRow: clarafaiFace.top_row * imageHeight,
      rightCol: imageWidth - (clarafaiFace.right_col * imageWidth),
      bottomRow: imageHeight - (clarafaiFace.bottom_row * imageHeight)
    }
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input
      )
      .then(response => {
        const numberOfFaces = this.calculateNumberOfFaces(response);
        var boxes = [];
        var i;
        for(i = 0; i<numberOfFaces; i++) {
          const box = this.calculateFaceLocation(response, i);
          boxes.push(box);
          console.log(boxes);
        }
        this.setState({ boxes: boxes });
      })
      .catch((err) => console.log(err));  
  }

  onRouteChange = (route) => {
    this.setState({ route: route });
  }

  onNameSubmit = (event) => {
    this.setState({ name: event.target.value });
  }

  render() {
    const HomePageStyle = { 
      padding: "0 50px 60px 50px",
      minHeight: "100vh",
      background: "rgba(19, 19, 19, 0.7)" 
    }

    return (
      <div className="App">
        <Container fluid="true" style={{margin: 0, padding: 0}}>
          <Navigation onRouteChange={this.onRouteChange} />
          <div style={{position: "absolute", top: 0, left: 0}}>
            <img src={bgImg} alt="" className="background-img" />
          </div>

          {this.state.route === 'home' 
              ? <Container> 
                <Row style={HomePageStyle}>
                  <Col xs={12} sm={6}>
                    <UserScore 
                      name={ this.state.name }
                      faces={ this.state.faces } 
                    />
                    <ImageLinkForm 
                      onInputChange={ this.onInputChange } 
                      onButtonSubmit={ this.onButtonSubmit } 
                    />
                  </Col>
                  <Col style={{ alignItems: "center" }} xs={12} sm={6}>
                    <div>
                      <img 
                        id="inputImage" 
                        className="image-received"
                        alt='' src={this.state.imageUrl}
                      />
                      {this.state.boxes.map((box, index) => {
                        return (
                          <FaceRecognition 
                            box={box} 
                            key={index}
                          /> 
                        )
                      })}
                    </div>
                  </Col>
                </Row>
              </Container>

            : (this.state.route === 'signin' 
                ? <SignIn 
                    onRouteChange={ this.onRouteChange } 
                  />
                : <Register 
                    onRouteChange={ this.onRouteChange } 
                    onNameSubmit={ this.onNameSubmit } 
                  />)
          }
        </Container>
      </div>
    );
  }
}

export default App;
