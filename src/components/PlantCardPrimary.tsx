import React from 'react';
import {
    Text,
    StyleSheet
} from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import colors from '../styles'
import {
    SvgFromUri
} from 'react-native-svg';

interface PlantsProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
    }
}

export const PlantCardPrimary = ({ data, ...rest }: PlantsProps) => {
    return (
        <RectButton {...rest} style={styles.container}>
            <SvgFromUri uri={data.photo} width={90} height={90}/>
            <Text style={styles.text}>{data.name}</Text>
        </RectButton>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        maxWidth: "45%",
        backgroundColor: colors.shape,
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        margin: 10
    },

    text: {
        color: colors.green_dark,
        fontFamily: "Jost-Bold",
        marginVertical: 16
    }

});

export default PlantCardPrimary;