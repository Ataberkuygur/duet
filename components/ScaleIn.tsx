import { PropsWithChildren } from 'react';
import Animated, { 
  FadeIn,
  FadeOut,
  withDelay,
  withSpring,
  withTiming
} from 'react-native-reanimated';

interface ScaleInProps extends PropsWithChildren {
  delay?: number;
}

export default function ScaleIn({ children, delay = 0 }: ScaleInProps) {
  return (
    <Animated.View
      entering={withDelay(
        delay,
        FadeIn.duration(400)
          .withInitialValues({ transform: [{ scale: 0.8 }] })
          .springify()
          .damping(12)
          .stiffness(100)
      )}
      exiting={FadeOut.duration(300).withInitialValues({ transform: [{ scale: 1 }] })}
    >
      {children}
    </Animated.View>
  );
}