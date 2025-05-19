import { View, Text, StyleSheet } from 'react-native';
import { TriangleAlert as AlertTriangle } from 'lucide-react-native';

type EmptyStateMessageProps = {
  title: string;
  message: string;
  icon?: React.ReactNode;
};

export default function EmptyStateMessage({ 
  title, 
  message, 
  icon = <AlertTriangle size={40} color="#8B5CF6" /> 
}: EmptyStateMessageProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
});