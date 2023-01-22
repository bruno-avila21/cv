function seleccionarAlAzar(datos){
  
  return datos[Math.floor(Math.random() * datos.length)]
}

function cargarJSON(){

  const xhttp= new XMLHttpRequest();

  xhttp.open('GET','datos.json',true);

  xhttp.send();

  xhttp.onreadystatechange=function(){
    if(this.readyState == 4 && this.status == 200){

      let datos = JSON.parse(this.responseText);

      agregarDescripcionPerfil(datos);

      agregarHabilidades(datos);

      agregarFormacion(datos); 
      
      
      agregarExperiencia(datos); 
      
        let lista=document.getElementById("lista-competencia");

        let lista_sin_repetidos=[];

        for(let i=1;i<lista.childNodes.length;i=i+2){
      
              let competencia= seleccionarAlAzar(datos.competencias);
      
              if(!lista_sin_repetidos.includes(competencia)){
      
                lista_sin_repetidos.push(competencia);
      
                lista.childNodes[i].textContent=`
                ${competencia}
                `
              }
            
            }

    }
  }
}

function agregarDescripcionPerfil(datos){
      let descripcion=document.getElementById('descripcion_perfil');

      let opcion=seleccionarAlAzar(datos.descripcion);

      descripcion.textContent=`
          ${opcion}
        `
}

function agregarHabilidades(datos){

      let lista=document.getElementById('lista-habilidades');

      let lista_sin_repetidos=[];

      for(let i=1;i<lista.childNodes.length;i=i+2){

        let habilidad= seleccionarAlAzar(datos.habilidades);

        if(!lista_sin_repetidos.includes(habilidad)){

          lista_sin_repetidos.push(habilidad);

          lista.childNodes[i].textContent=`
          ${habilidad}
          `
        }
      
      }
  }

function agregarFormacion(datos){
  let lista_formacion=document.getElementById("lista-formacion");

        let formacion_institucion= seleccionarAlAzar(datos.formacion_colegio);

        lista_formacion.childNodes[1].textContent=`
            ${formacion_institucion}
            `

        let formacion_universidad=seleccionarAlAzar(datos.formacion_universidad);

        lista_formacion.childNodes[5].textContent=`
          ${formacion_universidad}
        `
}

function agregarExperiencia(datos){
      let experiencia= seleccionarAlAzar(datos.experiencias);

      let oficio_perfil=document.getElementById('oficio');

      oficio_perfil.textContent=`
        ${experiencia.oficio}
      `

      let lista=document.getElementById('lista-experiencia');

      lista.childNodes[1].textContent=`
        ${experiencia.trabajo}
      `

        for(let j=0;j<experiencia.descripcion.length;j++){
          let descripcion=experiencia.descripcion[j];

          lista.childNodes[3].insertAdjacentHTML("afterbegin", `<li>${descripcion}</li>`);

        }

}

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

function cargarDatos(){
  console.log("Dentro de la funcion");

  const xhttp= new XMLHttpRequest();

  xhttp.open('GET','https://randomuser.me/api/',true);

  xhttp.send();

  xhttp.onreadystatechange=function(){
    if(this.readyState == 4 && this.status == 200){
      console.log(this.responseText);
      let datos = JSON.parse(this.responseText);
      console.log(datos);


      
      let nombre= document.getElementById('name');

      nombre.innerHTML='';



      let telefono=document.getElementById("telefono");



      let direccion=document.getElementById("direccion");



      let email=document.getElementById("email");

      
      let name= document.getElementById("nombre");  

      

      let fecha=document.getElementById("fecha");



      let descripcion_colegio=document.getElementById("descripcion-colegio");

      descripcion_colegio.innerHTML='';

      let descripcion_universidad=document.getElementById("descripcion-universidad");

      descripcion_universidad.innerHTML='';

      let descripcion_experiencia=document.getElementById("cargo");

      for(let item of datos.results){
        console.log(item.name);

        agregarDatosNav(item, nombre);

        agregarDatosPerfil(item, name, telefono, direccion, email,fecha);
        
        agregarDescripcionFormacion(item, descripcion_colegio, descripcion_universidad,descripcion_experiencia);
       
     
      }
    }
  }
}

function agregarDatosNav(item, nombre){
         nombre.innerHTML += `
          <p>${item.name.first} ${item.name.last}</p>
        `
}

function agregarDatosPerfil(item, name, telefono, direccion, email,fecha){
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

        email.textContent=`
          ${item.email}
        `

        let fecha_cumple_completa=`${item.dob.date.substr(0,10)}`;

        fecha.textContent=`
          ${fecha_cumple_completa}
        `
}

function agregarDescripcionFormacion(item, descripcion_colegio, descripcion_universidad,descripcion_experiencia){
        let fecha_cumple=`${item.dob.date.substr(0,4)}`;

        let año_ingreso= parseInt(fecha_cumple,10) + 12;

        let año_egreso= año_ingreso + 6;

        let año_ingreso_universidad= año_egreso + 1;

        let año_egreso_universidad= año_ingreso_universidad + 5;

        let ingreso_laboral= año_egreso_universidad + 2;

        descripcion_experiencia.innerHTML +=`
        <p>(${ingreso_laboral} - Actualidad)</p>
        `

        descripcion_colegio.innerHTML +=`
          <p>${item.location.state}, ${item.location.country}</p>
          <p>(${año_ingreso} - ${año_egreso})</p>
        `

        descripcion_universidad.innerHTML +=`
          <p>${item.location.city}, ${item.location.country}</p>
          <p>(${año_ingreso_universidad} - ${año_egreso_universidad})</p>
        `
}

window.onload=function(){
  cargarDatos();
  cargarJSON();
}

