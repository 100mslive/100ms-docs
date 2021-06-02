export interface AffinityUIThemesPalette {
  accents_1: string
  accents_2: string
  accents_3: string
  accents_4: string
  accents_5: string
  accents_6: string
  accents_7: string
  accents_8: string
  background: string
  foreground: string
  selection: string
  secondary: string
  code: string
  border: string
  link: string
  code_line_marker: string;
  code_title: string;
  token_code_class: string;
  token_regex_imp_var: string;
  token_func_cn: string;
  token_attr_key: string;
  token_oper_string: string;
  token_selector: string;
  token_property: string;
  token_punctuation:string;
  token_comment: string;
  token_deleted: string;
  token_inserted: string;
}

export interface AffinityUIThemesFont {
  sans: string
  mono: string
}

export interface AffinityUIThemesExpressiveness {
  linkStyle: string
  linkHoverStyle: string
  dropdownBoxShadow: string
  scrollerStart: string
  scrollerEnd: string
  shadowSmall: string
  shadowMedium: string
  shadowLarge: string
  portalOpacity: number
}

export interface AffinityUIThemesLayout {
  gap: string
  gapNegative: string
  gapHalf: string
  gapHalfNegative: string
  gapQuarter: string
  gapQuarterNegative: string
  pageMargin: string
  pageWidth: string
  pageWidthWithMargin: string
  radius: string
}

export interface AffinityUIThemes {
  type: string,
  font: AffinityUIThemesFont,
  layout: AffinityUIThemesLayout,
  palette: AffinityUIThemesPalette,
  expressiveness: AffinityUIThemesExpressiveness,
}