import moment from "moment";
import { scheduleJob } from "node-schedule";
import notificationService from "./notification.service";

class JobService {
  private static instance: JobService;

  private constructor() { }

  public static async getInstance(): Promise<JobService> {
    if (!JobService.instance) {
      JobService.instance = new JobService();
      await JobService.instance.initJobs();
    }

    return JobService.instance;
  }

  protected async initJobs() {
    const notifications = await notificationService.getNotifications();
    notifications.forEach(notification => {
      const scheduleDate = moment(notification.time);
      if (scheduleDate.isBefore(moment())){
        notificationService.sendNotification(notification._id);
      } else {
        scheduleJob(scheduleDate.toDate(), () => notificationService.sendNotification(notification._id));
      }
    });
  }
}

export default JobService;