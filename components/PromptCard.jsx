"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export const PromptCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <Link
          href={`${
            post.creator._id === session?.user.id
              ? `/profile`
              : `/profile/${post.creator._id}?name=${post.creator.username}`
          }`}
        >
          <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
            <Image
              src={post.creator.image}
              className="rounded-full"
              width={40}
              height={40}
              alt="user_image"
            />

            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900">
                {post.creator.username}
              </h3>
              <p className="text-gray-500 text-sm font-inter">
                {post.creator.email}
              </p>
            </div>
          </div>
        </Link>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
            alt="copy_icon"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm orange_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm text-red-500 cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};
