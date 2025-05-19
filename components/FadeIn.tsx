import { PropsWithChildren } from 'react';
import Animated, { 
  FadeIn as RNFadeIn,
  FadeOut,
  withDelay
} from 'react-native-reanimated';

interface FadeInProps extends PropsWithChildren {
  delay?: number;
}

export default function FadeIn({ children, delay = 0 }: FadeInProps) {
  return (
    <Animated.View
      entering={withDelay(delay, RNFadeIn.duration(400).springify())}
      exiting={FadeOut.duration(300)}
    >
      {children}
    </Animated.View>
  );
}