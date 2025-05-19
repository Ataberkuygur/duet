import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Settings } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { router } from 'expo-router';
import ThemeToggle from './ThemeToggle';

export default function HeaderRight() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <ThemeToggle />
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => router.push('/settings')}
      >
        <Settings size={20} color={colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
  },
  settingsButton: {
    padding: 8,
    marginLeft: 4,
  },
});