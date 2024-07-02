import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import preview from "../assets/preview.png";
import FormField from "../components/FormField";
import Loader from "../components/Loader";
import { Button } from "../components/ui/button";
import { toast } from "../components/ui/use-toast";
import { getRandomPrompt } from "../utils";

interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          "https://ai-image-dv9r.onrender.com/api/v1/dalle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: form.prompt,
            }),
          }
        );

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      toast({
        title: "Please provide a proper prompt",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.name && form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(
          "https://ai-image-dv9r.onrender.com/api/v1/post",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );

        await response.json();
        toast({ title: "Shared successfully ! ", variant: "default" });
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      toast({
        title:
          "Please provide a name and generate an image with proper details! ",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="max-w-7xl mx-auto flex flex-col items-center text-center mt-16 md:mt-24 px-2">
      <div className="flex flex-col items-center">
        <h2>Create Your Own Art Quickly</h2>
        <p className="max-w-[400px] mt-4">
          Generate an imaginative image through DALL-E AI and share it with the
          community
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            isTextarea
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <Button
            onClick={generateImage}
            disabled={!form.prompt || generatingImg}
          >
            {generatingImg ? "Generating..." : "Generate"}
          </Button>
        </div>

        <div className="mt-10 flex flex-col items-start">
          <p className="my-2 text-[#666e75] text-[14px]">
            ** Once you have created the image you want, you can share it with
            others in the community **
          </p>
          <Button
            variant="destructive"
            type="submit"
            disabled={loading || !form.name || !form.photo}
          >
            {loading ? "Sharing..." : "Share with the Community"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
