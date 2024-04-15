import React, { useEffect, useState } from 'react';
import Inner from '../../components/Inner/Inner';
import * as S from './RollingPage.styled';
import Card from '../../components/Card/Card';
import useAsync from '../../hooks/useAsync';
import { getMessageListRequest } from '../../apis/api';
import HeaderService from '../../components/HeaderService/HeaderService';
import Modal from '../../components/Modal/Modal';
import { useParams } from 'react-router-dom';

export default function RollingPage() {
  const [messageList, setMessageList] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [modal, setModal] = useState();
  const { requestFunction: getMessageList } = useAsync(getMessageListRequest);

  const { userId } = useParams();

  console.log(userId);

  const getData = async () => {
    const result = await getMessageList(userId);
    if (!result) return;
    const {
      data: { results },
    } = result;
    setMessageList(results);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleModalClose = () => {
    setModalVisible(false);
    setModal({});
  };

  return (
    <>
      <HeaderService />
      <S.RollingPageLayout>
        <Inner>
          <S.CardContainer>
            <li>
              <Card add />
            </li>
            {messageList?.map((item) => (
              <li key={item.id}>
                <Card
                  setModal={setModal}
                  setModalVisible={setModalVisible}
                  content={item.content}
                  profileImageURL={item.profileImageURL}
                  relationship={item.relationship}
                  sender={item.sender}
                  createdAt={item.createdAt}
                />
              </li>
            ))}
          </S.CardContainer>
          {modalVisible && (
            <S.ModalContainer>
              <Modal
                image={modal.profileImageURL}
                name={modal.sender}
                badgeName={modal.relationship}
                date={modal.date}
                content={modal.content}
                onClick={handleModalClose}
              />
            </S.ModalContainer>
          )}
        </Inner>
      </S.RollingPageLayout>
    </>
  );
}
