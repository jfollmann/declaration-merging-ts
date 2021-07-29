/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosRequestConfig, AxiosResponse } from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    metadata?: any;
  }

  export interface AxiosResponse {
    duration?: number;
  }
}
