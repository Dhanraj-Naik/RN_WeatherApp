import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

export default class SearchInput extends Component {
  constructor() {
    super();
    this.state = {
      inputText: '',
    };
  }

  handleChangeText = newLocation => {
    this.setState({
      inputText: newLocation,
    });
  };

  handleSubmitEditing = () => {
    const { onSubmit } = this.props;
    const { inputText } = this.state;

    if (!inputText) {return;}

    onSubmit(inputText);
    this.setState({ inputText: '' });
  };

  render() {
    const { placeholder } = this.props;
    const { inputText } = this.state;

    return (
      <TextInput
        autoCorrect={false}
        placeholder={placeholder}
        value={inputText}
        placeholderTextColor="white"
        style={styles.textInput}
        underlineColorAndroid="transparent"
        clearButtonMode="always"
        onChangeText={this.handleChangeText}
        onSubmitEditing={this.handleSubmitEditing}
      />
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#666',
    color: 'white',
    height: 40,
    width: 300,
    marginTop: 20,
    // marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf: 'center',
    borderRadius: 5,
  },
});
