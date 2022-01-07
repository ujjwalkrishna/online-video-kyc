const userService = require('../services/user-service');
const otpService = require('../services/otp-service');
const UserDto = require('../dtos/user-dto');
const moment = require("moment");

class AdminController {
    async searchUser(req, res) {
        const { email } = req.body;

        if (!email) {
            return res.json({
                users: [], auth: true
            })
        }

        try {
            function myFunc(total, num) {
                if (num.role != "admin") {
                    total.push({ _id: num._id, email: num.email })
                }
                return total;
            }
            let users = await userService.findAllUser({ email: { '$regex': `${email}`, '$options': 'i' } });
            users = users.reduce(myFunc, []);
            return res.json({
                users, auth: true
            })
        } catch (error) {
            console.log(err);
            res.status(500).json({ message: 'Db error' });
        }
    }

    async getUserData(req, res) {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        let user;
        try {
            user = await userService.findUser({ email: email.toLowerCase() });
            //console.log(user + " " + email)
            if (!user) {
                return res.status(404).json({ message: 'No user' });
            }
            const userDto = new UserDto(user);
            return res.json({
                user: userDto, auth: true
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Db error' });
        }
    }

    async getAllApointments(req, res) {
        try {
            let result = await userService.getAllAppointment();
            return res.json({
                data: JSON.stringify(result), auth: true
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Db error' });
        }

    }

    async confirmAppointment(req, res) {
        const agentId = req.user._id;
        let { interviewDate, userId, kycEmail, status, creditWorthiness, meetingCode } = req.body;
        console.log(req.body)
        try {
            let appointment = await userService.getAppointment({ userId });
            if (!appointment) {
                return res.status(400).json({ message: 'No matching appointment in our record' });
            }
            appointment.agentId = agentId;
            appointment.interviewDate = interviewDate;
            
            let flag = false;
            if (creditWorthiness != '' && creditWorthiness != null) {
                appointment.creditWorthiness = creditWorthiness;
                appointment.status = status;
                flag = true;
            }
            if (flag) {
                appointment.save();
                return res.json({
                    message: 'Appointment details updated successfully'
                });
            }

            //Mail meeting details
            try {
                interviewDate = moment(interviewDate).format("MM/DD/YYYY hh:mm a");
                if (meetingCode != '' && meetingCode != null) {
                    appointment.meetingCode = meetingCode;
                    appointment.save();
                    let message = `Dear Sir/Madam, Your meeting code is: ${meetingCode}.\nInterview Date & Time: ${interviewDate}\n\nPlease visit ${process.env.FRONTEND_URL}/users/video-calling and paste this meeting code and call us.\n\nPlease be ready with all your documents at this time.`
                    let resp = await otpService.sendByEmail(kycEmail, '', 'KYC Interview Meeting Code Details(TVS Credit)', message);
                    return res.json({
                        message: 'Meeting Details mailed successfully'
                    });
                }
                appointment.save();
                let message = `Dear Sir/Madam, We have arranged your online personal meeting with our agent.\nInterview Date & Time: ${interviewDate}\n\nPlease be ready with all your documents at this time, we will again send you the meeting link and code at the meeting time on your rgistered email\n\nThanks for using our service!`
                let resp = await otpService.sendByEmail(kycEmail, '', 'KYC Interview Details(TVS Credit)', message);
                return res.json({
                    message: 'Appointment saved successfully'
                });
            } catch (error) {
                console.log(error)
                return res.status(500).json({ message: 'Appointment saved but error in sending mail to user' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Db error' });
        }
    }
}

module.exports = new AdminController();
