let userRepo = require("../db")["account"];
let SHA256 = require("crypto-js/sha256");
let db = require("../db");

module.exports = {
    getAccountByUsername(username) {
        return userRepo.findAll({
            include: [
                {
                    model: db.location
                }
            ],
            where: {
                username
            }
        });
    },

    getAccountByEmail(email) {
        return userRepo.findAll({
            include: [
                {
                    model: db.location
                }
            ],
            where: {
                email
            }
        });
    },

    addAccount(user) {
        return userRepo.create(user);
    },

    updatePassword(username, password) {
        return userRepo.update({password}, {where: {username}});
    },

    getAccountByUsernameAndPassword(username, password) {
        return userRepo.findAll({
            include: [
                {
                    model: db.location
                }
            ],
            where: {
                username,
                password: SHA256(password) + ""
            }
        });
    },

    getUser(offset, limit) {
        return userRepo.findAndCountAll({
            include: [
                {
                    model: db.location
                }
            ],
            offset,
            limit
        });
    },

    updateStatus(username) {
        return userRepo.findOne({where: {username}}).then(user => {
            userRepo.update({isActived: !user.isActived}, {where: {username}})
        })
        // return userRepo.update({isActived: this.isActived === 1 ? 0 : 1}, {where: {username}})
    }
};
