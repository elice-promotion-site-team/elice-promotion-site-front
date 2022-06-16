import React from 'react';
import Nav from './Nav';
import Button from '@mui/material/Button';

const GuestBook = () => {
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
          <form>
            <input
              type="text"
              name="nickname"
              placeholder="닉네임"
              style={{ margin: '1rem 0', width: '4rem', borderWidth: '0 0 1px' }}
            />
            <textarea name="comment" placeholder="내용을 입력하세요" style={{ width: '99%' }} />
            <Button name="submit" variant="outlined" style={{ float: 'right' }}>
              등록
            </Button>
          </form>
        </article>
        <article>
          <div style={{ borderTop: '1px solid rgb(159, 142, 197)' }}>
            <div>nickname</div>
            <div>comment</div>
            <div>date</div>
          </div>

          <div style={{ borderTop: '1px solid rgb(159, 142, 197)' }}>
            <div>nickname</div>
            <div>comment</div>
            <div>date</div>
          </div>

          <div style={{ borderTop: '1px solid rgb(159, 142, 197)' }}>
            <div>nickname</div>
            <div>comment</div>
            <div>date</div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default GuestBook;
