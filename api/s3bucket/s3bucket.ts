import { ImagePickerCancelledResult } from "expo-image-picker";
import { deleteAuth, getAuth, postAuthFile, postAuthFile2, postAuthFile3 } from "../http/_HttpHelpers"
import * as ImagePicker from "expo-image-picker";

export interface FileCreatedDto {
    url: string;
  }


export const postToS3 = async( dataUri :string, userId: string, fileType: string): Promise<FileCreatedDto> => {
 
  const response = await postAuthFile(`/awss3/${userId + fileType}`, dataUri);
  alert(response);
  const json = await response.json();
  const dto = json as FileCreatedDto;
  return  dto;
}

export const postToS32 = async( b: Blob, userId: string, fileType: string): Promise<FileCreatedDto> => {
  
  const response = await postAuthFile2('/awss3/-4', b);
  const json = await response;
  const dto = json as FileCreatedDto;
  return  dto;
}

export const postToS321 = async( dataUri :string, userId: string, fileType: string): Promise<FileCreatedDto> => {
 
  const response = await postAuthFile3(`/awss3/${userId + fileType}`, dataUri);
  const json = await response;
  const dto = json as FileCreatedDto;
  return  dto;
}

export const deleteOnS3 = async(userId: string, fileType: string): Promise<boolean> => {
  const response = await deleteAuth(`/awss3/${userId + fileType}`);
  return response.ok
}

export const getFromS3 = async(userId: string, fileType: string): Promise<string> => {
  const response = await getAuth(`/awss3/${userId + fileType}`)
  console.log(response)
  return response.url
}
