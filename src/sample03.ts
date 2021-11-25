import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const githubUser = 'jfollmann';

const callUserData = async (api: AxiosInstance) => {
  const { data: { name, company, location }, duration } = await api.get(`users/${githubUser}`);

  console.log('User Data:');
  console.table({ name, company, location });
  console.log(`Request duration (callUserData): ${duration} ms.`);
};

const callUserFollowers = async (api: AxiosInstance) => {
  const { data, duration } = await api.get<any[]>(`users/${githubUser}/followers`);

  const table = data.map(({ id, login }) => ({ id, login }));

  console.log('User Followers:');
  console.table(table);
  console.log(`Request duration (callUserFollowers): ${duration} ms.`);
};

const axiosRequestInterceptor = (config: AxiosRequestConfig) => {
  config.metadata = { startTime: new Date() };

  return config;
};

const axiosResponseInterceptor = (response: AxiosResponse) => {
  response.config.metadata.endTime = new Date();

  const { startTime, endTime } = response.config.metadata;

  response.duration = endTime.getTime() - startTime.getTime();
  return response;
};

const run = async () => {
  try {
    const api = axios.create({
      baseURL: 'https://api.github.com/',
    });

    api.interceptors.request.use(axiosRequestInterceptor);
    api.interceptors.response.use(axiosResponseInterceptor);

    await callUserData(api);
    await callUserFollowers(api);
  } catch (error: any) {
    console.error(error.message);
  }
};

run();
