// @muiternaterna
import {
  TableRow,
  TableCell,
  Typography,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Dialog,
  DialogActions,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Iconify from 'src/components/Iconify';
import { PATH_DASHBOARD } from 'src/routes/paths';
// @types
import {
  IDetailsFromTracking,
  InternalDocumentDetail,
  attachments,
} from '../../../../@types/internalDocument';
import { useNavigate, useParams } from 'react-router-dom';
import * as React from 'react';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TabContext, TabList } from '@mui/lab';
import { useStore } from 'src/stores/store';
//Localization
import useLocales from 'src/hooks/useLocales';
import { useState } from 'react';
import { TabPanel } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { IconButton } from '@mui/material';
import { DateConverter } from '../../../common/DateConverter';
import { StepButton } from '@mui/material';
import Label from 'src/components/Label';
import { useTheme } from '@mui/material/styles';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import useToggle from 'src/hooks/useToggle';
import LetterPDF from './LetterPDF';
import { COMMON_CONSTANT } from 'src/constantFile/CommonConstant';
import MyRejectDialog from 'src/components/MyRejectDialog';
import InternalDocumentReject from './InternalDocumentReject';
import { stripHtmlTags } from 'src/utils/general';
import { DOCUMENT_TYPE_CONSTANT } from 'src/constantFile/DmtsConstant/DocumentTypeConstant';
import AttachmentDialog from 'src/components/AttachmentDialog';
import InternalDocumentAttachment from '../productOrderForm/InternalDocumentAttachment';
import InternalDocumentAttachments from './InternalDocumentAttachments';
import { Attachment, ImageOutlined, PictureAsPdf } from '@mui/icons-material';
import { baseUrl } from 'src/api/baseUrl';

