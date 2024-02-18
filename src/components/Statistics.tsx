import { UseDispatch, useDispatch, useSelector } from "react-redux";
import {
  fetchArtistsSongsAndAlbums,
  fetchSongsInEachAlbum,
  fetchSongsInEveryGenre,
  fetchTotalStatistics,
} from "../Reducers/statisticsReducer";
import { RootStateStatistics } from "../types";
import { useEffect } from "react";
import { RootState } from "../Reducers/rootReducer";
import { containerStyle, cardStyle } from "../styles/styles";

function Statistics() {
  const {
    loading,
    totalStatistics,
    songsInEveryGenre,
    artistsSongsAndAlbums,
    songsInEachAlbum,
    error,
  } = useSelector((state: RootState) => state.statistics);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTotalStatistics() as any);
    dispatch(fetchSongsInEveryGenre() as any);
    dispatch(fetchArtistsSongsAndAlbums() as any);
    dispatch(fetchSongsInEachAlbum() as any);
  }, [dispatch]);

  return (
    <div>
      <div className={containerStyle}>
        <div className={cardStyle}>
          <h1>Total Statistics</h1>
          {totalStatistics && (
            <div>
              <h5>Total Songs:{totalStatistics.totalSongs}</h5>
              <h5>Total Artists:{totalStatistics.totalArtists}</h5>
              <h5>Total Albums:{totalStatistics.totalAlbums}</h5>
              <h5>Total Genres:{totalStatistics.totalGenres}</h5>
            </div>
          )}
        </div>
        <div className={cardStyle}>
          <h1> Songs In Every Genre</h1>
          {songsInEveryGenre && (
            <div>
              {songsInEveryGenre.map((genre) => (
                <h5 key={genre._id}>
                  {" "}
                  Genre: {genre._id}, Count:{genre.count}
                </h5>
              ))}
            </div>
          )}
        </div>
        <div className={cardStyle}>
          <h1> Artists and Their Songs and Albums</h1>
          {artistsSongsAndAlbums && (
            <div>
              {artistsSongsAndAlbums.map((artist) => (
                <h5 key={artist._id}>
                  {" "}
                  Artist: {artist._id}, Songs:{artist.songs}, Albums:
                  {artist.albums.join(", ")}
                </h5>
              ))}
            </div>
          )}
        </div>
        <div className={cardStyle}>
          <h1> Songs In Each Album</h1>
          {songsInEachAlbum && (
            <div>
              {songsInEachAlbum.map((album) => (
                <h5 key={album._id}>
                  {" "}
                  Album: {album._id}, Count:{album.count}
                </h5>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Statistics;
