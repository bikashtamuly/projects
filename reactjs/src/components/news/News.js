import React, { Component } from 'react';

import Axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import WarningIcon from '@material-ui/icons/Warning';
import './news.scss'
import { GooglenewsService } from '../../services/googlenews/Googlenews';


const service = new GooglenewsService();
let title = '';
let content = '';
class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
          news: [],          
          loadingState: false,          
          totalNews: 0,
          country: '',
          setModalShow: false,
          newsContent: '',
          newsTitle: ''
        };
        this.openNews = this.openNews.bind(this);
    }
    componentWillMount() {
        this.props.setTitle('News: Top Headlines');
        this.props.onChanges(() => this.loadNews());    
    }
    async loadNews() {
        Axios.all(await service.getTopHeadlinesNews())
             .then((data) => { 
               this.setState({
                news: data[0].items,
                 isError: false,
                 loadingState: false,                 
                 totalNews: data[0].items.length
               });               
             })
             .catch((err) => {
               this.setState({isError: true});
               console.log(err);
             });
      }
      openNews(ntitle) {
        this.setState({setModalShow: true});
        content = ntitle;
      }
      newsCard() {
        return this.state.news.length ? this.state.news.map((news, index) =>
        <div key={index} className="card-container">
            <div className="card" onClick={this.openNews.bind(news.title, news.content)}>                
                <p className="news-title text-ellipsis">
                    {news.title}
                </p>
                <div className="description">
                    <div>{news.description}</div>   
                    <div className="news-statistic">
                        <div className="publishedAt">
                            <AvTimerIcon/>
                            <span>{news.source}</span> - 
                            <span>{news.publishedAt}</span>
                        </div>                        
                    </div>
                </div>
                <div className="img-news">
                    <img src={news.thumbnailImage} alt={news.title}/>                    
                </div>
            </div>
        </div>      
        ) : <div className="no-results">
            <WarningIcon/>
            <span>No News for the selected filter(s).</span>
        </div>;
      }
      setModalhide () {
        this.setState({setModalShow: false});
      }

      errorOnPage() {
        return <div className="error-plate">
        <WarningIcon/>
        <span>Error loading. Please try again later.</span>
      </div>;
      }
    render() {
     return !this.state.isError ? ( <div id="news-body" ref="iScroll">      
        <div id="news">
          <div className="row">
              {this.newsCard()}
          </div>
          <MyVerticallyCenteredModal
            show={this.state.setModalShow}
            onHide={() => this.setModalhide()}
          />
        </div>
        {this.state.loadingState ? <p className="loading"> loading News ...</p> : ""}
        </div>
        ) : (this.errorOnPage());
    }
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      dialogClassName="modal-90w"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {content}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default News;