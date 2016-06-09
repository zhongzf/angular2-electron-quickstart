import { HEROES } from './mock-heroes';

export class InMemoryDataService {
  createDb() {
    let heroes = HEROES;
    return {heroes};
  }
}
