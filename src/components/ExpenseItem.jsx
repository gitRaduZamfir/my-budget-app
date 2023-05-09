import { TrashIcon } from '@heroicons/react/24/solid';
import { Link, useFetcher } from 'react-router-dom';
import {
  formatCurrency,
  formatDateToLocaleString,
  getAllMatchingItems,
} from '../helpers';

function ExpenseItem({ expense, showBudget }) {
  const fetcher = useFetcher();

  const budget = getAllMatchingItems({
    category: 'budgets',
    key: 'id',
    value: expense.budgetId,
  })[0];

  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      {showBudget && (
        <td>
          <Link
            to={`/budget/${budget.id}`}
            style={{
              '--accent': budget.color,
            }}
          >
            {budget.name}
          </Link>
        </td>
      )}
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense"></input>
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Sterge ${expense.name}`}
            name="expenseId"
            value={expense.id}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
}

export default ExpenseItem;
