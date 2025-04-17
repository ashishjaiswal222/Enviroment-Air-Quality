import { Line, Bar, Scatter } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";

const ChartWrapper = ({ type, title, data }) => {
  const Component = { line: Line, bar: Bar, scatter: Scatter }[type];

  return (
    <Card className="shadow-lg">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Component data={data} options={{ responsive: true, maintainAspectRatio: false }} />
      </CardContent>
    </Card>
  );
};

export default ChartWrapper;