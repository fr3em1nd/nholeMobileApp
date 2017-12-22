// @flow

import React, { Component } from 'react';
import { View, Text, TextInput, Keyboard, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import type { NavigationScreenProp } from 'react-navigation';

import { Page, Checkbox, FullButton } from 'nholeMobileApp/src/components';
import { sendMessage } from '../../modules/Message/actions';
import navigationHeader from '../../utils/navigationHeader';

class Message extends Component<DispatchProps & NavigationScreenProp, StateType> {
  static navigationOptions = navigationHeader('Message');

  state = {
    slot: '',
    message: '',
  };

  handleTouchTap = slot => {
    this.setState({ slot });
  };

  sendMessageToClient = () => {
    Keyboard.dismiss();
    this.props.sendMessage(this.state.message, this.state.slot);
  };

  styles = getStyles();

  render() {
    const styles = {
      underlineFocusStyle: {
        borderColor: 'rgb(30,144,255)',
      },
      floatingLabelFocusStyle: {
        color: 'rgb(30,144,255)',
      },
    };
    return (
      <Page backgroundColor={'#fff'}>
        <TextInput
          style={this.styles.message}
          placeholder="Entrez votre message ici :)"
          onChangeText={message => this.setState({ message })}
          underlineColorAndroid="rgb(30,144,255)"
          multiline
        />
        <Text style={this.styles.text}>Choisissez le créneau :</Text>
        <View style={this.styles.container}>
          <View style={this.styles.radioButtons}>
            <Checkbox
              style={this.styles.radioButton}
              text={'Matin'}
              onPress={() => this.handleTouchTap('morning')}
              isChecked={this.state.slot === 'morning' ? true : false}
              isRadioButton
            />
            <Checkbox
              style={this.styles.radioButton}
              text={'Midi'}
              onPress={() => this.handleTouchTap('lunch')}
              isChecked={this.state.slot === 'lunch' ? true : false}
              isRadioButton
            />
          </View>
          <View style={this.styles.radioButtons}>
            <Checkbox
              style={this.styles.radioButton}
              text={'Après-midi'}
              onPress={() => this.handleTouchTap('afternoon')}
              isChecked={this.state.slot === 'afternoon' ? true : false}
              isRadioButton
            />
            <Checkbox
              style={this.styles.radioButton}
              text={'Soir'}
              onPress={() => this.handleTouchTap('evening')}
              isChecked={this.state.slot === 'evening' ? true : false}
              isRadioButton
            />
          </View>
        </View>
        <View style={this.styles.buttonsContainer}>
          <FullButton onPress={this.sendMessageToClient} title="Envoyer" disabled={!this.state.slot} />
          <FullButton
            onPress={() => this.props.navigation.navigate('clients')}
            title="Voir mes clients"
            secondaryButton
          />
        </View>
      </Page>
    );
  }
}

const getStyles = () =>
  StyleSheet.create({
    container: {
      marginVertical: 15,
      flexDirection: 'row',
    },
    radioButtons: {
      width: 150,
    },
    radioButton: {
      marginVertical: 5,
    },
    message: {
      height: 140,
      fontSize: 18,
    },
    text: {
      fontSize: 20,
      marginTop: 8,
    },
    buttonsContainer: {
      height: 100,
      justifyContent: 'space-around',
      alignItems: 'center',
    },
  });

type StateType = {
  slot: string,
  message: string,
};

type DispatchProps = {
  sendMessage: Function,
};

const mapDispatchToProps: DispatchProps = {
  sendMessage,
};

export default connect(null, mapDispatchToProps)(Message);
