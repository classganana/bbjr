import React from 'react'
import { Text, View } from 'react-native'
import { ArrowLeft, BotIcon } from '../../components/common/SvgComponent/SvgComponent'
import { BotStyle } from './BotScreenStyle'
import { BotIntroduction } from '../../components/bot/BotIntroduction'

export const BotScreen = () => {
    return (
        <View style={BotStyle.container}>
            <View style={BotStyle.header}>
                <View style={BotStyle.headerIcon}>
                    <ArrowLeft height={24} width={24} fill={'red'} />
                    <BotIcon height={32} width={32} fill={'red'} />
                </View>
                <View>
                    <Text style={BotStyle.headerTitle}>Zeal</Text>
                    <Text style={BotStyle.headerTitleInfo}>• online</Text>
                </View>
            </View>
            <View style={{flex: 1}}>
                <BotIntroduction />
            </View>
        </View>
    )
}
