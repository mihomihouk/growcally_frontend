import axios from "axios";

export const fetchMedia = async () => {
  try {
    const { data } = await axios.get(`/api`);
    return data.message;
  } catch (error) {
    console.log(error);
  }
};
