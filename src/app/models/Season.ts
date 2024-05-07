import { Episode } from "./Episode";

export interface Season {
  Title: string;
  Season: number;
  Episodes: Episode[];
  totalSeasons: number;
  active?: boolean;
}
