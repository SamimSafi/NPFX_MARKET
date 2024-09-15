import useLocales from 'src/hooks/useLocales';

interface Props {
  title?: string | undefined;
}
function ReportHeader({ title }: Props) {
  const { translate } = useLocales();

  return (
    <div className="flex justify-between items-center text-black border-[2px] border-black border-b-0 px-2 py-4 bg-white">
      <div className="flex-col justify-center items-center text-center">
        <img
          src={require('src/assets/images/logo.png')}
          width="100"
          height="100"
          className="mx-auto"
          alt="Logo"
        />
        <p className="text-sm w-[15ch] font-bold pt-2">
          {translate('ReportHeader.MinistryOfWaterAndEnergy')}
        </p>
      </div>
      <div className="text-base text-center font-bold print:text-base">
        <h3> {translate('ReportHeader.Bismillah')}</h3>
        <h3> {translate('ReportHeader.IslamicEmirateOfAfghanistan')}</h3>
        <h3 className="w-[22ch] text-center">
          {' '}
          {translate('ReportHeader.MinistryOfWaterAndEnergy')}
        </h3>
        <h3> {title}</h3>
      </div>
      <div className="flex-col justify-center items-center text-center">
        <img
          src={require('src/assets/images/emarat1.png')}
          width="100"
          height="100"
          className="mx-auto"
          alt="emaratlogo"
        />
        <p className="text-sm w-[15ch] font-bold pt-2">
          {' '}
          {translate('ReportHeader.IslamicEmirateOfAfghanistan')}
        </p>
      </div>
    </div>
  );
}

export default ReportHeader;
