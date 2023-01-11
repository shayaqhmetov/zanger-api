import moment from "moment-timezone";
import { AppointmentModel } from "../models/appointment/appointment.model";
import notificationService from "./notification.service";
import userService from "./user.service";

class AppointmentService {
  private static instance: AppointmentService;

  private constructor() { }

  public static getInstance(): AppointmentService {
    if (!AppointmentService.instance) {
      AppointmentService.instance = new AppointmentService();
    }

    return AppointmentService.instance;
  }

  public async getPartnerAppointments(partnerId: string) {
    const partner = await userService.getPartnerById(partnerId);
    const appointments = await AppointmentModel.find({ partner: partner._id });
    return appointments;
  }

  public async createAppointment(
    title: string,
    visitDate: string,
    clientId: string,
    partnerId: string
  ) {
    if (moment(visitDate).tz("Asia/Almaty").isBefore(moment().tz("Asia/Almaty"))) {
      throw new Error("You can't create appointment in past");
    }
    const partnerAppointments = await this.getPartnerAppointments(partnerId);

    const concurency = partnerAppointments.filter(appointment => {
      const previousVisitDate = moment(appointment.visitDate).tz("Asia/Almaty");
      const previousVisitFinishDate = moment(appointment.visitDate).tz("Asia/Almaty").add(40, "m");

      if (moment(visitDate).tz("Asia/Almaty").isSame(previousVisitDate)) {
        return true;
      }
      // if visit date is before old appnt date
      if (moment(visitDate).tz("Asia/Almaty").isBefore(previousVisitDate)) {
        return false;
      }
      // if visit date is before old appnt date + 40m
      if (moment(visitDate).tz("Asia/Almaty").isBefore(previousVisitFinishDate)) {
        return false;
      }

      if (moment(visitDate).tz("Asia/Almaty").isAfter(previousVisitFinishDate)) {
        return false;
      }
      return true;
    });

    if (concurency.length) {
      throw new Error("Parter busy at this time");
    }
    const client = await userService.getClientById(clientId);
    const partner = await userService.getPartnerById(partnerId);

    const clientFullName = `${client.firstName} ${client.lastName} ${client.middleName}`;
    const partnerFullname = `${partner.firstName} ${partner.lastName} ${partner.middleName}`;

    await notificationService.createNotification(
      moment(visitDate).tz("Asia/Almaty").subtract(1, "d").toDate(),
      `Привет ${clientFullName} Напоминаем о консультации с юристом ${partnerFullname} завтра в ${moment(visitDate).format("HH:mm")}.`
    );
    await notificationService.createNotification(
      moment(visitDate).tz("Asia/Almaty").subtract(2, "h").toDate(),
      `Привет ${clientFullName} Через 2 часа у вас консультация с юристом ${partnerFullname}.`
    );
    return await AppointmentModel.create({ title, visitDate: moment(visitDate), client: clientId, partner: partnerId });
  }
}

export default AppointmentService.getInstance();