import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { API_URL } from './config';

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },
  get(resource) {
    return Vue.axios.get(resource).catch((error) => {
      throw new Error(`ApiService GET ${error}`);
    });
  },
  post(resource, params) {
    return Vue.axios.post(resource, params).catch((error) => {
      throw new Error(`ApiService POST ${error}`);
    });
  },
};

export default ApiService;

export const NotesService = {
  getCount() {
    return ApiService.get('/notes/getCount');
  },
  getAll() {
    return ApiService.get('/notes/getAll');
  },
  getByTitle(title) {
    return ApiService.post('/notes/getByTitle', {
      title,
    });
  },
  getByGroup(group, perGroup) {
    return ApiService.post('/notes/getByGroup', {
      group,
      perGroup,
    });
  },
  getTags() {
    return ApiService.get('/notes/getTags');
  },
  getByTags(tag) {
    return ApiService.post('/notes/getByTags', {
      tag,
    });
  },
};
