import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Skeleton,
  Grid,
  useTheme,
  Fade,
  Paper,
} from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function DataSelect() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const theme = useTheme();

  const [spots, setSpots] = useState(null);
  const [selectedSpotId, setSelectedSpotId] = useState("");
  const [spotData, setSpotData] = useState(null);
  const [loadingSpots, setLoadingSpots] = useState(false);
  const [loadingSpotData, setLoadingSpotData] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const getSpots = async () => {
      try {
        setLoadingSpots(true);
        const response = await axios.get("https://api.iotebe.com/v2/spot", {
          headers: { "x-api-key": API_KEY },
        });
        setSpots(response.data);
      } catch (error) {
        console.error("Erro ao buscar pontos:", error);
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
        const response = await axios.get(
          `https://api.iotebe.com/v2/spot/${selectedSpotId}/ng1vt/global_data/data`,
          { headers: { "x-api-key": API_KEY } }
        );
        setSpotData(response.data[0]); 
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoadingSpotData(false);
      }
    };

    if (selectedSpotId) getSpotData();
  }, [selectedSpotId]);

  const chartData = spotData
    ? [
        {
          name: "Axial",
          Aceleração: spotData.acceleration_axial,
          Velocidade: spotData.velocity_axial,
        },
        {
          name: "Horizontal",
          Aceleração: spotData.acceleration_horizontal,
          Velocidade: spotData.velocity_horizontal,
        },
        {
          name: "Vertical",
          Aceleração: spotData.acceleration_vertical,
          Velocidade: spotData.velocity_vertical,
        },
      ]
    : [];

  return (
    <Fade in={mounted} timeout={700}>
      <Box
        sx={{
          p: { xs: 2, sm: 4 },
          maxWidth: 1000,
          mx: "auto",
          transition: "all 0.5s ease",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 4,
            background: theme.palette.background.paper,
            boxShadow: theme.shadows[4],
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.01)",
              boxShadow: theme.shadows[8],
            },
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
          >
            Ponto de Coleta
          </Typography>

          
          {loadingSpots ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={56}
              sx={{ borderRadius: 2, mb: 3 }}
            />
          ) : (
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel>Ponto de coleta</InputLabel>
              <Select
                value={selectedSpotId}
                label="Ponto de coleta"
                onChange={(e) => setSelectedSpotId(e.target.value)}
              >
                {spots?.map((spot) => (
                  <MenuItem key={spot.spot_id} value={spot.spot_id}>
                    {spot.spot_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          
          {loadingSpotData ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={300}
              sx={{ borderRadius: 2 }}
            />
          ) : (
            spotData && (
              <Fade in timeout={600}>
                <Card
                  elevation={3}
                  sx={{
                    borderRadius: 3,
                    background:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(6px)",
                    transition: "all 0.4s ease",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      Dados do ponto de coleta
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {new Date(spotData.timestamp).toLocaleString("pt-BR")}
                    </Typography>

                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      <Grid item xs={12} sm={6}>
                        <Typography>
                          🌡️ Temperatura: {spotData.temperature?.toFixed(2)} °C
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography>
                          ⚙️ Aceleração Axial: {spotData.acceleration_axial}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography>
                          ↔️ Aceleração Horizontal:{" "}
                          {spotData.acceleration_horizontal}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography>
                          ↕️ Aceleração Vertical:{" "}
                          {spotData.acceleration_vertical}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography>
                          🏎️ Velocidade Axial: {spotData.velocity_axial}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography>
                          🏎️ Velocidade Horizontal:{" "}
                          {spotData.velocity_horizontal}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography>
                          🏎️ Velocidade Vertical:{" "}
                          {spotData.velocity_vertical}
                        </Typography>
                      </Grid>
                    </Grid>
                    
                    <Box sx={{ width: "100%", height: 300 }}>
                      <ResponsiveContainer>
                        <BarChart data={chartData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={theme.palette.divider}
                          />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar
                            dataKey="Aceleração"
                            fill={theme.palette.primary.main}
                          />
                          <Bar
                            dataKey="Velocidade"
                            fill={theme.palette.secondary.main}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            )
          )}
        </Paper>
      </Box>
    </Fade>
  );
}

export { DataSelect };