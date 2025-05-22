import React, { forwardRef, useImperativeHandle } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    cancelAnimation,
    Easing,
    runOnJS
} from 'react-native-reanimated';



type ShakeAnimationProps = {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    intensity?: number;
    duration?: number;
};

export type ShakeAnimationRef = {
    shake: () => void;
};

const ShakeAnimation = forwardRef<ShakeAnimationRef, ShakeAnimationProps>(
    ({ children, style, intensity = 8, duration = 300 }, ref) => {
        const offset = useSharedValue(0);

        const animatedStyles = useAnimatedStyle(() => ({
            transform: [
                { translateY: offset.value * 0.4 },
            ],
        }));

        const shake = () => {
            offset.value = withRepeat(
                withTiming(intensity, {
                    duration: duration / 6,
                    easing: Easing.elastic(1.2),
                }),
                3,
                true,
                (finished) => {
                    if (finished) {
                        offset.value = withTiming(0, { duration: duration / 6 });
                    }
                }
            );
        };

        useImperativeHandle(ref, () => ({
            shake,
        }));

        return (
            <Animated.View
                style={[style, animatedStyles, { overflow: 'hidden' }]}
            >
                {children}
            </Animated.View>
        );
    }
);

export default ShakeAnimation;