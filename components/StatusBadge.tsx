import { View, Text, StyleSheet } from 'react-native';

type StatusType = 'pending' | 'completed' | 'overdue' | 'upcoming';

type StatusBadgeProps = {
  status: StatusType;
  size?: 'small' | 'medium' | 'large';
};

export default function StatusBadge({ status, size = 'medium' }: StatusBadgeProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return '#22C55E'; // green
      case 'pending':
        return '#F97316'; // orange
      case 'overdue':
        return '#EF4444'; // red
      case 'upcoming':
        return '#8B5CF6'; // purple
      default:
        return '#94a3b8'; // gray
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'Pending';
      case 'overdue':
        return 'Overdue';
      case 'upcoming':
        return 'Upcoming';
      default:
        return 'Unknown';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: { paddingVertical: 2, paddingHorizontal: 6 },
          text: { fontSize: 10 }
        };
      case 'large':
        return {
          container: { paddingVertical: 6, paddingHorizontal: 12 },
          text: { fontSize: 14 }
        };
      default: // medium
        return {
          container: { paddingVertical: 4, paddingHorizontal: 8 },
          text: { fontSize: 12 }
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <View 
      style={[
        styles.container, 
        { backgroundColor: `${getStatusColor()}15` },
        sizeStyles.container
      ]}
    >
      <View style={[styles.dot, { backgroundColor: getStatusColor() }]} />
      <Text 
        style={[
          styles.text, 
          { color: getStatusColor() },
          sizeStyles.text
        ]}
      >
        {getStatusText()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  text: {
    fontWeight: '500',
  },
});