import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

const Dash = () => {
  return (
    <Box sx={{ p: 3, animation: "fadeIn 1s ease-in-out" }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
        🏨 Welcome to Hotel Management Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Booking Card */}
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              textAlign: "center",
              bgcolor: "#3B82F6",
              color: "white",
              borderRadius: "15px",
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.05)" }
            }}
          >
            <Typography variant="h6">Total Bookings</Typography>
            <Typography variant="h3">1,240</Typography>
          </Paper>
        </Grid>

        {/* Revenue Card */}
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              textAlign: "center",
              bgcolor: "#22C55E",
              color: "white",
              borderRadius: "15px",
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.05)" }
            }}
          >
            <Typography variant="h6">Revenue</Typography>
            <Typography variant="h3">$54,230</Typography>
          </Paper>
        </Grid>

        {/* Rooms Available */}
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              textAlign: "center",
              bgcolor: "#F59E0B",
              color: "white",
              borderRadius: "15px",
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.05)" }
            }}
          >
            <Typography variant="h6">Available Rooms</Typography>
            <Typography variant="h3">45</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Hotel Status */}
      <Box
        sx={{
          mt: 4,
          p: 3,
          bgcolor: "#F3F4F6",
          borderRadius: "15px",
          boxShadow: 3,
          textAlign: "center",
          transition: "opacity 0.5s ease-in-out",
          "&:hover": { opacity: 0.9 },
        }}
      >
        <Typography variant="h5" color="primary">
          Hotel is currently <b style={{ color: "#22C55E" }}>Open</b> and running smoothly! ✅
        </Typography>
      </Box>
    </Box>
  );
};

export default Dash;
