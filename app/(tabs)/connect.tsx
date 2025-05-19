import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Pressable, Dimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Heart, MessageCircle, Calendar, Coffee, Smile, Gift, Camera, Send, Upload, CirclePlus as PlusCircle } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import AnimatedCard from '@/components/AnimatedCard';
import FadeIn from '@/components/FadeIn';
import StaggeredList from '@/components/StaggeredList';
import SlideIn from '@/components/SlideIn';

const SCREEN_WIDTH = Dimensions.get('window').width;
const GRID_PADDING = 16;
const GRID_SPACING = 12;
const NUM_COLUMNS = 2;

// Calculate the width for each emotion card - fix calculation to include spacing between cards
const CARD_WIDTH = (SCREEN_WIDTH - (GRID_PADDING * 2) - (GRID_SPACING * (NUM_COLUMNS - 1))) / NUM_COLUMNS;

const EMOTIONS = [
  { id: '1', icon: 'heart', label: 'Love You', color: '#EC4899' },
  { id: '2', icon: 'coffee', label: 'Miss You', color: '#8B5CF6' },
  { id: '3', icon: 'smile', label: 'Thinking of You', color: '#F97316' },
  { id: '4', icon: 'gift', label: 'Surprise', color: '#22C55E' },
];

const MOOD_OPTIONS = [
  { id: '1', label: 'Amazing', emoji: '😁' },
  { id: '2', label: 'Good', emoji: '😊' },
  { id: '3', label: 'Okay', emoji: '😐' },
  { id: '4', label: 'Tired', emoji: '😴' },
  { id: '5', label: 'Stressed', emoji: '😓' },
  { id: '6', label: 'Sad', emoji: '😢' },
];

// Define types for mood object
type Mood = {
  id: string;
  label: string;
  emoji: string;
};

export default function ConnectScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('emotions');
  const [yourMood, setYourMood] = useState<Mood | null>(null);
  const [partnerMood, setPartnerMood] = useState<Mood>({ id: '2', label: 'Good', emoji: '😊' });
  const [message, setMessage] = useState('');
  
  const handleEmotionPress = (emotionId: string) => {
    const emotion = EMOTIONS.find(e => e.id === emotionId);
    if (emotion) {
      alert(`Sent "${emotion.label}" to Alex`);
    }
  };
  
  const handleMoodSelect = (mood: Mood) => {
    setYourMood(mood);
  };
  
  const handleSendMessage = () => {
    if (message.trim()) {
      alert(`Message sent to Alex`);
      setMessage('');
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
      <FadeIn>
        <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Stay Connected</Text>
        </View>
      </FadeIn>
      
      <ScrollView style={styles.scrollContent}>
        <SlideIn from="left" delay={200}>
          <View style={styles.moodContainer}>
            <View style={[styles.moodCard, { backgroundColor: colors.card }]}>
              <View style={styles.moodHeader}>
                <Text style={[styles.moodTitle, { color: colors.textSecondary }]}>Your Mood Today</Text>
                <Text style={styles.moodEmoji}>{yourMood ? yourMood.emoji : '?'}</Text>
              </View>
              <Text style={[styles.moodLabel, { color: colors.text }]}>
                {yourMood ? yourMood.label : 'Not set yet'}
              </Text>
              
              <View style={styles.moodOptions}>
                {MOOD_OPTIONS.map(mood => (
                  <TouchableOpacity
                    key={mood.id}
                    style={[
                      styles.moodOption,
                      { backgroundColor: colors.surface },
                      yourMood?.id === mood.id && [
                        styles.selectedMoodOption,
                        { 
                          backgroundColor: `${colors.primary}15`,
                          borderColor: colors.primary
                        }
                      ]
                    ]}
                    onPress={() => handleMoodSelect(mood)}
                  >
                    <Text style={styles.moodOptionEmoji}>{mood.emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={[styles.moodCard, { backgroundColor: colors.card }]}>
              <View style={styles.moodHeader}>
                <Text style={[styles.moodTitle, { color: colors.textSecondary }]}>Alex's Mood</Text>
                <Text style={styles.moodEmoji}>{partnerMood.emoji}</Text>
              </View>
              <Text style={[styles.moodLabel, { color: colors.text }]}>{partnerMood.label}</Text>
              <Text style={[styles.moodUpdated, { color: colors.textSecondary }]}>Updated 15 minutes ago</Text>
            </View>
          </View>
        </SlideIn>
        
        <SlideIn from="right" delay={400}>
          <View style={styles.emotionsSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Emotions</Text>
            <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
              Let Alex know what you're feeling with one tap
            </Text>
            
            <View style={styles.emotionsGrid}>
              {EMOTIONS.map((emotion, index) => (
                <TouchableOpacity
                  key={emotion.id}
                  style={[
                    styles.emotionButton,
                    { backgroundColor: `${emotion.color}15` }
                  ]}
                  onPress={() => handleEmotionPress(emotion.id)}
                >
                  <View style={[styles.emotionIconContainer, { backgroundColor: emotion.color }]}>
                    {emotion.icon === 'heart' && <Heart size={24} color="#ffffff" />}
                    {emotion.icon === 'coffee' && <Coffee size={24} color="#ffffff" />}
                    {emotion.icon === 'smile' && <Smile size={24} color="#ffffff" />}
                    {emotion.icon === 'gift' && <Gift size={24} color="#ffffff" />}
                  </View>
                  <Text style={[styles.emotionLabel, { color: colors.text }]}>{emotion.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </SlideIn>
        
        <SlideIn from="left" delay={800}>
          <View style={styles.messageContainer}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Message</Text>
            <View style={[styles.messageInputContainer, { backgroundColor: colors.card }]}>
              <TextInput
                style={[styles.messageInput, { color: colors.text }]}
                placeholder="Send a message to Alex..."
                placeholderTextColor={colors.textSecondary}
                value={message}
                onChangeText={setMessage}
                multiline
              />
              <TouchableOpacity 
                style={[
                  styles.sendButton,
                  { backgroundColor: colors.primary },
                  !message.trim() && { opacity: 0.7 }
                ]}
                onPress={handleSendMessage}
                disabled={!message.trim()}
              >
                <Send size={20} color={colors.background} />
              </TouchableOpacity>
            </View>
          </View>
        </SlideIn>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  scrollContent: {
    flex: 1,
  },
  moodContainer: {
    flexDirection: 'row',
    padding: GRID_PADDING,
    gap: 12,
  },
  moodCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#64748b',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  moodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  moodTitle: {
    fontSize: 14,
  },
  moodEmoji: {
    fontSize: 24,
  },
  moodLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  moodUpdated: {
    fontSize: 12,
  },
  moodOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moodOption: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 8,
  },
  selectedMoodOption: {
    borderWidth: 2,
  },
  moodOptionEmoji: {
    fontSize: 22,
  },
  emotionsSection: {
    padding: GRID_PADDING,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  emotionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -GRID_SPACING / 2,
    justifyContent: 'space-between',
  },
  emotionButton: {
    width: CARD_WIDTH,
    aspectRatio: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    margin: GRID_SPACING / 2,
  },
  emotionIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  emotionLabel: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  messageContainer: {
    padding: GRID_PADDING,
    marginTop: 24,
  },
  messageInputContainer: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#64748b',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginTop: 8,
  },
  messageInput: {
    flex: 1,
    minHeight: 80,
    maxHeight: 120,
    fontSize: 15,
  },
  sendButton: {
    alignSelf: 'flex-end',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});