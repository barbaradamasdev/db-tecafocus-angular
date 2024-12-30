export interface Rating {
  Source: string;
  Value: string;
}

export interface Database {
  Title: string;
  Year: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  imdbRating: string;
  imdbID: string;
  Type: string;
  TotalSeasons: string;
  TecaNota: string;
  TecaComments: string;
}
