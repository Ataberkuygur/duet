import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useSubscription } from '@/hooks/useSubscription';

interface BrandLogoProps {
  size?: 'small' | 'medium' | 'large';
}

export default function BrandLogo({ size = 'medium' }: BrandLogoProps) {
  const { isDark, colors } = useTheme();
  const { isPro } = useSubscription();
  
  const getSize = () => {
    switch (size) {
      case 'small':
        return { container: 20, text: 20 };
      case 'large':
        return { container: 32, text: 32 };
      default:
        return { container: 24, text: 24 };
    }
  };

  const sizeStyle = getSize();

  return (
    <Text style={[
      styles.text,
      { fontSize: sizeStyle.text },
      { color: isDark ? '#ffffff' : colors.text }
    ]}>
      Duet{isPro && <Text style={[styles.proText]}>Pro</Text>}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter-ExtraBold',
  },
  proText: {
    backgroundImage: 'linear-gradient(to right, #3B82F6, #8B5CF6, #F87171)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
    marginLeft: 4,
  },
});