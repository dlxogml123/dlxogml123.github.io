    var currentPopup = null;
    function showSubBoxes(grade) {
    closepopup();
    var subBoxesContainer = document.getElementById('subBoxesContainer');
    subBoxesContainer.innerHTML = ''; // 기존 내용 초기화

    // 학년에 따라 다르게 보여줄 클래스들 추가
    if (grade === '1학년') {
        appendGradeBoxes([
        '컴퓨터공학 입문세미나',
        '공학설계입문',
        '대학물리학, 대학화학및실험',
        '대학수학연습',
        'c프로그래밍',
        '컴퓨팅사고',
        '고급 c프로그래밍'
        ]);
    } else if (grade === '2학년') {
        appendGradeBoxes([
        '디지털 논리회로',
        '컴퓨터공학기초 실험',
        '회로이론',
        '선형대수학',
        '벡터해석학및연습',
        '공학수학',
        '데이터구조 설계',
        '객체지향 프로그래밍설계, 실습',
        '이산수학'
        ]);
    }else if (grade === '3학년') {
        appendGradeBoxes([
        '컴퓨터구조',
        '확률과 통계',
        '신호및시스템',
        '시스템 프로그래밍',
        '컴퓨터 네트워크',
        '소프트웨어 프로젝트',
        '마이크로 프로세서',
        '디지털신호처리',
        '알고리즘',
        '인공지능',
        '운영체제, 실습',
        '데이터통신',
        '수치해석'
        ]);
    }else if (grade === '4학년') {
        appendGradeBoxes([
        'AI시스템온칩설계및응용',
        '임베디드시스템 S/W설계',
        '컴퓨터비젼',
        '머신러닝',
        '소프트웨어공학',
        '무선이동네트워크및5G',
        '산학협력캡스톤설계',
        '인공지능프로그래밍',
        '컴퓨터비젼',
        '지능IoT특론',
        '데이터베이스 및 데이터시각화'
        ]);
    }
    // 이하 학년에 따라 추가 가능

    subBoxesContainer.style.display = 'flex';
    subBoxesContainer.classList.remove('fade-in');
    void subBoxesContainer.offsetWidth; // 리플로우 강제 발생
    subBoxesContainer.classList.add('fade-in');
    }

    function appendGradeBoxes(classes) {
    closepopup();
    var subBoxesContainer = document.getElementById('subBoxesContainer');
    classes.forEach(function (className) {
        var box = document.createElement('div');
        box.classList.add('grade1');
        box.onclick = function () {
        openPopup('QnA.html');
        };
        box.innerHTML = '<p>' + className + '</p>';
        subBoxesContainer.appendChild(box);
    });
    }
    function openPopup(url, url2) {
    closepopup();
    var popup = document.getElementById('myPopup');
    var summaryLink = '<a href="Summary.html" target="_blank">강의 요약본으로 이동</a>';
    var qnaLink = '<a href="' + url + '" target="_blank">질문방으로 이동</a>';
    popup.innerHTML = '<p>' + summaryLink + '<br>' + qnaLink + '</p><p><a href="#" onclick="closePopup()">닫기</a></p>';
    if (!currentPopup) {
    // 팝업이 열려 있지 않을 때만 페이드인 효과 적용
        popup.classList.add('fade-in');
    }
    popup.classList.add('active');
    currentPopup = popup;
    }
    function closePopup() {
    var popup = document.getElementById('myPopup');
    popup.classList.remove('active');
    }
    function closepopup(){
    if (currentPopup) {
        currentPopup.classList.remove('fade-in'); // 페이드인 효과 제거
        currentPopup.classList.remove('active');
        currentPopup = null; // 열려 있는 팝업이 없음을 변수에 저장
    }
    }
    document.addEventListener('DOMContentLoaded', function () {
    // Zoom Boxes에 대한 이벤트 리스너
    var zoomBoxes = document.querySelectorAll('.zoom-box2');

    zoomBoxes.forEach(function (box) {
        box.addEventListener('click', function () {
        zoomBoxes.forEach(function (otherBox) {
            otherBox.classList.remove('highlight');
        });

        box.classList.add('highlight');
        });
    });

    // 학년별 박스에 대한 이벤트 리스너
    var grade1Boxes = document.querySelectorAll('.grade_2');

    grade1Boxes.forEach(function (box) {
        box.addEventListener('click', function () {
        grade1Boxes.forEach(function (otherBox) {
            otherBox.classList.remove('highlight');
        });

        box.classList.add('highlight');
        });
    });
    });