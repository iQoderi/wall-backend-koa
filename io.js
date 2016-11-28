/**
 * Created by qoder on 16-11-17.
 */
const io=require('socket.io');
const md5=require('md5');
const boom=require('./socket.controller/boom');
const ioController=(app)=>{
  const socket=io.listen(app);
  socket.on('connection',(socket)=>{
    boom(socket);
    socket.on('message',(data)=>{
      data._id=md5(Date.now()+Math.random()*100000000000000);
      console.log(data)
      socket.broadcast.emit('pulMess',data)
    })

    socket.on('adminSay',(data)=>{
      console.log(data)
      socket.broadcast.emit('adminSay',data)
    })
  })
}

module.exports=ioController;
