function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/');
}

$.ajax({
  url: 'https://randomuser.me/api/',
  dataType: 'json',
  success: function(data) {
    console.log(data);
  }
});   

window.onload=function cargarDatos(){
  console.log("Dentro de la funcion")

  const xhttp= new XMLHttpRequest();

  xhttp.open('GET','https://randomuser.me/api/',true);

  xhttp.send();

  xhttp.onreadystatechange=function(){
    if(this.readyState == 4 && this.status == 200){
      console.log(this.responseText);
      let datos = JSON.parse(this.responseText);
      console.log(datos);


      //Para el nombre en el nav
      let nombre= document.getElementById('name');

      nombre.innerHTML='';

      //Para telefono dentro de informacion

      let telefono=document.getElementById("telefono");

      //Para direccion dentro de informacion

      let direccion=document.getElementById("direccion");

      //Para email dentro de informacion

      let email=document.getElementById("email");

      //Para el nombre dentro de informacion
      let name= document.getElementById("nombre");


      

      

      //Para fecha nacimiento dentro de informacion

      let fecha_nacimiento=document.getElementById("fecha_cumpleaños");

      for(let item of datos.results){
        console.log(item.name);

        nombre.innerHTML += `
          <p>${item.name.first} ${item.name.last}</p>
        `

        document.getElementById("img-perfil").src=item.picture.large;

        name.textContent = `
          ${item.name.first} ${item.name.last}
        `

        telefono.textContent=`
          ${item.phone}
        `

        direccion.textContent=`
          ${item.location.street.name} ${item.location.street.number}, ${item.location.country}
        `

       /* let fecha_cumple=`${item.dob.date}`;

        let fecha_date=new Date(fecha_cumple);

        let fecha_convertida=formatDate(fecha_date);

        console.log(fecha_convertida);

        fecha_nacimiento.textContent=`
          ${fecha_convertida}
        `

        edad.textContent=`
        ${item.dob.age}
        `*/

        email.textContent=`
          ${item.email}
        `

      }
    }
  }
}

  

      