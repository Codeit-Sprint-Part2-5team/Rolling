import axios from 'axios';
import { storage } from '../apis/firebase';
import { getDownloadURL, ref, uploadBytes, listAll } from 'firebase/storage';

const API_URL = `https://rolling-api.vercel.app/`;
const RECIPIENTS_URL = `https://rolling-api.vercel.app/5-5/recipients/`;
const MESSAGES_URL = `https://rolling-api.vercel.app/5-5/messages/`;

export const getMockImageRequest = async () => {
  const response = await axios.get(`${API_URL}profile-images/`);
  if (response.status < 200 || response.status >= 300) {
    throw new Error('프로필 이미지 가져오기 실패');
  }

  return response;
};

export const getBackgroundImageRequest = async () => {
  const storageRef = ref(storage, 'background/');
  const response = await listAll(storageRef);

  if (response.status < 200 || response.status >= 300) {
    throw new Error('배경 이미지 가져오기 실패');
  }

  const downloadUrlList = await Promise.all(
    response.items.map(async (item) => {
      const url = await getDownloadURL(item);
      return url;
    })
  );

  return downloadUrlList;
};

export const createCardFolderRequest = async ({
  name,
  backgroundColor,
  backgroundImageURL = null,
}) => {
  const response = await axios({
    method: 'post',
    url: `${RECIPIENTS_URL}`,
    data: {
      name: name,
      backgroundColor: backgroundColor,
      backgroundImageURL: backgroundImageURL,
    },
  });

  if (response.status < 200 || response.status >= 300) {
    throw new Error('롤링 페이퍼 생성 실패');
  }

  return response;
};

export const getCardFolderListRequest = async (limit = 8, offset = 0) => {
  const query = `limit=${limit}&offset=${offset}`;

  const response = await axios.get(`${RECIPIENTS_URL}?${query}`);

  if (response.status < 200 || response.status >= 300) {
    throw new Error('롤링 페이퍼 정보 가져오기 실패');
  }

  return response;
};

export const getCardFolderRequest = async (id) => {
  const response = await axios.get(`${RECIPIENTS_URL}${id}/`);

  if (response.status < 200 || response.status >= 300) {
    throw new Error('유저 페이퍼 페이지 정보 가져오기 실패');
  }

  return response;
};

export const getMessageListRequest = async (id, limit = 8, offset = 0) => {
  const query = `limit=${limit}&offset=${offset}`;

  const response = await axios.get(`${RECIPIENTS_URL}${id}/messages/?${query}`);

  if (response.status < 200 || response.status >= 300) {
    throw new Error('롤링 페이퍼 정보 가져오기 실패');
  }

  return response;
};

export const createMessageRequest = async (body) => {
  const { sender, relationship, content, font, recipientId, profileImageURL } =
    body;

  const response = await axios({
    method: 'post',
    url: `${RECIPIENTS_URL}${recipientId}/messages/`,
    data: {
      recipientId: recipientId,
      sender: sender,
      profileImageURL: profileImageURL,
      relationship: relationship,
      content: content,
      font: font,
    },
  });

  if (response.status < 200 || response.status >= 300) {
    throw new Error('롤링 페이퍼 정보 가져오기 실패');
  }

  return response;
};

export const deleteMessageRequest = async (id) => {
  const response = await axios({
    method: 'delete',
    url: `${MESSAGES_URL}${id}/`,
  });

  if (response.status < 200 || response.status >= 300) {
    throw new Error('메시지 삭제 실패');
  }

  return response;
};

export const deleteCardFolderRequest = async (id) => {
  const response = await axios({
    method: 'delete',
    url: `${RECIPIENTS_URL}${id}/`,
  });

  if (response.status < 200 || response.status >= 300) {
    throw new Error('롤링 페이퍼 페이지 삭제 실패');
  }

  return response;
};

export const getReactionsRequest = async (id, limit = 8, offset = 0) => {
  const query = `limit=${limit}&offset=${offset}`;

  const response = await axios({
    method: 'get',
    url: `${RECIPIENTS_URL}${id}/reactions/?${query}`,
  });

  if (response.status < 200 || response.status >= 300) {
    throw new Error('유저가 받은 리액션 가져오기 실패');
  }

  return response;
};

export const postReactionRequest = async (id, changeType) => {
  const response = await axios({
    method: 'post',
    url: `${RECIPIENTS_URL}${id}/reactions/`,
    data: changeType,
  });

  if (response.status < 200 || response.status >= 300) {
    throw new Error('유저에게 리액션 보내기 실패');
  }

  return response;
};

export const uploadProfileImageRequest = async (imageFile) => {
  const storageRef = ref(storage, `images/${imageFile.name}`);
  const response = await uploadBytes(storageRef, imageFile);

  if (response.status < 200 || response.status >= 300) {
    throw new Error('프로필 이미지 업로드 실패');
  }

  return getDownloadURL(ref(storage, `images/${imageFile.name}`));
};

export const uploadBackgroundImageRequest = async (imageFile) => {
  const storageRef = ref(storage, `background/${imageFile.name}`);
  const response = await uploadBytes(storageRef, imageFile);

  if (response.status < 200 || response.status >= 300) {
    throw new Error('프로필 이미지 업로드 실패');
  }

  return getDownloadURL(ref(storage, `background/${imageFile.name}`));
};
