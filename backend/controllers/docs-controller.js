const Jimp = require('jimp');
const path = require('path');
const UserDto = require('../dtos/user-dto');
const AppointmentDto = require('../dtos/appointment-dto');
const userService = require('../services/user-service');

class DocsController {
    async storeBasicInfo(req, res) {
        let { basicInfo } = req.body;
        basicInfo = JSON.parse(basicInfo);

        const userId = req.user._id;
        try {
            const user = await userService.findUser({ _id: userId });

            if (!user) {
                res.status(404).json({ message: 'User not found in our record' });
            }

            user.firstName = basicInfo.firstName;
            user.lastName = basicInfo.lastName;
            user.fatherName = basicInfo.fathersName;
            user.motherName = basicInfo.mothersName;
            user.kycEmail = basicInfo.email;
            user.mobileNumber = basicInfo.mobile;
            user.permanentAddress = basicInfo.permanentAddress + `, zip - ${basicInfo.zipCode}`;
            user.occupation = basicInfo.occupation;
            user.gender = basicInfo.gender;
            user.save();

            return res.json({
                user: new UserDto(user), auth: true
            })
        } catch (error) {
            return res.status(500).json({ message: 'Db error' });
        }
    }

    async storeLatLng(req, res) {
        let { locationLatitude, locationLongitude } = req.body;

        const userId = req.user._id;
        try {
            const user = await userService.findUser({ _id: userId });

            if (!user) {
                res.status(404).json({ message: 'User not found in our record' });
            }

            user.locationLatitude = locationLatitude
            user.locationLongitude = locationLongitude;
            user.save();

            return res.json({
                user: new UserDto(user), auth: true
            })
        } catch (error) {
            return res.status(500).json({ message: 'Db error' });
        }
    }

    async storeBankInfo(req, res) {
        let data = req.body;

        const userId = req.user._id;
        try {
            let user = await userService.findUser({ _id: userId });

            if (!user) {
                res.status(404).json({ message: 'User not found in our record' });
            }
            Object.assign(user, data);

            user.save();
            return res.json({
                user: new UserDto(user), auth: true
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Db error' });
        }
    }

    async saveFiles(req, res) {
        const { docNumber, imageFront, imageBack, document } = req.body;

        if (!imageFront || !imageBack || !docNumber) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const buffer_front = Buffer.from(
            imageFront.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),
            'base64'
        )
        const buffer_back = Buffer.from(
            imageBack.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),
            'base64'
        )
        let JIMP_QUALITY = 30;

        const imagePathFront = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}.png`;

        const imagePathBack = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}.png`;

        try {
            //Front
            let jimpResp = await Jimp.read(buffer_front);
            jimpResp.quality(JIMP_QUALITY).write(path.resolve(__dirname, `../storage/${imagePathFront}`));

            //Back
            jimpResp = await Jimp.read(buffer_back);
            jimpResp.quality(JIMP_QUALITY).write(path.resolve(__dirname, `../storage/${imagePathBack}`));
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Unable to process the files' });
        }

        const userId = req.user._id;
        try {
            const user = await userService.findUser({ _id: userId });

            if (!user) {
                res.status(404).json({ message: 'User not found in our record' });
            }

            if (document === "aadhar") {
                user.aadharFrontUrl = `/storage/${imagePathFront}`
                user.aadharBackUrl = `/storage/${imagePathBack}`
            } else {
                user.panFrontUrl = `/storage/${imagePathFront}`
                user.panBackUrl = `/storage/${imagePathBack}`
            }

            user.save();

            return res.json({
                user: new UserDto(user), auth: true
            })
        } catch (error) {
            return res.status(500).json({ message: 'Db error' });
        }
    }

    async saveBiometric(req, res) {
        const { image, document } = req.body;

        if (!image) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const buffer = Buffer.from(
            image.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),
            'base64'
        )
        let JIMP_QUALITY = 30;

        const imagePath = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}.png`;

        try {
            let jimpResp = await Jimp.read(buffer);
            jimpResp.quality(JIMP_QUALITY).write(path.resolve(__dirname, `../storage/${imagePath}`));
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Unable to process the files' });
        }

        const userId = req.user._id;
        try {
            const user = await userService.findUser({ _id: userId });
            if (!user) {
                res.status(404).json({ message: 'User not found in our record' });
            }
            if (document === "user-photo") {
                user.userPhotoUrl = `/storage/${imagePath}`
            } else if (document === "user-sign") {
                user.signatureUrl = `/storage/${imagePath}`
            }
            user.save();
            return res.json({
                user: new UserDto(user), auth: true
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Db error' });
        }
    }

    async reqAppointment(req, res) {
        const userId = req.user._id;
        try {
            let appointment = await userService.getAppointment({ userId });
            if (appointment) {
                return res.status(404).json({ message: 'Appointment already requested' });
            }
            let appt = await userService.createAppointment({ userId });
            return res.json({
                appointment: appt, auth: true
            })
        } catch (error) {
            return res.status(500).json({ message: 'Db error' });
        }
    }

    async saveRecordedVideo(req, res) {
        try {
            console.log(req.user._id);
            const userId = req.user._id;
            let appointment = await userService.getAppointment({ userId });
            if (!appointment) {
                return res.status(404).json({ message: 'No appointment' });
            }
            appointment.recordedVideo = process.env.BASE_URL + `/recordings/${req.file.filename}`
            appointment.save();
            return res.json({
                appointment: appointment, auth: true
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Db error' });
        }
    }

    async getAppointment(req, res) {
        const userId = req.user._id;
        try {
            let appointment = await userService.getAppointment({ userId });
            if(appointment) {
                const appointmentDto = new AppointmentDto(appointment);
                console.log(appointmentDto)
                return res.json({
                    appointment: appointmentDto, auth: true
                })
            }
            return res.json({
                appointment: null, auth: true
            })
        }catch(error) {
            console.log(error)
            return res.status(500).json({ message: 'Db error' });
        }
    }
}

module.exports = new DocsController();