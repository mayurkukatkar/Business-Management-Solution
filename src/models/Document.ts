import mongoose, { Schema, model, models } from 'mongoose';

const ItemSchema = new Schema({
    description: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    rate: { type: Number, required: true, min: 0 },
    amount: { type: Number, required: true }, // qty * rate
}, { _id: false });

const DocumentSchema = new Schema({
    type: { type: String, enum: ['QUOTATION', 'INVOICE'], required: true },
    number: { type: String, required: true }, // e.g. QT-001, INV-001

    // Relations
    relatedLead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    // Content
    items: [ItemSchema],

    // Financials
    subTotal: { type: Number, required: true },
    taxRate: { type: Number, default: 18 }, // GST %
    taxAmount: { type: Number, required: true },
    totalAmount: { type: Number, required: true }, // sub + tax

    // Status
    status: {
        type: String,
        enum: ['DRAFT', 'SENT', 'ACCEPTED', 'PAID', 'CANCELLED'],
        default: 'DRAFT'
    },

    // Dates
    issuedDate: { type: Date, default: Date.now },
    dueDate: { type: Date },

    // Meta
    notes: { type: String },
    terms: { type: String },

    // E-Signature
    signature: {
        signedBy: { type: String }, // Name of signer
        signedAt: { type: Date },
        ipAddress: { type: String },
        otpVerified: { type: Boolean, default: false }
    },

    // Internal OTP logic
    currentOtp: { type: String, select: false }, // Hidden by default
    otpExpires: { type: Date, select: false }
}, { timestamps: true });

// Compound index to ensure uniqueness of numbers per type if needed
// DocumentSchema.index({ type: 1, number: 1 }, { unique: true });

const Document = models.Document || model('Document', DocumentSchema);

export default Document;
