"use client";

import { apiFetch } from "@/lib/backend/client";
import type { PostCommentDto, PostWithContentDto } from "@/type/post";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

function PostInfo({ post }: { post: PostWithContentDto }) {
  const router = useRouter();

  const deletePost = (id: number) => {
    apiFetch(`/api/v1/posts/${id}`, {
      method: "DELETE",
    }).then((data) => {
      alert(data.msg);
      router.replace("/posts");
    });
  };

  return (
    <>
      <div className="ml-2">번호 : {post.id}</div>
      <div className="ml-2">제목: {post.title}</div>
      <div className="ml-2" style={{ whiteSpace: "pre-line" }}>{post.content}</div>

      <div className="flex gap-2">
        <button
          className="p-2 rounded border ml-2"
          onClick={() =>
            confirm(`${post.id}번 글을 정말로 삭제하시겠습니까?`) &&
            deletePost(post.id)
          }
        >
          삭제
        </button>
        <Link className="p-2 rounded border" href={`/posts/${post.id}/edit`}>
          수정
        </Link>
      </div>
    </>
  );
}

function PostCommentWriteAndList({
  id,
  postComments,
  setPostComments,
}: {
  id: number;
  postComments: PostCommentDto[] | null;
  setPostComments: (postComments: PostCommentDto[]) => void;
}) {
  const deleteComment = (id: number, commentId: number) => {
    apiFetch(`/api/v1/posts/${id}/comments/${commentId}`, {
      method: "DELETE",
    }).then((data) => {
      alert(data.msg);

      if (postComments == null) return;

      setPostComments(postComments.filter((c) => c.id != commentId));
    });
  };

  const handleCommentWriteFormSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const contentTextarea = form.elements.namedItem(
      "content"
    ) as HTMLTextAreaElement;

    contentTextarea.value = contentTextarea.value.trim();

    if (contentTextarea.value.length === 0) {
      alert("댓글 내용을 입력해주세요.");
      contentTextarea.focus();
      return;
    }

    if (contentTextarea.value.length < 2) {
      alert("댓글 내용을 2자 이상 입력해주세요.");
      contentTextarea.focus();
      return;
    }

    apiFetch(`/api/v1/posts/${id}/comments`, {
      method: "POST",
      body: JSON.stringify({
        content: contentTextarea.value,
      }),
    }).then((data) => {
      alert(data.msg);
      contentTextarea.value = "";

      if (postComments == null) return;

      setPostComments([...postComments, data.data]);
    });
  };

  return (
    <>
      <h2 className="ml-2">댓글 작성</h2>

      <form className="p-2" onSubmit={handleCommentWriteFormSubmit}>
        <textarea
          className="border p-2 rounded"
          name="content"
          placeholder="댓글 내용"
          maxLength={100}
          rows={5}
        />
        <button className="p-2 rounded border ml-2" type="submit">
          작성
        </button>
      </form>

      <h2 className="ml-2">댓글 목록</h2>

      {postComments == null && <div>댓글 로딩중...</div>}

      {postComments != null && postComments.length == 0 && (
        <div>댓글이 없습니다.</div>
      )}

      {postComments != null && postComments.length > 0 && (
        <ul>
          {postComments.map((comment) => (
            <li key={comment.id} className="ml-2">
              {comment.id} : {comment.content}
              <button
                className="p-2 rounded border ml-2"
                onClick={() =>
                  confirm(`${comment.id}번 댓글을 정말로 삭제하시겠습니까?`) &&
                  deleteComment(id, comment.id)
                }
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = use(params);

  const [post, setPost] = useState<PostWithContentDto | null>(null);
  const [postComments, setPostComments] = useState<PostCommentDto[] | null>(
    null
  );

  useEffect(() => {
    apiFetch(`/api/v1/posts/${id}`)
      .then(setPost)
      .catch((error) => {
        alert(`${error.resultCode} : ${error.msg}`);
      });

    apiFetch(`/api/v1/posts/${id}/comments`)
      .then(setPostComments)
      .catch((error) => {
        alert(`${error.resultCode} : ${error.msg}`);
      });
  }, []);

  if (post == null) return <div>로딩중...</div>;

  return (
    <>
      <h1 className="ml-2">글 상세페이지</h1>

      <PostInfo post={post} />

      <PostCommentWriteAndList
        id={id}
        postComments={postComments}
        setPostComments={setPostComments}
      />
    </>
  );
}