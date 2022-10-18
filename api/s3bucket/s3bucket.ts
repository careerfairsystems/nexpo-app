import { PanResponder } from "react-native";
import { deleteAuth, getAuth, postAuthFile } from "../http/_HttpHelpers"
import * as reactnativefs from "react-native-fs";

export interface FileCreatedDto {
    url: string;
  }


export const postToS3 = async( dataUri :string, userId: string): Promise<FileCreatedDto> => {
    const response = await postAuthFile(`/awss3/${userId}`, dataUri);
    const json = await response.json();
    const dto = json as FileCreatedDto;
    return  dto;
}

export const deleteOnS3 = async(userId: string): Promise<boolean> => {
  const response = await deleteAuth(`/awss3/${userId}`);
  return response.ok
}

export const getFromS3 = async(userId: string): Promise<Blob> => {
  const response = await getAuth(`/awss3/${userId}`)
  console.log(response)
  const blob = await response.blob();
  console.log(blob)
  const url = URL.createObjectURL(blob)
  console.log(url)
  const a = document.createElement('a')
  a.href = url;
  a.download = __filename || 'download'
  a.click;


  //var RNFS = require('react-native-fs');
  //reactnativefs.readFile(response.body)
  //const dto = json as FileCreatedDto;
  return blob
}
