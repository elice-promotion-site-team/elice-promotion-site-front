import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../css/TrackApply.css';
import logo from '../assets/elice x KDT.png';
import trackapply from '../assets/trackapply.png';
import Header from './Header';

function TrackInfo() {
  AOS.init();
  AOS.refresh();

  return (
    <div className="bs-all">
      <Header></Header>
      <div className="about">
        <div className="first">
          <div data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000" className="first-text">
            엘리스의 레이서가 되는 길
          </div>
          <img data-aos="fade-up" data-aos-delay="500" data-aos-duration="1000" className="about-logo" src={logo} />
          <div data-aos="fade-right" data-aos-delay="1000" data-aos-duration="1000" className="first-details">
            내일배움카드 발급이 가능하며, 4개월간 주 5일동안 매일 7시간 학습이 가능한 취업 준비생
            <br />
            지금 바로, <span>엘리스</span>에 지원하세요.
          </div>
        </div>
        <div data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000" className="second">
          <div data-aos="zoom-in-down" data-aos-delay="200" data-aos-duration="1000" className="second-text">
            제일 중요한
            <br />
            <span>교육 기간</span>.
          </div>
          <div data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000" className="second-details">
            2022년 4월 4일 ~ 2022년 7월 23일(16주)
          </div>
        </div>
        <div className="third">
          <div data-aos="zoom-in-right" data-aos-delay="700" data-aos-duration="1000" className="third-text">
            듣기만 해도 가슴이 설레이는, <br />
            <span>수강료 전액 무료.</span>
          </div>
          <div data-aos="fade-right" data-aos-delay="500" data-aos-duration="1000" className="third-details">
            (1000만원 상당, 매월 30만원 학습장려금 지급) <br />
            🚧 주의 : K-디지털 트레이닝 국비라, K-디지털 트레이닝의 다른 교육을 받은적이 있으면 무료가 아님
          </div>
        </div>
        <div className="fourth">
          <div data-aos="zoom-in" data-aos-delay="800" data-aos-duration="1000" className="fourth-text">
            교육 장소 & 방법
          </div>
          <div data-aos="fade-right" data-aos-delay="800" data-aos-duration="1000" className="fourth-one">
            첫번째,
            <br />
            <span>오프라인</span>.
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="1000"
              className="fourth-details fourth-details-one"
            >
              서울 지역 : 성수역, 성수낙낙 학습장
              <br />
              부산 지역 : 센텀시티역, 부산정보산업진흥원 학습장
            </div>
          </div>
          <div data-aos="fade-left" data-aos-delay="800" data-aos-duration="1000" className="fourth-two">
            두번째,
            <br />
            <span>온라인</span>.
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="1000"
              className="fourth-details fourth-details-two"
            >
              엘리스 교육 홈페이지
            </div>
          </div>
        </div>
        <div className="fifth">
          <div data-aos="zoom-in" data-aos-delay="200" data-aos-duration="1000" className="fifth-text">
            선발과정은?
          </div>
          <img data-aos="fade-up" data-aos-delay="500" data-aos-duration="1000" className="trackapply" src={trackapply} />
          <div data-aos="zoom-in" data-aos-delay="200" data-aos-duration="1000" className="fifth-details">
            <span>
              비전공자, 전공자 모두 가능합니다.
            </span>{' '}
          </div>
        </div>
        <div className="sixth">
          <div data-aos="zoom-in-down" data-aos-delay="500" data-aos-duration="1000" className="seventh-text">
            이제
            <br />
            <span>엘리스에 지원하기.</span>
          </div>
          <div className="seventh-details">
            <div data-aos="fade-up" data-aos-delay="800" data-aos-duration="1000" className="about-intro">
              <div className="way">
                내일배움카드
                <br />
                없다면?
              </div>
              <div className="way-details">
                발급 가능 여부를 알아보고 <br />
                hrd-net에서 발급하세요!
              </div>
              <div className="way-details-more">발급하기</div>
            </div>
            <div data-aos="fade-up" data-aos-delay="1000" data-aos-duration="1000" className="about-intro">
            <div className="way">
                내일배움카드
                <br />
                있다면?
              </div>
              <div className="way-details">
                지금 당장 서류를 작성하세요. <br />
                그리고 지원하기 버튼 Click!
              </div>
              <div className="way-details-more">지원하기</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackInfo;
