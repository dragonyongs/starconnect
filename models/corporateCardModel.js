const mongoose = require('mongoose');

const corporateCardSchema = new mongoose.Schema({
    cardNumber: {
        type: String,
        required: true
    },
    cardHolderName: {
        type: String,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }
});

const CorporateCard = mongoose.model('CorporateCard', corporateCardSchema);

module.exports = CorporateCard;
