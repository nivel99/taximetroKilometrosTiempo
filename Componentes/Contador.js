import React,{useEffect, useState} from "react";
import {StyleSheet, View, Text, Button} from 'react-native';
import BackgroundTimer from "react-native-background-timer";

const App = (props) =>{

    const [secondsLeft, setSecondsLeft] = useState(3601)
    const [timerOn, setTimerOn] = useState(false)

    useEffect(() => {
      if(timerOn) startTimer();
      else BackgroundTimer.stopBackgroundTimer();
    
      return () => {
        BackgroundTimer.stopBackgroundTimer();
      }
    }, [timerOn]);

    useEffect(() => {
     if(secondsLeft === 0){
        BackgroundTimer.stopBackgroundTimer();
     }
    }, [secondsLeft])

    useEffect(() => {
        setTimerOn(true)
    }, [])
    
    

    const startTimer = () => {
        BackgroundTimer.runBackgroundTimer(()=>{
            setSecondsLeft((secs) =>{
                if(secs > 0) return secs + 1;
                else return 0;
            });
        },1000);
    };

    const clockify = () =>{
        let hours = 0
        //hours = Math.floor(secondsLeft / 60 / 60)
        let mins = Math.floor(secondsLeft / 60 % 60 )
        let seconds = Math.floor(secondsLeft % 60)

        let displayHours = hours < 10 ? `0${hours}` : hours;
        let displayMins = mins < 10 ? `0${mins}` : mins;
        let displaySecs = seconds < 10 ? `0${seconds}` : seconds;

        return{
            displayHours,
            displayMins,
            displaySecs
        }
    }
    

    return(
        <View style={styles.container} >
            <Text style={styles.time} >
                {clockify().displayHours}:
                {clockify().displayMins}:
                {clockify().displaySecs}
            </Text>
            <Button title="Start/Stop" onPress={()=> setTimerOn((current) => !current ) } ></Button>
        </View>
    )
}

const styles = StyleSheet.create({
   container:{
    backgroundColor:'#000',
    justifyContent:'center',
    alignItems:'center',
    //flex:1
   },
   time:{
    color:'#fff',
    textAlign:'center',
    fontSize:30
   }
})

export default App