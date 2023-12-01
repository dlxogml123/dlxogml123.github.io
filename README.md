# dlxogml123.github.io
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>일반 문제</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: Arial, sans-serif;
      background-color: #751d0c;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
  
    h1 {
      color: #fff;
      margin-bottom: 20px;
      position: absolute;
      top: 0;
      right: 1;
      font-size: 300%;
    }

    #generalForm, #board {
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    form {
      max-width: 600px;
      margin: 0 auto;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold; /* 진하게 만들기 */
    }

    input, textarea, button, #generalFile {
      width: 100%;
      padding: 80px;
      margin-bottom: 1px;
      box-sizing: border-box;
      font-weight: bold;
      font-size: 20px; /* 크기 조절 */
    }

    #generalTitle {
  padding: 8px; /* 세로 크기 조절 */
  margin-bottom: 16px;
  box-sizing: border-box;
  font-weight: bold; /* 진하게 만들기 */
  font-weight: bold;
  font-size: 20px; /* 크기 조절 */
}

    button {
      background-color: #751d0c;
      color: white;
      border: none;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      cursor: pointer;
      font-weight: bold; /* 진하게 만들기 */
    }

    .board {
      max-width: 700px;
      margin: 20px auto;
      overflow-y: auto; /* 세로 스크롤을 표시하도록 설정 */
      max-height: 400px; /* 스크롤 영역의 최대 높이를 지정 (조절 가능) */
    }

    .board-item {
      border: 1px solid #ddd;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 10px; /* 동그랗게 만들기 위해 border-radius 추가 */
    }
    .board-item-preview {
            cursor: pointer;
            border-bottom: 1px solid #ddd;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 5px;
        }

        .popup-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      justify-content: center;
      align-items: center;
    }

    .popup-content {
      background: #fff;
      padding: 100px;
      border-radius: 10px;
      max-width: 100%;
      max-height: 100%;
      overflow-y: auto;
      box-sizing: border-box; /* 박스 모델을 기본 값으로 변경 */
    }
    .popup-inner {
  padding: 30px; /* 내부의 요소들에 패딩을 주어 패딩 크기에 맞게 조절 */
  box-sizing: border-box; /* 박스 모델을 기본 값으로 변경 */
}

        .board-item-details {
            display: none;
        }

        .board-item-details.active {
            display: block;
        }
  </style>
</head>
<body>
  <h1>일반 문제</h1>

  <form id="generalForm">
    <label for="generalTitle" class="title">제목:</label>
    <input type="text" id="generalTitle" name="generalTitle" required />

    <label for="generalContent">내용:</label>
    <textarea id="generalContent" name="generalContent" required></textarea>

    <label for="generalFile">파일 업로드:</label>
    <input type="file" id="generalFile" name="generalFile" onchange="previewImage()" /> 
  
    <button type="button" onclick="saveContent()">저장</button>

  </form>

  <div class="board" id="board">
    <!-- 저장된 내용이 여기에 추가될 것입니다. -->
  </div>
<div id="commentSection" class="commentSction">
    <label for="commentInput">댓글:</label>
    <input type="text" id="commentInput" name="commentInput" />
    <button type="button" onclick="saveComment(currentPostIndex)">댓글 저장</button>
    <div id="comments"></div>
  </div>

  <div class="popup-overlay" id="popupOverlay">
    <div class="popup-content" id="popupContent">
      <!-- 세부 정보가 여기에 표시됩니다. -->
    </div>
  </div>


</body>

