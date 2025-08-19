import React, { useEffect, useState } from "react";

function FAQs() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/support/faqs")
      .then((res) => res.json())
      .then((data) => setFaqs(data))
      .catch((err) => console.error("Error cargando FAQs:", err));
  }, []);

  return (
    <div>
      <h2>❓ Preguntas Frecuentes</h2>
      <ul>
        {faqs.map((f, index) => (
          <li key={index}>
            <strong>{f.question}</strong>
            <br />
            {f.answer}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FAQs;
