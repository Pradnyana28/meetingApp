var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Validate memberName before saving
var memberNameValidator = [
    function(val) {
        return (val.length > 0 && val != "Select name");
    },

    "Select a valid member name"
]

var noteSchema = new Schema({
    memberName: {
        type: String,
        validate: memberNameValidator
    },
    project: {
        type: String,
        required: true
    },
    workYesterday: {
        type: String,
        required: true
    },
    workToday: {
        type: String,
        required: true
    },
    impediment: {
        type: String,
        required: true,
        default: 'none'
    },
    createdOn: {
        type: Date,
        default: Date
    }
});

module.exports = mongoose.model('Note', noteSchema);
