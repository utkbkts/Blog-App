import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const usePreviewImage = () => {
  const [selectedFile, setSelectedFile] = useState<String>("");
  const maxFilesSizeBytes = 6 * 1024 * 2024; 

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file && file.type.startsWith("image/")) {
      if (file.size > maxFilesSizeBytes) {
        toast.error("File size must be less than 2MB");
        setSelectedFile("");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please image file");
    }
  };
  return { selectedFile, handleImageChange,setSelectedFile };
};

export default usePreviewImage;