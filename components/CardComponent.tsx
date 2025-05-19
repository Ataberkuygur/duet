import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

type CardComponentProps = {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  children?: React.ReactNode;
};

export default function CardComponent({
  title,
  subtitle,
  onPress,
  rightIcon = <ChevronRight size={20} color="#94a3b8" />,
  leftIcon,
  style,
  titleStyle,
  subtitleStyle,
  children,
}: CardComponentProps) {
  const CardContainer = onPress ? TouchableOpacity : View;

  return (
    <CardContainer 
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.header}>
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
        <View style={styles.titleContainer}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
          {subtitle && <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>}
        </View>
        {onPress && rightIcon}
      </View>
      {children && <View style={styles.content}>{children}</View>}
    </CardContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#64748b',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIconContainer: {
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  content: {
    marginTop: 12,
  },
});