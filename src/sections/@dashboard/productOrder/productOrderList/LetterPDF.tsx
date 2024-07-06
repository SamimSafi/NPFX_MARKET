import { Page, View, Text, Image, Document } from '@react-pdf/renderer';
// utils
// @types
//
import styles from './LetterReqeustStyle';
import { InternalDocumentDetail, ParentDepartment } from 'src/@types/internalDocument';
import { description } from '../../../../_mock/text';
import { DateConverter } from 'src/sections/common/DateConverter';
import { sign } from 'crypto';
import Iconify from 'src/components/Iconify';
import Mark from 'src/assets/images/mark.png';
// ----------------------------------------------------------------------

type Props = {
  InternalDocData: InternalDocumentDetail;
  header: ParentDepartment[];
};

export default function LetterPDF({ InternalDocData, header }: Props) {
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
        <View style={[styles.gridContainer, styles.mb40, styles.alignCenter]}>
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
            {/* <Text style={[styles.alignCenter, styles.h3]}>Ministry of Energy and Water</Text> */}
            {header.map((item) => (
              <Text key={item.id} style={[styles.alignCenter, styles.h3]}>
                {item.name}
              </Text>
            ))}
            {/* <Text style={[styles.alignCenter, styles.h3]}>رياست عمومی مالی و اداری</Text>
            <Text style={[styles.alignCenter, styles.h3]}>رياست تکنالوژی معلوماتی</Text> */}
            <Text style={[styles.alignCenter, styles.h3]}>مديريت اجرائیه</Text>
          </View>
          <View style={[styles.col3]}>
            <Image source="/src/emarat1.png" style={{ height: 60, width: 60, marginLeft: 40 }} />
            <Text style={[styles.alignCenter, styles.logoMargin]}>د افغانستان اسلامی امارت</Text>
            <Text style={[styles.alignCenter]}>د اوبو او انرژی وزارت </Text>
            <Text style={[styles.alignCenter, styles.letterType]}>
              {documentRecievNumber}/ {documentNumber} شماره :
            </Text>
            <Text style={[styles.alignCenter]}>
              <DateConverter date={documentDate} />
              تاريخ : &nbsp;
            </Text>
            <Text style={[styles.alignCenter]}> موضوع : </Text>
            <Text style={[styles.alignCenter]}> ضمايم : </Text>
          </View>
        </View>
        <View style={[styles.gridContainer, styles.alignRight, styles.margin]}>
          <View style={styles.col12}>
            <Text style={styles.mainTitle}> : {toDepartmentName} به رياست محترم </Text>
            {/* <Text style={styles.mainTitle}> به رياست محترم اداری :</Text> */}
            <Text style={styles.body1}> با ابراز تمنيات نيک</Text>
            <Text style={styles.mainTitle1}> : {documentSubject} موضوع </Text>
            {/* <Text style={styles.mainTitle1}>
              موضوع : در رابطه به ارسال پيشنهاد توزيع يک پايه کمپيوتر
            </Text> */}
            <Text style={styles.mainBody}>{documentBody}</Text>
            {/* <Text style={styles.mainBody}>
              (251) مورخ (1445/01/12) ضم صادره هذا یکورق کاپی پیشنهاد شماره این ریاست که حاوی حکم
              شماره (1447) مورخ (1445/02/05) معام محترم وزارت میباشد مبنی بر توزیع یک پایه کمپیوتر
              غرض اجراآت بعدی به شما ارسال است. امید به ملاحظه پیشنهاد مذکور مطابق مقام محترم وزارت
              در رابطه اجراآت لازم نموده ممنون سازید.
            </Text> */}
          </View>
        </View>
        <View style={[styles.signature]}>
          <Text> بااحترام</Text>
          {/* <Text> انجنیر حبیب الرحمن "جلال زی"</Text>
          <Text> رئیس تکنالوژی معلوماتی</Text> */}
          <Text> {signEmployeeDetails.employeeFullName}</Text>
          <Text> {signEmployeeDetails.employeePosition}</Text>
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
