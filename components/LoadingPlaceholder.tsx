import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { useEffect } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface LoadingPlaceholderProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
}

export default function LoadingPlaceholder({ 
  width = SCREEN_WIDTH - 32, 
  height = 20,
  borderRadius = 8
}: LoadingPlaceholderProps) {
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0.5, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.placeholder,
        { width, height, borderRadius },
        animatedStyle,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: '#f1f5f9',
  },
});