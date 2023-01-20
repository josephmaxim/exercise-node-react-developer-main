import axios from 'axios';

export const getRepositories = async () => {
  try {
    const { data } = await axios.get(`http://127.0.0.1:4000/repos`);
    return data;
  } catch (error) {
    alert(error);
  }
};
