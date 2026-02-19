const fs=require('fs');const track=()=>{const time=new Date().toISOString();fs.appendFileSync('echo-tracker.log',`[${time}] Fork echo detected.\n`);};setInterval(track,1800000);
