import Slider from 'react-slick';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Button, CardContent, Typography, CardProps } from '@mui/material';

// components
import Image from '../../../components/Image';
import { CarouselDots } from '../../../components/carousel';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------

type ItemProps = {
  id: number;
  image: string;
  Title: string;
  Description: string;
};

interface Props extends CardProps {
  list: ItemProps[];
}

const listItem = [
  {
    id: 1,
    Title: 'NPFX Market',
    Description: 'Welcome to NPFX Company Management System',
    image: `/slider/Designer (1).jpeg`,
  },
  // {
  //   id: 2,
  //   Title: 'Title2',
  //   Description: 'test',
  //   image: `/slider/Designer (1).jpeg`,
  // },
  // {
  //   id: 3,
  //   Title: 'Title3',
  //   Description: 'test',
  //   image: `/slider/Designer (3).jpeg`,
  // },
  // {
  //   id: 4,
  //   Title: 'Title',
  //   Description: 'test',
  //   image: `/slider/Designer (6).jpeg`,
  // },
];

export default function NPFX_NewProducts() {
  const theme = useTheme();

  const settings = {
    speed: 1000,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({ position: 'absolute', right: 24, bottom: 24 }),
  };

  return (
    <Card>
      <Slider {...settings}>
        {listItem.map((item) => (
          <CarouselItem key={item.id} item={item} />
        ))}
      </Slider>
    </Card>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: ItemProps;
};

function CarouselItem({ item }: CarouselItemProps) {
  const { image, Title, Description } = item;

  return (
    <Box sx={{ position: 'relative' }}>
      <CardContent
        sx={{
          left: 0,
          bottom: 0,
          zIndex: 9,
          maxWidth: '80%',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <Typography variant="overline" sx={{ opacity: 0.48 }}>
         {Description}
        </Typography>

        <Typography noWrap variant="h5" sx={{ mt: 1, mb: 3 }}>
          {Title}
        </Typography>

        {/* <Button variant="contained">Buy Now</Button> */}
      </CardContent>
      <OverlayStyle />
      <Image alt={Title} src={image} sx={{ height: { xs: 280, xl: 320 } }} />
    </Box>
  );
}
