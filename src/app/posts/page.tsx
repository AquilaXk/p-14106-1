"use client";

import type { PostDto } from "@/type/post";
import { apiFetch } from "@/lib/backend/client";
import Link from "next/link";
import { useEffect, useState } from "react";

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Page() {
  const [posts, setPosts] = useState<{ id: number; title: string }[]>([]);

  useEffect(() => {
    apiFetch(`/api/v1/posts`)
      .then(setPosts);
  }, []);

  return (
    <>
      <h1 className="ml-2">글 목록</h1>

      {posts.length == 0 && <div className="ml-2" >로딩중...</div>}

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link className="ml-2" href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <div>
        <Link href="/posts/write" className="ml-2">글쓰기</Link>
      </div>
    </>
  );
}