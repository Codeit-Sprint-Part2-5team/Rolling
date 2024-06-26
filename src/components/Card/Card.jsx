import * as S from './Card.styled';
import AddButton from '../AddButton/AddButton';
import SenderProfile from '../SenderProfile/SenderProfile';
import DeleteButton from '../DeleteButton/DeleteButton';

export default function Card({
  add,
  id,
  setModal,
  content,
  profileImageURL,
  relationship,
  sender,
  createdAt,
  edit,
  deleteMessage,
  setMessageList,
  font, 
}) {

  const date = createdAt?.slice(0, 10);

  const handleCardClick = () => {
    setModal({
      content,
      profileImageURL,
      relationship,
      sender,
      date,
      font,
    });
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteMessage(id);
    setMessageList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      {add ? (
        <S.AddLink to='message'>
          <AddButton />
        </S.AddLink>
      ) : (
        <S.CardLayout onClick={handleCardClick}>
          <S.TopContainer>
            <SenderProfile
              profileImageURL={profileImageURL}
              sender={sender}
              relationship={relationship}
            />
            {edit && <DeleteButton onClick={handleDelete} />}
          </S.TopContainer>
          <S.BottomContainer>
            <S.ContentBox style={{ fontFamily: font }}>{content} </S.ContentBox>
            <S.DateBox>{date}</S.DateBox>
          </S.BottomContainer>
        </S.CardLayout>
      )}
    </>
  );
}
