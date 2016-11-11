'use strict';

var Note = require('../models/Note.model');
var User = require('../models/User.model');
var async = require('async');

// Show all username
var showusername = function(cb) {
    var query = User.find({});
    query.sort({
        username: 1
    })
    .exec(function(err, users) {
        cb(err, users);
    })
}

// Export all user notes to show user in dropdown menu
exports.allUsersNotes = function(req, res) {
    // Find all users
    User.find({})
        .sort({
            username: 1
        })
        .exec(function(err, users) {
            if (err) {
                console.log('Error getting users');
            } else {
                return res.render('newnote', {
                    title: 'New note',
                    users: users
                });
            }
        });
}

// Export create note to create a new note
exports.createNote = function(req, res) {
    var newNote = new Note();

    // Insert data into database
    newNote.memberName = req.body.memberName;
    newNote.project = req.body.project;
    newNote.workYesterday = req.body.workYesterday;
    newNote.workToday = req.body.workToday;
    newNote.impediment = req.body.impediment;

    newNote.save(function(err) {
        if (err) {
            var message = 'Sorry, there was an error. ' + err;
            res.render('newnote', {
                title: 'Note - Error adding new note',
                message: message
            });
        } else {
            console.log('Success adding new note');
            res.redirect(301, '/');
        }
    });
}

// Filter by member name
exports.filterByMember = function(req, res) {
    var filter = req.body.noteByMember;

    if (filter.length === 0) {
        console.log('No notes found');
    } else if (filter == 'showall') {

        async.parallel([
            function(cb) {
                var query = Note.find({});
                query.sort({
                    createdOn: 'desc'
                })
                .exec(function(err, notes) {
                    cb(err, notes);
                });
            },

            // Show all username data
            showusername
        ], function(err, results) {
            if (err) {
                console.log(err);
            } else {
                res.render('index', {
                    notes: results[0],
                    users: results[1]
                });
            }
        });

    } else {

        async.parallel([
            function(cb) {
                var query = Note.find({});
                query.where({
                    memberName: filter
                })
                .sort({
                    createdOn: 'desc'
                })
                .exec(function(err, notes) {
                    cb(err, notes);
                });
            },

            // Show all username data
            showusername
        ], function(err, results) {
            if (err) {
                console.log(err);
            } else {
                res.render('index', {
                    notes: results[0],
                    users: results[1]
                });
            }
        });
    }
}
