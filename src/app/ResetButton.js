import React from 'react';
import mui from 'material-ui';

import Button from 'material-ui/Button'
import AvRepeat from 'react-material-icons/icons/av/repeat'

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import red from 'material-ui/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: { main: red[500] },
    secondary: { main: '#11cb5f' },
  },
});

export default class PlayButton extends React.Component {

  onClick(button) {
      this.props.onClick();
  }

  render() {
    let playing = false

    return (
      <MuiThemeProvider theme={theme}>
        <Button raised color="primary" onClick={(e) => this.onClick(e)}>
          <AvRepeat/>
        </Button>
      </MuiThemeProvider>
    );
  }
}
