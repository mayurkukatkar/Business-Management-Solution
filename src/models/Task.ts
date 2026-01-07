import mongoose, { Schema, model, models } from 'mongoose';

const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date, required: true },
    status: {
        type: String,
        enum: ['PENDING', 'COMPLETED', 'OVERDUE', 'CANCELLED'],
        default: 'PENDING'
    },
    priority: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'], default: 'MEDIUM' },
    relatedLead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Task = models.Task || model('Task', TaskSchema);

export default Task;
