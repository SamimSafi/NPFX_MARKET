import { Page, View, Text, Image, Document } from '@react-pdf/renderer';
import styles from './OfferLetterReqeustStyle';
import { InternalDocumentDetail, ParentDepartment } from 'src/@types/internalDocument';
import { DateConverter } from 'src/sections/common/DateConverter';
import Mark from 'src/assets/images/mark.png';
// ----------------------------------------------------------------------

type Props = {
  InternalDocData: InternalDocumentDetail;
  header: ParentDepartment[];
};

export default function OfferLetterPDF({ InternalDocData, header }: Props) {
  const {
    documentLevelId,
    trackingId,
    documentBody,
    numberOfPages,
    documentNumber,
    documentSubject,
    attachmentDescription,
    trackingNumber,
    tahriratNumber,
    fromDepartmentContact,
    fromDepartmentEmail,
    comments,
    internalDocumentId,
    fromDepartmentId,
    fromDepartmentName,
    toDepartmentId,
    toDepartmentName,
    documentTypeName,
    processStatusName,
    documentLevelName,
    signEmployeeDetails,
    documentDate,
    createdOn,
    modifiedOn,
    returnDate,
    documentBookRecivedNumber,
    documentRecievNumber,
    deadlineDays,
    isAction,
    description,
    documentTypeId,
    processStatusId,
    userId,
    userName,
    userPosition,
    sentAsCC,
    isHighLevelDepartment,
    isMutahidulmall,
    createdBy,
    createdByUserName,
    createdByUserPosition,
  } = InternalDocData;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.gridContainer, styles.alignCenter]}>
          <View style={styles.col3}>
            <Image source="/src/ministry1.png" style={{ height: 70, width: 90, marginLeft: 30 }} />
            <Text style={styles.logoMargin}>امارت اسلامی افغانستان</Text>
            <Text>وزارت انرژی و آب</Text>
            <Text>
              <View>
                {documentLevelId == 3 && (
                  <>
                    <Image source={Mark} style={{ height: 10, width: 10, marginLeft: 30 }} />
                  </>
                )}
              </View>
              مهم :
            </Text>

            <Text>
              <View>
                {documentLevelId == 4 && (
                  <>
                    <Image source={Mark} style={{ height: 10, width: 10, marginLeft: 30 }} />
                  </>
                )}
                محرم :
              </View>
            </Text>

            <Text>
              <Text style={styles.DocProcess}>
                <View>
                  {documentLevelId == 1 && (
                    <>
                      <Image source={Mark} style={{ height: 10, width: 10 }} />
                    </>
                  )}
                </View>
              </Text>
              <Text>
                <View>عادی :</View>
              </Text>
            </Text>

            <Text>
              <View>
                {documentLevelId == 2 && (
                  <>
                    <Image source={Mark} style={{ height: 10, width: 10, marginLeft: 30 }} />
                  </>
                )}
                عاجل :
              </View>
            </Text>
          </View>
          <View style={styles.col6}>
            <Text style={[styles.alignCenter, styles.h3]}>Islamic Emirate of Afghanistan</Text>

            <Text style={[styles.alignCenter, styles.h3]}>مديريت اجرائیه</Text>
          </View>
          <View style={[styles.col3]}>
            <Image source="/src/emarat1.png" style={{ height: 60, width: 60, marginLeft: 40 }} />
            <Text style={[styles.alignCenter, styles.logoMargin]}>د افغانستان اسلامی امارت</Text>
            <Text style={[styles.alignCenter]}>د اوبو او انرژی وزارت </Text>
            <Text style={[styles.letterType]}>
              {documentRecievNumber}/ {documentNumber} شماره :
            </Text>
            <Text>
              <DateConverter date={documentDate} />
              تاريخ : &nbsp;
            </Text>
            <Text> ضمايم : </Text>
            <Text> موضوع : </Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={[styles.row, styles.alignCenter, styles.h4]}>
            <Text style={styles.cell}> احکام</Text>
            <Text style={styles.cell}> پيشنهاد </Text>
          </View>
          <View style={[styles.row, styles.col10]}>
            <Text style={styles.cell}></Text>
            <Text style={styles.cell}>
              {/* {'('}لومړی واپسویسې{'('}لوی واپسویسې{')'}
              {')'} */}
              {'\n'} لومړی او لوی بند چې په لیبیا کې د سیاسي ګډوډۍ له امله په سمه توګه ساتل شوی نه و
              {'\n'} مات لومړی او لوی بند چې په لیبیا کې د سیاسي ګډوډۍ له امله په سمه توګه ساتل شوی
              نه و{'\n'} مات لومړی او لوی بند چې په لیبیا کې د سیاسي ګډوډۍ له امله په سمه توګه ساتل
              شوی نه و{'\n'} مات لومړی او لوی بند چې په لیبیا کې د سیاسي ګډوډۍ له امله په سمه توګه
              ساتل شوی نه و{/* {'\n'} مرستو ته اړتیا لري. */}
              {/* <View style={[styles.signature]}>
                <Text> بااحترام</Text>
                <Text> {signEmployeeDetails.employeeFullName}</Text>
                <Text> {signEmployeeDetails.employeePosition}</Text>
              </View> */}
            </Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.footer]}>
          <Text>Tel: {fromDepartmentContact}</Text>
          <Text>Web: www.mew.gov.af</Text>
          <Text>Email: {fromDepartmentEmail}</Text>
          <Text>Fb:www.facebook.com/MEW.af</Text>
          <Text>Twitter: twitter.com/MEW_afghan</Text>
        </View>
      </Page>
    </Document>
  );
}