<script>
function saveContent() {
      var title = document.getElementById("generalTitle").value;
      var content = document.getElementById("generalContent").value;
      var file = document.getElementById("generalFile").value; // 파일 경로 또는 이름

      // 간단하게 객체로 저장
      var post = {
        title: title,
        content: content,
        file: file
      };

      // 로컬 스토리지에서 데이터 불러오기
      var storedPosts = localStorage.getItem("posts");
      posts = storedPosts ? JSON.parse(storedPosts) : [];

      // 저장된 내용을 배열에 추가
      posts.push(post);

      // 로컬 스토리지에 데이터 저장
      localStorage.setItem("posts", JSON.stringify(posts));

      // 저장된 내용을 게시판에 표시
      displayBoard();

      // 폼 초기화
      document.getElementById("generalForm").reset();
    }

    function displayBoard() {
      var board = document.getElementById("board");
      board.innerHTML = ""; // 기존 내용 초기화

      // 저장된 내용을 게시판에 동적으로 추가
      posts.forEach(function(post, index) {
        var boardItem = document.createElement("div");
        boardItem.classList.add("board-item");
        boardItem.innerHTML = "<h3>" + post.title + "</h3><p>" + post.content + "</p><p>File: " + post.file + "</p>";

        // 삭제 버튼 추가
        var deleteButton = document.createElement("button");
        deleteButton.innerText = "삭제";
        deleteButton.onclick = function() {
          deleteContent(post,index);
        };
        boardItem.appendChild(deleteButton);
        board.appendChild(boardItem);
      });
    }

      var currentPostIndex = -1;

      function displayPostDetails(post, index) {
      var popupOverlay = document.getElementById("popupOverlay");
      var popupContent = document.getElementById("popupContent");
      
      var detailsSection = document.getElementById("commentSection");


     // 세부 정보에 이미지를 미리보기로 표시하거나 다운로드 링크 제공
      var imagePreview = document.createElement("div");
      imagePreview.innerHTML = "<h3>" + post.title + "</h3><p>" + post.content + "</p>";

      var file = post.file;
      var fileExtension = file.split('.').pop().toLowerCase();

      if (fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "png" || fileExtension === "gif") {
        // 이미지인 경우 미리보기로 표시
        var imageElement = document.createElement("img");
        imageElement.src = file;
        imageElement.alt = "미리보기";
        imageElement.style.maxWidth = "100%";
        imageElement.style.height = "auto";
        imagePreview.appendChild(imageElement);

        // 이미지 파일이면 다운로드 링크 제공
        var downloadLink = document.createElement("a");
        downloadLink.href = file;
        downloadLink.download = file.split('/'); // 파일 이름으로 다운로드
        downloadLink.innerText = "이미지 다운로드";
        imagePreview.appendChild(downloadLink);
      } else {
        // 이미지가 아닌 경우 다운로드 링크 제공
        var downloadLink = document.createElement("a");
        downloadLink.href = file;
        downloadLink.download = file.split('/'); // 파일 이름으로 다운로드
        downloadLink.innerText = "파일 다운로드";
        imagePreview.appendChild(downloadLink);
      }

      popupContent.appendChild(imagePreview);

      var deleteButton = document.createElement("button");
      deleteButton.innerText = "삭제";
      deleteButton.onclick = function () {
        deleteContent(index);
        closePostDetails(); // 삭제 후 팝업 닫기
      };

      popupContent.appendChild(deleteButton);

// 닫기 버튼
var closeButton = document.createElement("button");
closeButton.innerText = "닫기";
closeButton.onclick = function () {
  closePostDetails();
};

popupContent.appendChild(closeButton);

// 팝업 열기
popupOverlay.style.display = "flex";

// 콘텐츠 외부를 클릭하면 팝업 닫기
popupOverlay.onclick = function (event) {
  if (event.target === popupOverlay) {
    closePostDetails();
  }
};

// 댓글 섹션 초기화
var commentSection = document.getElementById("commentSection");
      var commentsContainer = document.getElementById("comments");
      commentsContainer.innerHTML = ""; // 기존 댓글 내용 초기화

       // 댓글 표시
        if (post.comments && post.comments.length > 0) {
        post.comments.forEach(function (comment) {
          var commentItem = document.createElement("div");
          commentItem.innerText = comment;

          
          // 댓글 삭제 버튼
  var deleteCommentButton = document.createElement("button");
  deleteCommentButton.innerText = "댓글 삭제";
  deleteCommentButton.onclick = function () {
    deleteComment(index, comment);
    displayPostDetails(posts[index], index); // 삭제 후 댓글 섹션 갱신
  };
          commentItem.appendChild(deleteCommentButton);
          commentsContainer.appendChild(commentItem);
        });
      }
}



function saveComment(index) {
      var commentInput = document.getElementById("commentInput");
      var commentText = commentInput.value;

      if (!commentText) {
        alert("댓글을 입력하세요.");
        return;
      }

      // 선택된 포스트에 댓글 추가
      posts[index].comments = posts[index].comments || [];
      posts[index].comments.push(commentText);

      // 로컬 스토리지에 데이터 저장
      localStorage.setItem("posts", JSON.stringify(posts));

      // 댓글 저장 후 다시 댓글 섹션 갱신
      displayPostDetails(posts[index], index);

      // 댓글 입력 필드 초기화
      commentInput.value = "";
    }

    function deleteComment(postIndex, comment) {
      // 댓글 삭제
      var commentIndex = posts[postIndex].comments.indexOf(comment);
      if (commentIndex !== -1) {
        posts[postIndex].comments.splice(commentIndex, 1);
      }

      // 로컬 스토리지에 데이터 저장
      localStorage.setItem("posts", JSON.stringify(posts));

      // 댓글 삭제 후 다시 댓글 섹션 갱신
      displayPostDetails(posts[postIndex], postIndex);
    }

 // 이미지 파일인지 확인하는 함수
function isImageFile(filename) {
      return /\.(gif|jpe?g|png|webp)$/i.test(filename);
    }

// 팝업 닫기
function closePostDetails() {
var popupOverlay = document.getElementById("popupOverlay");

popupOverlay.style.display = "none";
}

function deleteContent(index) {
posts.splice(index, 1);
localStorage.setItem("posts", JSON.stringify(posts));
displayBoard();

// 세부 내용 닫기
closePostDetails();
}

// 페이지 로드 시 로컬 스토리지에서 데이터 불러오기
window.onload = function() {
var storedPosts = localStorage.getItem("posts");
posts = storedPosts ? JSON.parse(storedPosts) : [];
displayBoard();
};

function displayBoard() {
var board = document.getElementById("board");
board.innerHTML = ""; // 기존 내용 초기화

// 저장된 내용을 게시판에 동적으로 추가
posts.forEach(function (post, index) {
  var boardItemPreview = document.createElement("div");
  boardItemPreview.classList.add("board-item-preview");
  boardItemPreview.innerHTML = "<h3>" + post.title + "</h3>";

  //클릭시 댓글 목록
  boardItemPreview.addEventListener("click", function () {
    displayPostDetails(post, index);
  });

  board.appendChild(boardItemPreview);
});
}
  </script>
</html>
