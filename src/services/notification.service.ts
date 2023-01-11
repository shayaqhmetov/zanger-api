import moment from "moment";
import { scheduleJob } from "node-schedule";
import { NotificationModel } from "../models/notifications/notifications.model";

class NotificationService {
  private static instance: NotificationService;

  private constructor() { }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }

    return NotificationService.instance;
  }

  public async getNotifications() {
    return await NotificationModel.find();
  }

  public async sendNotification(id: string) {
    const notification = await NotificationModel.findById(id);
    if (notification) {
      console.log(`${moment().toISOString()} | ${notification.message}`);
      await notification.delete();
    }
  }

  public async createNotification(time: Date, message: string) {
    const notification = await NotificationModel.create({ time, message });
    console.log(`${moment().toDate()} | notification created ${notification.time}`);
    scheduleJob(notification.time, () => this.sendNotification(notification.id));
  }

}

export default NotificationService.getInstance();