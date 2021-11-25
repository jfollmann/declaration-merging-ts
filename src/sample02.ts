import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const githubUser = 'jfollmann';

const callUserData = async (api: AxiosInstance) => {
  const { data: { name, company, location } } = await api.get(`users/${githubUser}`);

  console.log('User Data:');
  console.table({ name, company, location });
};

const callUserFollowers = async (api: AxiosInstance) => {
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

    api.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // https://stackoverflow.com/a/59885486
        config.headers['X-START-TIME'] = new Date();
        return config;
      },
    );

    api.interceptors.response.use(
      (response: AxiosResponse) => {
        const startTime = response.config.headers['X-START-TIME'];

        const endTime = new Date();
        const requestDuration = endTime.getTime() - startTime.getTime();

        console.log(`Request duration: ${requestDuration} ms.`);
        return response;
      },
    );

    await callUserData(api);
    await callUserFollowers(api);
  } catch (error: any) {
    console.error(error.message);
  }
};

run();
