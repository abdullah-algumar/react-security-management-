import React, { useState, useEffect } from "react";
import axios from "axios";

function DutyTimeList() {
  const [dutyTimes, setDutyTimes] = useState([]);
  const [formData, setFormData] = useState({
    guard: "",
    start_time: "",
    end_time: "",
  });

  const fetchDutyTimes = () => {
    axios
      .get("http://localhost:8000/duty-times/")
      .then((response) => {
        setDutyTimes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchDutyTimes();
  }, []);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/duty-times/", formData)
      .then((response) => {
        console.log("Görev zamanı başarıyla eklendi.");
        fetchDutyTimes();
        setFormData({
          guard: "",
          start_time: "",
          end_time: "",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Görev Zamanları</h2>
      <ul>
        {dutyTimes.map((dutyTime) => (
          <li key={dutyTime.id}>
            Başlangıç Saati: {dutyTime.start_time}, Bitiş Saati:{" "}
            {dutyTime.end_time}
          </li>
        ))}
      </ul>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="guard">Güvenlik Görevlisi:</label>
        <input
          type="text"
          id="guard"
          name="guard"
          value={formData.guard}
          onChange={handleFormChange}
        />
        <label htmlFor="start_time">Başlangıç Saati:</label>
        <input
          type="time"
          id="start_time"
          name="start_time"
          value={formData.start_time}
          onChange={handleFormChange}
        />
        <label htmlFor="end_time">Bitiş Saati:</label>
        <input
          type="time"
          id="end_time"
          name="end_time"
          value={formData.end_time}
          onChange={handleFormChange}
        />
        <button type="submit">Ekle</button>
      </form>
    </div>
  );
}

export default DutyTimeList;
