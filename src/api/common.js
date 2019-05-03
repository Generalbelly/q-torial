import axios from 'axios';
import {
  GET_METHOD,
  POST_METHOD,
  PUT_METHOD,
  DELETE_METHOD,
} from '../utils/constants';

export default class BaseAPI {
  constructor(basePath) {
    this.basePath = basePath;
  }

  static request(params) {
    return axios(params);
  }

  list(params) {
    return BaseAPI.request({
      url: `/${this.basePath}/`,
      method: GET_METHOD,
      params,
    });
  }

  add(data) {
    return BaseAPI.request({
      url: `/${this.basePath}/`,
      method: POST_METHOD,
      data,
    });
  }

  get(id) {
    return BaseAPI.request({
      url: `/${this.basePath}/${id}`,
      method: GET_METHOD,
    });
  }

  update(id, data) {
    return BaseAPI.request({
      url: `/${this.basePath}/${id}`,
      method: PUT_METHOD,
      data,
    });
  }

  delete(id) {
    return BaseAPI.request({
      url: `/${this.basePath}/${id}`,
      method: DELETE_METHOD,
    });
  }
}
