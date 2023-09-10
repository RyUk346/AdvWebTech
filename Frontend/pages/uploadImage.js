import Link from "next/link";
import React, { useState } from 'react';
import dynamic from "next/dynamic";


const Layout = dynamic(()=>import('./Layout/layout'),{
  ssr: false,
})

const Title = dynamic(()=>import('./Layout/title'),{
  ssr: false,
})


const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
       <Title page="upload"> </Title>
    <Layout>
      <h1>Image Upload</h1>
      <input type="file" onChange={handleImageChange} accept="image/*" />
      {selectedImage && (
        <div>
          <h2>Preview</h2>
          <img src={selectedImage} alt="Selected" style={{ maxWidth: '300px' }} /><br /><br />
        

        </div>
        
      )}
      <br/><br/>
          <Link href="/">Skip</Link>
          <input type="submit" name="upload" value="Upload"  />
          </Layout> 
    </div>
  );
};

export default ImageUpload;