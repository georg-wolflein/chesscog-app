import axios from "axios";

const api = axios.create({
  baseURL: "/api/",
});

export interface IPrediction {
  fen: string;
  corners: Array<Array<number>>;
}

export interface IVersion {
  chesscog: string;
  api: string;
}

export enum Turn {
  Black = "black",
  White = "white",
}

export const API = {
  async getVersion(): Promise<IVersion> {
    const response = await api.get("version");
    return response.data;
  },

  async getPrediction(
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
  },
};
