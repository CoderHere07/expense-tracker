import { generateExpenses } from '../data/dummyExpenses';

const key = email => `et_expenses_${email}`;

export const loadForUser = email => {
  try {
    const raw = localStorage.getItem(key(email));
    return raw ? JSON.parse(raw) : generateExpenses(55);
  } catch {
    return generateExpenses(55);
  }
};

export const saveForUser = (email, items) => {
  try {
    localStorage.setItem(key(email), JSON.stringify(items));
  } catch {
  }
};