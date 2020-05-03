import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navigation from './Components/Navigation';
import SignIn from './Components/Sign In/SignIn';
import Register from './Components/Register/Register';
import UserScore from './Components/UserScore';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import UserStats from './Components/UserStats';
import FaceRecognition from './Components/Face Recognition/FaceRecognition';
import bgImg from './assets/bg-img.jpg';
import Loader from './Components/Loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const initialState = {
      bgImageLoaded: true,
      route: 'register', 
      isSignedIn: false,
      input: '',
      imageUrl: '',
      boxes: [], 
      faces: 0, 
      user: {
        id: 0,
        name: "",
        email: "",
        password: "",
        joined: '',
        entries: 0
      }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      bgImageLoaded: false,
      route: 'register', 
      isSignedIn: false,
      input: '',
      imageUrl: '',
      boxes: [], 
      faces: 0, 
      user: {
        id: 0,
        name: "",
        email: "",
        password: "",
        joined: '',
        entries: 0
      }
    }
  }

  // -- UPDATE USER DETAILS
  loadUser = userData => {
    this.setState({ user: {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      joined: userData.joined,
      entries: userData.entries
    }});

    console.log('Current User:', this.state.user);
  }

  // -- BACKGROUND IMAGE LOADER FUNCTION
  onImageLoad = () => {
    this.setState({ bgImageLoaded: true });
  }

  // -- IMAGE LINK UPDATE
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  // -- FACE RECOGNITION FUNCTIONS
  calculateNumberOfFaces = (data) => {
    const numberOfFaces = data.outputs[0].data.regions.length;
    this.setState({ faces: numberOfFaces}); //console.log(numberOfFaces);
    return numberOfFaces;
  }

  calculateFaceLocation = (data, index) => {
    const clarafaiFace = data.outputs[0].data.regions[index].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const imageContainer = document.getElementById('image-container');
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height); 
    const containerWidth = Number(imageContainer.clientWidth);
    const containerHeight = Number(imageContainer.clientHeight);
    const offsetX = containerWidth - imageWidth;
    const offsetY = containerHeight - imageHeight; 
    const padding = 15;  

    console.log(imageHeight, containerHeight,imageWidth, containerWidth);

    return {
      leftCol: clarafaiFace.left_col * imageWidth + padding,
      topRow: clarafaiFace.top_row * imageHeight,
      rightCol: (imageWidth - (clarafaiFace.right_col * imageWidth)) + (offsetX - padding),
      bottomRow: (imageHeight - (clarafaiFace.bottom_row * imageHeight)) + (offsetY - padding)
    }
  }

  displayFaceBox = response => {
    const numberOfFaces = this.calculateNumberOfFaces(response);
    var boxes = [];

    var i;
    for(i = 0; i < numberOfFaces; i++) {
      const box = this.calculateFaceLocation(response, i);
      boxes.push(box); //console.log(boxes);
    }

    this.setState({ boxes: boxes });
  }

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    fetch('https://shielded-cove-90316.herokuapp.com/imageURL', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => { 
        fetch('https://shielded-cove-90316.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.state.user.id
            })
        })
          .then(res => res.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}));
            console.log('User stats: ', this.state.user );
          })

        this.displayFaceBox(response)
      })
      .catch((err) => console.log(err));  
  }

  // -- ROUTE CHANGE FUNCTION
  onRouteChange = (route) => {
    if (route === "home") { // Sign in state validation
      this.setState({ isSignedIn: true });      
    }
    else {
      this.setState( initialState );
    }

    // Change Routes
    this.setState({ route: route });
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
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />

          <div style={{position: "absolute", top: 0, left: 0}}>
            <img 
              src={bgImg} 
              alt="" 
              className="background-img" 
              onLoad= {this.onImageLoad}
            />
          </div>

          {this.state.bgImageLoaded
            ? (this.state.route === 'home' 
                ? <Container> 
                  <Row style={HomePageStyle}>
                    <Col xs={12} sm={6}>
                      <UserScore 
                        name={ this.state.user.name }
                        faces={ this.state.faces } 
                      />
                      <UserStats 
                        userEntries = { this.state.user.entries }
                      />
                      <ImageLinkForm 
                        onInputChange={ this.onInputChange } 
                        onButtonSubmit={ this.onPictureSubmit }
                      />
                    </Col>

                    <Col id="image-container" style={{ alignItems: "center" }} xs={12} sm={6}>
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
                      loadUser= { this.loadUser }
                    />
                  : <Register 
                      onRouteChange={ this.onRouteChange } 
                      loadUser= { this.loadUser }
                    />)
              )
            : <Loader /> 
          }
        </Container>
      </div>
    );
  }
}

export default App;
