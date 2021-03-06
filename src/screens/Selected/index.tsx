import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    Platform,
    Alert,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import styles from './styles';
import { useRoute, useNavigation } from '@react-navigation/native'
import Datetimepicker, { Event } from '@react-native-community/datetimepicker';
import waterDrop from '../../assets/waterdrop.png';
import Button from '../../components/Button';
import { isBefore, format } from 'date-fns';
import { PlantProps, savePlant } from '../../Libs/storage';

interface PlantsPropsS {
    item: PlantProps
}

const Selected = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const { item } = route.params as PlantsPropsS;
    const [selectedTime, setSelectedTime] = useState(new Date);
    const [showDatePicker, setShowDatePicker] = useState(true);

    const handleSave = async () => {
        // const data = await loadPlant();
        // console.log(data);
        try {
            await savePlant({
                ...item,
                dateNotificationTime: selectedTime
            })
            navigation.navigate("Confirmation", {
                title: "Prontinho",
                subTitle: "Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado",
                buttonTitle: "Muito obrigado :D",
                icon: "hug",
                screen: "MyPlants"
            })
        } catch (error) {
            Alert.alert("Escolha uma hora do futuro!")
        }
    }

    const handleSetTime = (Event: Event, dateTime: Date | undefined) => {
        if (Platform.OS === "android") {
            setShowDatePicker(oldValue => !oldValue);
        }

        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectedTime(new Date());
            return Alert.alert("Escolha uma hora do futuro!")
        }

        if (dateTime)
            setSelectedTime(dateTime)
    }

    const handlePicker = () => {
        setShowDatePicker(oldValue => !oldValue)
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.plantInfo}>
                    <SvgFromUri
                        uri={item.photo}
                        height={150}
                        width={150}
                    />
                    <Text style={styles.nameOfPlant}>{item.name}</Text>

                    <Text>{item.about}</Text>
                </View>

                <View style={styles.controllers}>
                    <View style={styles.tipContainer}>
                        <Image
                            source={waterDrop}
                            style={styles.tipImage}
                        />
                        <Text style={styles.tipText}>{item.water_tips}</Text>
                    </View>

                    <Text style={styles.alertLabel}>Escolha o melhor horiario</Text>

                    {showDatePicker && (
                        <Datetimepicker
                            value={selectedTime}
                            mode="time"
                            display='spinner'
                            onChange={handleSetTime}
                        />
                    )}

                    <TouchableOpacity style={styles.pcikerButton} onPress={() => handlePicker()}>
                        <Text style={styles.pcikerText}>{`Mudar horário ${format(selectedTime, 'HH:mm')}`}</Text>
                    </TouchableOpacity>

                    <Button title="Cadastrar Planta" onPress={() => handleSave()} />

                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

export default Selected;