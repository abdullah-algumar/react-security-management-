import React, { useState, useEffect } from "react";
import axios from "axios";

function SecurityGuardList() {
  const [guards, setGuards] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    date_of_birth: "",
    years_of_experience: "",
  });

  const fetchSecurityGuards = () => {
    axios
      .get("http://localhost:8000/security-guards/")
      .then((response) => {
        setGuards(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchSecurityGuards();
  }, []);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/security-guards/", formData)
      .then((response) => {
        console.log("Güvenlik görevlisi başarıyla eklendi.");
        fetchSecurityGuards();
        setFormData({
          name: "",
          surname: "",
          date_of_birth: "",
          years_of_experience: "",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Güvenlik Görevlileri</h2>
      <ul>
        {guards.map((guard) => (
          <li key={guard.id}>
            {guard.name} {guard.surname}
          </li>
        ))}
      </ul>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="name">Adı:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleFormChange}
        />
        <label htmlFor="surname">Soyadı:</label>
        <input
          type="text"
          id="surname"
          name="surname"
          value={formData.surname}
          onChange={handleFormChange}
        />
        <label htmlFor="date_of_birth">Doğum Tarihi:</label>
        <input
          type="date"
          id="date_of_birth"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleFormChange}
        />
        <label htmlFor="years_of_experience">Tecrübe Yılı:</label>
        <input
          type="number"
          id="years_of_experience"
          name="years_of_experience"
          value={formData.years_of_experience}
          onChange={handleFormChange}
        />
        <button type="submit">Ekle</button>
      </form>
    </div>
  );
}

export default SecurityGuardList;
