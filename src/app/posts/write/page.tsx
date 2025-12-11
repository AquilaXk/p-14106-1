"use client"; // 이 컴포넌트가 클라이언트 측에서 렌더링되어야 함을 명시

// 커스텀 API 통신 유틸리티 함수(apiFetch) 가져오기.
// 이 함수는 내부적으로 fetch를 래핑하여 인증, 응답 파싱 등을 처리한다고 가정함.
import { apiFetch } from "@/lib/backend/client";

/**
 * 글쓰기 페이지 컴포넌트 정의.
 * 사용자로부터 제목과 내용을 입력받아 백엔드 API로 전송하는 기능을 담당함.
 *
 * @returns 글쓰기 폼을 포함하는 React 요소
 */
export default function Page() {
  /**
   * 폼 제출 이벤트 핸들러 정의.
   * 유효성 검사 후, 'api/v1/posts' 엔드포인트로 게시글 데이터를 POST 요청으로 전송함.
   *
   * @param e 폼 이벤트 객체 (React.FormEvent<HTMLFormElement>)
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 폼 제출 동작(페이지 리로드) 방지

    // 이벤트 타겟을 HTMLFormElement 타입으로 형변환하여 폼 요소에 접근
    const form = e.target as HTMLFormElement;

    // 폼 요소의 name을 이용하여 제목 입력 필드와 내용 텍스트 영역 요소 접근
    const titleInput = form.elements.namedItem("title") as HTMLInputElement;
    const contentTextarea = form.elements.namedItem(
      "content"
    ) as HTMLTextAreaElement;

    // --- 제목 필드 유효성 검사 ---
    // 제목 입력 값의 앞뒤 공백 제거 및 값 업데이트
    titleInput.value = titleInput.value.trim();

    // 제목이 비어 있는지 확인 (길이가 0인지 검사)
    if (titleInput.value.length === 0) {
      alert("제목을 입력해주세요.");
      titleInput.focus(); // 입력 필드로 포커스 이동
      return; // 함수 실행 중단
    }

    // --- 내용 필드 유효성 검사 ---
    // 내용 입력 값의 앞뒤 공백 제거 및 값 업데이트
    contentTextarea.value = contentTextarea.value.trim();

    // 내용이 비어 있는지 확인 (길이가 0인지 검사)
    if (contentTextarea.value.length === 0) {
      alert("내용을 입력해주세요.");
      contentTextarea.focus(); // 텍스트 영역으로 포커스 이동
      return; // 함수 실행 중단
    }

    // --- API 데이터 전송 (게시글 생성) ---
    // apiFetch 유틸리티 함수를 사용하여 게시글 생성 API 호출
    apiFetch(`/api/v1/posts`, {
      method: "POST", // HTTP POST 메서드 사용
      headers: {
        // 데이터 형식 지정 (JSON 및 UTF-8 인코딩)
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        // 전송할 데이터를 JSON 문자열로 변환
        title: titleInput.value,
        content: contentTextarea.value,
      }),
    })
      // apiFetch의 응답 결과(파싱된 JSON 데이터) 처리
      .then((data) => {
        // 백엔드에서 받은 메시지(예: "게시글이 성공적으로 등록되었습니다.")를 사용자에게 알림
        alert(data.msg);
      });
  };

  return (
    <>
      {/* 페이지 제목 */}
      <h1>글쓰기</h1>

      {/* 글쓰기 폼 영역: 제출 시 handleSubmit 함수 실행 */}
      <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
        {/* 제목 입력 필드 */}
        <input
          className="border p-2 rounded"
          type="text"
          name="title" // 폼 데이터 접근을 위한 name 속성
          placeholder="제목"
        />
        {/* 내용 입력 텍스트 영역 */}
        <textarea
          className="border p-2 rounded"
          name="content" // 폼 데이터 접근을 위한 name 속성
          placeholder="내용"
        />
        {/* 저장(제출) 버튼 */}
        <button className="border p-2 rounded" type="submit">
          저장
        </button>
      </form>
    </>
  );
}