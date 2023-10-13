import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import RatingInput from '../rating-input/rating-input';
import { useParams } from 'react-router-dom';
import { sendReviewAction } from '../../store/api-action';
import { MAX_CHARACTER_COMMENT, MIN_CHARACTER_COMMENT } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getReviewSendStatus } from '../../store/review-data/review-data.selectors';

export default function FormRewiew(): JSX.Element {
  const dispatch = useAppDispatch();

  const formRef = useRef<HTMLFormElement | null>(null);

  const [isSubmitDisabled, setSubmitDisabled] = useState(true);
  const [isInactive, setIsInactive] = useState(false);

  const [formData, setFormData] = useState({
    hotelId: 0,
    comment: '',
    rating: 0,
  });

  const { rating, comment } = formData;

  const { id } = useParams();
  const hotelId = Number(id);

  const reviewSendStatus = useAppSelector(getReviewSendStatus);

  useEffect(() => {
    if (reviewSendStatus === true) {
      setSubmitDisabled(false);
      setIsInactive(true);
      clearForm();
    }
    if (reviewSendStatus === false) {
      setSubmitDisabled(true);
      setIsInactive(false);
    }
  }, [reviewSendStatus]);

  useEffect(() => setFormData({ ...formData, hotelId: hotelId }), [hotelId]);

  useEffect(() => {
    const isDisable = !(
      rating !== 0 &&
      comment.length >= MIN_CHARACTER_COMMENT &&
      comment.length <= MAX_CHARACTER_COMMENT
    );
    setSubmitDisabled(isDisable);
  }, [rating, comment]);

  const onElementChangeHandle = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    evt.preventDefault();
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(sendReviewAction(formData));
  };

  const clearForm = () => {

    if (formRef.current) {
      formRef.current.reset();
    }

    setFormData({ ...formData, comment: '', rating: 0 });
    setSubmitDisabled(false);
  };

  return (
    <form
      className='reviews__form form'
      style={{ textAlign: 'left' }}
      action=''
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <label className='reviews__label form__label' htmlFor='review'>
        Your review
      </label>
      <RatingInput
        onElementChangeHandle={onElementChangeHandle}
        isInactive={isInactive}
      />
      <textarea
        className='reviews__textarea form__textarea'
        id='review'
        name='comment'
        placeholder='Tell how was your stay, what you like and what can be improved'
        onChange={onElementChangeHandle}
        disabled={isInactive}
        data-testid='review'
      />
      <div className='reviews__button-wrapper'>
        <p className='reviews__help'>
          To submit review please make sure to set
          <span className='reviews__star'>rating</span> and describe your stay
          using between{' '}
          <b className='reviews__text-amount'>{MIN_CHARACTER_COMMENT}</b> and{' '}
          <b className='reviews__text-amount'>
            {MAX_CHARACTER_COMMENT} characters
          </b>
          .
        </p>
        <button
          className='reviews__submit form__submit button'
          type='submit'
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
