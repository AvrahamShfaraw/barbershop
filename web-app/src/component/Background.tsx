import React, { memo } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
} from 'react-native';

type Props = {
    children: React.ReactNode;
};

const Background = ({ children }: Props) => (

    <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
    </KeyboardAvoidingView>

);

const styles = StyleSheet.create({
    container: {
        padding: 28.5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default memo(Background);
