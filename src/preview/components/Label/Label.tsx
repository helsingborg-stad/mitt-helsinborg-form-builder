import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Text from '../Text/Text';
import theme from '../../styles/theme';

const LabelText = styled(Text)`
  font-size: ${(props) => props.theme.label[props.size].font};
  color: ${(props) => props.theme.label.colors[props.color].text};
  text-transform: uppercase;
  font-weight: bold;
  padding-bottom: 7px;
  padding-top: 5px;
`;
const LabelBorder = styled.div<{
  size: 'small' | 'medium' | 'large';
  color: keyof typeof theme.label.colors;
  underline?: boolean;
}>`
  padding-bottom: ${(props) => theme.label[props.size].paddingBottom};
  border-bottom-color: ${(props) => theme.label.colors[props.color].underline};
  border-bottom-width: ${(props) => {
    if (props.underline === false) {
      return '0px';
    }
    return theme.label[props.size].lineWidth;
  }};
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
const HelpWrapper = styled.div`
  flex: auto;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 22px;
`;

interface Props {
  size?: 'small' | 'medium' | 'large';
  color?: keyof typeof theme.label.colors;
  underline?: boolean;
  help?: { text: string; size?: number; heading?: string; tagline?: string; url?: string };
}

/**
 * Simple label for field inputs, that styles the text to all-caps, bold and optionally puts a line under.
 * Use like a Text component.
 */
const Label: React.FC<Props> = ({ size, color, underline, help, ...other }) => (
  <LabelContainer>
    <LabelWrapper>
      <LabelBorder size={size || 'medium'} color={color || 'blue'} underline={underline}>
        <LabelText size={size || 'medium'} color={color || 'blue'}>
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
  color: PropTypes.oneOf(Object.keys(theme.label.colors)),
  /**
   * Set a size, one of small, medium, large.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Any additional styling of the text component.
   */
  style: PropTypes.any,
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
  color: 'light',
  size: 'medium',
};

export default Label;
