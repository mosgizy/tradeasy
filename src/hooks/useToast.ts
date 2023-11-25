 import { toast } from 'react-toastify';

const useToaster = () => {
  const notify = (message: string) => toast(message);

  return notify
}

export default useToaster