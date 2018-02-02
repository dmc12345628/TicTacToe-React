import React from 'react';

// On importe les styles pour le plateau
import styles from "./case.css";
import Typography from 'material-ui/Typography'

export default class Case extends React.Component {

    onClick() {
        this.props.onClick();
    }

    render() {
        let {state} = this.props;

        let etatComponent =
          <label>
            {state || ''}
          </label>;

        return <div className="case" onClick={() => this.onClick()}
            style={{background: state ? '#90A4AE' : ''}}>
            {etatComponent}
        </div>;
    }
}
