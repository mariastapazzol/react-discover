import React, { useState, useEffect } from 'react'; // { useState} = hook = permitem conectar os recursos de estados e ciclos de vida do React a partir de componentes funcionais
import './styles.css';

import { Card } from '../../components/Card'; // buscar referencia em outra pasta

function Home() {

 const [studentName, setStudentName] = useState(''); //const { nome de usuário, senha } = elementos de destino do evento
     const [students, setStudents] = useState([]);
     const [user, setUser] = useState({name:'', avatar:''});

function handleAddStudent(){
  const newStudent = {
    name: studentName,
    time: new Date().toLocaleDateString("pt-br", { // define horario
      hour: '2-digit',
      minute: '2-digit',
      second:  '2-digit',
    })
  };
   
  setStudents(prevState => [...prevState, newStudent]); //um nome que você deu ao argumento passado para a função de callback setState.

}

useEffect(() => {
  async function fetchData() {
    const response = await fetch("https://api.github.com/users/mariastapazzol");
    const data = await response.json();
    console.log("DADOS ===>", data);

    setUser({
      name: data.name,
      avatar: data.avatar_url,
    });
  }

  fetchData();
}, []);

  return(

    <div className='container'>
      <header>
        <h1> Lista de presença </h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt='foto de perfil' />
        </div>

      </header>
      
      <input 
         type="text" 
         placeholder="Digite o nome..."
         oneChange={ e => setStudentName(e.target.value)}
         />

      <button type="button" onClick={handleAddStudent}>Adicionar</button>

   {
      students.map(student =>  (
        <Card 
           key={student.time} //chave para evitar alerta (usada com id normalmente)
           name={student.name} 
           time={student.time}/>
      ))    
   }
      

    </div>
  )
  }

export default Home
