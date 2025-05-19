import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Plus, DollarSign, ChevronDown, ArrowUp, ArrowDown, ChartPie as PieChart } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import AnimatedCard from '@/components/AnimatedCard';
import FadeIn from '@/components/FadeIn';
import StaggeredList from '@/components/StaggeredList';
import ScaleIn from '@/components/ScaleIn';

const INITIAL_EXPENSES = [
  { id: '1', title: 'Grocery Shopping', amount: 87.50, date: '2025-02-05', category: 'Groceries', paidBy: 'You' },
  { id: '2', title: 'Dinner Date', amount: 65.20, date: '2025-02-03', category: 'Food', paidBy: 'Alex' },
  { id: '3', title: 'Netflix Subscription', amount: 14.99, date: '2025-02-01', category: 'Subscriptions', paidBy: 'You' },
  { id: '4', title: 'Electricity Bill', amount: 89.50, date: '2025-01-28', category: 'Utilities', paidBy: 'You' },
  { id: '5', title: 'Movie Tickets', amount: 26.00, date: '2025-01-25', category: 'Entertainment', paidBy: 'Alex' },
];

export default function FinancesScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('expenses');
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    category: 'Other',
    paidBy: 'You'
  });
  
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const youPaid = expenses
    .filter(expense => expense.paidBy === 'You')
    .reduce((sum, expense) => sum + expense.amount, 0);
  
  const partnerPaid = expenses
    .filter(expense => expense.paidBy === 'Alex')
    .reduce((sum, expense) => sum + expense.amount, 0);
  
  const halfTotal = totalExpenses / 2;
  const balanceDifference = youPaid - halfTotal;
  
  const handleAddExpense = () => {
    if (newExpense.title && newExpense.amount) {
      const amount = parseFloat(newExpense.amount);
      if (!isNaN(amount) && amount > 0) {
        const expenseToAdd = {
          id: Date.now().toString(),
          title: newExpense.title,
          amount: amount,
          date: new Date().toISOString().split('T')[0],
          category: newExpense.category,
          paidBy: newExpense.paidBy
        };
        
        setExpenses([expenseToAdd, ...expenses]);
        setNewExpense({ title: '', amount: '', category: 'Other', paidBy: 'You' });
        setShowAddExpense(false);
      }
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
      <ScrollView>
        <FadeIn>
          <View style={[styles.header, { backgroundColor: colors.background }]}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Shared Finances</Text>
            <TouchableOpacity 
              style={[styles.addButton, { backgroundColor: colors.primary }]}
              onPress={() => setShowAddExpense(true)}
            >
              <Plus size={24} color={colors.background} />
            </TouchableOpacity>
          </View>
        </FadeIn>
        
        <AnimatedCard delay={200}>
          <View style={[styles.balanceCard, { backgroundColor: colors.card }]}>
            <View style={styles.balanceHeader}>
              <Text style={[styles.balanceTitle, { color: colors.text }]}>February Balance</Text>
              <TouchableOpacity style={[styles.periodSelector, { backgroundColor: colors.surface }]}>
                <Text style={[styles.periodText, { color: colors.textSecondary }]}>This Month</Text>
                <ChevronDown size={16} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.balanceAmount}>
              <DollarSign size={28} color={colors.primary} />
              <Text style={[styles.totalAmount, { color: colors.text }]}>{totalExpenses.toFixed(2)}</Text>
            </View>
            
            <View style={[styles.balanceDetails, { borderColor: colors.border }]}>
              <View style={styles.balanceItem}>
                <Text style={[styles.balanceLabel, { color: colors.textSecondary }]}>You Paid</Text>
                <Text style={[styles.balanceValue, { color: colors.text }]}>${youPaid.toFixed(2)}</Text>
              </View>
              <View style={styles.balanceItem}>
                <Text style={[styles.balanceLabel, { color: colors.textSecondary }]}>Alex Paid</Text>
                <Text style={[styles.balanceValue, { color: colors.text }]}>${partnerPaid.toFixed(2)}</Text>
              </View>
              <View style={[styles.separator, { backgroundColor: colors.border }]} />
              <View style={styles.balanceItem}>
                <Text style={[styles.balanceLabel, { color: colors.textSecondary }]}>Split (50/50)</Text>
                <Text style={[styles.balanceValue, { color: colors.text }]}>${halfTotal.toFixed(2)} each</Text>
              </View>
            </View>
            
            <View style={[styles.settlementCard, { backgroundColor: colors.surface }]}>
              {balanceDifference > 0 ? (
                <>
                  <View style={[styles.directionIcon, { backgroundColor: `${colors.success}15` }]}>
                    <ArrowDown size={20} color={colors.success} />
                  </View>
                  <View>
                    <Text style={[styles.settlementTitle, { color: colors.textSecondary }]}>Alex owes you</Text>
                    <Text style={[styles.settlementAmount, { color: colors.success }]}>
                      ${balanceDifference.toFixed(2)}
                    </Text>
                  </View>
                </>
              ) : (
                <>
                  <View style={[styles.directionIcon, { backgroundColor: `${colors.error}15` }]}>
                    <ArrowUp size={20} color={colors.error} />
                  </View>
                  <View>
                    <Text style={[styles.settlementTitle, { color: colors.textSecondary }]}>You owe Alex</Text>
                    <Text style={[styles.settlementAmount, { color: colors.error }]}>
                      ${Math.abs(balanceDifference).toFixed(2)}
                    </Text>
                  </View>
                </>
              )}
              <TouchableOpacity style={[styles.settleButton, { backgroundColor: colors.primary }]}>
                <Text style={[styles.settleButtonText, { color: colors.background }]}>Settle Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </AnimatedCard>
        
        <AnimatedCard delay={400}>
          <View style={[styles.tabsContainer, { backgroundColor: colors.card }]}>
            <TouchableOpacity 
              style={[
                styles.tab, 
                activeTab === 'expenses' && [styles.activeTab, { backgroundColor: `${colors.primary}15` }]
              ]}
              onPress={() => setActiveTab('expenses')}
            >
              <Text style={[
                styles.tabText, 
                { color: colors.textSecondary },
                activeTab === 'expenses' && { color: colors.primary }
              ]}>
                Expenses
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.tab, 
                activeTab === 'budget' && [styles.activeTab, { backgroundColor: `${colors.primary}15` }]
              ]}
              onPress={() => setActiveTab('budget')}
            >
              <Text style={[
                styles.tabText,
                { color: colors.textSecondary },
                activeTab === 'budget' && { color: colors.primary }
              ]}>
                Budget
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.tab, 
                activeTab === 'reports' && [styles.activeTab, { backgroundColor: `${colors.primary}15` }]
              ]}
              onPress={() => setActiveTab('reports')}
            >
              <Text style={[
                styles.tabText,
                { color: colors.textSecondary },
                activeTab === 'reports' && { color: colors.primary }
              ]}>
                Reports
              </Text>
            </TouchableOpacity>
          </View>
        </AnimatedCard>
        
        {activeTab === 'expenses' && (
          <AnimatedCard delay={600}>
            <View style={[styles.expensesContainer, { backgroundColor: colors.card }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Expenses</Text>
              
              {expenses.map((expense, index) => (
                <StaggeredList key={expense.id} index={index} baseDelay={800}>
                  <TouchableOpacity style={[styles.expenseItem, { borderBottomColor: colors.border }]}>
                    <View style={styles.expenseInfo}>
                      <Text style={[styles.expenseTitle, { color: colors.text }]}>{expense.title}</Text>
                      <Text style={[styles.expenseDetails, { color: colors.textSecondary }]}>
                        {new Date(expense.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })} • {expense.category} • Paid by {expense.paidBy}
                      </Text>
                    </View>
                    <Text style={[styles.expenseAmount, { color: colors.text }]}>${expense.amount.toFixed(2)}</Text>
                  </TouchableOpacity>
                </StaggeredList>
              ))}
            </View>
          </AnimatedCard>
        )}
        
        {activeTab === 'budget' && (
          <View style={styles.budgetContainer}>
            <View style={[styles.budgetHeaderCard, { backgroundColor: colors.card }]}>
              <View style={styles.budgetHeaderInfo}>
                <Text style={[styles.budgetHeaderTitle, { color: colors.textSecondary }]}>Monthly Budget</Text>
                <Text style={[styles.budgetAmount, { color: colors.text }]}>$1,200.00</Text>
                <Text style={[styles.budgetProgress, { color: colors.textSecondary }]}>
                  <Text style={{ color: totalExpenses > 1200 ? colors.error : colors.success }}>
                    ${totalExpenses.toFixed(2)} spent
                  </Text> of $1,200.00
                </Text>
              </View>
              <View style={[styles.budgetChartPlaceholder, { backgroundColor: `${colors.primary}15` }]}>
                <PieChart size={70} color={colors.primary} />
              </View>
            </View>
            
            <View style={[styles.categoriesContainer, { backgroundColor: colors.card }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Budget Categories</Text>
              
              <View style={styles.categoryItem}>
                <View style={styles.categoryInfo}>
                  <Text style={[styles.categoryName, { color: colors.text }]}>Groceries</Text>
                  <View style={[styles.progressBarContainer, { backgroundColor: colors.border }]}>
                    <View 
                      style={[styles.progressBar, { width: '60%', backgroundColor: colors.primary }]} 
                    />
                  </View>
                </View>
                <View style={styles.categoryAmounts}>
                  <Text style={[styles.categorySpent, { color: colors.text }]}>$300.00</Text>
                  <Text style={[styles.categoryLimit, { color: colors.textSecondary }]}>of $500.00</Text>
                </View>
              </View>
              
              <View style={styles.categoryItem}>
                <View style={styles.categoryInfo}>
                  <Text style={[styles.categoryName, { color: colors.text }]}>Utilities</Text>
                  <View style={[styles.progressBarContainer, { backgroundColor: colors.border }]}>
                    <View 
                      style={[styles.progressBar, { width: '75%', backgroundColor: colors.secondary }]} 
                    />
                  </View>
                </View>
                <View style={styles.categoryAmounts}>
                  <Text style={[styles.categorySpent, { color: colors.text }]}>$150.00</Text>
                  <Text style={[styles.categoryLimit, { color: colors.textSecondary }]}>of $200.00</Text>
                </View>
              </View>
              
              <View style={styles.categoryItem}>
                <View style={styles.categoryInfo}>
                  <Text style={[styles.categoryName, { color: colors.text }]}>Entertainment</Text>
                  <View style={[styles.progressBarContainer, { backgroundColor: colors.border }]}>
                    <View 
                      style={[styles.progressBar, { width: '40%', backgroundColor: colors.warning }]} 
                    />
                  </View>
                </View>
                <View style={styles.categoryAmounts}>
                  <Text style={[styles.categorySpent, { color: colors.text }]}>$120.00</Text>
                  <Text style={[styles.categoryLimit, { color: colors.textSecondary }]}>of $300.00</Text>
                </View>
              </View>
              
              <View style={styles.categoryItem}>
                <View style={styles.categoryInfo}>
                  <Text style={[styles.categoryName, { color: colors.text }]}>Dining Out</Text>
                  <View style={[styles.progressBarContainer, { backgroundColor: colors.border }]}>
                    <View 
                      style={[styles.progressBar, { width: '90%', backgroundColor: colors.error }]} 
                    />
                  </View>
                </View>
                <View style={styles.categoryAmounts}>
                  <Text style={[styles.categorySpent, { color: colors.text }]}>$180.00</Text>
                  <Text style={[styles.categoryLimit, { color: colors.textSecondary }]}>of $200.00</Text>
                </View>
              </View>
            </View>
          </View>
        )}
        
        {activeTab === 'reports' && (
          <View style={[styles.reportsContainer, { backgroundColor: colors.card }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Reports</Text>
            <Text style={[styles.comingSoonText, { color: colors.textSecondary }]}>Detailed reports coming soon!</Text>
          </View>
        )}
      </ScrollView>
      
      {showAddExpense && (
        <ScaleIn>
          <View style={[styles.addExpenseOverlay, { backgroundColor: colors.overlay }]}>
            <View style={[styles.addExpenseContainer, { backgroundColor: colors.card }]}>
              <Text style={[styles.addExpenseTitle, { color: colors.text }]}>Add New Expense</Text>
              
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Title</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                      color: colors.text
                    }
                  ]}
                  placeholder="What was it for?"
                  placeholderTextColor={colors.textSecondary}
                  value={newExpense.title}
                  onChangeText={(text) => setNewExpense({...newExpense, title: text})}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Amount ($)</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                      color: colors.text
                    }
                  ]}
                  placeholder="0.00"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="decimal-pad"
                  value={newExpense.amount}
                  onChangeText={(text) => setNewExpense({...newExpense, amount: text})}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Category</Text>
                <TouchableOpacity 
                  style={[
                    styles.selectInput,
                    {
                      backgroundColor: colors.surface,
                      borderColor: colors.border
                    }
                  ]}
                >
                  <Text style={{ color: colors.text }}>{newExpense.category}</Text>
                  <ChevronDown size={16} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Paid By</Text>
                <View style={[styles.paidByOptions, { backgroundColor: colors.surface }]}>
                  <TouchableOpacity 
                    style={[
                      styles.paidByOption, 
                      newExpense.paidBy === 'You' && [styles.selectedPaidBy, { backgroundColor: colors.primary }]
                    ]}
                    onPress={() => setNewExpense({...newExpense, paidBy: 'You'})}
                  >
                    <Text 
                      style={[
                        styles.paidByText,
                        { color: colors.textSecondary },
                        newExpense.paidBy === 'You' && { color: colors.background }
                      ]}
                    >
                      You
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[
                      styles.paidByOption, 
                      newExpense.paidBy === 'Alex' && [styles.selectedPaidBy, { backgroundColor: colors.primary }]
                    ]}
                    onPress={() => setNewExpense({...newExpense, paidBy: 'Alex'})}
                  >
                    <Text 
                      style={[
                        styles.paidByText,
                        { color: colors.textSecondary },
                        newExpense.paidBy === 'Alex' && { color: colors.background }
                      ]}
                    >
                      Alex
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.addExpenseActions}>
                <TouchableOpacity 
                  style={[styles.cancelButton, { backgroundColor: colors.surface }]}
                  onPress={() => setShowAddExpense(false)}
                >
                  <Text style={[styles.cancelButtonText, { color: colors.textSecondary }]}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[
                    styles.saveButton,
                    { backgroundColor: colors.primary },
                    !newExpense.title.trim() && { opacity: 0.7 }
                  ]}
                  onPress={handleAddExpense}
                >
                  <Text style={[styles.saveButtonText, { color: colors.background }]}>Save Expense</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScaleIn>
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
  balanceCard: {
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: '#64748b',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 24,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  balanceTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  periodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  periodText: {
    fontSize: 14,
    marginRight: 4,
  },
  balanceAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: '700',
    marginLeft: 8,
  },
  balanceDetails: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  balanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 14,
  },
  balanceValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    marginVertical: 8,
  },
  settlementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
  },
  directionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settlementTitle: {
    fontSize: 14,
  },
  settlementAmount: {
    fontSize: 18,
    fontWeight: '600',
  },
  settleButton: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 'auto',
  },
  settleButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#EDE9FE',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  expensesContainer: {
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: '#64748b',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  expenseInfo: {
    flex: 1,
  },
  expenseTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  expenseDetails: {
    fontSize: 13,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  budgetContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  budgetHeaderCard: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#64748b',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 16,
  },
  budgetHeaderInfo: {
    flex: 1,
  },
  budgetHeaderTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  budgetAmount: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  budgetProgress: {
    fontSize: 14,
  },
  budgetChartPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#64748b',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  categoryInfo: {
    flex: 1,
    marginRight: 16,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  categoryAmounts: {
    alignItems: 'flex-end',
  },
  categorySpent: {
    fontSize: 15,
    fontWeight: '600',
  },
  categoryLimit: {
    fontSize: 13,
  },
  reportsContainer: {
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: '#64748b',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 24,
    alignItems: 'center',
  },
  comingSoonText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  addExpenseOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  addExpenseContainer: {
    borderRadius: 16,
    padding: 24,
    width: '100%',
  },
  addExpenseTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  selectInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paidByOptions: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 4,
  },
  paidByOption: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  selectedPaidBy: {
    backgroundColor: '#8B5CF6',
  },
  paidByText: {
    fontSize: 14,
    fontWeight: '500',
  },
  addExpenseActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '500',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: '500',
  },
});