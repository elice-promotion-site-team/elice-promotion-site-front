import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useCookies } from 'react-cookie';
import Nav from './Nav';
import Button from '@mui/material/Button';
import Header from './Header';

const GuestBook = () => {
  const [comments, setComments] = useState([]);
  const [userId, setUserId] = useState('');
  const [targetComment, setTargetComment] = useState('');
  const [cookies] = useCookies(['token']);
  const nameRef = useRef('');

  //처음 랜더링 시 전체 방명록 목록 불러오기
  useEffect(() => {
    refleshHandler();
  }, []);

  //전체 방명록 목록 불러와서 comments state 설정
  const refleshHandler = async () => {
    const res = await fetch('/api/guestbook/list');
    const data = await res.json();
    setComments(data.reverse());

    getUser();
  };

  const getUser = async () => {
    if (cookies.token) {
      const res = await fetch(`/auth/${cookies.token}`);
      const data = await res.json();
      setUserId(data._id);
      nameRef.current.value = data.name;
    }
  };

  //방명록 등록
  const submitHandler = async (evt) => {
    evt.preventDefault();
    const name = evt.target.name.value;
    const comment = evt.target.comment.value;
    //더미 데이터 생성
    // let name;
    // let comment;
    // for (let i = 0; i <= 10; i++) {
    //   name = '이름' + i;
    //   comment = i + '번째 방명록 테스트입니다.';
    //   console.log(name + ' ' + comment);

    const res = await fetch('/api/guestbook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, comment, userId }),
    });
    await res.json();
    evt.target.name.value = '';
    evt.target.comment.value = '';
    refleshHandler();
    //}
  };

  const updateHandler = (e) => {
    setTargetComment(e.target.value);
  };

  const updateDoneHandler = async (e) => {
    const commentId = e.target.value;
    //const name = e.target.parentNode.parentNode.firstChild.childNodes[0].innerHTML;
    const comment = e.target.parentNode.parentNode.firstChild.childNodes[1].value;

    const res = await fetch(`/api/guestbook/${commentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment }),
    });
    await res.json();

    setTargetComment('');
    refleshHandler();
  };

  const deleteHandler = async (e) => {
    const askToDelete = window.confirm('정말 삭제하시겠습니까 ?');

    if (askToDelete) {
      const id = e.target.value;
      const res = await fetch(`/api/guestbook/${id}`, {
        method: 'DELETE',
      });
      await res.json();
    }
    refleshHandler();
  };

  //구글 로그인
  const login = () => {
    if (!cookies.token) {
      window.location.href = '/auth/google';
    }
    getUser();
  };

  return (
    <GuestBookContainer className="no-scroll">
      <GlobalStyle />
      <Header></Header>
      <main>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <article
            style={{
              position: 'sticky',
              top: '0px',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '101px',
              minHeight: '20rem',
              padding: '5rem 1rem 2rem',
              boxSizing: 'border-box',
              backgroundColor: '#fff',
              zIndex: '1',
              marginBottom: '5rem',
            }}
            onClick={login}
          >
            <form onSubmit={submitHandler}>
              <input
                type="text"
                name="name"
                placeholder="이름"
                ref={nameRef}
                style={{
                  margin: '1rem 0',
                  width: '4rem',
                  borderWidth: '0 0 1px',
                  borderColor: '#D3D3D3',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />
              <textarea
                name="comment"
                placeholder="내용을 입력하세요"
                style={{
                  width: '99%',
                  height: '10vh',
                  borderColor: '#D3D3D3',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />
              <Button type="submit" name="submit" variant="outlined" style={{ float: 'right' }}>
                등록
              </Button>
            </form>
          </article>
          <article style={{ padding: '1rem 2rem', boxSizing: 'border-box' }}>
            {/* 전체 방명록 목록 */}
            {comments.map((comment) => {
              return (
                <div
                  key={comment._id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderTop: '1px solid #D3D3D3',
                    lineHeight: '2',
                    padding: '1rem 0',
                  }}
                >
                  <div>
                    <div>{comment.name}</div>
                    {targetComment === comment._id ? <textarea /> : <div>{comment.comment}</div>}
                    <div style={{ fontSize: '0.6rem' }}>{comment.createdAt.substr(0, 10)}</div>
                  </div>
                  {userId === comment.userId ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {targetComment === comment._id ? (
                        <>
                          <Button
                            name="modify"
                            variant="contained"
                            style={{ float: 'right', marginRight: '0.5rem' }}
                            onClick={updateDoneHandler}
                            value={comment._id}
                          >
                            완료
                          </Button>
                          <Button
                            name="modify"
                            variant="outlined"
                            style={{ float: 'right', marginRight: '0.5rem' }}
                            onClick={() => setTargetComment('')}
                            value={comment._id}
                          >
                            취소
                          </Button>
                        </>
                      ) : (
                        <Button
                          name="modify"
                          variant="outlined"
                          style={{ float: 'right', marginRight: '0.5rem' }}
                          onClick={updateHandler}
                          value={comment._id}
                        >
                          수정
                        </Button>
                      )}
                      <Button
                        name="delete"
                        variant="outlined"
                        style={{ float: 'right' }}
                        onClick={deleteHandler}
                        value={comment._id}
                      >
                        삭제
                      </Button>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </article>
        </div>
      </main>
    </GuestBookContainer>
  );
};

export default GuestBook;

const GuestBookContainer = styled.div`
  width: 100%;
`;

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Noto Sans KR sans-serif';

    -ms-overflow-style: none; /* IE, Edge */
    scrollbar-width: none; /* Firefox */

    ::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }
    overscroll-behavior-y: none;
  }
`;
