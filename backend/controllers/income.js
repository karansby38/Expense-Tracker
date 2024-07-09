const IncomeSchema = require('../models/incomeModel');

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  try {
    // Validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    if (amount <= 0 || typeof amount !== 'number') {
      return res.status(400).json({ message: 'Amount must be a positive number' });
    }

    const income = new IncomeSchema({
      title,
      amount,
      category,
      description,
      date
    });

    await income.save();
    res.status(200).json({ message: 'Income added' });
  } catch (error) {
    console.error('Error adding income:', error);
    res.status(500).json({ message: 'Failed to add income. Please try again later.' });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    console.error('Error getting incomes:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;

  try {
    const income = await IncomeSchema.findByIdAndDelete(id);

    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }

    res.status(200).json({ message: 'Income deleted' });
  } catch (error) {
    console.error('Error deleting income:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
