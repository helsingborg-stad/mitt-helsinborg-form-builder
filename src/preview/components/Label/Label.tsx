import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Text from '../Text/Text';
import theme from '../../styles/theme';
import { PrimaryColor } from '../../styles/themeHelpers';

const LabelText = styled(Text)<{
  size?: 'small' | 'medium' | 'large';
  colorSchema?: PrimaryColor;
}>`
  font-size: ${(props) => props.theme.label[props.size || 'medium'].font};
  color: ${(props) => props.theme.label.colors[props.colorSchema || 'blue'].text};
  text-transform: uppercase;
  font-weight: bold;
  padding-bottom: 7px;
  padding-top: 5px;
`;
const LabelBorder = styled.span<{
  size: 'small' | 'medium' | 'large';
  colorSchema: PrimaryColor;
  underline?: boolean;
}>`
  padding-bottom: ${(props) => theme.label[props.size].paddingBottom};
  border-bottom-color: ${(props) => theme.label.colors[props.colorSchema].underline};
  border-bottom-width: ${(props) => {
    if (props.underline === false) {
      return '0px';
    }
    return theme.label[props.size].lineWidth;
  }};
  border-bottom-style: solid;
  display: inline-block;
  margin-bottom: ${(props) => {
    if (props.underline === false) {
      return '0px';
    }
    return theme.label[props.size].marginBottom;
  }};
  align-self: flex-start;
  margin-right: 8px;
`;
const LabelContainer = styled.div`
  flex-direction: row;
  padding-right: 10px;
  justify-content: center;
`;
const LabelWrapper = styled.div`
  flex: auto;
`;

interface Props {
  size?: 'small' | 'medium' | 'large';
  colorSchema?: PrimaryColor;
  underline?: boolean;
  help?: {
    text?: string | null;
    size?: number | null;
    heading?: string | null;
    tagline?: string | null;
    url?: string | null;
  };
}

/**
 * Simple label for field inputs, that styles the text to all-caps, bold and optionally puts a line under.
 * Use like a Text component.
 */
const Label: React.FC<Props> = ({ size, colorSchema, underline, help, ...other }) => (
  <LabelContainer>
    <LabelWrapper>
      <LabelBorder size={size || 'medium'} colorSchema={colorSchema || 'blue'} underline={underline}>
        <LabelText size={size || 'medium'} colorSchema={colorSchema || 'blue'}>
          {other.children}
        </LabelText>
      </LabelBorder>
    </LabelWrapper>
    {/* {help && Object.keys(help).length > 0 && (
      <HelpWrapper>
        <HelpButton {...help} />
      </HelpWrapper>
    )} */}
  </LabelContainer>
);

Label.propTypes = {
  /**
   * If false, disables the line under the label. True by default.
   */
  underline: PropTypes.bool,
  /**
   * Set a color theme which changes the text color and line color accordingly. 'light' is default.
   */
  colorSchema: PropTypes.oneOf(['blue', 'red', 'green', 'purple']),
  /**
   * Set a size, one of small, medium, large.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Show an help button
   */
  help: PropTypes.shape({
    text: PropTypes.string,
    size: PropTypes.number,
    heading: PropTypes.string,
    tagline: PropTypes.string,
    url: PropTypes.string,
  }),
};

Label.defaultProps = {
  underline: true,
  colorSchema: 'blue',
  size: 'medium',
};

export default Label;
