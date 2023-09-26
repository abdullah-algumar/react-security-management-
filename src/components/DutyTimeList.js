import React, { useState, useEffect } from "react";
import axios from "axios";

function DutyTimeList() {
  const [dutyTimes, setDutyTimes] = useState([]);
  const [guards, setGuards] = useState([]); // Güvenlik görevlileri için bir state ekleyin
  const [selectedGuard, setSelectedGuard] = useState("");

  useEffect(() => {
    // Güvenlik görevlilerini çekmek için API isteği yapın
    axios
      .get("http://localhost:8000/security-guards/")
      .then((response) => {
        setGuards(response.data);
        // İlk güvenlik görevlisini seçili olarak ayarlayabilirsiniz
        if (response.data.length > 0) {
          setSelectedGuard(response.data[0].id.toString());
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Seçili güvenlik görevlisinin görev sürelerini çekmek için API'ye istek gönderin
    if (selectedGuard !== "") {
      axios
        .get(
          `http://localhost:8000/security-guards/${selectedGuard}/duty-times/`
        )
        .then((response) => {
          setDutyTimes(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedGuard]);

  return (
    <div>
      <h2>Güvenlik Görevlilerinin Görev Süreleri</h2>
      <label htmlFor="guardSelect">Güvenlik Görevlisi Seç:</label>
      <select
        id="guardSelect"
        onChange={(e) => setSelectedGuard(e.target.value)}
        value={selectedGuard}
      >
        {guards.map((guard) => (
          <option key={guard.id} value={guard.id}>
            {guard.name} {guard.surname}
          </option>
        ))}
      </select>
      <ul>
        {dutyTimes.map((dutyTime, index) => (
          <li key={index}>
            Başlangıç Saati: {dutyTime.start_time}, Bitiş Saati:{" "}
            {dutyTime.end_time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DutyTimeList;
