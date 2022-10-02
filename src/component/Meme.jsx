import React from 'react';

export default function Meme() {
  const [memeData, setMemeData] = React.useState({
    topText: '',
    bottomText: '',
    img: '',
    newsLetter: false,
  });

  React.useEffect(() => {
    async function getMemes() {
      const res = await fetch('https://api.imgflip.com/get_memes');
      const data = await res.json();
      setMemeData(data);
    }
    getMemes();
  }, []);

  function handleMemeText(e) {
    const { name, value } = e.target;

    setMemeData((meme) => ({
      ...meme,
      [name]: value,
    }));
  }
  console.log(memeData);
  function handleMemeImage(e) {
    const memeImage = memeData.data.memes;
    const randomIndex = Math.floor(Math.random() * memeImage.length);
    const randomMemeImage = memeImage[randomIndex].url;
    setMemeData((meme) => ({
      ...meme,
      img: randomMemeImage,
    }));
  }
  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          onChange={handleMemeText}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          onChange={handleMemeText}
        />
        <button className="form--button" onClick={handleMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme-wrapper">
        <div className="meme">
          <img src={memeData.img} className="meme--image" />
          <h2 className="meme--text top">{memeData.topText}</h2>
          <h2 className="meme--text bottom">{memeData.bottomText}</h2>
        </div>
      </div>
    </main>
  );
}
