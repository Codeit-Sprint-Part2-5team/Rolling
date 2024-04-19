import React, { useEffect } from 'react';

const { Kakao } = window;

export default function KakaoButton({ name, id }) {
  const realUrl = `https://5rolling.netlify.app/post/${id}`;
  const thumnailImage = require('../../assets/images/share-img.png');

  useEffect(() => {
    Kakao.cleanup();
    Kakao.init('078e480e2602fab08071f90f6fc7425a');
    console.log(Kakao); // 잘 작동하면 true
  }, []);

  const shareKakao = () => {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: 'Rolling',
        description: `${name}님의 롤링페이퍼입니다`,
        imageUrl: thumnailImage,
        link: {
          mobileWebUrl: realUrl,
          webUrl: realUrl,
        },
      },
      buttons: [
        {
          title: '롤링페이퍼 확인하기',
          link: {
            mobileWebUrl: realUrl,
            webUrl: realUrl,
          },
        },
      ],
    });
  };

  return <button onClick={shareKakao}>카카오톡 공유</button>;
}