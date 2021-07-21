import axios, { AxiosInstance } from 'axios';

const githubUser = 'jfollmann';

const callUserData = async (api: AxiosInstance) => {
  // https://api.github.com/users/jfollmann
  const { data: { name, company, location } } = await api.get(`users/${githubUser}`);

  console.log('User Data:');
  console.table({ name, company, location });
};

const callUserFollowers = async (api: AxiosInstance) => {
  // https://api.github.com/users/jfollmann/followers
  const { data } = await api.get<any[]>(`users/${githubUser}/followers`);

  const table = data.map(({ id, login }) => ({ id, login }));

  console.log('User Followers:');
  console.table(table);
};

const run = async () => {
  try {
    const api = axios.create({
      baseURL: 'https://api.github.com/',
    });

    await callUserData(api);
    await callUserFollowers(api);
  } catch (error) {
    console.error(error.message);
  }
};

run();
