import { PropsWithChildren } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { 
  FadeInDown,
  FadeOutUp,
  withDelay
} from 'react-native-reanimated';

interface StaggeredListProps extends PropsWithChildren {
  index: number;
  baseDelay?: number;
  staggerDelay?: number;
}

export default function StaggeredList({ 
  children, 
  index, 
  baseDelay = 300,
  staggerDelay = 50
}: StaggeredListProps) {
  return (
    <Animated.View
      entering={withDelay(
        baseDelay + (index * staggerDelay),
        FadeInDown.springify().damping(12).stiffness(100)
      )}
      exiting={FadeOutUp}
      style={styles.container}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  }
});