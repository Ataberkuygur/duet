import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export type SubscriptionPlan = 'free' | 'pro';

const SUBSCRIPTION_KEY = '@app_subscription_plan';

async function getStoredPlan(): Promise<SubscriptionPlan | null> {
  try {
    if (Platform.OS === 'web') {
      return localStorage.getItem(SUBSCRIPTION_KEY) as SubscriptionPlan;
    } else {
      return await AsyncStorage.getItem(SUBSCRIPTION_KEY) as SubscriptionPlan;
    }
  } catch (e) {
    console.warn('Failed to get stored subscription plan:', e);
    return null;
  }
}

async function storePlan(plan: SubscriptionPlan) {
  try {
    if (Platform.OS === 'web') {
      localStorage.setItem(SUBSCRIPTION_KEY, plan);
    } else {
      await AsyncStorage.setItem(SUBSCRIPTION_KEY, plan);
    }
  } catch (e) {
    console.warn('Failed to store subscription plan:', e);
  }
}

// Initialize with Pro plan
if (Platform.OS === 'web') {
  localStorage.setItem(SUBSCRIPTION_KEY, 'pro');
} else {
  AsyncStorage.setItem(SUBSCRIPTION_KEY, 'pro');
}

export function useSubscription() {
  const [plan, setPlan] = useState<SubscriptionPlan>('pro'); // Set default to pro

  useEffect(() => {
    getStoredPlan().then(savedPlan => {
      if (savedPlan) {
        setPlan(savedPlan);
      }
    });
  }, []);

  const updatePlan = async (newPlan: SubscriptionPlan) => {
    setPlan(newPlan);
    await storePlan(newPlan);
  };

  return {
    plan,
    isPro: plan === 'pro',
    updatePlan,
  };
}