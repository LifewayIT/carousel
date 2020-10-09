const deviceSize = {
  minimum: 360,
  mobileS: 375,
  mobileM: 412,
  mobileL: 480,
  tabletS: 600,
  tabletM: 768,
  tabletL: 900,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560
};

const device = {
  _375: `screen and (min-width: ${deviceSize.mobileS}px)`,
  _412: `screen and (min-width: ${deviceSize.mobileM}px)`,
  _480: `screen and (min-width: ${deviceSize.mobileL}px)`,
  _600: `screen and (min-width: ${deviceSize.tabletS}px)`,
  _768: `screen and (min-width: ${deviceSize.tabletM}px)`,
  _900: `screen and (min-width: ${deviceSize.tabletL}px)`,
  _1024: `screen and (min-width: ${deviceSize.laptop}px)`,
  _1440: `screen and (min-width: ${deviceSize.laptopL}px)`,
  _2560: `screen and (min-width: ${deviceSize.desktop}px)`,
  smallerThan: {
    _375: `screen and (max-width: ${deviceSize.mobileS - 1}px)`,
    _412: `screen and (max-width: ${deviceSize.mobileM - 1}px)`,
    _480: `screen and (max-width: ${deviceSize.mobileL - 1}px)`,
    _600: `screen and (max-width: ${deviceSize.tabletS - 1}px)`,
    _768: `screen and (max-width: ${deviceSize.tabletM - 1}px)`,
    _900: `screen and (max-width: ${deviceSize.tabletL - 1}px)`,
    _1024: `screen and (max-width: ${deviceSize.laptop - 1}px)`,
    _1440: `screen and (max-width: ${deviceSize.laptopL - 1}px)`,
    _2560: `screen and (max-width: ${deviceSize.desktop - 1}px)`
  },
  size: deviceSize
};

const color = {
  white: 'hsl(0, 0%, 100%)',
  black: '#1A202C',
  pink400: 'hsl(2, 78%, 78%)',
  pink500: 'hsl(2, 78%, 72%)',
  pink600: 'hsl(2, 78%, 62%)',
  gray100: '#F7FAFC',
  gray200: '#EDF2F7',
  gray300: '#E2E8F0',
  gray400: '#CBD5E0',
  gray500: '#A0AEC0',
  gray600: '#718096',
  gray700: '#4A5568',
  gray800: '#2D3748',
  gray900: '#1A202C',
  green100: 'hsl(175, 20%, 92%)',
  green200: 'hsl(175, 29%, 85%)',
  green300: 'hsl(175, 20%, 71%)',
  green500: 'hsl(175, 17%, 53%)',
  green600: 'hsl(175, 19%, 49%)',
  green700: 'hsl(175, 25%, 41%)',
  green900: 'hsl(175, 40%, 30%)',
  teal100: '#E6FFFA',
  teal200: '#B2F5EA',
  teal300: '#81E6D9',
  teal400: '#4FD1C5',
  teal500: '#38B2AC',
  teal600: '#319795',
  teal700: '#2C7A7B',
  teal800: '#285E61',
  teal900: '#234E52',
  semanticTeal: '#00b5ad',
  blue100: '#EBF8FF',
  blue200: '#BEE3F8',
  blue300: '#90CDF4',
  blue400: '#63B3ED',
  blue500: '#4299E1',
  blue600: '#3182CE',
  blue700: '#2B6CB0',
  blue800: '#2C5282',
  blue900: '#2A4365',
};

const type = {
  family: "'Inter', sans-serif",
  weight: {
    normal: 400,
    semiBold: 600,
    bold: 700
  },
  scale: {
    _12: '12px',
    _14: '14px',
    _16: '16px',
    _18: '18px',
    _20: '20px',
    _24: '24px',
    _30: '30px',
    _36: '36px',
    _48: '48px',
    _60: '60px',
    _72: '72px'
  }
};

const space = {
  _4: '4px',
  _8: '8px',
  _12: '12px',
  _16: '16px',
  _24: '24px',
  _32: '32px',
  _48: '48px',
  _64: '64px',
  _96: '96px',
  _128: '128px',
  _192: '192px',
  _256: '256px',
  _384: '384px',
  _512: '512px',
  _640: '640px',
  _768: '768px'
};

const shadow = {
  medium: '0 4px 8px rgba(0,0,0,0.25)',
  button: '0 5px 10px rgba(50,50,93,.11), 0 2.5px 5px rgba(0,0,0,.08)',
  buttonHover: '0 7.5px 15px rgba(50, 50, 93, 0.1), 0 5px 10px rgba(0, 0, 0, 0.08)'
};

const transform = {
  buttonHover: 'translateY(-1px)'
};

const border = {
  radius: '4px'
};

export {
  device,
  deviceSize,
  color,
  type,
  space,
  shadow,
  border,
  transform
};
