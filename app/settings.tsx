import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Bell, Shield, Key, CircleHelp as HelpCircle, Info, ChevronRight, LogOut, CircleUser as UserCircle, Mail, Phone, Crown } from 'lucide-react-native';
import { router } from 'expo-router';
import { useSubscription } from '@/hooks/useSubscription';
import AnimatedCard from '@/components/AnimatedCard';
import FadeIn from '@/components/FadeIn';
import StaggeredList from '@/components/StaggeredList';

export default function SettingsScreen() {
  const { colors } = useTheme();
  const { plan } = useSubscription();
  
  const renderSettingsItem = (
    icon: React.ReactNode,
    title: string,
    subtitle?: string,
    rightElement?: React.ReactNode,
    onPress?: () => void
  ) => (
    <TouchableOpacity 
      style={[styles.settingsItem, { borderBottomColor: colors.border }]}
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${colors.primary}15` }]}>
        {icon}
      </View>
      <View style={styles.settingsItemContent}>
        <Text style={[styles.settingsItemTitle, { color: colors.text }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.settingsItemSubtitle, { color: colors.textSecondary }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {rightElement || <ChevronRight size={20} color={colors.textSecondary} />}
    </TouchableOpacity>
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <AnimatedCard>
        <View style={[styles.profileSection, { backgroundColor: colors.card }]}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.text }]}>Sarah Johnson</Text>
            <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>
              sarah.j@example.com
            </Text>
          </View>
          <TouchableOpacity 
            style={[styles.editButton, { backgroundColor: colors.primary }]}
            onPress={() => {}}
          >
            <Text style={[styles.editButtonText, { color: colors.background }]}>Edit</Text>
          </TouchableOpacity>
        </View>
      </AnimatedCard>

      {/* Subscription Section */}
      <View style={styles.section}>
        <FadeIn delay={200}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Subscription</Text>
        </FadeIn>
        <StaggeredList index={0} baseDelay={300}>
          <View style={[styles.sectionContent, { backgroundColor: colors.card }]}>
            {renderSettingsItem(
              <Crown size={24} color={colors.primary} />,
              'Manage Subscription',
              `Currently on ${plan === 'pro' ? 'Pro Plan' : 'Free Plan'}`,
              undefined,
              () => router.push('/subscription')
            )}
          </View>
        </StaggeredList>
      </View>

      {/* Account Settings */}
      <View style={styles.section}>
        <FadeIn delay={400}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
        </FadeIn>
        <View style={[styles.sectionContent, { backgroundColor: colors.card }]}>
          {['personal', 'email', 'phone'].map((setting, index) => (
            <StaggeredList key={setting} index={index} baseDelay={500}>
              {setting === 'personal' && renderSettingsItem(
                <UserCircle size={24} color={colors.primary} />,
                'Personal Information',
                'Manage your personal details'
              )}
              {setting === 'email' && renderSettingsItem(
                <Mail size={24} color={colors.secondary} />,
                'Email Settings',
                'Manage email preferences'
              )}
              {setting === 'phone' && renderSettingsItem(
                <Phone size={24} color={colors.success} />,
                'Phone Number',
                '+1 (555) 123-4567'
              )}
            </StaggeredList>
          ))}
        </View>
      </View>

      {/* Notifications */}
      <View style={styles.section}>
        <FadeIn delay={600}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Notifications</Text>
        </FadeIn>
        <StaggeredList index={0} baseDelay={700}>
          <View style={[styles.sectionContent, { backgroundColor: colors.card }]}>
            {renderSettingsItem(
              <Bell size={24} color={colors.warning} />,
              'Push Notifications',
              'Manage your notifications',
              <Switch
                value={true}
                onValueChange={() => {}}
                trackColor={{ false: colors.border, true: `${colors.primary}50` }}
                thumbColor={true ? colors.primary : colors.surface}
              />
            )}
          </View>
        </StaggeredList>
      </View>

      {/* Security */}
      <View style={styles.section}>
        <FadeIn delay={800}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Security</Text>
        </FadeIn>
        <View style={[styles.sectionContent, { backgroundColor: colors.card }]}>
          {['password', 'privacy'].map((setting, index) => (
            <StaggeredList key={setting} index={index} baseDelay={900}>
              {setting === 'password' && renderSettingsItem(
                <Key size={24} color={colors.error} />,
                'Change Password',
                'Update your password'
              )}
              {setting === 'privacy' && renderSettingsItem(
                <Shield size={24} color={colors.primary} />,
                'Privacy Settings',
                'Manage your privacy'
              )}
            </StaggeredList>
          ))}
        </View>
      </View>

      {/* Support */}
      <View style={styles.section}>
        <FadeIn delay={1000}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Support</Text>
        </FadeIn>
        <View style={[styles.sectionContent, { backgroundColor: colors.card }]}>
          {['help', 'about'].map((setting, index) => (
            <StaggeredList key={setting} index={index} baseDelay={1100}>
              {setting === 'help' && renderSettingsItem(
                <HelpCircle size={24} color={colors.secondary} />,
                'Help Center',
                'Get help and support'
              )}
              {setting === 'about' && renderSettingsItem(
                <Info size={24} color={colors.primary} />,
                'About',
                'Version 1.0.0'
              )}
            </StaggeredList>
          ))}
        </View>
      </View>

      <AnimatedCard delay={1200}>
        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: `${colors.error}15` }]}
          onPress={() => {}}
        >
          <LogOut size={24} color={colors.error} />
          <Text style={[styles.logoutText, { color: colors.error }]}>Log Out</Text>
        </TouchableOpacity>
      </AnimatedCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 24,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  sectionContent: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingsItemContent: {
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: 16,
    marginBottom: 2,
    fontFamily: 'Inter-Medium',
  },
  settingsItemSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});