import { PropsWithChildren } from 'react';
import Animated, { 
  FadeIn,
  FadeOut,
  withDelay,
  withSpring
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

interface AnimatedCardProps extends PropsWithChildren {
  delay?: number;
}

export default function AnimatedCard({ children, delay = 0 }: AnimatedCardProps) {
  return (
    <Animated.View
      entering={withDelay(
        delay,
        FadeIn.duration(400)
          .withInitialValues({ transform: [{ scale: 0.95 }] })
          .springify()
          .damping(12)
          .stiffness(100)
      )}
      exiting={FadeOut.duration(300)}
      style={styles.container}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
});