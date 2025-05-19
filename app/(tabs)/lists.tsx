import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Plus, Check, ShoppingBag, ListChecks, ClipboardList, Search, ChevronRight, X } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import AnimatedCard from '@/components/AnimatedCard';
import FadeIn from '@/components/FadeIn';
import StaggeredList from '@/components/StaggeredList';
import SlideIn from '@/components/SlideIn';
import ScaleIn from '@/components/ScaleIn';

const INITIAL_LISTS = [
  {
    id: '1',
    title: 'Grocery Shopping',
    type: 'grocery',
    itemCount: 8,
    completedCount: 3,
    updatedAt: '2025-02-05T12:00:00Z',
    items: [
      { id: '101', title: 'Milk', completed: true, assignedTo: 'Alex' },
      { id: '102', title: 'Eggs', completed: true, assignedTo: 'You' },
      { id: '103', title: 'Bread', completed: true, assignedTo: 'You' },
      { id: '104', title: 'Apples', completed: false, assignedTo: 'Alex' },
      { id: '105', title: 'Bananas', completed: false, assignedTo: null },
      { id: '106', title: 'Chicken', completed: false, assignedTo: 'You' },
      { id: '107', title: 'Pasta', completed: false, assignedTo: null },
      { id: '108', title: 'Tomatoes', completed: false, assignedTo: 'Alex' },
    ]
  },
  {
    id: '2',
    title: 'Weekend Tasks',
    type: 'todo',
    itemCount: 4,
    completedCount: 1,
    updatedAt: '2025-02-04T15:30:00Z',
    items: [
      { id: '201', title: 'Clean bathroom', completed: true, assignedTo: 'You' },
      { id: '202', title: 'Vacuum living room', completed: false, assignedTo: 'Alex' },
      { id: '203', title: 'Pick up laundry', completed: false, assignedTo: null },
      { id: '204', title: 'Call plumber', completed: false, assignedTo: 'You' },
    ]
  },
  {
    id: '3',
    title: 'Home Maintenance',
    type: 'maintenance',
    itemCount: 3,
    completedCount: 0,
    updatedAt: '2025-02-01T09:15:00Z',
    items: [
      { id: '301', title: 'Fix leak under sink', completed: false, assignedTo: 'Alex' },
      { id: '302', title: 'Replace light bulbs', completed: false, assignedTo: 'You' },
      { id: '303', title: 'Clean air filters', completed: false, assignedTo: null },
    ]
  }
];

