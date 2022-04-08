import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
    <Image source={require('../assets/newbarber.png')} style={styles.image} />
);

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 206,
        marginBottom: 12,
    },
});

export default memo(Logo);
