"use client";

import type { PostWithContentDto } from "@/type/post";
import { apiFetch } from "@/lib/backend/client";
import { use, useEffect, useState } from "react";

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = use(params);

  const [post, setPost] = useState<PostWithContentDto | null>(null);

  useEffect(() => {
    apiFetch(`/api/v1/posts/${id}`)
      .then(setPost);
  }, []);

  if (post == null) return <div>로딩중...</div>;

  return (
    <>
      <h1 className="ml-2">글 상세페이지</h1>

      <div className="ml-2">번호 : {post.id}</div>
      <div className="ml-2">제목: {post.title}</div>
      <div className="ml-2" style={{ whiteSpace: "pre-line" }}>{post.content}</div>
    </>
  );
}