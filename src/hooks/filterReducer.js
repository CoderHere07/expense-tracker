export const initialFilter = { category: 'All' };

export function filterReducer(state, action) {
  switch (action.type) {
    case 'SET_CATEGORY': return { ...state, category: action.payload };
    case 'RESET': return initialFilter;
    default: throw new Error(`Unknown action: ${action.type}`);
  }
}