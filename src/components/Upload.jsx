import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import PageTltle from './PageTltle'
import apiClient from '../api/apiClient';

export default function Upload() {
  const [previewImage, setPreviewImage] = useState(null)
  const [file,setFile]=useState(null);

  const location=useLocation();
  const imageUrl=location.state?.imageUrl;

  
  const navigate=useNavigate();

 useEffect(() => {
  const capturedImage = localStorage.getItem('capturedImage')

  if (capturedImage) {
    setPreviewImage(capturedImage)

    
 
    fetch(capturedImage)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], "captured.jpg", {
          type: "image/jpeg",
        })
        setFile(file)
      })
  }
}, [])

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return
    setFile(selectedFile);
    const filePreview = URL.createObjectURL(selectedFile)
    localStorage.removeItem('capturedImage')
    setPreviewImage(filePreview)
  }

  const handleClickAnime=async()=>{
    if(!file) return;

    
    try{
      const formData=new FormData();
      formData.append("file",file);


       const res = await apiClient.post("/anime", formData);

      let data=res.data;
      if(data){
      navigate("/displaysticker",{state:data});
      }


    }catch(error){

       if (error.response?.status === 400) {
      alert("Validation error");
    }else{
           alert(
      error.response?.data?.errorMessage ||
      error.message ||
      "Something went wrong"
    );

   
    }
   

    } 
  }
  const handleClick=()=>{
    navigate("/displaysticker",{state:{imageUrl:previewImage}});
  }

  return (
    <>
      <PageTltle title="Pick your style" />
      <div className="min-h-[70vh] px-4 py-10">
        <div className="mx-auto grid max-w-5xl gap-6 rounded-[32px] border border-primary/15 bg-white/85 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-sm dark:border-primary/20 dark:bg-gray-900/85 md:grid-cols-[1fr_0.95fr] md:p-8">
          <div className="flex flex-col justify-center rounded-[28px] bg-gradient-to-br from-primary/10 via-white to-yellow-50 p-8 dark:from-primary/15 dark:via-gray-900 dark:to-black">
            <span className="mb-4 w-fit rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary dark:bg-primary/20">
              Upload Workspace
            </span>
            <h2 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white">
              Upload your image and choose the sticker style
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
              Start with your own photo, logo, or artwork. Then choose whether
              you want a standard sticker output or an AI-generated version.
            </p>
          </div>

          <div className="glass-panel rounded-[28px] p-6 shadow-inner md:p-8">
            <div className="mb-4 flex justify-end">
              <NavLink
                to="/customize"
                className="rounded-2xl border border-primary/25 bg-white px-4 py-2 text-sm font-semibold text-primary transition duration-200 hover:-translate-y-0.5 hover:border-primary/50 dark:bg-gray-900 dark:text-light"
              >
                Back to customize
              </NavLink>
            </div>
            <label
              htmlFor="file"
              className="mb-3 block text-lg font-semibold text-gray-900 dark:text-white"
            >
              Upload your image here
            </label>
            <input
              type="file"
              id="file"
              name="file"
              accept="image/*"
              onChange={handleFileChange}
              className="glass-input glass-file-input text-sm text-gray-700 dark:text-gray-300"
            />

            {previewImage && (
              <div className="mt-6 overflow-hidden rounded-3xl border border-primary/15 bg-white p-3 dark:bg-gray-900">
                <p className="mb-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Selected image preview
                </p>
                <img
                  src={previewImage}
                  alt="Selected preview"
                  className="h-64 w-full rounded-2xl object-cover"
                />
              </div>
            )}

            {imageUrl && (
              <div className="mt-6 overflow-hidden rounded-3xl border border-primary/15 bg-white p-3 dark:bg-gray-900">
                <p className="mb-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Selected image preview
                </p>
                <img
                  src={imageUrl}
                  alt="Selected preview"
                  className="h-64 w-full rounded-2xl object-cover"
                />
              </div>
            )}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <button onClick={handleClick} disabled={previewImage===null} className="glass-button">
                Normal Sticker
              </button>
              <button onClick={handleClickAnime} disabled={previewImage===null} className="rounded-2xl border border-primary/25 bg-white px-5 py-3 text-base font-semibold text-primary transition duration-200 hover:-translate-y-0.5 hover:border-primary/50 dark:bg-gray-900 dark:text-light">
                AI Generated Sticker
              </button> 
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
