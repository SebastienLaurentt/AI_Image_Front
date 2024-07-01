import { Brush } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import FormField from "../components/FormField";
import Loader from "../components/Loader";
import AnimatedShinyText from "../components/ui/animated-shiny-text";
import { Button } from "../components/ui/button";

interface Post {
  _id: string;
  name: string;
  prompt: string;
}

interface HomeProps {}

const RenderCards: React.FC<{ data: Post[] | null; title: string }> = ({
  data,
  title,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="mt-4 flex justify-center items-center">
        <div className="font-bold text-primary text-xl uppercase">{title}</div>
      </div>
    );
  }

  return (
    <div className="mt-4 grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
      {data.map((post) => (
        <Card key={post._id} {...post} />
      ))}
    </div>
  );
};

const Home: React.FC<HomeProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [allPosts, setAllPosts] = useState<Post[] | null>(null);

  const [searchText, setSearchText] = useState<string>("");
  const [searchTimeout, setSearchTimeout] = useState<number | undefined>(
    undefined
  );
  const [searchedResults, setSearchedResults] = useState<Post[] | null>(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://ai-image-dv9r.onrender.com/api/v1/post",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setSearchText(value);

    clearTimeout(searchTimeout);

    setSearchTimeout(
      window.setTimeout(() => {
        if (allPosts) {
          const searchResult = allPosts.filter(
            (item) =>
              item.name.toLowerCase().includes(value.toLowerCase()) ||
              item.prompt.toLowerCase().includes(value.toLowerCase())
          );
          setSearchedResults(searchResult);
        }
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto flex flex-col items-center text-center mt-16 md:mt-24">
      <div>
        <AnimatedShinyText
          shimmerColor="red-600"
          className="inline-flex items-center justify-center px-4 py-1 transition ease-out border  text-xs md:text-sm border-blue-600 rounded-lg  "
        >
          <span className="flex flex-row gap-x-1 items-center">
            <Brush className="size-4 md:size-5" /> | Introducing PicassoAi
          </span>
        </AnimatedShinyText>
        <h1 className="mt-3 playwrite">
          Create and Share Stunning AI-Generated Images.
        </h1>
        <p className="mt-4 md:text-md mx-auto max-w-[550px]">
          Create beautiful visuals with DALL-E AI. Explore the gallery and
          showcase your imaginative artwork to the community.
        </p>
        <Button asChild className="mt-4">
          <Link to="/create-post">Create Your Art</Link>
        </Button>
      </div>

      <div className="mt-16">
        <h2>The Community Showcase</h2>
        <FormField
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <span className="text-md">
                Showing Results for <span className="font-bold">{searchText}</span>:
              </span>
            )}
            <RenderCards
              data={searchText ? searchedResults : allPosts}
              title={searchText ? "No Search Results Found" : "No Posts Yet"}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
