import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useUserInformation } from "@/context";

type PostType = {
  creator: string;
  caption: string;
  postPhoto: string;
  tag: string;
};

const Posting = ({
  post,
  apiEndpoint,
}: {
  post: PostType;
  apiEndpoint: string;
}) => {
  const { getUser, getFeedPost } = useUserInformation();
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isError, setError] = useState<boolean | string>(false);
  const [imgUploading, setUploading] = useState(false);
  const [imgURL, setImgURL] = useState("")
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostType>({
    defaultValues: post,
  });

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {

      const maxSizeInBytes = 2 * 1024 * 1024; // max size 4mb
      if(files[0].size > maxSizeInBytes){
        setError("File is too large, please upload a file less than 2MB")
        return
      }

      setSelectedFile(files[0]);
      setError(false);
      setUploading(true);

      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", `vibezone`);
      data.append("cloud_name", `dliaiszkk`);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dliaiszkk/image/upload?api_key=251576227613388`,
          {
            method: "POST",
            body: data,
          }
        );
        const result = await response.json();
          setImgURL(result.secure_url);
          setUploading(false)
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlePublish = async (data: any) => {
    setIsUploading(true);
    const formdata = { ...data, postPhoto: imgURL };
    try {
      const postForm = new FormData();
      postForm.append("creatorId", formdata.creator);
      postForm.append("caption", formdata.caption);
      postForm.append("tag", formdata.tag);
      postForm.append("postPhoto", formdata.postPhoto);

      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: postForm,
      });

      if (response.ok) {
        router.replace(`/`);
        getUser();
        getFeedPost();
      }

      setIsUploading(false);
    } catch (err) {
      console.log(err);
      setIsUploading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-7 pb-20 relative "
      onSubmit={(data) => {
        handleSubmit(handlePublish)(data);
      }}>
      <div>
        <label
          htmlFor="photo"
          onClick={(e)=>{
            imgUploading && e.preventDefault()
          }}
          className="flex gap-4 items-center text-light-1 cursor-pointer">
          {selectedFile ? (
            <div className="relative rounded-lg">
            <Image
              src={URL.createObjectURL(selectedFile)}
              alt="Selected"
              width={250}
              height={200}
              className="object-cover rounded-lg"
            />
          {
            imgUploading && <div className="rounded-lg absolute bg-white opacity-70 top-0 left-0 w-full h-full text-black flex justify-center items-center"><BeatLoader color="#000" loading={true} /></div>
          }
            </div>
          ) : (
            <AddPhotoAlternateOutlined
              sx={{ fontSize: "100px", color: "white" }}
            />
          )}
          {!selectedFile && <p>Upload a photo</p>}
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          id="photo"
          style={{ display: "none" }}
          required
        />
        {isError && <p className="text-red-500">{isError}</p>}
      </div>

      <div>
        <label htmlFor="caption" className="text-light-1">
          Caption
        </label>
        <textarea
          {...register("caption", {
            required: "Caption is required",
            validate: (value) => {
              if (value.length < 3) {
                return "Caption must be more than 2 characters";
              }
            },
          })}
          rows={3}
          placeholder="What's on your mind?"
          className="w-full input"
          id="caption"
        />
        {errors.caption && (
          <p className="text-red-500">{errors.caption.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="tag" className="text-light-1">
          Tag
        </label>
        <input
          {...register("tag", { required: "Tag is required" })}
          type="text"
          placeholder="#tag"
          className="w-full input"
        />

        {errors.tag && <p className="text-red-500">{errors.tag.message}</p>}
      </div>
      {!isUploading ? (
        imgUploading ? <div className="py-3 rounded-lg mt-10 bg-[#ccc] opacity-50 text-light-1 w-full flex justify-center items-center bottom-24 ">
          Publish
      </div> :
        <button
          type="submit"
          className="py-2.5 rounded-lg mt-10 bg-purple-1 hover:bg-pink-1 text-light-1"
          onClick={() => selectedFile === null && setError(true)}>
          Publish
        </button>
      ) : (
        <div className="py-3 rounded-lg mt-10 bg-purple-1 text-light-1 w-full flex justify-center items-center  bottom-24 ">
          <BeatLoader color="#ffffff" loading={true} />
        </div>
      )}
    </form>
  );
};

export default Posting;
