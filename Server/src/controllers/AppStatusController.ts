import { RequestHandler } from 'express';
import { getRecentAppStatuses, insertAppStatus } from '../repositories/AppStatusRepository';

export const getAppStatus: RequestHandler = async (req, res) => {
  try {
    const statusList = await getRecentAppStatuses(100);
    res.json(statusList);
  } catch (error) {
    console.error('Error fetching app status:', error);
    res.status(500).json({ error: 'Failed to fetch app status' });
  }
};

export const addAppStatus: RequestHandler = async (req, res) => {
  try {
    const { status_message } = req.body;
    if (!status_message) {
      res.status(400).json({ error: 'status_message is required' });
      return;
    }

    await insertAppStatus(status_message);
    res.status(201).json({ message: 'Status added successfully' });
  } catch (error) {
    console.error('Error adding app status:', error);
    res.status(500).json({ error: 'Failed to add app status' });
  }
};