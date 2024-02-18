import { useDispatch, useSelector } from "react-redux";
import { RootStateSongs } from "../types";
import { Link } from "react-router-dom";
import { deleteSong, fetchSongs } from "../Reducers/songsSagaReducer";
import { useEffect } from "react";
import Statistics from "../components/Statistics";
import { RootState } from "../Reducers/rootReducer";
import { useNavigate } from "react-router-dom";
import {
  tableStyle,
  thStyle,
  tdStyle,
  loadingStyle,
  errorStyle,
  buttonStyle,
  linkStyle,
} from "../styles/styles";

function AllSongsSaga() {
  const { loading, error, songs } = useSelector(
    (state: RootState) => state.songs
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSongs() as any);
  }, [dispatch]);

  const handleDelete = (e: any, id: string) => {
    e.preventDefault();
    dispatch(deleteSong({ id }) as any);
    navigate("/");
  };
  return (
    <div>
      <div>
        <div>
          <Link className={linkStyle} to={"/create"}>
            Create
          </Link>
        </div>
        <br />
        <div>
          <table>
            <thead className={tableStyle}>
              <tr>
                <th className={thStyle}>Title</th>
                <th className={thStyle}>Artist</th>
                <th className={thStyle}>Album</th>
                <th className={thStyle}>Genre</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td className={loadingStyle} colSpan={4}>
                    Loading
                  </td>
                </tr>
              )}
              {!loading && error ? (
                <tr>
                  <td className={errorStyle} colSpan={4}>
                    Error:
                  </td>
                </tr>
              ) : null}
              {!loading && songs.length > 0
                ? songs.map((song) => (
                    <tr key={song._id}>
                      <td className={tdStyle}>{song.title}</td>
                      <td className={tdStyle}>{song.artist}</td>
                      <td className={tdStyle}>{song.album}</td>
                      <td className={tdStyle}>{song.genre}</td>
                      <td className={tdStyle}>
                        <Link className={linkStyle} to={`/update/${song._id}`}>
                          Edit
                        </Link>
                      </td>
                      <td className={tdStyle}>
                        <button
                          className={buttonStyle}
                          onClick={(e) => handleDelete(e, song._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllSongsSaga;
