import { PropsWithChildren } from 'react';
import Animated, { 
  SlideInRight,
  SlideInLeft,
  SlideInUp,
  SlideInDown,
  SlideOutRight,
  SlideOutLeft,
  SlideOutUp,
  SlideOutDown,
  withDelay
} from 'react-native-reanimated';

interface SlideInProps extends PropsWithChildren {
  delay?: number;
  from?: 'left' | 'right' | 'top' | 'bottom';
}

export default function SlideIn({ children, delay = 0, from = 'right' }: SlideInProps) {
  const getEnteringAnimation = () => {
    switch (from) {
      case 'left':
        return SlideInLeft;
      case 'right':
        return SlideInRight;
      case 'top':
        return SlideInUp;
      case 'bottom':
        return SlideInDown;
      default:
        return SlideInRight;
    }
  };

  const getExitingAnimation = () => {
    switch (from) {
      case 'left':
        return SlideOutLeft;
      case 'right':
        return SlideOutRight;
      case 'top':
        return SlideOutUp;
      case 'bottom':
        return SlideOutDown;
      default:
        return SlideOutRight;
    }
  };

  return (
    <Animated.View
      entering={withDelay(
        delay,
        getEnteringAnimation().springify().damping(15).stiffness(100)
      )}
      exiting={getExitingAnimation()}
    >
      {children}
    </Animated.View>
  );
}