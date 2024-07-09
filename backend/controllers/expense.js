const ExpenseSchema = require('../models/expenseModel');

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  try {
    // Validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    if (amount <= 0 || typeof amount !== 'number') {
      return res.status(400).json({ message: 'Amount must be a positive number' });
    }

    const expense = new ExpenseSchema({
      title,
      amount,
      category,
      description,
      date
    });

    await expense.save();
    res.status(200).json({ message: 'Expense added' });
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ message: 'Failed to add expense. Please try again later.' });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    await ExpenseSchema.findByIdAndDelete(id);
    res.status(200).json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
