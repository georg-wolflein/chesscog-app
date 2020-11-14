import axios from "axios";

const api = axios.create({
  baseURL: "/api/",
});

export interface IPrediction {
  fen: string;
  lichess_url: string;
  corners: Array<string>;
  svg: string;
}

export interface IVersion {
  chesscog: string;
  api: string;
}

export enum Turn {
  Black = "black",
  White = "white",
}

export async function getVersion(): Promise<IVersion> {
  const response = await api.get("version");
  return response.data;
}

export async function getPrediction(
  image: File,
  turn: Turn = Turn.White
): Promise<IPrediction> {
  const data = new FormData();
  data.append("file", image);
  const response = await api.post("predict", data, {
    params: { turn },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}
