import UserRepository from './repositories/user';
import TutorialRepository from './repositories/tutorial';
import GaRepository from './repositories/ga';

const repositories = {
  user: UserRepository,
  tutorial: TutorialRepository,
  ga: GaRepository,
};

export default {
  get(name) {
    return (...params) => new repositories[name](...params);
  },
};
