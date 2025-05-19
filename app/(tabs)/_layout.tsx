import { Tabs } from 'expo-router';
import { Chrome as Home, ListChecks, DollarSign, Heart } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import ThemeToggle from '@/components/ThemeToggle';
import BrandLogo from '@/components/BrandLogo';
import HeaderRight from '@/components/HeaderRight';
import SharedTransition from '@/components/SharedTransition';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  withSequence,
  withTiming,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { useState } from 'react';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

function TabButton({ icon: Icon, label, isFocused, onPress }) {
  const { colors } = useTheme();
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { 
          scale: withSpring(isFocused ? 1.1 : 1, {
            damping: 12,
            stiffness: 100
          })
        }
      ],
      opacity: withSpring(isFocused ? 1 : 0.7, {
        damping: 15,
        stiffness: 100
      })
    };
  });

  const handlePress = () => {
    onPress();
  };

  return (
    <AnimatedTouchable
      onPress={handlePress}
      style={[styles.tabButton, animatedStyle]}
      activeOpacity={1}
    >
      <Icon 
        size={24} 
        color={isFocused ? colors.primary : colors.textSecondary} 
      />
      <Animated.Text 
        style={[
          styles.tabLabel,
          { 
            color: isFocused ? colors.primary : colors.textSecondary,
            fontFamily: 'Inter-Medium'
          }
        ]}
      >
        {label}
      </Animated.Text>
    </AnimatedTouchable>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('index');

  const getTabIcon = (name: string) => {
    switch (name) {
      case 'index':
        return Home;
      case 'finances':
        return DollarSign;
      case 'lists':
        return ListChecks;
      case 'connect':
        return Heart;
      default:
        return Home;
    }
  };

  return (
    <SharedTransition>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: {
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom,
            backgroundColor: colors.background,
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarLabelStyle: {
            fontFamily: 'Inter-Medium',
            fontSize: 12,
          },
          headerStyle: {
            backgroundColor: colors.background,
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            height: 70,
          },
          headerTitleStyle: {
            color: colors.text,
            fontFamily: 'Inter-SemiBold',
            fontSize: 18,
          },
          headerRight: () => <HeaderRight />,
          headerLeft: () => (
            <View style={styles.headerLeft}>
              <BrandLogo size="small" />
            </View>
          ),
          headerTitle: () => null,
          tabBarItemStyle: {
            backgroundColor: colors.background,
          },
          tabBarButton: (props) => {
            const { onPress, accessibilityState } = props;
            const isFocused = accessibilityState?.selected;
            const Icon = getTabIcon(route.name);

            return (
              <TabButton
                icon={Icon}
                label={props.children.props.label}
                isFocused={isFocused}
                onPress={() => {
                  setActiveTab(route.name);
                  onPress();
                }}
              />
            );
          },
        })}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="finances"
          options={{
            title: 'Finances',
            tabBarIcon: ({ color, size }) => <DollarSign size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="lists"
          options={{
            title: 'Lists',
            tabBarIcon: ({ color, size }) => <ListChecks size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="connect"
          options={{
            title: 'Connect',
            tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
          }}
        />
      </Tabs>
    </SharedTransition>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    paddingLeft: 16,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});