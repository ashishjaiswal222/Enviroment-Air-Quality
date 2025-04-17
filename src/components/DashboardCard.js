import { Card, CardContent, Typography } from "@mui/material";

const DashboardCard = ({ title, value, unit }) => (
  <Card className="shadow-lg">
    <CardContent>
      <Typography variant="h6" color="textSecondary">
        {title}
      </Typography>
      <Typography variant="h4">
        {value} {unit}
      </Typography>
    </CardContent>
  </Card>
);

export default DashboardCard;