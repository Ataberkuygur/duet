import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronRight, CalendarCheck, CreditCard, ShoppingBag, Heart, MessageCircle, Users, Settings, Bell, Gift, Chrome as Home } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import AnimatedCard from '@/components/AnimatedCard';
import AnimatedQuickAction from '@/components/AnimatedQuickAction';
import FadeIn from '@/components/FadeIn';
import StaggeredList from '@/components/StaggeredList';
import Animated, { FadeInDown } from 'react-native-reanimated';

const SCREEN_WIDTH = Dimensions.get('window').width;
const isWeb = Platform.OS === 'web';

const today = new Date();
const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
const formattedDate = today.toLocaleDateString('en-US', dateOptions);

const QUICK_ACTIONS = [
  {
    id: '1',
    title: 'Add Expense',
    icon: CreditCard,
    color: '#6366f1',
    route: '/finances'
  },
  {
    id: '2',
    title: 'Shopping List',
    icon: ShoppingBag,
    color: '#ec4899',
    route: '/lists'
  },
  {
    id: '3',
    title: 'Send Love',
    icon: Heart,
    color: '#ef4444',
    route: '/connect'
  },
  {
    id: '4',
    title: 'Calendar',
    icon: CalendarCheck,
    color: '#22c55e',
    route: '/calendar'
  },
  {
    id: '5',
    title: 'Messages',
    icon: MessageCircle,
    color: '#8b5cf6',
    route: '/messages'
  },
  {
    id: '6',
    title: 'Reminders',
    icon: Bell,
    color: '#f97316',
    route: '/reminders'
  },
  {
    id: '7',
    title: 'Friends',
    icon: Users,
    color: '#06b6d4',
    route: '/friends'
  },
  {
    id: '8',
    title: 'Occasions',
    icon: Gift,
    color: '#f43f5e',
    route: '/occasions'
  }
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [partner, setPartner] = useState({ 
    name: 'Alex', 
    profileImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    lastActive: '2 min ago',
    mood: '😊 Feeling great'
  });

  const containerPadding = 16;
  const gridGap = 8;
  const numColumns = 4;
  const availableWidth = SCREEN_WIDTH - (containerPadding * 2);
  const itemWidth = (availableWidth - (gridGap * (numColumns - 1))) / numColumns;

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
      <FadeIn>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.userInfo}>
              <Text style={[styles.welcomeText, { color: colors.textSecondary }]}>Welcome back,</Text>
              <Text style={[styles.userName, { color: colors.text }]}>Sarah</Text>
              <Text style={[styles.dateText, { color: colors.textSecondary }]}>{formattedDate}</Text>
            </View>
            <View style={styles.profileImagesContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' }}
                style={styles.userProfileImage}
              />
              <View style={styles.partnerStatus}>
                <Image
                  source={{ uri: partner.profileImage }}
                  style={[styles.userProfileImage, styles.partnerProfileImage]}
                />
                <View style={styles.onlineIndicator} />
              </View>
            </View>
          </View>
        </View>
      </FadeIn>

      <AnimatedCard delay={200}>
        <View style={[styles.partnerCard, { backgroundColor: colors.surface }]}>
          <View style={styles.partnerInfo}>
            <Text style={[styles.partnerStatus, { color: colors.textSecondary }]}>
              {partner.name} • {partner.lastActive}
            </Text>
            <Text style={[styles.partnerMood, { color: colors.text }]}>{partner.mood}</Text>
          </View>
          <TouchableOpacity 
            style={[styles.messageButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/connect')}
          >
            <MessageCircle size={20} color={colors.background} />
          </TouchableOpacity>
        </View>
      </AnimatedCard>

      <AnimatedCard delay={400}>
        <View style={styles.upcomingContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Today's Overview</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.overviewCardsContainer}
          >
            <StaggeredList index={0} baseDelay={500}>
              <View style={[styles.overviewCard, { backgroundColor: colors.cardHighlight }]}>
                <View style={styles.overviewCardHeader}>
                  <CreditCard size={20} color={colors.primary} />
                  <Text style={[styles.overviewCardLabel, { color: colors.primary }]}>Expenses</Text>
                </View>
                <Text style={[styles.overviewCardTitle, { color: colors.text }]}>$245.50</Text>
                <Text style={[styles.overviewCardSubtitle, { color: colors.textSecondary }]}>Spent this week</Text>
              </View>
            </StaggeredList>

            <StaggeredList index={1} baseDelay={500}>
              <View style={[styles.overviewCard, { backgroundColor: colors.cardHighlight }]}>
                <View style={styles.overviewCardHeader}>
                  <ShoppingBag size={20} color={colors.secondary} />
                  <Text style={[styles.overviewCardLabel, { color: colors.secondary }]}>Shopping</Text>
                </View>
                <Text style={[styles.overviewCardTitle, { color: colors.text }]}>4 items</Text>
                <Text style={[styles.overviewCardSubtitle, { color: colors.textSecondary }]}>On your list</Text>
              </View>
            </StaggeredList>

            <StaggeredList index={2} baseDelay={500}>
              <View style={[styles.overviewCard, { backgroundColor: colors.cardHighlight }]}>
                <View style={styles.overviewCardHeader}>
                  <CalendarCheck size={20} color={colors.success} />
                  <Text style={[styles.overviewCardLabel, { color: colors.success }]}>Events</Text>
                </View>
                <Text style={[styles.overviewCardTitle, { color: colors.text }]}>2 events</Text>
                <Text style={[styles.overviewCardSubtitle, { color: colors.textSecondary }]}>Coming up</Text>
              </View>
            </StaggeredList>
          </ScrollView>
        </View>
      </AnimatedCard>

      <View style={[styles.quickActionsContainer, { paddingHorizontal: containerPadding }]}>
        <FadeIn delay={600}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
        </FadeIn>
        <View style={[styles.quickActionsGrid, { gap: gridGap }]}>
          {QUICK_ACTIONS.map((action, index) => (
            <AnimatedQuickAction
              key={action.id}
              index={index}
              onPress={() => router.push(action.route)}
            >
              <View
                style={[
                  styles.quickActionItem,
                  {
                    backgroundColor: `${action.color}10`,
                    width: itemWidth,
                  }
                ]}
              >
                <View style={[styles.actionIconContainer, { backgroundColor: `${action.color}20` }]}>
                  <action.icon size={24} color={action.color} />
                </View>
                <Text style={[styles.quickActionText, { color: colors.text }]}>{action.title}</Text>
              </View>
            </AnimatedQuickAction>
          ))}
        </View>
      </View>

      <AnimatedCard delay={800}>
        <View style={styles.activityContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.activityList}>
            <StaggeredList index={0} baseDelay={900}>
              <View style={[styles.activityItem, { borderBottomColor: colors.border }]}>
                <Image
                  source={{ uri: partner.profileImage }}
                  style={styles.activityAvatar}
                />
                <View style={styles.activityContent}>
                  <Text style={[styles.activityText, { color: colors.text }]}>
                    <Text style={[styles.activityName, { color: colors.text }]}>{partner.name}</Text> added Netflix subscription to shared expenses
                  </Text>
                  <Text style={[styles.activityTime, { color: colors.textSecondary }]}>15 minutes ago</Text>
                </View>
                <Text style={[styles.activityAmount, { color: colors.primary }]}>$14.99</Text>
              </View>
            </StaggeredList>

            <StaggeredList index={1} baseDelay={900}>
              <View style={[styles.activityItem, { borderBottomColor: colors.border }]}>
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' }}
                  style={styles.activityAvatar}
                />
                <View style={styles.activityContent}>
                  <Text style={[styles.activityText, { color: colors.text }]}>
                    <Text style={[styles.activityName, { color: colors.text }]}>You</Text> completed "Fix bathroom sink" task
                  </Text>
                  <Text style={[styles.activityTime, { color: colors.textSecondary }]}>1 hour ago</Text>
                </View>
              </View>
            </StaggeredList>
          </View>
        </View>
      </AnimatedCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  userInfo: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: 'Inter-Regular',
  },
  userName: {
    fontSize: 24,
    marginBottom: 4,
    fontFamily: 'Inter-Bold',
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  profileImagesContainer: {
    alignItems: 'flex-end',
  },
  userProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  partnerStatus: {
    position: 'relative',
  },
  onlineIndicator: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  partnerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  partnerInfo: {
    flex: 1,
  },
  partnerMood: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  messageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
    fontFamily: 'Inter-SemiBold',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  quickActionItem: {
    aspectRatio: 1,
    borderRadius: 16,
    padding: 8,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    lineHeight: 13,
  },
  upcomingContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  overviewCardsContainer: {
    paddingHorizontal: 16,
  },
  overviewCard: {
    width: SCREEN_WIDTH * 0.4,
    padding: 16,
    borderRadius: 16,
    marginRight: 12,
  },
  overviewCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  overviewCardLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  overviewCardTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  overviewCardSubtitle: {
    fontSize: 14,
  },
  activityContainer: {
    paddingBottom: 24,
  },
  activityList: {
    paddingHorizontal: 20,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  activityAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    lineHeight: 20,
  },
  activityName: {
    fontWeight: '600',
  },
  activityTime: {
    fontSize: 12,
    marginTop: 4,
  },
  activityAmount: {
    fontSize: 14,
    fontWeight: '600',
  },
});