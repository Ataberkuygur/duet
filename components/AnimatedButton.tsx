import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming
} from 'react-native-reanimated';

interface AnimatedButtonProps {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function AnimatedButton({ 
  onPress, 
  title, 
  style, 
  textStyle,
  disabled 
}: AnimatedButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  const handlePress = () => {
    scale.value = withSequence(
      withTiming(0.9, { duration: 100 }),
      withSpring(1, {
        damping: 15,
        stiffness: 150,
        mass: 0.8
      })
    );
    onPress();
  };

  return (
    <AnimatedTouchable
      onPress={handlePress}
      style={[styles.button, style, animatedStyle]}
      activeOpacity={1}
      disabled={disabled}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});