import { TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring, 
  withSequence,
  withTiming,
  interpolate,
  Extrapolate,
  withDelay
} from 'react-native-reanimated';
import { useEffect } from 'react';

interface AnimatedQuickActionProps {
  children: React.ReactNode;
  onPress?: () => void;
  index: number;
}

export default function AnimatedQuickAction({ children, onPress, index }: AnimatedQuickActionProps) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    const delay = 600 + (index * 100);
    opacity.value = withDelay(delay, withTiming(1, { duration: 500 }));
    scale.value = withDelay(delay, withSpring(1, {
      damping: 12,
      stiffness: 100,
      mass: 0.8
    }));
    rotation.value = withDelay(delay, withSpring(0, {
      damping: 10,
      stiffness: 80
    }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { 
          translateY: interpolate(
            scale.value,
            [0, 1],
            [50, 0],
            Extrapolate.CLAMP
          )
        },
        {
          rotate: `${interpolate(
            rotation.value,
            [0, 1],
            [0, 15],
            Extrapolate.CLAMP
          )}deg`
        }
      ],
      opacity: opacity.value
    };
  });

  const handlePress = () => {
    scale.value = withSequence(
      withTiming(0.9, { duration: 100 }),
      withSpring(1, {
        damping: 15,
        stiffness: 150,
        mass: 0.8
      })
    );
    rotation.value = withSequence(
      withTiming(0.1, { duration: 100 }),
      withSpring(0, {
        damping: 10,
        stiffness: 80
      })
    );
    onPress?.();
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={1}>
      <Animated.View style={animatedStyle}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
}