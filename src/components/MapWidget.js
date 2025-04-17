import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Card, CardContent, Typography } from "@mui/material";

const MapWidget = () => (
  <Card className="shadow-lg">
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Sensor Locations
      </Typography>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "300px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[51.505, -0.09]}>
          <Popup>Sensor 1</Popup>
        </Marker>
      </MapContainer>
    </CardContent>
  </Card>
);

export default MapWidget;