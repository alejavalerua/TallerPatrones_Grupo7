import React, { useEffect, useState } from "react";

function Contacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/support/contacts")
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((err) => console.error("Error cargando contactos:", err));
  }, []);

  return (
    <div>
      <h2>📞 Números de Contacto</h2>
      <ul>
        {contacts.map((c, index) => (
          <li key={index}>
            <strong>{c.type}:</strong> {c.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contacts;
