/**
 * Created by qoder on 16-11-17.
 */
const io=require('socket.io');

const ioController=(app)=>{
  const socket=io.listen(app);
  socket.on('connection',(socket)=>{
    console.log('connect success');
    socket.emit('connectSuccess',{data:'123'})
    socket.on('test',function (data) {
      socket.emit('sendSucc',{data:'收到消息'})
    })
  })
}

module.exports=ioController;
