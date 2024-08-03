// @mui
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
//Localization
import React, { useEffect, useState } from 'react';
import useLocales from 'src/hooks/useLocales';
import { useStore } from 'src/stores/store';
import { baseUrl } from 'src/api/baseUrl';
import { BigPlayButton, Player } from 'video-react';
import Scrollbar from 'src/components/Scrollbar';
import { stripHtmlTags } from 'src/utils/general';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

// import { Container, Paper, IconButton, AppBar, Toolbar, InputBase } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import ReactPlayer from 'react-player';
// ----------------------------------------------------------------------

export default function TrainingVideoPlayer() {
  const language = window.localStorage.getItem('i18nextLng');
  const { translate } = useLocales();
  const { TrainingVideoStore } = useStore();
  const [selectedApp, setSelectedApp] = useState('');
  const {
    TrainingVideoList,
    getTrainingVideoFromRegistry,
    selectedTrainingVideo,
    clearSelectedTrainingVideo,
  } = TrainingVideoStore;

  const [play, SetPlay] = useState(false);

  useEffect(() => {
    if (!play) SetPlay(true);
  }, [play]);

  const playerWrapperStyle: React.CSSProperties = {
    position: 'relative',
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid item xs={12} md={12}>
          <Box display="flex">
            <Card sx={{ width: '100%' }}>
              <CardHeader title={`${translate('TrainingVideo.FilterByApp')}`} />
              <Scrollbar sx={{ width: TrainingVideoList.length * 200 }}>
                <CardContent
                  sx={{
                    minWidth: TrainingVideoList.length * 200,
                    overflow: 'hidden',
                    display: 'flex',
                    flexWrap: 'nowrap',
                  }}
                >
                  {[...new Set(TrainingVideoList.map((item) => item.application))].map(
                    (uniqueApp, index) => (
                      <Button
                        key={index}
                        sx={{
                          ml: 2,
                          size: 'small',
                          variant: 'contained',
                          key: index,
                          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                          border: 0,
                          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                          color: 'white',
                          height: 48,
                          padding: '0 30px',
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            backgroundColor: '#FF8E53',
                            boxShadow: '0 6px 10px 4px rgba(255, 105, 135, .5)',
                          },
                          '&:active': {
                            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                          },
                        }}
                        onClick={() => {
                          setSelectedApp(uniqueApp);
                        }}
                      >
                        {uniqueApp}
                      </Button>
                    )
                  )}
                </CardContent>
              </Scrollbar>
            </Card>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={8} md={8}>
        <Card>
          {/* <CardHeader title={`${translate('TrainingVideo.VideoPlayer')}`} /> */}
          <CardContent>
            {play ? (
              <div style={playerWrapperStyle}>
                <Player
                  playsInline
                  poster={baseUrl + selectedTrainingVideo?.poster}
                  src={
                    language === 'dr'
                      ? baseUrl + selectedTrainingVideo?.dariVideoPath
                      : baseUrl + selectedTrainingVideo?.pashtoVideoPath
                  }
                >
                  <BigPlayButton position="center" />
                </Player>
              </div>
            ) : (
              <>{translate('TrainingVideo.PleaseSelectAVideo')}</>
            )}
            {play && (
              <Typography
                variant="body1"
                sx={{
                  color: '#fff',
                  fontWeight: 'bold',
                  padding: '10px',
                  backgroundColor: '#424242',
                }}
              >
                {language === 'dr'
                  ? selectedTrainingVideo?.dariTitle
                  : selectedTrainingVideo?.pashtoTitle}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4} md={4}>
        <Card>
          <CardHeader title={`${translate('TrainingVideo.VideoList')}`} />
          <Scrollbar sx={{ height: { xs: 340, sm: 'auto', lg: 500 }, mt: 2, mb: 2 }}>
            {TrainingVideoList.filter((item) => item.application === selectedApp).map(
              (item, index) => (
                <Card
                  sx={{ display: 'flex', flexDirection: 'row', m: 2, borderRadius: '10px' }}
                  key={index}
                  onClick={() => {
                    SetPlay(false);
                    clearSelectedTrainingVideo();
                    getTrainingVideoFromRegistry(item.id!);
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <CardContent>
                      <Tooltip
                        title={language === 'dr' ? item.dariTitle : item.pashtoTitle}
                        placement="top"
                        followCursor
                      >
                        <Typography component="div" variant="h6">
                          {language === 'dr'
                            ? `${
                                item.dariTitle.length <= 18
                                  ? stripHtmlTags(item.dariTitle)
                                  : `${stripHtmlTags(item.dariTitle.substring(0, 18))} ...`
                              }`
                            : `${
                                item.dariTitle.length <= 18
                                  ? stripHtmlTags(item.pashtoTitle)
                                  : `${stripHtmlTags(item.pashtoTitle.substring(0, 18))} ...`
                              }`}
                        </Typography>
                      </Tooltip>
                      <Typography variant="body1" color="text.secondary" component="div">
                        {item.application}
                      </Typography>
                    </CardContent>
                  </Box>
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      sx={{
                        width: 151,
                        height: 100,
                        borderRadius: '10px',
                        cursor: 'pointer',
                      }}
                      image={baseUrl + item.poster}
                      alt="Tutorial"
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '45px',
                        height: '45px',
                        borderRadius: '50%',
                        backgroundColor: '#A3A3A3',
                        opacity: 0.6,
                        '&:hover': {
                          backgroundColor: '#A3A3A3',
                          opacity: 1,
                        },
                        cursor: 'pointer',
                      }}
                    >
                      <PlayCircleOutlineIcon
                        sx={{
                          fontSize: '48px',
                          color: '#fff',
                          cursor: 'pointer',
                          pointerEvents: 'none',
                        }}
                      />
                    </Box>
                  </Box>
                </Card>
              )
            )}
          </Scrollbar>
        </Card>
      </Grid>
    </Grid>
  );
}
