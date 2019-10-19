import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import YoutubePlayer from './Youtube.Player';
import { YoutubeService } from '../../../services/youtube/Youtube';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><YoutubePlayer /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
it('checkVideoValid id function not found', async () => {
  const service = new YoutubeService();
  const result = await service.verifyVideoId('45678');
  expect(result.length).toEqual(0);
});
