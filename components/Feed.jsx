"use client";

import { useEffect, useState } from "react";
import { PromptCard } from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [allPosts, setAllPosts] = useState([]);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");

    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const result = filterPrompts(e.target.value);
        setSearchResult(result);
      }, 500)
    );
  };

  const handleTagClick = (tagname) => {
    setSearchText(tagname);
    const result = filterPrompts(tagname);
    setSearchResult(result);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      console.log(data);
      setAllPosts(data);
    };

    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList data={searchResult} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
