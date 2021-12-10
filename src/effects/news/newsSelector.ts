import { RootState } from '../../store';

export const newsSelector = (state: RootState) => state.news.data;
export const newsLoadingSelector = (state: RootState) => state.news.status === 'pending';
export const newsLoadingFailed = (state: RootState) => state.news.status === 'failed';
export const getNewsById = (id: number) => (state: RootState) => state.news.data[id];
