import { getRecentAppStatuses } from '../repositories/AppStatusRepository';

export const getAppStatus = async () => {
  return await getRecentAppStatuses(100);
};