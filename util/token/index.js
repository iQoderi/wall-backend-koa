/**
 * Created by qoder on 16-10-11.
 */
const md5=require('md5');

function tokenCreator(key,expiresIn) {
  const token={
    createAt:Date.now(),
    token:md5(key+Date.now()),
    expiresIn:Date.now()+expiresIn
  };
  return token;
}

module.exports=tokenCreator;
