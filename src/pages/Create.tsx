import { useState } from "react";
import { createSong } from "../Reducers/songsReducer";
import { UseDispatch, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Songs } from "../types";
import {
  formContainer,
  formGroup,
  labelStyle,
  inputStyle,
  buttonStyle,
} from "../styles/styles";

function Create() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(createSong({ title, artist, album, genre } as Songs) as any);
    navigate("/");
  };
  return (
    <div className={formContainer}>
      <div>
        <h2>Add New Song</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className={formGroup}>
            <label htmlFor="title" className={labelStyle}>
              Song Title
            </label>
            <input
              type="text"
              name="title"
              className={inputStyle}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={formGroup}>
            <label htmlFor="artist" className={labelStyle}>
              Artist
            </label>
            <input
              type="text"
              name="artist"
              className={inputStyle}
              onChange={(e) => setArtist(e.target.value)}
            />
          </div>
          <div className={formGroup}>
            <label htmlFor="album" className={labelStyle}>
              Album
            </label>
            <input
              type="text"
              name="album"
              className={inputStyle}
              onChange={(e) => setAlbum(e.target.value)}
            />
          </div>
          <div className={formGroup}>
            <label htmlFor="genre" className={labelStyle}>
              Genre
            </label>
            <input
              type="text"
              name="genre"
              className={inputStyle}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <br />
          <button className={buttonStyle}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Create;
