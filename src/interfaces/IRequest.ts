import { IOptions } from './IOptoins';

export interface IRequest {
  (url: string,
    options: IOptions): Promise<unknown>
}
