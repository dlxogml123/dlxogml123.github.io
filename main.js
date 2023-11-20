// index.html의 하위페이지를 동적으로 로드하는 함수
function loadSubpage() {
    // subpageContent 요소를 가져와서 그 안에 subpage.html을 로드
    var subpageContent = document.getElementById('subpageContent');
    subpageContent.innerHTML = ''; // 기존 콘텐츠 초기화

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            subpageContent.innerHTML = xhr.responseText;
        }
    };
    xhr.open('GET', 'subpage.html', true);
    xhr.send();
}

// 링크를 클릭할 때 loadSubpage 함수 호출
document.querySelector('a[href="subpage.html"]').addEventListener('click', function(event) {
    event.preventDefault(); // 링크 기본 동작 방지
    loadSubpage();
});
