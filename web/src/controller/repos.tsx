import axios from 'axios';

export const getRepositories = async () => {
  try {
    const { data } = await axios.get(`http://127.0.0.1:4000/repos`);
    return data;
  } catch (error) {
    return null;
  }
};

export const getMarkDownData = async (repoName: string) => {
  try {
    const { data } = await axios.get(
      `https://raw.githubusercontent.com/${repoName}/master/README.md`
    );
    return data;
  } catch (error) {
    return '';
  }
};
