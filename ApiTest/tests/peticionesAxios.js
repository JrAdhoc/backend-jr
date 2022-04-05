import axios from 'axios';


axios('http://localhost:4001/users/getusers')
.then(result=>{
    console.log(result.data);
})

// axios('http://localhost:4001/users/adduser',{
//     method:'POST',
//     data:{
//         first_name:"Juan Ignacio",
//         last_name:"Rivero",
//         email:"juanii.rivero@gmail.com"
//     }
// })
// .then(result=>{
//     console.log(result.data);
// })

// axios('http://localhost:4001/users/deleteuser',{
//     method:'DELETE',
//     data:{
//         data:{
//             id:"624af460a5afb51d5ae976db"     
//         }
//     }
// })
// .then(result=>{
//     console.log(result.data)
// })

