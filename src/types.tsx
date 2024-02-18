export type Songs = {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
};

export type RootStateSongs = {
  loading: boolean;
  songs: Songs[];
  error: string;
};

export type TotalStatistics = {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
};

export type GenreCount = {
  _id: string;
  count: number;
};

export type ArtistSongsAndAlbums = {
  _id: string;
  songs: number;
  albums: string[];
};
export type AlbumCount = {
  _id: string;
  count: number;
};
export type RootStateStatistics = {
  loading: boolean;
  totalStatistics: TotalStatistics | null;
  songsInEveryGenre: GenreCount[];
  artistsSongsAndAlbums: ArtistSongsAndAlbums[];
  songsInEachAlbum: AlbumCount[];
  error: string;
};
