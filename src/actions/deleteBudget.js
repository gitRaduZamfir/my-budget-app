import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteItem, getAllMatchingItems } from '../helpers';

function deleteBudget({ params }) {
  try {
    deleteItem({
      key: 'budgets',
      id: params.id,
    });

    const associatedExpenses = getAllMatchingItems({
      category: 'expenses',
      key: 'budgetId',
      value: params.id,
    });

    associatedExpenses.forEach((element) => {
      deleteItem({
        key: 'expenses',
        id: element.id,
      });
    });

    toast.success('Bugetul a fost sters!');
  } catch (e) {
    throw new Error('A aparut o problema la stergerea bugetului!');
  }

  return redirect('/');
}

export default deleteBudget;
