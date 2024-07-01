import { Brush } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import FormField from "../components/FormField";
import Loader from "../components/Loader";
import AnimatedShinyText from "../components/ui/animated-shiny-text";
import { Button } from "../components/ui/button";
import { useQuery } from 'react-query';

interface Post {
  _id: string;
  name: string;
  prompt: string;
}

interface HomeProps {}

const RenderCards: React.FC<{ data: Post[] | null; title: string, loading: boolean }> = ({
  data,
  title,
  loading,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader />
      </div>
    );
  }

  if (data && data.length > 0) {
    return (
      <div className="mt-4 grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
        {data.map((post) => (
          <Card key={post._id} {...post} />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-4 flex justify-center items-center h-full">
      <div className="font-bold text-primary text-xl uppercase">{title}</div>
    </div>
  );
};

const Home: React.FC<HomeProps> = () => {
  const [searchText, setSearchText] = useState<string>("");

  const fetchPosts = async () => {
    const response = await fetch(
      "https://ai-image-dv9r.onrender.com/api/v1/post",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const result = await response.json();
    return result.data.reverse();
  };

  const { data: allPosts, isLoading, error } = useQuery<Post[]>('posts', fetchPosts);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setSearchText(value);
  };

  if (error) return <div>Error fetching data</div>; 

  // Filtrage des résultats de recherche
  const searchedResults = searchText
    ? allPosts?.filter(
        (item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.prompt.toLowerCase().includes(searchText.toLowerCase())
      )
    : allPosts;

  return (
    <section className="max-w-7xl mx-auto flex flex-col items-center text-center mt-16 md:mt-24">
      <div>
        <AnimatedShinyText
          shimmerColor="red-600"
          className="inline-flex items-center justify-center px-4 py-1 transition ease-out border text-xs md:text-sm border-blue-600 rounded-lg"
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
        {searchText && (
          <span className="text-md">
            Showing Results for <span className="font-bold">{searchText}</span>:
          </span>
        )}
        <RenderCards
          data={searchedResults || null}
          title={searchText ? "No Search Results Found" : "No Posts Yet"}
          loading={isLoading}
        />
      </div>
    </section>
  );
};

export default Home;
