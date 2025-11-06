const fs=require('fs');const log=()=>{const time=new Date().toISOString();fs.appendFileSync('steward-register.log',`[${time}] New steward registered.\n`);};setInterval(log,3600000);
