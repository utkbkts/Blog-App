"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MdDeleteOutline } from "react-icons/md";

export default function DeleteComment({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (confirmed) {
      try {
        const response = await fetch(`/api/comment/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          await response.json();
          toast.success("Comment deleted successfully");
          router.refresh();
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <button
      onClick={handleDelete}
      className="cursor-pointer hover:scale-110 transition-all duration-300"
    >
      <MdDeleteOutline size={20} />
    </button>
  );
}
