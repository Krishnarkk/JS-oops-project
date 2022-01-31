class User{
    constructor(...data){
        this.name=data[0];
        this.position=data[1];
    }
}


class UserDetail{
    addUser(user){
        const list=document.querySelector('#userList');
        const row=document.createElement('tr');
        const {name,position}=user;
        row.classList.add('tr');
        row.innerHTML= `
        <td class='td'>${name}</td>
        <td class='td'>${position}</td>
        <td><a href="" class="editbtn">Edit</a></td>
        <td><a href="" class="delbtn">Delete</a></td>`;
        list.appendChild(row)

    }
    deleteUser(target){
      target.parentElement.parentElement.remove();
    //   target.closest('.tr').remove();

    }
    editUser(target){
            const tr=target.closest('.tr');
            const tds=Array.from(tr.children);
            const inputs=document.querySelectorAll('input');
            let counter=0;
            inputs.forEach((input)=>{
                if(input.value!=='submit'){
                    input.value=tds[counter++].innerText;
                }
            })
    }
}

class Others{
    static show(msg,classname){
      const div=document.createElement('div');
      div.className=`alert ${classname}`;
      div.appendChild(document.createTextNode(msg));
      const container=document.querySelector('.container');
      const form=document.querySelector('#user_container');
      container.insertBefore(div,form);
      setTimeout(()=>{
          document.querySelector('.alert').remove();
      },3000)
    }

    static clear(){
        const inputs=document.querySelectorAll('input');
        inputs.forEach((input)=>{
    if(input.value!=="submit"){
        input.value="";
    }
        })

    }
}
// submit clicked
const form=document.querySelector('#user_container');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let[name,position]=[
        document.querySelector("[name='name']").value,
        document.querySelector("[name='position']").value,

    ]
    // storing value
    user=new User(name,position);

    user1=new UserDetail();

    // check empty
    if(name==="" || position===""){
        Others.show('please enter details',"failure")
    }
    else{
        user1.addUser(user);
        Others.show('successfully added');
        Others.clear()
    }

})

// edit and delete
const userList=document.querySelector('#userList');
userList.addEventListener('click',(e)=>{
  e.preventDefault();
  editDeleteUser=new UserDetail();
  if(e.target.classList.contains('delbtn')){
   editDeleteUser.deleteUser(e.target);
   Others.show('User is removed','success')
  }
  if(e.target.classList.contains('editbtn')){
      editDeleteUser.deleteUser(e.target);
      editDeleteUser.editUser(e.target);
}
})