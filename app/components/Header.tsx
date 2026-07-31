import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../styles/colors";

interface HeaderProps {
    pauseGame: () => void,
    reloadGame: () => void,
    children: React.ReactNode,
    isPaused: boolean
}


export default function Header({
    pauseGame,
    reloadGame,
    children,
    isPaused
}: HeaderProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={reloadGame}>
                <Ionicons name="reload-circle" size={35} color={colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity onPress={pauseGame}>
                <FontAwesome
                    name={isPaused ? "play-circle" : "pause-circle"}
                    size={35}
                    color={colors.primary}
                />
            </TouchableOpacity>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.05,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderColor: colors.secondary,
        borderWidth: 12,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomWidth: 0,
        padding: 15,
        backgroundColor: colors.secondary
    }
})