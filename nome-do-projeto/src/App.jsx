import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles/App.module.css";

function App() {
  const API_KEY = "8mX7gZlFBm0bJ7jjhjg8atBpr5eGql72xYvIMpT4";

  const [spots, setSpots] = useState(null);
  const [selectedSpotId, setSelectedSpotId] = useState(null);
  const [spotData, setSpotData] = useState(null);
  const [loadingSpots, setLoadingSpots] = useState(false);
  const [loadingSpotData, setLoadingSpotData] = useState(false);

  useEffect(() => {
    const getSpots = async () => {
      try {
        setLoadingSpots(true);
        setSpots(null);

        const response = await axios.get("https://api.iotebe.com/v2/spot", {
          headers: {
            "x-api-key": API_KEY,
          },
        });

        setSpots(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingSpots(false);
      }
    };

    getSpots();
  }, []);

  useEffect(() => {
    const getSpotData = async () => {
      try {
        setLoadingSpotData(true);
        setSpotData(null);

        const response = await axios.get(
          `https://api.iotebe.com/v2/spot/${selectedSpotId}/ng1vt/global_data/data`,
          {
            headers: {
              "x-api-key": API_KEY,
            },
          }
        );

        setSpotData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingSpotData(false);
      }
    };

    if (selectedSpotId) {
      getSpotData();
    }
  }, [selectedSpotId]);

  const lastSpotData = spotData ? spotData[0] : null;

 return (
    <div className={styles.app}> 
      <h1 className={styles.title}>Ponto de coleta</h1> 
      {loadingSpots && <h1 className={styles.loading}>Carregando pontos...</h1>}  
      {spots && (
        <div className={styles.selectContainer}>
          <select
            name="spot"
            onChange={(e) => setSelectedSpotId(e.target.value)}
          >
            <option value="">Selecione um ponto de coleta</option>
            {spots.map((spot) => (
              <option key={spot.spot_id} value={spot.spot_id}>
                {spot.spot_name}
              </option>
            ))}
          </select>
        </div>
      )}
      {loadingSpotData && <h1 className={styles.loading}>Carregando dados...</h1>}  
      {lastSpotData && (
        <div className={styles.spotData}> 
          <h1 className={styles.title}>Dados do ponto de coleta</h1> 
          <h3 className={styles.dataItem}>{Date(lastSpotData.timestamp)}</h3>  
          <h3 className={styles.dataItem}>Temperatura: {lastSpotData.temperature}</h3>
          <h3 className={styles.dataItem}>Aceleração Axial: {lastSpotData.acceleration_axial}</h3>
          <h3 className={styles.dataItem}>Aceleração Horizontal: {lastSpotData.acceleration_horizontal}</h3>
          <h3 className={styles.dataItem}>Aceleração Vertical: {lastSpotData.acceleration_vertical}</h3>
          <h3 className={styles.dataItem}>Velocidade Axial: {lastSpotData.velocity_axial}</h3>
          <h3 className={styles.dataItem}>Velocidade Horizontal: {lastSpotData.velocity_horizontal}</h3>
          <h3 className={styles.dataItem}>Velocidade Vertical: {lastSpotData.velocity_vertical}</h3>
        </div>
      )}
    </div>
  );
}
export default App;