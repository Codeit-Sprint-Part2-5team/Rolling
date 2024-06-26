import * as S from './Toast.styled';

export default function Toast({ callback }) {
  function closeButtonClickHandler() {
    callback();
  }

  return (
    <S.Layout>
      <S.CheckContainer>
        <S.CheckIconBox></S.CheckIconBox>
        <S.CheckTextBox>URL이 복사 되었습니다.</S.CheckTextBox>
      </S.CheckContainer>
      <S.CloseIconButtonBox onClick={closeButtonClickHandler}>
        <S.CloseIconBox></S.CloseIconBox>
      </S.CloseIconButtonBox>
    </S.Layout>
  );
}
