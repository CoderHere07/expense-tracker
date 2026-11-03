import { memo } from 'react';
import styled from 'styled-components';
import styles from './ExpenseItem.module.css';

const Button = styled.button`
  padding: 6px 12px;
  margin-left: 6px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: #fff;
  background: ${({ $danger }) => ($danger ? '#dc2626' : '#4f46e5')};
  &:hover { opacity: 0.85; }
`;

function ExpenseItem({ expense, onDelete, onDetails }) {
  const { id, title, amount, category, date } = expense;

  return (
    <li className={styles.card}>
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.date}>{date}</div>
        <span className="mt-1 inline-block rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
          {category}
        </span>
      </div>
      <div>
        <span className={styles.amount}>Rs {amount.toLocaleString()}</span>
        <Button onClick={() => onDetails(expense)}>Details</Button>
        <Button $danger onClick={() => onDelete(id)}>Delete</Button>
      </div>
    </li>
  );
}

export default memo(ExpenseItem);