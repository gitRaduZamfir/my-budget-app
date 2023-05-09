import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteItem } from '../helpers';

export async function logoutAction() {
  deleteItem({
    key: 'userName',
  });
  deleteItem({
    key: 'budgets',
  });
  deleteItem({
    key: 'expenses',
  });
  toast.success('A-ti sters contul');

  return redirect('/');
}
