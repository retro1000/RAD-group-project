// import https from 'https';
// import bodyParse from 'body-parser';
// import {API} from './config/ninja_api.config.js';


const y = async(element)=>{
    await ExersiceQueries.createNewExersice(element.name.replace(/[_-]/g, ' '), (element.type.charAt(0).toUpperCase() + element.type.slice(1)).replace(/[_-]/g, ' '), (element.equipment.charAt(0).toUpperCase() + element.equipment.slice(1)).replace(/[_-]/g, ' '), (element.difficulty.charAt(0).toUpperCase()+element.difficulty.slice(1)).replace(/[_-]/g, ' '), null, null, null, null, element.instructions.split('.'), 1);
}

// try{
//     const p = await API.api('abdominals', 10);
// console.log(p[0]);
// const element = p[0];

//     await ExersiceQueries.createNewExersice(element.name.replace(/[_-]/g, ' '), (element.type.charAt(0).toUpperCase() + element.type.slice(1)).replace(/[_-]/g, ' '), (element.equipment.charAt(0).toUpperCase() + element.equipment.slice(1)).replace(/[_-]/g, ' '), (element.difficulty.charAt(0).toUpperCase()+element.difficulty.slice(1)).replace(/[_-]/g, ' '), null, null, null, null, element.instructions.split('.'), [1]);


// //  p.forEach(element => {
// //      console.log(element.name);
// //      const k = async()=>{await y(element)};
// //  });
// }catch(err){
//     console.log(err.message);
// }






async function func(){
    try{
        // const p = await API.api('abdominals', 10);
    // console.log(p[0]);
    // const element = p[0];
    
        // await ExersiceQueries.createNewExersice(element.name.replace(/[_-]/g, ' '), (element.type.charAt(0).toUpperCase() + element.type.slice(1)).replace(/[_-]/g, ' '), (element.equipment.charAt(0).toUpperCase() + element.equipment.slice(1)).replace(/[_-]/g, ' '), (element.difficulty.charAt(0).toUpperCase()+element.difficulty.slice(1)).replace(/[_-]/g, ' '), null, null, null, null, element.instructions.split('.'), [1]);
    
    const p = [
        {name:'tacobell', type:'cardio', equipment:'dumbell', difficulty:'expert', instructions:'jshshh. kdskjss. kskssk'},
        {name:'tacobell', type:'cardio', equipment:'dumbell', difficulty:'expert', instructions:'jshshh. kdskjss. kskssk'},
        {name:'tacobell', type:'cardio', equipment:'dumbell', difficulty:'expert', instructions:'jshshh. kdskjss. kskssk'},
        {name:'tacobell', type:'cardio', equipment:'dumbell', difficulty:'expert', instructions:'jshshh. kdskjss. kskssk'},
        {name:'tacobell', type:'cardio', equipment:'dumbell', difficulty:'expert', instructions:'jshshh. kdskjss. kskssk'},
        {name:'tacobell', type:'cardio', equipment:'dumbell', difficulty:'expert', instructions:'jshshh. kdskjss. kskssk'}
    ];

     const x = p.map(async function add(element, counter=50){
         console.log(element.name);
            await ExersiceQueries.createNewExersice(
                element.name.replace(/[_\-\/]/g, ' '),
                (element.type.charAt(0).toUpperCase() + element.type.slice(1)).replace(/[_\-\/]/g, ' '),
                (element.equipment.charAt(0).toUpperCase() + element.equipment.slice(1)).replace(/[_\-\/]/g, ' '),
                (element.difficulty.charAt(0).toUpperCase() + element.difficulty.slice(1)).replace(/[_\-\/]/g, ' '),
                null,
                null,
                null,
                null,
                element.instructions.split('. '),
                [1]
            );
     });
     await Promise.all(x);
    console.log(x);
    }catch(err){
        console.log(err.message);
    }
}

async function write(){
    try{
        const contentToAppend = await API.api('middle_back', 10);
        // console.log(contentToAppend);
        var s = '\n\n'+contentToAppend.map(i=>'{'+i.name+','+i.type+','+i.muscle+','+i.equipment+','+i.difficulty+','+i.instructions+'}\n');
        const k = s.slice(0, s.length-2) + s.slice(s.length-2 + 1);
        fs.appendFile('./exe.txt', k, (err) => {
            if (err) {
                throw err;
            }
        });
    }catch(err){
        throw err.message;
    }
}

// func();
// write();


// const options = {
//     key: fs.readFileSync('path/to/private/key.pem'),
//     cert: fs.readFileSync('C:\\Windows\\System32\\workout-plans-web-app.cer'),
// };

// const server = https.createServer(options, app);

// const x = ExersiceQueries.createNewExersice(p.name, p.type, p.equipment, p.difficulty, null, null, null, null, s, 1);
// const x = ExersiceQueries.createNewExersice(p.name.replace(/[_-]/g, ' '), (p.type.charAt(0).toUpperCase() + p.type.slice(1)).replace(/[_-]/g, ' '), (p.equipment.charAt(0).toUpperCase() + p.equipment.slice(1)).replace(/[_-]/g, ' '), (p.difficulty.charAt(0).toUpperCase()+p.difficulty.slice(1)).replace(/[_-]/g, ' '), null, null, null, null, p.instructions.split('.'), 1);
// await Promise.all(x);