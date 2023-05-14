import React, { useState } from 'react';
import { json, useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showImage, setShowImage] = useState(false);

  const generatingImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true); //loading state
        const response = await fetch('http://localhost:1010/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();
        //updating the form object by adding the photo property to it
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('ENTER YOUR IMAGINATION');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch('http://localhost:1010/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });
        await response.json();
        alert('success');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="text-center">
        <h1 className="font-extrabold text-[#222328] text-[32px]">Showcases</h1>
        <p className="mt-2 text-[#666e75] text-[17px] max-w[500px]">
          Create and Share Your Imaginative and Splendid Images through{' '}
          <span className="text-[21px] font-bold text-black">AI</span>
        </p>
      </div>
      <form className="mt-16 mx-auto max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex. phoenix"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Your Imagination"
            type="text"
            name="prompt"
            placeholder="A man wanders through the rainy streets of Tokyo, with bright neon signs, 50mm"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
        </div>

        {/* create place for image to show and preview */}
        <div className="relative bg-gray-50 border mt-9 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
          {form.photo ? (
            <img
              src={form.photo}
              alt={form.prompt}
              className="w-full h-full object-contain cursor-pointer"
              onClick={() => setShowImage(true)}
            />
          ) : (
            <img
              src={preview}
              alt="preview"
              className="w-9/12 h-9/12 object-contain "
            />
          )}
          {showImage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center sm:w-full sm:h-full mx-auto w-full h-full bg-black">
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain sm:w-full sm:h-full"
              />
              <button
                className="absolute bottom-0 right-0 bg-[#6469ff] text-white font-bold py-2 px-4 rounded-lg sm:absolute sm:bottom-0 sm:left-0 sm:right-auto sm:top-auto"
                onClick={() => setShowImage(false)}
              >
                Close
              </button>
            </div>
          )}

          {/* End div of, place for image to show and preview */}
          {/* Loading */}
          {generatingImg && (
            <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
              <Loader />
            </div>
          )}
          {/* End Loading */}
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generatingImage}
            className="text-white bg-blue-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generating... ' : 'Generate'}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[#486681] text-[14px]">
            Share Your Image With You Friends{' '}
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share With The Community'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
