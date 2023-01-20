import axios from 'axios';

export const getRepositories = async () => {
  try {
    const { data } = await axios.get(
      `http://127.0.0.1:4000/repos?source=github`
    );
    return data;
  } catch (error) {
    alert(error);
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
