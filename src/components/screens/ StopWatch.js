import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
export default class StopWatch extends Component {

  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      second_duration: 0,
      startDisable: false,
      count: 1
    };
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onButtonStart = () => {
    this.timer = setInterval(() => {
      const { second_duration, count } = this.state;
    
      const tempSecondDuration  = count + (second_duration);
      this.setState({
        second_duration: tempSecondDuration >= 0 ? tempSecondDuration : 0
      });
      if (tempSecondDuration <= 0) {
        clearInterval(this.timer);
        this.setState({
          count: 1,
          startDisable: false
        });
      }
    }, 1000);
    this.setState({ startDisable: true })
  }


  onButtonStop = () => {
    clearInterval(this.timer);
    this.setState({ startDisable: false })
  }


  onButtonClear = () => {
    clearInterval(this.timer);
    this.setState({
      second_duration: 0,
      count:1,
      startDisable:false

    });
  }

  _changeTimeInterval(num) {
    const { count } = this.state;
    const newCount = (parseInt(count)+parseInt(num));
    if (newCount <= 10 && newCount >= -10) {
      this.setState({
        count: newCount 
      });
    }  
  }

  _renderTimer(duration) {
    let hours   = Math.floor(duration / 3600);
    let minutes = Math.floor((duration - (hours * 3600)) / 60);
    let seconds = duration - (hours * 3600) - (minutes * 60);

    if (hours < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return `${hours}:${minutes}:${seconds}`;
  }


  
  render() {
    const { second_duration } = this.state;
    return (
      <View style={styles.MainContainer}>
       <Text style={styles.counterText}>{this._renderTimer(second_duration)}</Text> 
        <TouchableOpacity
          onPress={this.state.startDisable ? this.onButtonStop : this.onButtonStart}
          activeOpacity={0.6}
          style={[styles.button, { backgroundColor: '#FF6F00' }]}
        >
          <Text style={styles.buttonText}>{this.state.startDisable ? "PAUSE" : "START"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.onButtonClear}
          activeOpacity={0.6}
          style={[styles.button, { backgroundColor: '#FF6F00' }]}
        >
          <Text style={styles.buttonText}> STOP </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={this._changeTimeInterval.bind(this, 1)}
            activeOpacity={0.6}
            style={styles.stepper_buttons}
          >
            <Text style={styles.buttonText}> + </Text>
          </TouchableOpacity>
          <Text style={styles.counterText}>{this.state.count}</Text>
          <TouchableOpacity
            onPress={this._changeTimeInterval.bind(this, -1)}
            activeOpacity={0.6}
            style={styles.stepper_buttons}
          >
            <Text style={styles.buttonText}> - </Text>
          </TouchableOpacity>

        </View>
      </View>

    );
  }
}



const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
  },
  button: {
    width: '80%',
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 7,
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20
  },
  counterText: {
    fontSize: 28,
    color: '#000'
  },
  stepper_buttons: {
    width: '20%',
    paddingTop: 8,
    paddingBottom: 8,
    marginHorizontal: 8,
    borderRadius: 7,
    marginTop: 10,
    backgroundColor: '#FF6F00'
  },
  counterText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 20,

  },
});

