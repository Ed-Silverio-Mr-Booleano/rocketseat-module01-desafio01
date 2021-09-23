const express = require('express');

const server = express();
server.use(express.json());

const projects = [];
let reqCount = 0;


server.use((req, res, next)=>{
    reqCount++
    console.log(`it was already done ${reqCount} request`);

    return next();
})
function checkProjectExist(req, res, next){
    const {id} = req.params;

    for(let i in projects){

        if(id == projects[i].id) return next();
    }
    return res.status(400).json({ message: 'project id does not exist'});
}

server.post('/projects', (req, res)=>{
    const {id, title, task} = req.body;

    projects.push({id, title, task});


    return res.json(projects);
});

server.get('/projects', (req, res)=>{
    return res.json(projects);
});

server.put('/projects/:id', checkProjectExist, (req, res)=>{
    const {title} = req.body;
    const {id} = req.params;
    
    
    for (let i in projects){
        id == projects[i].id ? projects[i].title = title : projects[i].title;
    }

    return res.send();
});

server.delete('/projects/:id', checkProjectExist, (req, res)=>{
    const {id} = req.params;

    for(let i in projects){
        id == projects[i].id ? projects.splice(i, 1) : projects[i].id;
    }

    return res.send();
});


server.post('/projects/:id/task', checkProjectExist, (req, res)=>{
     const {title} = req.body;
     const {id} = req.params;

     for(let i in projects){
         id == projects[i].id ? projects[i].task.push(title) : projects[i].task;
     }

     return res.send();
});

server.listen(3333, ()=>{
    console.log('server is running');
});