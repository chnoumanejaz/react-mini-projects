import { useParams } from 'react-router-dom';
import Form from '../ui/Form';
import { useSelector } from 'react-redux';

function Update() {
  const { userId } = useParams();
  const { users  } = useSelector(state => state.user);
  const currentUser = users.filter(user => user.id === userId);

  return <Form currentUser={currentUser} updateForm={true} />;
}

export default Update;
