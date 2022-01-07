const UserModel = require('../models/user-model');
const AppointmentModel = require('../models/appointment-model');
const UserDto = require('../dtos/user-dto');
const AppointmentDto = require('../dtos/appointment-dto');
const moment = require('moment');

class UserService {
    async findUser(filter) {
        const user = await UserModel.findOne(filter);
        return user;
    }

    async findAllUser(filter) {
        const user = await UserModel.find(filter);
        return user;
    }

    async createUser(data) {
        const user = await UserModel.create(data);
        return user;
    }

    async getAppointment(filter) {
        const appointment = AppointmentModel.findOne(filter);
        return appointment;
    }

    async createAppointment(data) {
        const appointment = AppointmentModel.create(data);
        return appointment;
    }

    async getAllAppointment() {
        const appointments = await AppointmentModel.find({status: 0});
        let arr = [];
        console.log(appointments);
        async function asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        }

        await asyncForEach(appointments, async (e) => {
            try {
                let user = await UserModel.findOne({ _id: e.userId });
                user = new UserDto(user);
                let f_appointment = new AppointmentDto(e);
                let obj = {
                    ...f_appointment,
                    ...user
                }
                arr.push(obj);
            } catch (error) {
                console.log(error);
            }
        });
        return arr;
    }
}

module.exports = new UserService();
