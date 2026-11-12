# Expense Tracker

A React expense tracker built with **Redux Toolkit** and **React Hook Form**. It uses dummy localStorage authentication, a protected dashboard, per-user expenses, a category filter, a lazy-loaded details modal and an ErrorBoundary. There is no backend.

**Live demo:** <add-vercel-link-here>

![Dashboard screenshot](./screenshots/dashboard.png)

## Features

- Dummy **login / signup** stored in `localStorage`
- Protected `/dashboard` route (redirects to login when logged out)
- **Per-user expenses**: each account sees only its own data, saved in `localStorage` (key: `et_expenses_<email>`)
- **Add expense** form with React Hook Form validation (title min 3 characters, amount greater than 0)
- **Redux Toolkit** store (add / delete / load) in separate files (`expenseSlice.js`, `store.js`)
- **Category filter** built with `useReducer`
- Custom hook **`useExpenses()`** that combines the store, the filter and the total
- Total calculated with **`useMemo`**
- **55 seeded dummy expenses** for every new user, with `ExpenseItem` wrapped in **`React.memo`**
- Details modal loaded with **`React.lazy` + `Suspense`**
- Dashboard wrapped in an **ErrorBoundary** with a retry button
- `ExpenseItem` styled three ways in one component:
  - **CSS Modules** for the card layout
  - **Tailwind CSS** for the category badge
  - **styled-components** for the action buttons
- **12 Jest tests** with React Testing Library

## Tech Stack

| Area | Tools |
|---|---|
| Framework | React, Vite |
| Routing | react-router-dom |
| State | Redux Toolkit, react-redux, `useReducer` |
| Forms | React Hook Form |
| Styling | CSS Modules, Tailwind CSS, styled-components |
| Testing | Jest, React Testing Library, jest-dom, user-event |

## Getting Started

```bash
git clone https://github.com/CoderHere07/expense-tracker.git
cd expense-tracker
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm test` | Run the Jest test suite |

## Project Structure

```
src/
├─ auth/         auth.js, AuthContext.jsx, ProtectedRoute.jsx
├─ components/   AddExpenseForm, ExpenseItem (+ .module.css), ExpenseDetailsModal, ErrorBoundary
├─ data/         dummyExpenses.js (55 generated expenses)
├─ hooks/        filterReducer.js, useExpenses.js
├─ pages/        AuthPage.jsx, Dashboard.jsx
├─ store/        expenseSlice.js, store.js, persistence.js
├─ __tests__/    store, useExpenses, ExpenseItem, AddExpenseForm, routing
├─ App.jsx
└─ main.jsx
```

## Tests

```bash
npm test
```

| Suite | Tests | Covers |
|---|---|---|
| `store.test.js` | 4 | Seed data, add, delete and load reducers |
| `useExpenses.test.jsx` | 2 | Filter reducer, filtered total |
| `ExpenseItem.test.jsx` | 2 | Rendering, delete callback |
| `AddExpenseForm.test.jsx` | 2 | Title and amount validation |
| `routing.test.jsx` | 2 | Protected route redirect, ErrorBoundary fallback |

## Notes

- Authentication is a **learning-only mock**. Passwords are stored in plain text in `localStorage`, which must never be done in a real application.
- Expenses are saved per user in `localStorage`, so they survive a refresh. Clearing browser storage resets everything.

## Deployment

The repo includes a `vercel.json` that rewrites all routes to `index.html`, so refreshing `/dashboard` works.

```bash
npm run build
npx vercel --prod
```

## Author

**Adnan Shahzad**: [GitHub @CoderHere07](https://github.com/CoderHere07)