"use client";

import { TCategory, TPost } from "@/types/CategoryType";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";

const EditListPost = ({post}:{post:TPost}) => {
  const [links, setLinks] = useState<string[]>([]);
  const [LinkInput, setLinkInput] = useState("");
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [categories, setcategories] = useState<TCategory[]>([]);
  const [selectedCategory, setselectedCategory] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [publicId, setpublicId] = useState("");
  const [Loading, setLoading] = useState(false);
  const [error, seterror] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetcAllCategories = async () => {
      const res = await fetch("/api/categories");
      const catNames = await res.json();
      setcategories(catNames);
    };
    fetcAllCategories();
    const initvalues = () =>{
        settitle(post.title);
        setcontent(post.content);
        setimageUrl(post.imageUrl || "");
        setpublicId(post.publicId || "")
        setselectedCategory(post.catName || "")
        setLinks(post.links || [])
    }
    initvalues()
  }, [post.title,post.content,post.catName,post.imageUrl,post.publicId,post.links]);

  const AddLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (LinkInput.trim() !== "") {
      setLinks((prev) => [...prev, LinkInput]);
      setLinkInput("");
    }
  };
  const deleteLink = (index: number) => {
    setLinks((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!title || !content) {
      seterror("Title and content is required");
      setLoading(false);

      return;
    }
    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          selectedCategory,
          imageUrl,
          links,
          publicId,
        }),
      });
      if (res.ok) {
        router.push("/");
        router.refresh()
      setLoading(false);

      }
    } catch (error) {
      console.log(error);
      setLoading(false);

    }
  };
  const handleImage = async(result: CldUploadWidgetResults) => {
    const info = result.info as object;
    if(publicId){
      //!yeni resim yüklendiğinde eski resimi silme işlemi
      const deleteRes = await fetch("/api/removeImage", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ publicId }),
    })}
    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url as string;
      const publicid = info.public_id as string;
     
      setimageUrl(url);
      setpublicId(publicid);
    }
  };
  const RemoveImage = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("api/removeImage", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ publicId }),
      });
      if (res.ok) {
        setimageUrl("");
        setpublicId("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2 className="text-xl font-bold py-2">Create Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 dark:text-black">
        <input
          className="w-full py-2 px-4 rounded-md border border-gray-300 outline-none"
          type="text"
          placeholder="Title..."
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <textarea
          className="w-full py-2 px-4 rounded-md border border-gray-300 outline-none"
          name="content"
          id="content"
          placeholder="Content..."
          value={content}
          onChange={(e) => setcontent(e.target.value)}
        ></textarea>
        <div className="flex items-center gap-2">
          <input
            value={LinkInput}
            onChange={(e) => setLinkInput(e.target.value)}
            className="w-full py-2 px-4 rounded-md border border-gray-300 outline-none"
            type="text"
            name="LinkInput"
            placeholder="Paste the link and click on add"
          />
          <button onClick={AddLink} className="btn flex gap-2 items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
            </span>
            Add
          </button>
        </div>
        {links &&
          links.map((link, i) => (
            <div key={i} className="flex items-center gap-4 dark:text-white">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                  />
                </svg>
              </span>
              <Link className="link" href={link}>
                {link}
              </Link>
              <span className="cursor-pointer" onClick={() => deleteLink(i)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </span>
            </div>
          ))}
        <CldUploadButton onUpload={handleImage} uploadPreset="ulf4szgv">
          <div
            className={`h-48 border-2 mt-4 border-dotted grid place-items-center bg-slate-100 rounded-md relative ${
              imageUrl && "pointer-events-none"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            {imageUrl && (
              <Image
                src={imageUrl}
                fill
                className="absolute object-cover inset-0"
                alt={title}
              />
            )}
          </div>
        </CldUploadButton>
        {publicId && (
          <button
            onClick={RemoveImage}
            className="w-fit bg-red-400 text-white py-2 px-4 rounded-md"
          >
            Remove Image
          </button>
        )}
        <div>
          <select
            className="w-full py-2 px-4 border border-gray-300 outline-none rounded-md"
            name="selectedCategory"
            id=""
            value={selectedCategory}
            onChange={(e) => setselectedCategory(e.target.value)}
          >
            <option value="">Select an category</option>
            {categories.map((item) => (
              <option key={item.id} value={item.catName}>
                {item.catName}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="py-2 px-4 rounded-md w-full bg-gray-900 text-white"
        >
          {Loading ? (
            <button disabled className="flex items-center gap-2 justify-center w-full ">
              <Spinner/>
              <p>Loading...</p>
            </button>
          ) : (
            "Update Post"
          )}
        </button>
        {error && (
          <span className="text-red-400 font-bold text-[14px]">{error}</span>
        )}
      </form>
    </div>
  );
};

export default EditListPost;
