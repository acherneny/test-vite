import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@mui/material';

// import { Timer } from '@mui/icons-material';

const TimerCard = () => {
  return (
    <Card sx={{ maxWidth: 450 }}>
      <CardMedia
        sx={{
          height: 100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* <Timer /> */}
      </CardMedia>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Timer: 0:00:000
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small">Start</Button>
        <Button size="small">Pause</Button>
      </CardActions>
    </Card>
  );
};
export default TimerCard;
