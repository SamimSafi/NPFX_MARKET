import { Font, StyleSheet } from '@react-pdf/renderer';

// ----------------------------------------------------------------------
Font.register({
  family: 'Lateef',
  format: 'truetype',
  src: '/fonts/Lateef-Regular.ttf',
});

Font.register({
  family: 'Lalezar',
  format: 'truetype',
  src: '/fonts/lalezar-regular.ttf',
});

Font.register({
  family: 'PDMS_Kalam',
  format: 'truetype',
  src: '/fonts/PDMS_Kalam.ttf',
});

Font.register({
  family: 'NotoSansArabic',
  format: 'truetype',
  src: '/fonts/NotoNaskhArabic-VariableFont_wght.ttf',
  //src: '/fonts/NotoSansArabic-VariableFont_wdth,wght.ttf',
});

Font.register({
  family: 'MarkaziText',
  format: 'truetype',
  fonts: [{ src: '/fonts/MarkaziText-VariableFont_wght.ttf' }],
});

Font.register({
  family: 'Arialn',
  format: 'truetype',
  fonts: [{ src: '/fonts/Arialn.ttf' }],
});

const styles = StyleSheet.create({
  table: {
    marginTop: '12px',
  },
  row: {
    flexDirection: 'row',
    borderWidth: 0.4,
    borderColor: 'black',
  },

  cell: {
    flex: 1,
    borderWidth: 0.4,
    borderColor: 'black',
    padding: 5,
  },
  letterType: { marginRight: '-32px', marginTop: '12px' },
  offerLetterBorder: {
    border: '1px solid black',
    width: '90%',
    margin: '80px auto',
  },
  letterTypeSection: { marginRight: '2px' },
  letterTypeData: { border: '1px solid blue' },
  letterTypeSectionLogo: { marginRight: '-52px' },
  logoMargin: { marginTop: '8px' },
  DocProcess: { marginTop: '22px', marginRight: '22px' },
  DocProcessImage: { position: 'absolute' },
  signature: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '45px',
    fontSize: '16px',
  },
  col1: { width: '10%' },
  col2: { width: '20%' },
  col4: { width: '40%' },
  col8: { width: '75%' },
  col5: { width: '50%' },
  col6: { width: '60%' },
  col3: { width: '30%' },
  col9: { width: '70%' },
  col12: { width: '100%' },
  col10: { height: '85%' },
  mb8: { marginBottom: 5 },
  mb40: { marginBottom: 20 },
  overline: {
    fontSize: 8,
    marginBottom: 8,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  h3: { fontSize: 14, fontWeight: 700 },
  h4: { fontSize: 12, fontWeight: 700 },
  body1: { fontSize: 11, fontWeight: 900, width: '90%', margin: 'auto' },
  mainTitle: { fontSize: 18, fontWeight: 900, width: '90%', margin: 'auto' },
  mainTitle1: {
    fontSize: 16,
    fontWeight: 900,
    textDecoration: 'underline',
    width: '90%',
    margin: 'auto',
  },
  mainBody: {
    fontSize: 13,
    fontWeight: 900,
    width: '90%',
    margin: 'auto',
    lineHeight: '1.8px',
  },
  subtitle2: { fontSize: 9, fontWeight: 700 },
  alignRight: { textAlign: 'right' },
  margin: {
    marginTop: '20px',
  },
  alignCenter: { textAlign: 'center' },
  page: {
    padding: '40px 24px 0 24px',
    fontSize: 10,
    textAlign: 'right',
    lineHeight: 1.6,
    fontWeight: 'bold',
    fontFamily: 'Lateef',
    backgroundColor: '#fff',
    textTransform: 'capitalize',
  },
  dir: {},
  fontS: {
    fontSize: 10,
  },
  footer: {
    left: 0,
    right: 0,
    bottom: 0,
    padding: 24,
    margin: 'auto',
    position: 'absolute',
  },
  marginAuto: {
    margin: 'auto',
  },
  border: {
    border: '1px solid #666',
  },
  borderBottom: {
    borderBottom: '1px solid #666',
  },
  padding: {
    padding: 0,
  },
  // fontS:{
  // fontSize:
  // },
  gridContainer: { flexDirection: 'row', justifyContent: 'space-between', textAlign: 'center' },
  table1: { display: 'flex', width: 'auto', justifyContent: 'flex-end' },
  tableHeader: {},
  tableBody: {},
  tableRow1: {
    padding: '3px 0',
    flexDirection: 'row',
    textAlign: 'right',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DFE3E8',
  },
  direction: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    textAlign: 'right',
  },
  TextAlignLeft: {
    textAlign: 'left',
  },
  noBorder: { paddingTop: 4, paddingBottom: 0, borderBottomWidth: 0 },
  tableCell_1: { width: '5%' },
  tableCell_2: { width: '50%', paddingRight: 16 },
  tableCell_3: { width: '15%' },
});

export default styles;
