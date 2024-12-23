import axios, { AxiosError } from 'axios';
import FormData from 'form-data';
import { CustomError } from './error/CustomError';

const apiKey = '7ddf320004d038da4a0f576aceeb48d6';

export const uploadToImgBB = async (formData: FormData) => {
  try {
    const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

    const response = await axios.post(url, formData, {
      headers: formData.getHeaders(),
    });

    return response.data.data;
  } catch (error: Error | AxiosError | unknown) {
    if (error instanceof Error || error instanceof AxiosError)
      throw new CustomError(error.message);
  }
  throw new Error('Error Uploading Image');
};
