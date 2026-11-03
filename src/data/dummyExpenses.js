export const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Entertainment'];

const TITLES = {
  Food: ['Biryani', 'Groceries', 'Chai & snacks'],
  Transport: ['Uber ride', 'Petrol', 'Bus pass'],
  Shopping: ['Shoes', 'T-shirt', 'Headphones'],
  Bills: ['Electricity', 'Internet', 'Gas bill'],
  Health: ['Pharmacy', 'Doctor visit', 'Lab test'],
  Entertainment: ['Netflix', 'Cinema', 'Gaming'],
};

export const generateExpenses = (count = 55) =>
  Array.from({ length: count }, (_, i) => {
    const category = CATEGORIES[i % CATEGORIES.length];
    const names = TITLES[category];
    return {
      id: `seed-${i + 1}`,
      title: `${names[i % names.length]} #${i + 1}`,
      amount: ((i * 137) % 4900) + 100,
      category,
      date: new Date(2026, 9, 1 + (i % 28)).toISOString().slice(0, 10),
    };
  });