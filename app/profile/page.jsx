"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from "@components/Profile";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const [loggedIn, setNotLoggedIn] = useState(false);

  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    if (confirm("Are you sure you want to delete this prompt?"));
    try {
      await fetch(`/api/prompt/${post._id.toString()}`, {
        method: "DELETE",
      });
      const filteredPosts = posts.filter((p) => p._id !== post._d);

      setPosts(filteredPosts);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();
      console.log(data);
      setPosts(data);
    };
    !session && setNotLoggedIn(true);
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);
  return loggedIn ? (
    <h1 className="head_text text-left">You are not Logged In!</h1>
  ) : (
    <Profile
      name="My"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      desc="Welcome to your personalized profile page"
    />
  );
};

export default ProfilePage;
