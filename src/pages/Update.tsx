import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { RootStateSongs, Songs } from "../types";
import { editSong, updateSong } from "../Reducers/songsReducer";
import { RootState } from "../Reducers/rootReducer";
import {
  formGroup,
  formContainer,
  inputStyle,
  labelStyle,
  buttonStyle,
} from "../styles/styles";

function Update() {
  const { id } = useParams();
  const songs = useSelector((state: RootState) => state.songs);
  const existingSong = Array.isArray(songs)
    ? songs.filter((song) => song._id == id)
    : [];
  console.log(existingSong);
  const [ttitle, setTitle] = useState("");
  const [aartist, setArtist] = useState("");
  const [aalbum, setAlbum] = useState("");
  const [ggenre, setGenre] = useState("");
  if (existingSong.length > 0) {
    setTitle(existingSong[0].title);
    setTitle(existingSong[0].artist);
    setTitle(existingSong[0].album);
    setTitle(existingSong[0].genre);
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(
      editSong({
        _id: id as string,
        title: ttitle,
        artist: aartist,
        album: aalbum,
        genre: ggenre,
      } as Songs) as any
    );
    navigate("/");
  };
  return (
    <div>
      <div className={formContainer}>
        <h2>Update Song</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className={formGroup}>
            <label htmlFor="title" className={labelStyle}>
              Song Title
            </label>
            <input
              type="text"
              name="title"
              value={ttitle}
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
              value={aartist}
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
              value={aalbum}
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
              value={ggenre}
              className={inputStyle}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <br />
          <button className={buttonStyle}>Update</button>
        </form>
      </div>
    </div>
  );
}

export default Update;
