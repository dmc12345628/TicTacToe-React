import React from 'react';
import mui from 'material-ui';

import Button from 'material-ui/Button'
import AvPlayArrow from 'react-material-icons/icons/av/play-arrow'
import AvPause from 'react-material-icons/icons/av/pause'

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
      this.playing = !this.playing
      console.log('playing', this.playing)
  }

  render() {
    let playing = false

    let icon = !this.playing ?
      icon = <AvPlayArrow/>
    :
      icon = <AvPause/>

    return (
      <MuiThemeProvider theme={theme}>
        <Button raised color="primary" onClick={(e) => this.onClick(e)}>
          {icon}
        </Button>
      </MuiThemeProvider>
    );
  }
}
