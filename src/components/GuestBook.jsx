import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Button from '@mui/material/Button';

const GuestBook = () => {
  const [comments, setComments] = useState([]);

  //처음 랜더링 시 전체 방명록 목록 불러오기
  useEffect(() => {
    refleshHandler();
  }, []);

  //전체 방명록 목록 불러와서 comments state 설정
  const refleshHandler = async () => {
    const res = await fetch('http://localhost:3001/api/guestbooks');
    const data = await res.json();
    setComments(data);
  };

  //방명록 등록
  const submitHandler = async (evt) => {
    evt.preventDefault();
    const nickname = evt.target.nickname.value;
    const comment = evt.target.comment.value;

    const res = await fetch('http://localhost:3001/api/guestbook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname, comment }),
    });
    const data = await res.json();
  };

  return (
    <div>
      <header>
        <Nav title="방명록" />
      </header>
      <main>
        <article
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '101px',
            minHeight: '15rem',
            padding: '1rem 2rem',
            boxSizing: 'border-box',
          }}
        >
          <form onSubmit={submitHandler}>
            <input
              type="text"
              name="nickname"
              placeholder="닉네임"
              style={{ margin: '1rem 0', width: '4rem', borderWidth: '0 0 1px' }}
            />
            <textarea name="comment" placeholder="내용을 입력하세요" style={{ width: '99%' }} />
            <Button type="submit" name="submit" variant="outlined" style={{ float: 'right' }}>
              등록
            </Button>
          </form>
        </article>
        <article>
          {/* 전체 방명록 목록 */}
          {comments.map((comment) => {
            return (
              <div key={comment._id} style={{ borderTop: '1px solid rgb(159, 142, 197)' }}>
                <div>{comment.nickname}</div>
                <div>{comment.comment}</div>
                <div>{comment.createdAt}</div>
              </div>
            );
          })}
        </article>
      </main>
    </div>
  );
};

export default GuestBook;
