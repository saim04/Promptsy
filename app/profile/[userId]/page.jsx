"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from "@components/Profile";

const ProfilePage = ({ params }) => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.userId}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (params?.userId) fetchPosts();
  }, [params.userId]);

  return (
    <Profile
      name={name}
      data={posts}
      desc={`Welcome to ${name} profile page`}
    />
  );
};

export default ProfilePage;
