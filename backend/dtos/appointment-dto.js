const moment = require("moment");

class AppointmentDto {
    status;
    creditWorthiness;
    meetingCode;
    recordedVideo;
    interviewDate;
    requestDate;

    constructor(appointment) {
        this.status = appointment.status;
        this.creditWorthiness = appointment.creditWorthiness ? appointment.creditWorthiness : null;
        this.meetingCode = appointment.meetingCode ? appointment.meetingCode : null;
        this.recordedVideo = appointment.recordedVideo ? appointment.recordedVideo : null;
        this.interviewDate = appointment.interviewDate ? moment(appointment.interviewDate).format("MM/DD/YYYY hh:mm a") : null;
        this.requestDate = moment(appointment.createdAt).format("MM/DD/YYYY hh:mm a");
    }
}

module.exports = AppointmentDto;
