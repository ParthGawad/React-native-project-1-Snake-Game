import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../styles/colors';
import { Coordinate } from '../types/types';

interface SnakeProps {
    snake: Coordinate[];
}

const Snake = ({ snake }: SnakeProps) => {
    return (
        <>
            {snake.map((segment: Coordinate, index: number) => {
                const segementStyle = { left: segment.x * 10, top: segment.y * 10 };

                return <View key={index} style={[styles.snake, segementStyle]} />
            })}

        </>
    )
}

export default Snake

const styles = StyleSheet.create({
    snake: {
        width: 15,
        height: 15,
        position: "absolute",
        borderRadius: 7,
        backgroundColor: colors.primary
    }
})