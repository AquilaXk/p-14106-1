"use client";

import type { PostWithContentDto } from "@/type/post";
import { apiFetch } from "@/lib/backend/client";
import { use, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";



export default function Page() {
  const { id: idStr } = useParams<{ id: string }>();
  const id = Number(idStr);
  const router = useRouter();

  const [post, setPost] = useState<PostWithContentDto | null>(null);

  const deletePost = (id: number) => {
    apiFetch(`/api/v1/posts/${id}`, {
      method: "DELETE",
    }).then((data) => {
      alert(data.msg);
      router.replace("/posts");
    });
  };

  useEffect(() => {
    apiFetch(`/api/v1/posts/${id}`)
      .then(setPost);
  }, []);

  if (post == null) return <div className="ml-2">로딩 중 . . .</div>;

  return (
    <>
      <h1 className="ml-2">글 상세페이지</h1>

      <div className="ml-2">번호 : {post.id}</div>
      <div className="ml-2">제목: {post.title}</div>
      <div className="ml-2" style={{ whiteSpace: "pre-line" }}>{post.content}</div>

      <div className="flex gap-2">
        <button
          className="p-2 rounded border"
          onClick={() => confirm(`${post.id}번 글을 정말로 삭제하시겠습니까?`) && deletePost(post.id)}
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