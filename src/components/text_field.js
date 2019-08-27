import React from 'react'
import { View, TextInput, Text } from 'react-native'

const TextField = props => (
    <View>
        <TextInput
            placeholder={props.placeholder}
            placeholderTextColor={"white"}
            secureTextEntry={props.secureTextEntry}
            onChangeText={(text) => props.onChangeText(text)}
            onBlur={() => props.onBlur()}
            style={{ color: "white" }}

        />

    </View>
)

export default TextField