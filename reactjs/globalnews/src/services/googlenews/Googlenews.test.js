import { YoutubeService } from './Youtube';
import expect from 'expect';

it('renders without crashing', () => {
 new YoutubeService();
});

it('getTrendingVideos function', async () => {
  const service = new YoutubeService();
  const result = await service.getTrendingVideos();
  expect(result.length).toEqual(1);
});

it('verifyVideo id function not found', async () => {
  const service = new YoutubeService();
  const result = await service.verifyVideoId('45678');
  expect(result.length).toEqual(0);
});
