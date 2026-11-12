import { memo } from 'react';
import styled from 'styled-components';
import styles from './ExpenseItem.module.css';

// styled-components: pressable brass / red enamel buttons
const Button = styled.button`
  margin-left: 8px;
  padding: 6px 12px;
  border: 1px solid ${({ $danger }) => ($danger ? '#5c1713' : '#6b4d14')};
  border-radius: 7px;
  cursor: pointer;
  font: 700 14px var(--ui);
  color: ${({ $danger }) => ($danger ? '#fff1ee' : '#3a2a08')};
  background: ${({ $danger }) =>
    $danger
      ? 'linear-gradient(180deg, #c9483f, #8f2520)'
      : 'linear-gradient(180deg, #e9cc7e, #b8892f)'};
  box-shadow: 0 3px 0 ${({ $danger }) => ($danger ? '#5c1713' : '#6b4d14')},
    0 5px 6px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.45);
  &:active { transform: translateY(2px); box-shadow: 0 1px 0 rgba(0, 0, 0, 0.5); }
`;

function ExpenseItem({ expense, onDelete, onDetails }) {
  const { id, title, amount, category, date } = expense;

  return (
    <li className={styles.card}>
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.date}>{date}</div>
        {/* Tailwind: rubber-stamp category badge */}
        <span className="mt-1 inline-block -rotate-2 rounded border-2 border-red-800/70 px-2 py-0.5 text-xs font-bold text-red-800/80">
          {category}
        </span>
      </div>
      <div className={styles.right}>
        <span className={styles.amount}>Rs {amount.toLocaleString()}</span>
        <Button onClick={() => onDetails(expense)}>Details</Button>
        <Button $danger onClick={() => onDelete(id)}>Delete</Button>
      </div>
    </li>
  );
}

export default memo(ExpenseItem);