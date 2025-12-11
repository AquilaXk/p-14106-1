"use client";

import type { PostDto } from "@/type/post";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [posts, setPosts] = useState<{ id: number; title: string }[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/posts")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  return (
    <>
      <h1 className="ml-2">글 목록</h1>

      {posts.length == 0 && <div>로딩중...</div>}

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link className="ml-2" href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}