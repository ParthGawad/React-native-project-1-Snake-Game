import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { PanGestureHandler } from "react-native-gesture-handler"
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../styles/colors'


const handleGestures = (event: any) => {
  // setting of x,y values (position of finger)
  const { translationX, translationY } = event.nativeEvent
  console.log(translationX, translationY)

  // logic for checking direction
  if (Math.abs(translationX) > Math.abs(translationY)) {
    if (translationX > 0) {
      // moving right  
    } else {
      // moving left
    }
  }
}

const Game = () => {
  return (
    <PanGestureHandler onGestureEvent={handleGestures}>
      <SafeAreaView style={styles.container}>
        <Text>Game</Text>
      </SafeAreaView>
    </PanGestureHandler>
  )
}

export default Game

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: "100%",
    height: "100%"
  }
}) 