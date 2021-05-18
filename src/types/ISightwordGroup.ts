import {ISightword} from './ISightword';

export interface ISightwordGroup {
  id: string,
  name: string,
  sightwords: ISightword[]
}