import React, { useState, useEffect } from 'react';

import { Card, FormField, Loader } from '../components';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }
  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState('');

  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeOut, setSearchTimeOut] = useState(null);

  //making call to get all posts

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:1010/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);

      if (response.ok) {
        const result = await response.json();

        setAllPosts(result.data.reverse()); //we use reverse for showing newly posts at the top
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  //make the call
  useEffect(() => {
    fetchPosts();
  }, []);

  //Filtering search handler

  const searchChangeHandle = (e) => {
    clearTimeout(searchTimeOut);
    setSearchText(e.target.value);
    setSearchTimeOut(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="">
        <h1 className="font-extrabold text-[#222328] text-[32px]">Showcases</h1>
        <p className="mt-2 text-[#666e75] text-[17px] max-w[500px]">
          Collections of Imaginative and Splendid Images by{' '}
          <span className="text-[21px] font-bold text-black">AI</span>
        </p>
      </div>

      <div className="mt-16">
        <FormField
          labelName="Search"
          type="text"
          name="text"
          placeholder="Search Posts"
          value={searchText}
          handleChange={searchChangeHandle}
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
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Result for{' '}
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards data={searchedResults} title="no title found" />
              ) : (
                <div>
                  <RenderCards data={allPosts} title="no posts found" />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
