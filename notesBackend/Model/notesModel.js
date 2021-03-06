const mongoose = require('mongoose');
const userModel = require('../Model/userModel')


const objUserModel = new userModel();
const Schema = mongoose.Schema
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    userID: {
        type: Schema.Types.ObjectId, //referencing other documents from other collections
        ref: 'notes', //userSchema
        require: true
    },
    labelID: [{
        type: Schema.Types.ObjectId, //referencing other documents from other collections
        ref: 'label', //labelSchema
        default: null
    }],
    colorNote: {
        type: String,
        default: "#ffffff"
    },
    isArchive: {
        type: Boolean,
        default: false
    },
    isTrash: {
        type: Boolean,
        default: false
    },
    collabratorID: [{
        type: Schema.Types.ObjectId, //referencing other documents from other collections
        ref: 'notes', //userSchema
        default: null
    }],
},
    {
        timestamps: true
    });

let userNoteModel = mongoose.model('userNote', noteSchema);

class NoteModel {

    createNote(data) {
        let noteData = new userNoteModel(data)
        return noteData.save(data)
            .then((result) => {
                return result;
            }).catch((error) => {
                return error;
            });
    }

    updateNote(id, newData) {
        console.log("uuuuuuuppppppppppd");
        return userNoteModel.findByIdAndUpdate(id, newData)
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            })
    }

    deleteNote(id) {
        return userNoteModel.findByIdAndRemove(id)
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            })
    }

    getUserAllNotes(id) {
        return userNoteModel.find(id)
            .populate('userID')
            .populate('labelID')
            .populate('collabratorID')
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            })
    }

    findOne(id) {
        return userNoteModel.findOne({ _id: id })
            .then((result) => {
                console.log(result);
                return result;
            })
            .catch((error) => {
                console.log(error);
                return ({ message: "Something Went Wrong Please Check", error: error });
            })
    }

    //attachedLabel
    labelAdd_Remove(id, labelID) {
        console.log()
        return userNoteModel.findByIdAndUpdate(id, labelID)
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            })
    }
    // dettachFromLabel(id, labelID){
    //     return userNoteModel.findByIdAndUpdate(id, { $pull: { labelID: labelID } })
    //     .then(result => {
    //         return result;
    //     })
    //     .catch(error => {
    //         return error;
    //     })
    // }

    //addCollabrator
    collabrationAdd_Remove(noteID, userID) {
        return userNoteModel.findByIdAndUpdate(noteID, userID)
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            })
    }

}

module.exports = new NoteModel()