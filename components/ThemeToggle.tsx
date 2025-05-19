import { TouchableOpacity, StyleSheet } from 'react-native';
import { Sun, Moon } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export default function ThemeToggle() {
  const { isDark, toggleTheme, colors } = useTheme();

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: withSpring(isDark ? colors.cardHighlight : colors.surface),
    transform: [
      { 
        rotate: withTiming(`${isDark ? 180 : 0}deg`, { 
          duration: 300 
        })
      },
      { 
        scale: withSpring(1, {
          damping: 12,
          stiffness: 100
        })
      }
    ],
  }));

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={styles.container}
      activeOpacity={0.7}
    >
      <Animated.View style={[styles.iconContainer, animatedStyle]}>
        {isDark ? (
          <Moon size={20} color={colors.primary} />
        ) : (
          <Sun size={20} color={colors.primary} />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginRight: 8,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});