import React from 'react';
import Video from './Video';
import Nav from './Nav';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import curriculumImage from '../assets/track_info/curriculum.png';
import Header from './Header';

const TrackInfo = () => {
  return (
    <div>
      <Header></Header>
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
        <SectionContainer>
          <div>
            <h3 style={titleStyles}>실무에서 가장 많이 쓰는 스택을 위주로 학습합니다</h3>
            <img src={curriculumImage} alt="커리큘럼" />
          </div>
        </SectionContainer>
        <SectionContainer>
          <div>
            <h3 style={titleStyles}>현업 개발팀 방식 프로젝트를 내 손으로 완성합니다</h3>
            <div style={{ width: '100%', display: 'flex', flex: 1 }}>
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '2rem' }}>
                  <h4>2개의 완성도 높은 포트폴리오 완성</h4>
                  <div>
                    16주 동안 총 2번의 프로젝트를 수행합니다. 커리큘럼과 기업의 니즈를 반영한 단계별 팀 프로젝트를
                    완수함으로써 완성도 높은 2개의 포트폴리오를 만듭니다.
                  </div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '2rem' }}>
                  <h4>Git 협업 방식 실무 프로젝트</h4>
                  <div>
                    Agile, Sprint 등 스타트업 개발팀의 업무 방식을 적용한 실무 방식의 난이도 높은 팀 프로젝트를
                    수행함으로써 협업역량과 실무 개발 역량 모두 스킬업합니다.
                  </div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '2rem' }}>
                  <h4>소수 정예 현업 개발자 팀 코칭</h4>
                  <div>
                    현업 개발자 코치가 매주 우리 팀의 코드를 리뷰해 주고, 실시간 팀 코칭을 통해 프로젝트 방향성을
                    가이드함으로써 완성도 높은 프로젝트 결과물을 만들어냅니다.
                  </div>
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
const titleStyles = { marginBottom: '2rem', textAlign: 'center', fontSize: '1.3rem', fontWeight: 'bold' };
const contentWrapStyles = { width: '100%', display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(3, 1fr)' };
const textStyles = { display: 'inline-block', marginTop: '1.5rem', padding: '0 2rem', lineHeight: '1.5rem' };

const SectionContainer = styled.section`
  padding: 5rem 2rem;
  text-align: center;
`;
