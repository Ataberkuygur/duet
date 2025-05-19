import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Check, X, CreditCard, Shield, Zap, Users, Crown } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useSubscription } from '@/hooks/useSubscription';
import AnimatedCard from '@/components/AnimatedCard';
import FadeIn from '@/components/FadeIn';
import StaggeredList from '@/components/StaggeredList';
import ScaleIn from '@/components/ScaleIn';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const CARD_WIDTH = Math.min(SCREEN_WIDTH - 32, 400);

export default function SubscriptionScreen() {
  const { colors } = useTheme();
  const { plan, updatePlan } = useSubscription();
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const handleUpgrade = () => {
    setShowConfirmation(true);
  };
  
  const handleDowngrade = () => {
    updatePlan('free');
  };
  
  const confirmUpgrade = () => {
    updatePlan('pro');
    setShowConfirmation(false);
  };
  
  const renderFeatureItem = (text: string, included: boolean) => (
    <View style={styles.featureItem}>
      {included ? (
        <View style={[styles.checkContainer, { backgroundColor: `${colors.success}15` }]}>
          <Check size={16} color={colors.success} />
        </View>
      ) : (
        <View style={[styles.checkContainer, { backgroundColor: `${colors.error}15` }]}>
          <X size={16} color={colors.error} />
        </View>
      )}
      <Text style={[
        styles.featureText, 
        { 
          color: included ? colors.text : colors.textSecondary,
          opacity: included ? 1 : 0.7
        }
      ]}>
        {text}
      </Text>
    </View>
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <FadeIn>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Choose Your Plan</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Select the perfect plan for your needs
          </Text>
        </View>
      </FadeIn>

      <View style={styles.plansContainer}>
        <StaggeredList index={0} baseDelay={200}>
          <View style={[
            styles.planCard,
            { 
              backgroundColor: colors.card,
              borderColor: plan === 'free' ? colors.primary : colors.border,
            }
          ]}>
            <View style={styles.planHeader}>
              <View style={[styles.planIconContainer, { backgroundColor: `${colors.secondary}15` }]}>
                <Users size={24} color={colors.secondary} />
              </View>
              <Text style={[styles.planName, { color: colors.text }]}>Free Plan</Text>
              {plan === 'free' && (
                <View style={[styles.currentBadge, { backgroundColor: `${colors.success}15` }]}>
                  <Text style={[styles.currentBadgeText, { color: colors.success }]}>Current Plan</Text>
                </View>
              )}
            </View>

            <View style={styles.priceContainer}>
              <Text style={[styles.price, { color: colors.text }]}>$0</Text>
              <Text style={[styles.period, { color: colors.textSecondary }]}>/month</Text>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.featuresContainer}>
              {renderFeatureItem('Basic profile customization', true)}
              {renderFeatureItem('Standard support', true)}
              {renderFeatureItem('Limited storage (500MB)', true)}
              {renderFeatureItem('Advanced features', false)}
              {renderFeatureItem('Priority support', false)}
              {renderFeatureItem('Unlimited storage', false)}
            </View>

            <TouchableOpacity 
              style={[
                styles.planButton,
                { backgroundColor: colors.surface },
              ]}
              disabled={plan === 'free'}
            >
              <Text style={[styles.planButtonText, { color: colors.textSecondary }]}>
                {plan === 'free' ? 'Current Plan' : 'Select Plan'}
              </Text>
            </TouchableOpacity>
          </View>
        </StaggeredList>

        <StaggeredList index={1} baseDelay={200}>
          <View style={[
            styles.planCard,
            { 
              backgroundColor: colors.card,
              borderColor: plan === 'pro' ? colors.primary : colors.border,
            }
          ]}>
            <View style={[styles.recommendedBadge, { backgroundColor: colors.primary }]}>
              <Text style={[styles.recommendedText, { color: colors.background }]}>Recommended</Text>
            </View>

            <View style={styles.planHeader}>
              <View style={[styles.planIconContainer, { backgroundColor: `${colors.primary}15` }]}>
                <Crown size={24} color={colors.primary} />
              </View>
              <Text style={[styles.planName, { color: colors.text }]}>Pro Plan</Text>
              {plan === 'pro' && (
                <View style={[styles.currentBadge, { backgroundColor: `${colors.success}15` }]}>
                  <Text style={[styles.currentBadgeText, { color: colors.success }]}>Current Plan</Text>
                </View>
              )}
            </View>

            <View style={styles.priceContainer}>
              <Text style={[styles.price, { color: colors.text }]}>$10</Text>
              <Text style={[styles.period, { color: colors.textSecondary }]}>/month</Text>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.featuresContainer}>
              {renderFeatureItem('Everything in Free Plan', true)}
              {renderFeatureItem('Advanced profile customization', true)}
              {renderFeatureItem('Priority support 24/7', true)}
              {renderFeatureItem('Unlimited storage', true)}
              {renderFeatureItem('Custom themes', true)}
              {renderFeatureItem('API access', true)}
            </View>

            <TouchableOpacity 
              style={[
                styles.planButton,
                {
                  backgroundColor: plan === 'pro' ? colors.surface : colors.primary,
                }
              ]}
              onPress={plan === 'free' ? handleUpgrade : handleDowngrade}
            >
              <Text 
                style={[
                  styles.planButtonText,
                  { color: plan === 'pro' ? colors.textSecondary : colors.background }
                ]}
              >
                {plan === 'pro' ? 'Current Plan' : 'Upgrade Now'}
              </Text>
            </TouchableOpacity>
          </View>
        </StaggeredList>
      </View>

      {showConfirmation && (
        <ScaleIn>
          <View style={[styles.modalOverlay, { backgroundColor: colors.overlay }]}>
            <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
              <View style={[styles.modalIconContainer, { backgroundColor: `${colors.primary}15` }]}>
                <CreditCard size={32} color={colors.primary} />
              </View>
              
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Upgrade to Pro Plan
              </Text>
              
              <Text style={[styles.modalDescription, { color: colors.textSecondary }]}>
                You'll be charged $10/month for the Pro Plan. Continue with payment?
              </Text>

              <View style={[styles.securePayment, { backgroundColor: `${colors.success}15` }]}>
                <Shield size={20} color={colors.success} />
                <Text style={[styles.securePaymentText, { color: colors.success }]}>
                  Secure Payment
                </Text>
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton, { backgroundColor: colors.surface }]}
                  onPress={() => setShowConfirmation(false)}
                >
                  <Text style={[styles.modalButtonText, { color: colors.textSecondary }]}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.modalButton, styles.confirmButton, { backgroundColor: colors.primary }]}
                  onPress={confirmUpgrade}
                >
                  <Text style={[styles.modalButtonText, { color: colors.background }]}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScaleIn>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
    ...(isWeb && {
      maxWidth: 1200,
      alignSelf: 'center',
      width: '100%',
    }),
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
    maxWidth: 500,
  },
  plansContainer: {
    flexDirection: isWeb ? 'row' : 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    gap: 24,
    ...(isWeb && {
      flexWrap: 'wrap',
    }),
  },
  planCard: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 2,
    position: 'relative',
    flex: 1,
    minWidth: isWeb ? 350 : 'auto',
    maxWidth: isWeb ? 450 : undefined,
    ...(isWeb && {
      transition: 'all 0.3s ease',
    }),
  },
  recommendedBadge: {
    position: 'absolute',
    top: -12,
    right: 24,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recommendedText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 8,
  },
  planIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  planName: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    flex: 1,
  },
  currentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  currentBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 24,
  },
  price: {
    fontSize: 40,
    fontFamily: 'Inter-Bold',
  },
  period: {
    fontSize: 16,
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
  divider: {
    height: 1,
    marginBottom: 24,
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureText: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  planButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    ...(isWeb && {
      cursor: 'pointer',
      transition: 'transform 0.2s ease',
    }),
  },
  planButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  modalIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
  },
  securePayment: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 24,
  },
  securePaymentText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});