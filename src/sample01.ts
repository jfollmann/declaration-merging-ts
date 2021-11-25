import axios, { AxiosInstance } from 'axios';

const githubUser = 'jfollmann';

const callUserData = async (api: AxiosInstance) => {
  const startTime = new Date();
  const { data: { name, company, location } } = await api.get(`users/${githubUser}`);
  const endTime = new Date();

  const requestDuration = endTime.getTime() - startTime.getTime();

  console.log('User Data:');
  console.table({ name, company, location });
  console.log(`Request duration (callUserData): ${requestDuration} ms.`);
};

const callUserFollowers = async (api: AxiosInstance) => {
  const startTime = new Date();
  const { data } = await api.get<any[]>(`users/${githubUser}/followers`);
  const endTime = new Date();

  const requestDuration = endTime.getTime() - startTime.getTime();

  const table = data.map(({ id, login }) => ({ id, login }));

  console.log('User Followers:');
  console.table(table);
  console.log(`Request duration (callUserFollowers): ${requestDuration} ms.`);
};

const run = async () => {
  try {
    const api = axios.create({
      baseURL: 'https://api.github.com/',
    });

    await callUserData(api);
    await callUserFollowers(api);
  } catch (error: any) {
    console.error(error.message);
  }
};

run();
