import * as S from './LoadingModal.styled';

function Modal({ pending, className }) {
  if (!pending) return;
  return (
    <S.Layout className={className}>
      <S.ContentBox>
        <S.Spinner />
      </S.ContentBox>
    </S.Layout>
  );
}

export default Modal;
