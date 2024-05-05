import './App.css'
import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Form } from './Form/Form';
import { Section } from './Section/Section';

const INITCONTACTS = {
  contacts: [],
  filter: '',
  name: '',
  number:'',
}

export const App = () => {
  const [dataPhonebook, setDataPhonebook] = useState(INITCONTACTS);

  const onChange = (event) => {
    const { name, value } = event.target;
    setDataPhonebook({...dataPhonebook,[name]: value })
   };
    
  const onSubmit = (event) => {
    const { name, number, contacts} = dataPhonebook;
    event.preventDefault();
    document.getElementById("nameContact").value = '';
    document.getElementById("numberContact").value = '';

const isExist = contacts.some(
      contact => contact.name.toLowerCase() === name.trim().toLowerCase()
    );
    if (isExist) {
      alert(`${name} is in contacts`);
      return;
    }

    setDataPhonebook({
      ...dataPhonebook,
      contacts: [...contacts, { id: nanoid(), name, number }],
      filter:'',
      name: '',
      number: ''
    });
  };

  const onDelete = (contactId) => {
    setDataPhonebook({
      ...dataPhonebook,
      contacts: dataPhonebook.contacts.filter(contact => contact.id !== contactId)
    });
  };
    
  useEffect(() => {
    const data = window.localStorage.getItem("contacts");
    if (data !== null) setDataPhonebook(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(dataPhonebook));
  }, [dataPhonebook]);

  return (
    <>
      <div className='divForm'> 
      <Section title="Phonebook" children={<Form dataPhonebook={dataPhonebook} onSubmit={onSubmit} onChange={onChange}></Form>}></Section>
        <Section title="Contacts" children={<ContactList dataPhonebook={dataPhonebook} onDelete={onDelete} onChange={onChange}></ContactList>}></Section>
        </div>
    </>
  );
};