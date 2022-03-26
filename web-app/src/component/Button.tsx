import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

type Props = React.ComponentProps<typeof PaperButton>;

const Button = ({ mode, style, children, ...props }: Props) => (
    <PaperButton
        style={[
            styles.button,
            mode === 'outlined' && { backgroundColor: '#000000' },
            style,
        ]}
        labelStyle={styles.text}
        mode={mode}
        {...props}
    >
        {children}
    </PaperButton>
);

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#062851',
        width: '100%',
        marginVertical: 10,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26,
        color: '#FFFFFF'
    },
});

export default memo(Button);