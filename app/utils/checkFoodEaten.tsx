import { Coordinate } from "../types/types";

export default function checkFoodEaten(head: Coordinate, food: Coordinate, area: number): boolean {
    const distanceFoodSnakeX: number = Math.abs(head.x - food.x)
    const distanceFoodSnakeY: number = Math.abs(head.y - food.y)
    return distanceFoodSnakeX < area && distanceFoodSnakeY < area
}