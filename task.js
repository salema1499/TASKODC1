let input=document.querySelector(".input");
let input2=document.querySelector(".input2")
let submit=document.querySelector(".add");
let usersDiv=document.querySelector(".users");
let form=document.querySelector("form");
let deletall=document.querySelector(".deletall")
let arrtasks=[];

if(localStorage.getItem("users")){
  arrtasks=JSON.parse(localStorage.getItem("users"))
};


getdatafromlocalstorage()

form.addEventListener("click",function(e){
    e.preventDefault()
    if(input.value!==""&& input2.value!==""){
        addtasktoarray(input.value,input2.value);//add task to array of taskes
        input.value="";//empty input
        input2.value=""
    }
})

usersDiv.addEventListener("click",(e)=>{
    if(e.target.classList.contains("del")){
        deletetaskwith(e.target.parentElement.getAttribute("data-id"));

         e.target.parentElement.remove();
        
    }
  if(e.target.classList.contains("task")){
      togglestutswith(e.target.getAttribute("data-id"))
      e.target.classList.toggle("done")
  }

});


const addtasktoarray=(name,age)=>{
    const user={
        id:arrtasks.length+1,
        title:name,
        age:age,
        activeStutas:false,
    };
    arrtasks.push(user);
    addelementstopagefrom(arrtasks);
    //console.log(arrtasks)
    adddatatolocalstoragefrom(arrtasks)
}

function addelementstopagefrom(arrtasks){
    usersDiv.innerHTML="";
  arrtasks.forEach((user)=>{
      let div =document.createElement("div");
      div.className="task";
      if(user.activeStutas){
        div.className="task done"; 
      }
      div.setAttribute("data-id",user.id);
      let one=document.createElement("a")
      one.innerHTML= `Name : ${user.title}`;
      one.className="one"
      div.appendChild(one);

      let two=document.createElement("a");
      two.className="two"
      two.innerHTML=`Age : ${user.age}`
      div.appendChild(two);
      //console.log(div)
      let span =document.createElement("span");
      span.className="del";
      span.appendChild(document.createTextNode("Delete"));
      div.appendChild(span);
      //console.log(div);
      usersDiv.appendChild(div);

  })
}

function adddatatolocalstoragefrom(arrtasks){
    window.localStorage.setItem("users",JSON.stringify(arrtasks))
}


function getdatafromlocalstorage(){
    let data =window.localStorage.getItem("users");
    if(data){
        let tasks=JSON.parse(data)
        //console.log(tasks)
        addelementstopagefrom(tasks)
    }

}

function deletetaskwith(taskid){
    arrtasks=arrtasks.filter((user)=>{
      return  user.id !=taskid
    })
    adddatatolocalstoragefrom(arrtasks)
}

function togglestutswith(taskid){
     for(let i=0;i<arrtasks.length;i++){
         if(arrtasks[i].id==taskid){
             arrtasks[i].activeStutas==false?(arrtasks[i].activeStutas=true) :(arrtasks[i].activeStutas=false)
         }
     }
     adddatatolocalstoragefrom(arrtasks)
}
let tree=document.createElement("div")
tree.innerHTML="Delete All";
deletall.appendChild(tree)
tree.addEventListener("click",function(){
    usersDiv.innerHTML=""
    localStorage.removeItem("users");
    
})