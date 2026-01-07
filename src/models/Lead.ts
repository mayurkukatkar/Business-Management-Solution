import mongoose, { Schema, model, models } from 'mongoose';

const NoteSchema = new Schema({
    content: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const LeadSchema = new Schema({
    name: { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    status: {
        type: String,
        enum: ['NEW', 'FOLLOW_UP', 'CONVERTED', 'LOST'],
        default: 'NEW'
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    notes: [NoteSchema],
}, { timestamps: true });

const Lead = models.Lead || model('Lead', LeadSchema);

export default Lead;
