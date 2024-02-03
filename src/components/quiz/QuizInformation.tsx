import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../styles/colors';

type Item = {
    id: string;
    title: string;
};

export const QuizInformation = () => {
    const [data, setData] = useState<Item[]>([]);
    useEffect(() => {
        // Fetch your data or set it from any source
        const fetchedData: Item[] = [
            { id: '1', title: '10 point awarded for a correct answer and no marks for a incorrect answer' },
            { id: '2', title: '10 point awarded for a correct answer and no marks for a incorrect answer' },
            { id: '3', title: '10 point awarded for a correct answer and no marks for a incorrect answer' },
        ];
        setData(fetchedData);
    }, []);

    const RenderItem = ({ item }: { item: Item }) => (
        <View key={item.id} style={styles.item}>
            <Text key={item.id+1} style={{fontSize: 40}}>•</Text>
            <Text key={item.id+2}>{item.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                Please read the text below carefully so you can understand it
            </Text>
            {data && data.map((item, index) => {
                return <RenderItem key={index} item={item} />
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 28
    },
    heading: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.black_07
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 4,
        gap: 12,
        alignItems: 'flex-end'
    },
});