import { Alert, AlertTitle, Card, CardContent } from "@mui/material";

const AlertPanel = ({ sensorData }) => {
  const alerts = sensorData
    .filter((data) => data.mq135?.integerValue > 200 || data.mq7?.integerValue > 100)
    .map((data) => ({
      message: `High ${data.mq135?.integerValue > 200 ? "AQI" : "CO"} detected at ${data.timestamp?.timestampValue}`,
    }));

  return (
    <Card className="shadow-lg">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Alerts
        </Typography>
        {alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <Alert severity="warning" key={index} className="mb-2">
              <AlertTitle>Warning</AlertTitle>
              {alert.message}
            </Alert>
          ))
        ) : (
          <Typography>No alerts at this time.</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default AlertPanel;