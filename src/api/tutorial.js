import {
  LIST_TUTORIALS,
  ADD_TUTORIAL,
  UPDATE_TUTORIAL,
  DELETE_TUTORIAL, REDIRECT_TUTORIAL,
} from '../store/mutation-types';

import BaseAPI from './common';

import { GET_METHOD } from '../utils/constants';

class TutorialAPI extends BaseAPI {
  redirect() {
    return this.request({
      url: `/${this.basePath}/redirect`,
      method: GET_METHOD,
    });
  }
}

const tutorialApi = projectId => new TutorialAPI(`projects/${projectId}/tutorials`);

export default ({
  projectId, id, data, mutationType, params,
}) => {
  switch (mutationType) {
    case LIST_TUTORIALS:
      return tutorialApi(projectId).list(params);
    case ADD_TUTORIAL:
      return tutorialApi(projectId).add(data);
    case UPDATE_TUTORIAL:
      return tutorialApi(projectId).update(id, data);
    case DELETE_TUTORIAL:
      return tutorialApi(projectId).delete(id);
    case REDIRECT_TUTORIAL:
      return tutorialApi(projectId).redirect();
    default:
      break;
  }
  throw new Error('api not found');
};