type Props = {
  row: InternalDocumentDetail;
  send?: boolean;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function InternalDocumentReceiveDetailTableRow({ row, send }: Props) {
  const theme = useTheme();
  const { translate } = useLocales();
  const navigate = useNavigate();
  const [activeS, setActiveS] = useState<any>();
  const [value, setValue] = useState<any>('1');
  const [lastStep, setLastStep] = useState<any>();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [subExpanded, setSubExpanded] = useState<string | false>(false);
  const { InternalDocumentLinkStore, InternalDocumentStore, CcDepartmentStore } = useStore();
  const [iFrameUrl, setIframeUrl] = useState('');
  const [attachments, setAttachments] = useState<attachments[]>([]);
  const {
    selectedInternalDocumentFromTrackingTable,
    selectedParentDepartment,
    loadInternalDocumentDetail,
    selectedInternalDocument,
    InternalDocumentSearch,
    getInternalDocumentFromRegistry,
    setOpenCloseDialog,
    setOpenCloseRejectDialog,
    setOpenCloseAttachmentDialog,
    openDialog,
    openDialogReject,
    openDialogAttachment,
    loadInternalDocumentDetailFromTracking,
    setDocumentLinkMode,
    loadParentDepartment,
  } = InternalDocumentStore;
  const { toggle: open, onOpen, onClose } = useToggle();
  const { selectedInternalDocumentLink } = InternalDocumentLinkStore;
  const { loadInternalDocumentCcForUpdate, loadCCDocumentForOutDocument } = CcDepartmentStore;
  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);
  };
  // const attachments=[
  //   "/API/DMTS/InternalDocuments/2024/Feb/DITO32/327809e9-82c5-45c0-92fd-2f6738844396.pdf",
  //   "/API/DMTS/InternalDocuments/2024/Feb/MEWI10/788bf599-d40c-48eb-872d-13dd08623312.jpeg"
  // ]
  const language = window.localStorage.getItem('i18nextLng');

  const { id, rid } = useParams();

  const handleChangeAccordion =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const handleChangeSubAccordion =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setSubExpanded(isExpanded ? panel : false);
    };

  const {
    trackingId,
    numberOfPages,
    documentNumber,
    documentSubject,
    attachmentDescription,
    trackingNumber,
    tahriratNumber,
    comments,
    internalDocumentId,
    fromDepartmentName,
    toDepartmentName,
    documentTypeName,
    processStatusName,
    documentLevelName,
    documentDate,
    createdOn,
    modifiedOn,
    returnDate,
    documentBookRecivedNumber,
    documentRecievNumber,
    deadlineDays,
    isAction,
    documentTypeId,
    fromDepartmentId,
    documentBody,
    toDepartmentId,
    documentLevelId,
    processStatusId,
    departmentId,
    userId,
    userName,
    userPosition,
    interDocumentCCdepartments,
    isMutahidulmall,
    isHighLevelDepartment,
    sentAsCC,
    fromInternalDocumentLinks,
    toInternalDocumentLinks,
    documentCreatedBy,
    documentVerifyDate,
    hasInOutRecord,
    inOutRegistryDetail,
  } = row;
  const {
    LoginStore: { user },
  } = useStore();

  //this is for coloring of selected table row
  const handleStep = (step: number) => () => {
    setActiveS(step);
  };

  interface Props {
    data: IDetailsFromTracking;
    key: number;
    index: number;
  }

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const [internalDocumenttId, setInternalDocumentId] = useState<number>(0);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  // Quick Forward Action
  const handleQuickForward = (id: number) => {
    getInternalDocumentFromRegistry(id);
    navigate(PATH_DASHBOARD.InternalDocument.quickForward);
  };

  // Unforward Action
  const handleUnForward = (id: number) => {
    getInternalDocumentFromRegistry(id);
    navigate(PATH_DASHBOARD.InternalDocument.unForward(id));
  };

  // Forward Action
  const handleForward = (id: number) => {
    getInternalDocumentFromRegistry(id);
    navigate(PATH_DASHBOARD.InternalDocument.forward(id));
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleRejectConfirm = (id: number) => {
    setInternalDocumentId(id);
    setOpenCloseRejectDialog();
    setOpenCloseDialog();
  };

  const handleAttachments = (id: number) => {
    setInternalDocumentId(id);
    setOpenCloseAttachmentDialog();
    // setOpenCloseDialog();
  };

  const handleCloseConfirm = () => {
    setOpenCloseDialog();
    setOpenCloseRejectDialog();
  };

  const handleCloseRejectConfirm = () => {
    setOpenCloseRejectDialog();
  };

  const handleCloseAttachmentConfirm = () => {
    // setOpenCloseDialog();
    setOpenCloseAttachmentDialog();
  };

  const handleNewDocumentLink = (id: number) => {
    getInternalDocumentFromRegistry(id);
    setDocumentLinkMode();
    navigate(PATH_DASHBOARD.InternalDocument.new);
  };

  const sendDocument = (id: number) => {
    getInternalDocumentFromRegistry(id);
    loadCCDocumentForOutDocument(id).then(() => {
      navigate(PATH_DASHBOARD.InternalDocument.OutDocumentCreate);
    });
  };

  const ViewDocument = (id: number) => {
    getInternalDocumentFromRegistry(id).then((re) => {
      navigate(PATH_DASHBOARD.InternalDocument.documentView(true, id));
    });
  };

  const receiveDocument = (id: number) => {
    getInternalDocumentFromRegistry(id);
    navigate(PATH_DASHBOARD.InternalDocument.InDocumentCreate);
  };

  const AddTahriratNumber = (id: number) => {
    getInternalDocumentFromRegistry(id).then(() => {
      navigate(PATH_DASHBOARD.InternalDocument.TahriratAdd);
    });
  };

  return (
    <>
      <Card sx={{ pt: 2, pb: 2, px: 5, mb: 1 }}>
        <Box
          sx={{
            textAlign: { sm: 'center' },
            mb: 3,
            overflowX: 'scroll',
            overflowY: 'hidden',
            '&::-webkit-scrollbar': { height: 6 },
            '&::-webkit-scrollbar-track': { backgroundColor: '999' },
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#555', borderRadius: 2 },
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontSize: 14, textAlign: 'center', mb: 2, color: 'warning.main' }}
            gutterBottom
          >
            {/* <div> */}
            <Label
              variant="ghost"
              sx={{ textTransform: 'capitalize', fontSize: 15, p: 2 }}
              color="warning"
            >
              {translate('InternalDocument.DocumentProcess')}
            </Label>
            {/* </div> */}
            {/* <div>
              <Label
                variant="ghost"
                sx={{ textTransform: 'capitalize', fontSize: 15, p: 2, mt: 1 }}
                color="warning"
              >
                {translate('InternalDocument.FromWhomToWho')}
              </Label>
            </div> */}
          </Typography>

          {selectedInternalDocumentFromTrackingTable.map((subArray, arrayIndex) => (
            <Stepper
              key={arrayIndex}
              alternativeLabel
              activeStep={subArray.stepperDetails.length - 1}
            >
              {subArray.stepperDetails.map((option, index) => {
                const last =
                  subArray.stepperDetails[subArray.stepperDetails.length - 1].processStatusName;
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                  optional?: React.ReactNode;
                  error?: boolean;
                } = {};

                if (option.processStatusId === 6) {
                  labelProps.error = true;
                }
                if (option.processStatusName === 'Completed') {
                  stepProps.completed = true;
                }

                return (
                  <Step key={index} {...stepProps}>
                    {/* <Tooltip title={translate('Validation.ClickHere')} placement="top">
                      <StepButton color="inherit" onClick={handleStep(option.stepNumber!)}> */}
                    <StepLabel {...labelProps}>
                      {option.departmenthName} <br />
                      <span style={{ color: 'orange', fontWeight: 'bold' }}>
                        {' '}
                        {translate('User.userName')}{' '}
                      </span>{' '}
                      :&nbsp;
                      {option.userName}
                      <br />
                      {index === subArray.stepperDetails.length - 1 ? (
                        <Label
                          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                          color={
                            (last === 'Completed' && 'success') ||
                            (last === 'Approved' && 'primary') ||
                            (last === 'Reject' && 'error') ||
                            (last === 'In Process' && 'info') ||
                            (last === 'Pending' && 'warning') ||
                            'default'
                          }
                          sx={{ textTransform: 'capitalize', mb: 2 }}
                        >
                          {last}
                        </Label>
                      ) : (
                        ''
                      )}
                    </StepLabel>
                    {/* </StepButton>
                    </Tooltip> */}
                  </Step>
                );
              })}
            </Stepper>
          ))}
        </Box>
      </Card>

      {/* Genernal Information  */}
      <Card sx={{ pt: 2, pb: 2, px: 5, mb: 1 }}>
        <Box
          sx={{
            textAlign: { sm: 'center' },
            mb: 3,
            overflowX: 'scroll',
            overflowY: 'hidden',
            '&::-webkit-scrollbar': { height: 6 },
            '&::-webkit-scrollbar-track': { backgroundColor: '999' },
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#555', borderRadius: 2 },
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontSize: 14, textAlign: 'center', mb: 2, color: 'warning.main' }}
            color="text.secondary"
            gutterBottom
          >
            <Label
              variant="ghost"
              sx={{ textTransform: 'capitalize', fontSize: 15, p: 2 }}
              color="warning"
            >
              {translate('InternalDocument.GeneralInformation')}
            </Label>
          </Typography>
          <Box>
            <Table sx={{ minWidth: '100%' }} size="small" aria-label="a dense table">
              <TableRow sx={{ borderBottom: '1px solid rgba(60,60,60,.9)' }}>
                <TableCell sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}>
                  {translate('InternalDocument.TrackingNumber')}:{' '}
                </TableCell>
                <TableCell align="left"> {trackingNumber} </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}>
                  {' '}
                  {translate('InternalDocument.FromDep')}:{' '}
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                  {fromDepartmentName}
                </TableCell>
              </TableRow>
              <TableRow sx={{ borderBottom: '1px solid rgba(60,60,60,.9)' }}>
                <TableCell sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}>
                  {' '}
                  {translate('DocumentLevel.DocLevel')}:{' '}
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
                  {documentLevelName}
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}>
                  {' '}
                  {translate('InternalDocument.DocumentSubject')}:{' '}
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
                  {documentSubject}
                </TableCell>
              </TableRow>
              <TableRow sx={{ borderBottom: '1px solid rgba(60,60,60,.9)' }}>
                <TableCell sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}>
                  {' '}
                  {inOutRegistryDetail != null
                    ? inOutRegistryDetail.isOut
                      ? translate('InternalDocument.DocumentOutNumber')
                      : translate('InternalDocument.DocumentInNumber')
                    : translate('InternalDocument.DocumentInNumber')}
                  :{' '}
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
                  {inOutRegistryDetail != null ? inOutRegistryDetail.inOutNumber : <></>}
                </TableCell>

                <TableCell sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}>
                  {' '}
                  {translate('InternalDocument.NoOfPages')}:{' '}
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
                  {numberOfPages}
                </TableCell>
              </TableRow>
              <TableRow sx={{ borderBottom: '1px solid rgba(60,60,60,.9)' }}>
                <TableCell sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}>
                  {translate('InternalDocument.ToDep')}:
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                  {toDepartmentName}
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}>
                  {' '}
                  {translate('DocumentType.DocType')}:{' '}
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
                  {documentTypeName}
                </TableCell>
              </TableRow>

              {/* <TableRow sx={{ borderBottom: '1px solid rgba(60,60,60,.9)' }}>
                <TableCell sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}>
                  {translate('InternalDocument.ViewPDFFormat')}
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                  <Tooltip title={translate('InternalDocumentReport.View')}>
                    <IconButton onClick={onOpen} color="info">
                      <Iconify icon={'eva:eye-fill'} />
                    </IconButton>
                  </Tooltip>
                  <PDFDownloadLink
                    document={<LetterPDF InternalDocData={row} header={selectedParentDepartment} />}
                    style={{ textDecoration: 'none' }}
                  >
                    <Tooltip title={translate('InternalDocumentReport.Download')}>
                      <IconButton color="info">
                        <Iconify icon={'eva:download-fill'} />
                      </IconButton>
                    </Tooltip>
                  </PDFDownloadLink>
                </TableCell>
              </TableRow> */}
            </Table>
          </Box>
        </Box>
        <Accordion expanded={expanded === 'panel4'} onChange={handleChangeAccordion('panel4')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              {translate('InternalDocument.DocumentBody')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Paper elevation={3} sx={{ p: 2, fontWeight: 'bold' }}>
              <Typography
                sx={{
                  textAlign: language === 'en' ? 'rtl' : 'rtl',
                  textJustify: 'distribute',
                  fontWeight: 'bold',
                }}
              >
                {stripHtmlTags(documentBody, false)}
              </Typography>
            </Paper>
          </AccordionDetails>
        </Accordion>
      </Card>

      {/* ################ modal box ############## */}

      <Dialog fullScreen open={open}>
        <Grid container>
          <Grid item xs={4} lg={4} sx={{ border: '2px', borderColor: 'red' }}>
            <Drawer
              variant="permanent"
              anchor="left"
              open={true}
              title="Attachments List"
              // sx={{ width: 250 }} // Set a fixed width for the drawer
            >
              {/* Sidebar content */}
              <List sx={{ mt: 2 }}>
                {attachments.map((attach, index) => {
                  const isPdf = attach.fileExtention.toLowerCase().endsWith('.pdf');
                  const isImage =
                    attach.fileExtention.toLowerCase().endsWith('.jpg') ||
                    attach.fileExtention.toLowerCase().endsWith('.jpeg') ||
                    attach.fileExtention.toLowerCase().endsWith('.png');

                  // Extract the name and type from the URL
                  const name = attach.attachmentDesciption;
                  const type = isPdf ? 'PDF' : 'Image';

                  return (
                    <ListItem
                      key={index}
                      onClick={() => {
                        setIframeUrl(attach.filePath);
                      }}
                    >
                      <ListItemIcon>{isPdf ? <PictureAsPdf /> : <ImageOutlined />}</ListItemIcon>
                      <ListItemText primary={name} secondary={type} />
                    </ListItem>
                  );
                })}
              </List>
            </Drawer>
          </Grid>
          <Grid item xs={8} lg={8}>
            <Box sx={{ height: '100%', overflow: 'auto' }}>
              <DialogActions
                sx={{
                  zIndex: 9,
                  padding: '12px !important',
                  boxShadow: (theme) => theme.customShadows.z8,
                }}
              >
                <Tooltip title="Close">
                  <IconButton
                    color="inherit"
                    onClick={() => {
                      onClose();
                      setIframeUrl('');
                    }}
                  >
                    <Iconify icon={'eva:close-fill'} />
                  </IconButton>
                </Tooltip>
              </DialogActions>

              {iFrameUrl != '' ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <iframe
                    src={baseUrl + iFrameUrl}
                    style={{
                      alignItems: 'center',
                      width: '100%',
                      height: '500px',
                      border: 'none',
                    }}
                    width={'100%'}
                    height={'500px'}
                  />
                </div>
              ) : (
                <></>
              )}
            </Box>
          </Grid>
        </Grid>
      </Dialog>
      {/* End Genernal Information  */}
      <Card sx={{ pt: 2, px: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} sx={{ pb: 4 }}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label={translate('InternalDocument.Details')} value="1" />
                    <Tab label={translate('InternalDocument.DocumentLicks')} value="2" />
                  </TabList>
                </Box>

                <TabPanel value="1">
                  {selectedInternalDocumentFromTrackingTable.map((data, index) => (
                    <Accordion
                      key={index}
                      sx={{ backgroundColor: data.isCcStepper ? 'rgba(211, 211, 211, 0.2)' : '' }}
                      expanded={expanded === `panel${index}`}
                      onChange={handleChangeAccordion(`panel${index}`)}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}bh-content`}
                        id={`panel${index}bh-header`}
                      >
                        <Typography sx={{ width: '30%', flexShrink: 0 }}>
                          {data.departmenthName}
                        </Typography>
                        <Typography sx={{ width: '20%', flexShrink: 0 }}>
                          {data.userName}
                        </Typography>
                        <Typography sx={{ width: '30%', flexShrink: 0 }}>
                          {data.userPosition}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {data.stepperDetails.map((stepper, subIndex) => (
                          <Accordion
                            key={subIndex}
                            expanded={subExpanded === `subPanel${index}-${subIndex}`}
                            onChange={handleChangeSubAccordion(`subPanel${index}-${subIndex}`)}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              sx={{ position: '' }}
                              aria-controls={`subPanel${index}-${subIndex}bh-content`}
                              id={`subPanel${index}-${subIndex}bh-header`}
                            >
                              <Typography sx={{ width: '30%', flexShrink: 0 }}>
                                {stepper.departmenthName}
                              </Typography>
                              <Typography sx={{ width: '20%', flexShrink: 0 }}>
                                {stepper.userName}
                              </Typography>
                              <Typography sx={{ width: '30%', flexShrink: 0 }}>
                                {stepper.userPosition}
                              </Typography>

                              {stepper.relatedAttachments.length > 0 ? (
                                <>
                                  <IconButton
                                    onClick={() => {
                                      onOpen();
                                      setAttachments(stepper.relatedAttachments);
                                    }}
                                    color="info"
                                  >
                                    <Iconify icon={'eva:eye-fill'} />
                                  </IconButton>{' '}
                                  View Attachments
                                </>
                              ) : (
                                <></>
                              )}
                            </AccordionSummary>
                            <AccordionDetails>
                              <TableContainer component={Paper}>
                                <Table
                                  sx={{ Width: '100%', mt: 3 }}
                                  size="small"
                                  aria-label="a dense table"
                                >
                                  <TableHead
                                    sx={{
                                      borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                      '& th': { backgroundColor: 'transparent' },
                                    }}
                                  >
                                    <TableRow>
                                      <TableCell>
                                        {translate('InternalDocument.DepartmentName')}
                                      </TableCell>
                                      <TableCell>{translate('User.user')}</TableCell>

                                      {inOutRegistryDetail != null ? (
                                        <TableCell>
                                          {translate('InternalDocument.DocumentOutNumber')}
                                        </TableCell>
                                      ) : (
                                        <TableCell>
                                          {translate('InternalDocument.DocumentInNumber')}
                                        </TableCell>
                                      )}

                                      <TableCell>{translate('InternalDocument.ToDep')}</TableCell>
                                      <TableCell>
                                        {translate('InternalDocument.DocReceiveDate')}
                                      </TableCell>
                                      <TableCell>
                                        {translate('InternalDocument.DocumentVerifyDate')}
                                      </TableCell>
                                      <TableCell>
                                        {translate('ProcessStatus.ProcessStatus')}
                                      </TableCell>

                                      <TableCell>
                                        {translate('InternalDocument.Comments')}
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    <TableRow key={stepper.trackingNumber}>
                                      <TableCell component="th" scope="row">
                                        {stepper.departmenthName}
                                      </TableCell>
                                      <TableCell>{stepper.userName}</TableCell>
                                      <TableCell>
                                        {inOutRegistryDetail != null
                                          ? inOutRegistryDetail.inOutNumber
                                          : ''}
                                      </TableCell>
                                      {/* <TableCell>{stepper.documentNumber}</TableCell> */}
                                      <TableCell>{stepper.toDepartmentName}</TableCell>

                                      <TableCell>
                                        <DateConverter
                                          key={index}
                                          date={stepper.documentRecivedDate}
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <DateConverter key={index} date={stepper.verifyDate} />
                                      </TableCell>

                                      <TableCell>{stepper.processStatusName}</TableCell>
                                      <TableCell>{stepper.comments}</TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </AccordionDetails>
                          </Accordion>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </TabPanel>

                <TabPanel value="2">
                  <Accordion
                    expanded={expanded === 'panel1'}
                    onChange={handleChangeAccordion('panel1')}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        {translate('InternalDocument.ToDocumentLink')}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TableContainer component={Paper}>
                        <Table
                          sx={{ Width: '100%', mt: 3 }}
                          size="small"
                          aria-label="a dense table"
                        >
                          <TableHead
                            sx={{
                              borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                              '& th': { backgroundColor: 'transparent' },
                            }}
                          >
                            <TableRow>
                              <TableCell>{translate('InternalDocument.TrackingNumber')}</TableCell>
                              <TableCell>
                                {translate('InternalDocument.DocumentOutNumber')}
                              </TableCell>
                              <TableCell>{translate('InternalDocument.LinkType')}</TableCell>
                              <TableCell>{translate('InternalDocument.Description')}</TableCell>
                              <TableCell>{translate('InternalDocument.Document')}</TableCell>
                              <TableCell>{translate('InternalDocument.ViewAttachment')}</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {toInternalDocumentLinks?.map((data) => (
                              <TableRow key={data.toDocumentId}>
                                <TableCell component="th" scope="row">
                                  {data.toTrackingNo}
                                </TableCell>
                                <TableCell>{data.toDocumentNo}</TableCell>
                                <TableCell>{data.documentLinkTypeName}</TableCell>
                                <TableCell>{data.description}</TableCell>
                                <TableCell>
                                  <Button
                                    onClick={() => {
                                      ViewDocument(data.toDocumentId!);
                                    }}
                                  >
                                    {translate('CRUD.View')}
                                  </Button>
                                </TableCell>
                                <TableCell>
                                  <IconButton
                                    onClick={() => {
                                      onOpen();
                                      setAttachments(data.attachments);
                                    }}
                                    color="info"
                                  >
                                    <Iconify icon={'eva:eye-fill'} />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === 'panel2'}
                    onChange={handleChangeAccordion('panel2')}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2bh-content"
                      id="panel2bh-header"
                    >
                      <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        {' '}
                        {translate('InternalDocument.FromDocumentLink')}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TableContainer component={Paper}>
                        <Table
                          sx={{ Width: '100%', mt: 3 }}
                          size="small"
                          aria-label="a dense table"
                        >
                          <TableHead
                            sx={{
                              borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                              '& th': { backgroundColor: 'transparent' },
                            }}
                          >
                            <TableRow>
                              <TableCell>{translate('InternalDocument.TrackingNumber')}</TableCell>
                              <TableCell>
                                {translate('InternalDocument.DocumentOutNumber')}
                              </TableCell>
                              <TableCell>{translate('InternalDocument.LinkType')}</TableCell>
                              <TableCell>{translate('InternalDocument.Description')}</TableCell>
                              <TableCell>{translate('InternalDocument.Document')}</TableCell>
                              <TableCell>{translate('InternalDocument.ViewAttachment')}</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {fromInternalDocumentLinks?.map((data) => (
                              <TableRow key={data.fromInternalDocumentLinkId}>
                                <TableCell>{data.fromTrackingNo}</TableCell>
                                <TableCell>{data.fromDocumentNo}</TableCell>
                                <TableCell>{data.documentLinkTypeName}</TableCell>
                                <TableCell>{data.description}</TableCell>
                                <TableCell>
                                  <Button
                                    onClick={() => {
                                      ViewDocument(data.fromInternalDocumentLinkId!);
                                    }}
                                  >
                                    {translate('CRUD.View')}
                                  </Button>
                                </TableCell>
                                <TableCell>
                                  <IconButton
                                    onClick={() => {
                                      onOpen();
                                      setAttachments(data.attachments);
                                    }}
                                    color="info"
                                  >
                                    <Iconify icon={'eva:eye-fill'} />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </AccordionDetails>
                  </Accordion>
                </TabPanel>

                <TabPanel value="3">
                  <Accordion
                    expanded={expanded === 'panel2'}
                    onChange={handleChangeAccordion('panel2')}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2bh-content"
                      id="panel2bh-header"
                    >
                      <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        {translate('InternalDocument.CCDep')}
                      </Typography>
                    </AccordionSummary>
                  </Accordion>
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
        </Grid>

        <Box display={'flex'} justifyContent={'space-between'}>
          <Button
            sx={{ mb: 2 }}
            variant="contained"
            color="error"
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            onClick={() => {
              id === 'true'
                ? navigate(PATH_DASHBOARD.InternalDocument.Forwardedlist)
                : navigate(PATH_DASHBOARD.InternalDocument.Receivelist);
            }}
          >
            {translate('CRUD.BackToList')}
          </Button>
          {/* ---------View--------- */}
          <Box>
            <Button
              variant="contained"
              size="small"
              color="success"
              sx={{ ml: 1 }}
              startIcon={<Iconify sx={{ color: 'black.main' }} icon={'fa6-solid:file-pdf'} />}
              onClick={() => {
                ViewDocument(row.internalDocumentId!);
              }}
            >
              {translate('CRUD.View')}
            </Button>
            {/* ---------Add Tahrirat--------- */}
            <Button
              variant="contained"
              size="small"
              color="info"
              sx={{ ml: 1 }}
              startIcon={
                <Iconify
                  sx={{ color: 'black.main' }}
                  icon={'fluent:document-page-number-24-filled'}
                />
              }
              onClick={() => {
                AddTahriratNumber(row.internalDocumentId!);
                handleCloseMenu();
              }}
            >
              {translate('CRUD.AddTahrirat')}
            </Button>

            {/* ---------Unforward--------- */}
            {hasInOutRecord === true ||
            documentTypeId === DOCUMENT_TYPE_CONSTANT.INQUIRY ||
            documentTypeId === DOCUMENT_TYPE_CONSTANT.OFFER_LETTER ? (
              <>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  startIcon={<Iconify icon={'eva:skip-forward-fill'} />}
                  sx={{
                    ml: 1,
                  }}
                  onClick={() => handleUnForward(row.internalDocumentId!)}
                >
                  {translate('CRUD.UnForward')}
                </Button>
                {/* ---------Forward--------- */}
                <Button
                  variant="contained"
                  size="small"
                  color="info"
                  startIcon={<Iconify icon={'eva:arrow-forward-fill'} />}
                  sx={{
                    ml: 1,
                  }}
                  onClick={() => handleForward(row.internalDocumentId!)}
                >
                  {translate('CRUD.Forward')}
                </Button>
                {/* ---------DocumentLink--------- */}
                <Button
                  variant="contained"
                  size="small"
                  color="warning"
                  startIcon={<Iconify icon={'eva:link-fill'} />}
                  sx={{ display: hasInOutRecord === false ? 'none' : '', ml: 1 }}
                  onClick={() => handleNewDocumentLink(row.internalDocumentId!)}
                >
                  {translate('CRUD.DocumentLink')}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  size="small"
                  color="info"
                  startIcon={<Iconify icon={'mdi:invoice-receive'} />}
                  sx={{
                    display:
                      documentTypeId === DOCUMENT_TYPE_CONSTANT.OFFER_LETTER ||
                      documentTypeId === DOCUMENT_TYPE_CONSTANT.INQUIRY
                        ? 'none'
                        : '',
                    ml: 1,
                  }}
                  onClick={() => receiveDocument(row.internalDocumentId!)}
                >
                  {translate('CRUD.Receive')}
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  startIcon={<Iconify icon={'eva:close-fill'} />}
                  sx={{
                    display:
                      documentVerifyDate != null || documentVerifyDate != undefined ? 'none' : '',
                    ml: 1,
                  }}
                  onClick={() => handleRejectConfirm(row.internalDocumentId!)}
                >
                  {translate('CRUD.Reject')}
                </Button>
              </>
            )}

            {/* {send === true ? (

              <> </>
            ) : (
              <Button
                variant="contained"
                size="small"
                color="error"
                startIcon={<Iconify icon={'eva:close-fill'} />}
                sx={{
                  display:
                    documentVerifyDate != null || documentVerifyDate != undefined ? 'none' : '',
                }}
                onClick={() => handleRejectConfirm(row.internalDocumentId!)}
              >
                {translate('CRUD.Reject')}
              </Button>
            )} */}
          </Box>
          <MyRejectDialog
            open={openDialogReject}
            onClose={handleCloseRejectConfirm}
            title={translate('CRUD.Reject')}
            size="md"
          >
            <InternalDocumentReject id={internalDocumentId!} />
          </MyRejectDialog>
        </Box>
      </Card>
    </>
  );
}
