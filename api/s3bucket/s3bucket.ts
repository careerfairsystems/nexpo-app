import { deleteAuth, postAuthFile } from "../http/_HttpHelpers"

export interface FileCreatedDto {
    url: string;
  }


export const postToS3 = async( dataUri :string): Promise<FileCreatedDto> => {
    const response = await postAuthFile('/awss3/post', dataUri);
    const json = await response.json();
    const dto = json as FileCreatedDto;
    return  dto;
}
