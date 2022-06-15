import React from 'react';
import Video from './Video';
import Nav from './Nav';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
const TrackInfo = () => {
  return (
    <div>
      <header>
        <Nav title="경력에 필요한 경험을 쌓는 길" />
      </header>
      <main>
        <section>
          <Video id="bTwIg8RIj0g" />
        </section>
        <SectionContainer>
          <div>
            <h3 style={titleStyles}>이런 분이라면, 반드시 SW 트랙에 합류하세요</h3>
            <div style={contentWrapStyles}>
              <div>
                <div style={{ marginLeft: '2rem' }}>
                  <Avatar sx={{ bgcolor: deepPurple[400], width: 66, height: 66 }}>CODE</Avatar>
                </div>
                <div style={textStyles}>
                  다른 부트캠프, 동영상 강의, 도서 학습 다 해봤지만 아직 실력이 부족하다고 느끼는 분
                </div>
              </div>
              <div>
                <div style={{ marginLeft: '2rem' }}>
                  <Avatar sx={{ bgcolor: deepPurple[400], width: 66, height: 66 }}>TEAM</Avatar>
                </div>
                <div style={textStyles}>
                  팀 프로젝트를 통해 실무 개발 역량과 협업 역량을 쌓고 4개월 후 웹 개발자로 취업하실 분
                </div>
              </div>
              <div>
                <div style={{ marginLeft: '2rem' }}>
                  <Avatar sx={{ bgcolor: deepPurple[400], width: 66, height: 66 }}>TEST</Avatar>
                </div>
                <div style={textStyles}>
                  매주 엘리스 플랫폼에서 웹 개발 과제와 테스트를 빠짐 없이 수행하고 개발 역량 강화하실 분
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
      </main>
    </div>
  );
};

export default TrackInfo;
const titleStyles = { marginBottom: '3.5rem', textAlign: 'center', fontSize: '2.5rem', fontWeight: 'bold' };
const contentWrapStyles = { width: '100%', display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(3, 1fr)' };
const textStyles = { display: 'inline-block', marginTop: '1.5rem', padding: '0 2rem', lineHeight: '1.5rem' };

const SectionContainer = styled.section`
  padding: 8rem 0;
  text-align: center;
`;
