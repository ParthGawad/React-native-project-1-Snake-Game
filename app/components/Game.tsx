import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { PanGestureHandler } from "react-native-gesture-handler"
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../styles/colors'
import { Coordinate, Direction } from '../types/types'
import checkFoodEaten from '../utils/checkFoodEaten'
import { checkGameOver } from '../utils/checkGameOver'
import randomFoodPosition from '../utils/randomFoodPosition'
import Food from './Food'
import Header from './Header'
import Snake from './Snake'


// Initial states values of the game
const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 10, y: 10 }
const GAME_BOUNDS = { xMin: 0, xMax: 48, yMin: 0, yMax: 100 };
const MOVE_INTERVAL = 50
const SCORE_INTERVAL = 10;



const Game = () => {

  // states of the game 
  const [direction, setDirection] = useState<Direction>(Direction.Right)
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
  const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION)
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)


  // use effect for game loop, moves snake util game over or game paused
  useEffect(() => {
    if (!isGameOver) {
      const interval = setInterval(() => {
        !isPaused && moveSnake()
      }, MOVE_INTERVAL)
      return () => clearInterval(interval)
    }
  }, [snake, isPaused, isGameOver])


  //gestures logic 
  const handleGestures = (event: any) => {
    // setting of x,y values (position of finger)
    const { translationX, translationY } = event.nativeEvent
    console.log(translationX, translationY)

    // logic for checking direction
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        // moving right 
        setDirection(Direction.Right)
      } else {
        // moving left
        setDirection(Direction.Left)
      }
    } else {
      if (translationY > 0) {
        // moving down
        setDirection(Direction.Down)
      } else {
        // moving up
        setDirection(Direction.Up)
      }
    }
  }


  // snake movement, checks if the snake has eaten the food & game over function
  const moveSnake = () => {
    const snakeHead = snake[0]
    const newHead = { ...snakeHead }

    // game over logic
    if (checkGameOver(snakeHead, GAME_BOUNDS)) {
      setIsGameOver(true)
      console.log("OUT OF BOUNDS AT ", snakeHead)
      return;
    }

    // logic of snake movement
    switch (direction) {
      case Direction.Up:
        newHead.y -= 1
        break;
      case Direction.Down:
        newHead.y += 1
        break;
      case Direction.Left:
        newHead.x -= 1
        break;
      case Direction.Right:
        newHead.x += 1
        break;
    }

    // checks if the food is eaten & appends a new head to the snake
    if (checkFoodEaten(snakeHead, food, 2)) {
      // function to generate random food position
      setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
      // sets the new head of the snake, adding a new head
      setSnake([newHead, ...snake])
      // sets the new score
      setScore(score + SCORE_INTERVAL)
    } else
      setSnake([newHead, ...snake.slice(0, -1)])
  }


  const pauseGame = () => { setIsPaused(!isPaused) }
  const reloadGame = () => {
    setSnake(SNAKE_INITIAL_POSITION)
    setFood(FOOD_INITIAL_POSITION)
    setIsGameOver(false)
    setScore(0)
    setDirection(Direction.Right)
    setIsPaused(false)
  }


  return (
    <PanGestureHandler onGestureEvent={handleGestures}>
      <SafeAreaView style={styles.container}>
        <Header isPaused={isPaused} pauseGame={pauseGame} reloadGame={reloadGame} >
          <Text style={{
            fontSize: 22,
            fontWeight: "bold",
            color: colors.primary
          }}>{score}</Text>
        </Header>
        <View style={styles.boundaries}>
          <Snake snake={snake} />
          <Food x={food.x} y={food.y} />
        </View>
      </SafeAreaView>
    </PanGestureHandler>
  )
}


export default Game

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    width: "100%",
    height: "100%"
  },

  boundaries: {
    flex: 1,
    borderColor: colors.primary,
    borderWidth: 12,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: colors.background,
  }
}) 