import StatisticsSaga from "../components/StatisticsSaga";
import AllSongs from "../components/AllSongs";
import AllSongsSaga from "../components/AllSongsSaga";

function Home() {
  return (
    <div>
      <div>
        <StatisticsSaga />
      </div>
      <div>
        <AllSongsSaga />
      </div>
    </div>
  );
}

export default Home;
