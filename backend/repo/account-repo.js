let userRepo=require('../account/user')

module.exports={
  getAccountByUsername(username){
    return userRepo.filter( user=>user.username===username)
  },

  addAccount(user){
    let length=userRepo.length
    userRepo.push(user)
    return userRepo.length-length
  },

  getAccountByUsernameAndPassword(username,password){
    return userRepo.filter( user=>user.username===username&&user.password===password)
  }
}