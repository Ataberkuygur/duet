import { PropsWithChildren } from 'react';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

interface SharedTransitionProps extends PropsWithChildren {}

export default function SharedTransition({ children }: SharedTransitionProps) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(0, {
            damping: 20,
            stiffness: 90,
            mass: 0.5,
          }),
        },
        {
          scale: withSpring(1, {
            damping: 15,
            stiffness: 90,
          }),
        },
      ],
      opacity: withTiming(1, { duration: 150 }),
    };
  });

  return (
    <Animated.View 
      style={[
        styles.container,
        animatedStyle,
        {
          transform: [
            { translateX: 100 },
            { scale: 0.9 },
          ],
          opacity: 0,
        }
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});