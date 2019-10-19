import Axios from 'axios';
import {appConfig} from '../../config';
import {NewsClass} from '../../models/news.class';

const axios = Axios.create({
  baseURL: appConfig.getNewsEndPoint('')
});

export class GooglenewsService {
  
  getTopHeadlinesNews() {
    const params = {      
      country: appConfig.defaultCountry,     
      apiKey: appConfig.newsApiKey
    };

    return axios.get('/', {params}).then((res) => {
      const data = [{items: res.data.articles
          .map((item) => new NewsClass(item))
          .filter((item) => item.title !== '')
        }];

      return data;
    }).catch((err) => err);
  }

  verifyVideoId(videoId) {
    const params = {
      id: videoId,
      key: appConfig.youtubeApiKey,
      part: 'snippet'
    };

    return axios.get('/', {params}).then((res) => {   
      return res.data.items;
    }).catch((err) => err);
  }

}
