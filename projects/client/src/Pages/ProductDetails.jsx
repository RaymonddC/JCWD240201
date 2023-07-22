import { useEffect, useRef, useState } from 'react';
import NavBar from '../Components/Layout/Navbar';
import {
  getQuestionDetail,
  postAnswer,
  updateAnswer,
} from '../Features/QnA/QnASlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const user = useSelector((state) => state?.user?.user);
  const role = user?.role_id;
  const userId = user?.id;
  const QnAStore = useSelector((state) => state?.QnA);
  const dispatch = useDispatch();
  const params = useParams();
  const date = QnAStore?.questions?.createdAt?.split('T')[0];
  const { id } = params;
  const questionId = Number(id);
  const question = QnAStore?.questions?.question;
  const answer = QnAStore?.questions?.answers?.[0]?.answer;
  const answerId = QnAStore?.questions?.answers?.[0]?.id;
  const answerText = useRef();
  const [disabled, setDisabled] = useState(true);

  console.log(user);

  useEffect(() => {
    dispatch(getQuestionDetail({ id: Number(id) }));
    console.log(answerText?.current?.value);
  }, [dispatch, id, answerText]);
  if (role === 1) {
    return (
      <>
      
      </>
    );
  } else {
    return (
      <>
			<div className='grid grid-cols-2'>
				<div>
					<img src="" alt="" />
				</div>

			</div>
			</>
    );
  }
}