export default function ListsScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [lists, setLists] = useState(INITIAL_LISTS);
  const [activeList, setActiveList] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [assignToMe, setAssignToMe] = useState(false);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return `${diffDays} days ago`;
    }
  };
  
  const handleListPress = (listId) => {
    const selected = lists.find(list => list.id === listId);
    setActiveList(selected);
  };
  
  const handleBackPress = () => {
    setActiveList(null);
    setSearchQuery('');
  };
  
  const toggleItemCompletion = (itemId) => {
    if (!activeList) return;
    
    const updatedList = {
      ...activeList,
      items: activeList.items.map(item => 
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    };
    
    updatedList.completedCount = updatedList.items.filter(item => item.completed).length;
    
    setActiveList(updatedList);
    setLists(lists.map(list => 
      list.id === activeList.id ? updatedList : list
    ));
  };
  
  const addNewItem = () => {
    if (!newItemTitle.trim() || !activeList) return;
    
    const newItem = {
      id: Date.now().toString(),
      title: newItemTitle.trim(),
      completed: false,
      assignedTo: assignToMe ? 'You' : null,
    };
    
    const updatedList = {
      ...activeList,
      items: [...activeList.items, newItem],
      itemCount: activeList.itemCount + 1
    };
    
    setActiveList(updatedList);
    setLists(lists.map(list => 
      list.id === activeList.id ? updatedList : list
    ));
    
    setNewItemTitle('');
    setAssignToMe(false);
    setShowAddItem(false);
  };
  
  const assignItem = (itemId, assignTo) => {
    if (!activeList) return;
    
    const updatedList = {
      ...activeList,
      items: activeList.items.map(item => 
        item.id === itemId ? { ...item, assignedTo: assignTo } : item
      )
    };
    
    setActiveList(updatedList);
    setLists(lists.map(list => 
      list.id === activeList.id ? updatedList : list
    ));
  };
  
  const filteredItems = activeList && searchQuery
    ? activeList.items.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : activeList?.items || [];

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
      {!activeList ? (
        <ScrollView>
          <FadeIn>
            <View style={[styles.header, { backgroundColor: colors.background }]}>
              <Text style={[styles.headerTitle, { color: colors.text }]}>Our Lists</Text>
              <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.primary }]}>
                <Plus size={24} color={colors.background} />
              </TouchableOpacity>
            </View>
          </FadeIn>
          
          <View style={styles.listsContainer}>
            {lists.map((list, index) => (
              <StaggeredList key={list.id} index={index}>
                <TouchableOpacity 
                  style={[styles.listCard, { backgroundColor: colors.card }]}
                  onPress={() => handleListPress(list.id)}
                >
                  <View style={styles.listCardHeader}>
                    <View style={[
                      styles.listIconContainer, 
                      list.type === 'grocery' && { backgroundColor: `${colors.secondary}15` },
                      list.type === 'todo' && { backgroundColor: `${colors.primary}15` },
                      list.type === 'maintenance' && { backgroundColor: `${colors.warning}15` },
                    ]}>
                      {list.type === 'grocery' && <ShoppingBag size={24} color={colors.secondary} />}
                      {list.type === 'todo' && <ListChecks size={24} color={colors.primary} />}
                      {list.type === 'maintenance' && <ClipboardList size={24} color={colors.warning} />}
                    </View>
                    <View style={styles.listInfo}>
                      <Text style={[styles.listTitle, { color: colors.text }]}>{list.title}</Text>
                      <Text style={[styles.listMeta, { color: colors.textSecondary }]}>
                        Updated {formatDate(list.updatedAt)}
                      </Text>
                    </View>
                    <ChevronRight size={20} color={colors.textSecondary} />
                  </View>
                  
                  <View style={styles.listProgress}>
                    <View style={[styles.progressBarContainer, { backgroundColor: colors.border }]}>
                      <View 
                        style={[
                          styles.progressBar, 
                          { 
                            width: `${(list.completedCount / list.itemCount) * 100}%`,
                            backgroundColor: 
                              list.type === 'grocery' ? colors.secondary : 
                              list.type === 'todo' ? colors.primary : colors.warning
                          }
                        ]} 
                      />
                    </View>
                    <Text style={[styles.progressText, { color: colors.textSecondary }]}>
                      {list.completedCount} of {list.itemCount} items completed
                    </Text>
                  </View>
                </TouchableOpacity>
              </StaggeredList>
            ))}
          </View>
          
          <AnimatedCard delay={lists.length * 100 + 200}>
            <TouchableOpacity style={[styles.createListButton, { backgroundColor: `${colors.primary}15` }]}>
              <Plus size={20} color={colors.primary} />
              <Text style={[styles.createListText, { color: colors.primary }]}>Create New List</Text>
            </TouchableOpacity>
          </AnimatedCard>
        </ScrollView>
      ) : (
        <View style={styles.listDetailContainer}>
          <SlideIn from="right">
            <View style={[styles.listDetailHeader, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={handleBackPress}
              >
                <ChevronRight size={24} color={colors.textSecondary} style={{ transform: [{ rotate: '180deg' }] }} />
              </TouchableOpacity>
              <Text style={[styles.listDetailTitle, { color: colors.text }]}>{activeList.title}</Text>
              <View style={{ width: 40 }} />
            </View>
            
            <View style={[styles.searchContainer, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
              <View style={[styles.searchInputContainer, { backgroundColor: colors.surface }]}>
                <Search size={18} color={colors.textSecondary} />
                <TextInput
                  style={[styles.searchInput, { color: colors.text }]}
                  placeholder="Search items..."
                  placeholderTextColor={colors.textSecondary}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                {searchQuery ? (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <X size={18} color={colors.textSecondary} />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
            
            <View style={[styles.listsStatsContainer, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
              <View style={styles.listStat}>
                <Text style={[styles.listStatValue, { color: colors.text }]}>{activeList.itemCount}</Text>
                <Text style={[styles.listStatLabel, { color: colors.textSecondary }]}>Total</Text>
              </View>
              <View style={styles.listStat}>
                <Text style={[styles.listStatValue, { color: colors.text }]}>{activeList.completedCount}</Text>
                <Text style={[styles.listStatLabel, { color: colors.textSecondary }]}>Completed</Text>
              </View>
              <View style={styles.listStat}>
                <Text style={[styles.listStatValue, { color: colors.text }]}>
                  {activeList.items.filter(item => item.assignedTo === 'You').length}
                </Text>
                <Text style={[styles.listStatLabel, { color: colors.textSecondary }]}>Your Tasks</Text>
              </View>
              <View style={styles.listStat}>
                <Text style={[styles.listStatValue, { color: colors.text }]}>
                  {activeList.items.filter(item => item.assignedTo === 'Alex').length}
                </Text>
                <Text style={[styles.listStatLabel, { color: colors.textSecondary }]}>Alex's Tasks</Text>
              </View>
            </View>
            
            <ScrollView style={styles.itemsContainer}>
              {filteredItems.map((item, index) => (
                <StaggeredList key={item.id} index={index}>
                  <View style={[styles.itemRow, { backgroundColor: colors.card }]}>
                    <TouchableOpacity
                      style={[
                        styles.checkboxContainer,
                        { borderColor: colors.primary },
                        item.completed && { backgroundColor: colors.primary }
                      ]}
                      onPress={() => toggleItemCompletion(item.id)}
                    >
                      {item.completed && <Check size={16} color={colors.background} />}
                    </TouchableOpacity>
                    
                    <View style={styles.itemDetails}>
                      <Text 
                        style={[
                          styles.itemTitle, 
                          { color: colors.text },
                          item.completed && { 
                            textDecorationLine: 'line-through',
                            color: colors.textSecondary 
                          }
                        ]}
                      >
                        {item.title}
                      </Text>
                      
                      <TouchableOpacity 
                        style={[styles.assignButton, { backgroundColor: colors.surface }]}
                        onPress={() => assignItem(
                          item.id, 
                          !item.assignedTo ? 'You' : 
                          item.assignedTo === 'You' ? 'Alex' : null
                        )}
                      >
                        {!item.assignedTo ? (
                          <Text style={[styles.assignButtonText, { color: colors.textSecondary }]}>Assign</Text>
                        ) : (
                          <View style={styles.assignedContainer}>
                            <Text style={[styles.assignedText, { color: colors.textSecondary }]}>
                              {item.assignedTo}
                            </Text>
                            {item.assignedTo === 'You' ? (
                              <Image 
                                source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' }}
                                style={styles.assignedImage}
                              />
                            ) : (
                              <Image 
                                source={{ uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg' }}
                                style={styles.assignedImage}
                              />
                            )}
                          </View>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </StaggeredList>
              ))}
              
              {filteredItems.length === 0 && (
                <View style={styles.emptyContainer}>
                  <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                    {searchQuery ? 'No items match your search' : 'No items in this list'}
                  </Text>
                </View>
              )}
            </ScrollView>
          </SlideIn>
          
          {showAddItem ? (
            <ScaleIn>
              <View style={[styles.addItemContainer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
                <TextInput
                  style={[styles.addItemInput, { 
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    color: colors.text
                  }]}
                  placeholder="Enter new item..."
                  placeholderTextColor={colors.textSecondary}
                  value={newItemTitle}
                  onChangeText={setNewItemTitle}
                  autoFocus
                />
                
                <View style={styles.addItemOptions}>
                  <View style={styles.assignToMeOption}>
                    <Text style={[styles.assignToMeText, { color: colors.textSecondary }]}>Assign to me</Text>
                    <Switch
                      value={assignToMe}
                      onValueChange={setAssignToMe}
                      trackColor={{ false: colors.border, true: `${colors.primary}50` }}
                      thumbColor={assignToMe ? colors.primary : colors.surface}
                    />
                  </View>
                  
                  <View style={styles.addItemActions}>
                    <TouchableOpacity 
                      style={styles.cancelButton}
                      onPress={() => {
                        setShowAddItem(false);
                        setNewItemTitle('');
                        setAssignToMe(false);
                      }}
                    >
                      <Text style={[styles.cancelButtonText, { color: colors.textSecondary }]}>Cancel</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[
                        styles.addButton,
                        { backgroundColor: colors.primary },
                        !newItemTitle.trim() && { backgroundColor: `${colors.primary}50` }
                      ]}
                      onPress={addNewItem}
                      disabled={!newItemTitle.trim()}
                    >
                      <Text style={[styles.addButtonText, { color: colors.background }]}>Add Item</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScaleIn>
          ) : (
            <TouchableOpacity 
              style={[styles.fabButton, { backgroundColor: colors.primary }]}
              onPress={() => setShowAddItem(true)}
            >
              <Plus size={24} color={colors.background} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listsContainer: {
    paddingHorizontal: 16,
  },
  listCard: {
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#64748b',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  listCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  listIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  listInfo: {
    flex: 1,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  listMeta: {
    fontSize: 13,
  },
  listProgress: {
    marginTop: 4,
  },
  progressBarContainer: {
    height: 6,
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 13,
  },
  createListButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  createListText: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
  listDetailContainer: {
    flex: 1,
  },
  listDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listDetailTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
  },
  listsStatsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
  listStat: {
    flex: 1,
    alignItems: 'center',
  },
  listStatValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  listStatLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  itemsContainer: {
    flex: 1,
    padding: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#64748b',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 15,
    maxWidth: '70%',
  },
  assignButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  assignButtonText: {
    fontSize: 13,
  },
  assignedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assignedText: {
    fontSize: 13,
    marginRight: 4,
  },
  assignedImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 48,
  },
  emptyText: {
    fontSize: 16,
  },
  fabButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  addItemContainer: {
    borderTopWidth: 1,
    padding: 16,
  },
  addItemInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 12,
  },
  addItemOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assignToMeOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assignToMeText: {
    fontSize: 14,
    marginRight: 8,
  },
  addItemActions: {
    flexDirection: 'row',
  },
  cancelButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 14,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});