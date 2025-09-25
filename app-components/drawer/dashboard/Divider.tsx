import { StyleSheet, View } from "react-native"

export default function Divider () {
    return (
        <View style={styles.divider}/>
    )
}

const styles = StyleSheet.create({
    divider: {
        backgroundColor: '#02081714',
        width: '100%',
        height: 1,
    }
})