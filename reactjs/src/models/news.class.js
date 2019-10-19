import moment from 'moment';

export class NewsClass {  
  title = '';
  description = '';
  content = '';
  thumbnailImage = '';
  source = '';
  url = '';
  author = '';
  publishedAt = '';

  constructor(data) {
    if (!data || !data[ 'title' ]) {
      return;
    }

    this.title = data[ 'title' ];
    this.description = data[ 'description' ];
    this.content = data[ 'content' ];
    this.publishedAt = moment(data[ 'publishedAt' ])
      .fromNow();
    this.thumbnailImage = data[ 'urlToImage' ];
    this.source = data[ 'source' ]['name'];
    this.author = data[ 'author' ];
    this.url = data[ 'url' ];
  }
}
