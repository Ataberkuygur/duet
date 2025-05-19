import { PropsWithChildren } from 'react';
import Animated, { 
  FadeIn,
  FadeOut,
  withDelay,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

interface TabScreenTransitionProps extends PropsWithChildren {
  active: boolean;
}

export default function TabScreenTransition({ children, active }: TabScreenTransitionProps) {
  return (
    <Animated.View
      entering={FadeIn.duration(300)
        .withInitialValues({ 
          transform: [
            { translateY: 20 },
            { scale: 0.95 }
          ],
          opacity: 0 
        })
        .springify()
        .damping(15)
        .stiffness(100)
      }
      exiting={FadeOut.duration(200)}
      style={[
        styles.container,
        { display: active ? 'flex' : 'none' }
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