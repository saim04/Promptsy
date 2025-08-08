import React from "react";
import Link from "next/link";

const Form = ({ type, post, handleSubmit, setPost, submitting }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="text-left head_text">
        <span className="orange_gradient">{type}</span> Post
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 max-w-2xl gap-7 w-full flex flex-col glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            required
            className="form_textarea"
            placeholder="Write your prompt here..."
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag{` `}
            <span className="font-normal">(#product, #webdev, #idea)</span>
          </span>

          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            required
            className="form_input"
            placeholder="#tag"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            className="px-5 py-1.5 bg-primary-orange rounded-full text-white"
            type="submit"
            disabled={submitting}
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
