const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user-model');

const AppointmentSchema = new Schema(
    {
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        agentId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        creditWorthiness: {type: String},
        meetingCode: {type: String},
        interviewDate: { type: Date },
        recordedVideo: { type: String },
        status: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Appointment', AppointmentSchema, 'appointment');