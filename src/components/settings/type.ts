// ----------------------------------------------------------------------

type ColorVariants = {
  name: string;
  lighter: string;
  light: string;
  main: string;
  dark: string;
  darker: string;
  contrastText: string;
};

export type ThemeMode = 'light' | 'dark';
export type ThemeDirection = 'rtl' | 'ltr';
export type ThemeContrast = 'default' | 'bold';
export type ThemeLayout = 'vertical' | 'horizontal';
export type ThemeColorPresets = 'default' | 'purple' | 'cyan' | 'blue' | 'orange' | 'red';
export type ThemeStretch = boolean;
export type TablePagination = 5 | 10 | 25 | 50 | 100 | 150 | 200;
export type ExchangeRate = any;

export type SettingsValueProps = {
  themeMode: ThemeMode;
  themeLayout: ThemeLayout;
  themeStretch: ThemeStretch;
  themeContrast: ThemeContrast;
  themeDirection: ThemeDirection;
  themeColorPresets: ThemeColorPresets;
  tablePagination: TablePagination;
  exchangeRate: ExchangeRate;
};

export type SettingsContextProps = {
  themeMode: ThemeMode;
  themeLayout: ThemeLayout;
  themeContrast: ThemeContrast;
  themeDirection: ThemeDirection;
  themeColorPresets: ThemeColorPresets;
  themeStretch: boolean;
  tablePagination: TablePagination;
  exchangeRate: ExchangeRate;
  setColor: ColorVariants;
  colorOption: {
    name: string;
    value: string;
  }[];

  // Mode
  onToggleMode: VoidFunction;
  onChangeMode: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // Direction
  onToggleDirection: VoidFunction;
  onChangeDirection: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDirectionByLang: (lang: string) => void;

  // Layout
  onToggleLayout: VoidFunction;
  onChangeLayout: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // Contrast
  onToggleContrast: VoidFunction;
  onChangeContrast: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // Color
  onChangeColor: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // Stretch
  onToggleStretch: VoidFunction;

  // Stretch
  onChangePagination: (event: any) => void;
  onChangeExchangeRate: (event: any) => void;

  // Reset
  onResetSetting: VoidFunction;
};
