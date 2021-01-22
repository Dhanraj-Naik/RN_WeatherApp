import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  ActivityIndicator,
  StatusBar,
  Dimensions,
} from 'react-native';

import getImageForWeather from './utils/getImageForWeather';
import SearchInput from './components/SearchInput';
import { fetchLocationId, fetchWeather } from './utils/api';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      location: '',
      loading: false,
      error: false,
      weather: 'Clear',
      temperature: 0,
    };

  }

  componentDidMount() {
    // this.setState({
    //   weather: 'Clear',
    // }, () => console.log(this.state));
    this.handleUpdateLocation('San Francisco');
  }

  handleUpdateLocation = newLocation => {

    if (!newLocation) return;

    this.setState({
      loading: true,
    }, async () => {
      try {
        const locationId = await fetchLocationId(newLocation);
        console.log('handleUpdateLocation fetchLocationId', locationId);
        const { location, weather, temperature } = await fetchWeather(locationId);
        console.log('handleUpdateLocation fetchWeather', location, weather, temperature);
        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature,
        });
      } catch (error) {
        console.log('handleUpdateLocation error', error);
        this.setState({
          loading: false,
          error: true,
        });
      }
    });

    // this.setState({
    //   location: newLocation,
    // });
  };

  renderContent() {
    const { error } = this.state;
    return (
      <View>
        {error && <Text style={[styles.smallText, styles.textStyle]}>{'Could not load weather, please try a different city. '}</Text>}
        {!error && this.renderInfo()}
      </View>
    );
  }
  renderInfo() {
    const { location, weather, temperature } = this.state;
    return (<View>
      <Text style={[styles.largeText, styles.textStyle]}> {location}</Text>
      <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
      <Text style={[styles.largeText, styles.textStyle]}>{`${Math.round(temperature)}°`} </Text>
    </View>);
  }



  render() {
    const { loading, weather } = this.state;


    return (
      <KeyboardAvoidingView enabled={true} style={styles.container} behavior='padding'>
        <StatusBar barStyle='dark-content' />
        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color='white' size='large' />

            {
              !loading && (
                <View>
                  {this.renderContent()}
                  <SearchInput
                    placeholder='Search any city'
                    onSubmit={this.handleUpdateLocation}
                  />
                </View>
              )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 1,
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
  },
  image: {
    flex: 1,
    width: null,
    // width: Dimensions.get('window').width,
    height: null,
    // height: Dimensions.get('window').height,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.15)"
  },
  textStyle: {
    textAlign: 'center',
    color: 'white',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
  },
  sizeSmall: {
    fontSize: 20,
  },
  sizeBig: {
    fontSize: 45,
  },
});
