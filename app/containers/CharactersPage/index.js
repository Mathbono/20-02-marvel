/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

import H1 from 'components/H1';

import messages from './messages';
import TableCharacters from './TableCharacters';
import GridCharacters from './GridCharacters';

const myHeaders = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded',
});

const myInit = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
};

export default class CharactersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: '',
      checked: false,
      characters: []
    };
  }

  componentDidMount() {
    this.handleCallCharacter('marvel');
  }

  handleChange = e => {
    this.setState({
      searchName: e.target.value
    });
  };

  handleCheck = e => {
    this.setState({
      checked: e.target.checked
    });
  };

  handleSearch = () => {
    this.handleCallCharacter(this.state.searchName);
  };

  handleCallCharacter = name => {
    const url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${name}&apikey=1463d9de25ae8945603bef68e10285bd`;
    fetch(url, myInit)
      .then(response => response.json())
        .then(json => {
          const data = json.data.results;
          this.setState({
            characters: data,
          });
        })
        .catch(error => console.error(error))
      .catch(error => console.error(error));
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Characters Page</title>
          <meta
            name="description"
            content="Characters page of React.js Boilerplate application"
          />
        </Helmet>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <TextField
          id="outlined-search"
          label="Nom"
          type="search"
          variant="outlined"
          value={this.state.searchName}
          onChange={this.handleChange}
        />
        <Button variant="contained" color="primary" onClick={this.handleSearch}>
          <FormattedMessage {...messages.button} />
        </Button>
        <Checkbox checked={this.state.checked} onClick={this.handleCheck} />
        <span>Détails</span>
        {this.state.checked ? (
          <TableCharacters chars={this.state.characters} />
        ) : (
          <GridCharacters chars={this.state.characters} />
        )}
      </div>
    );
  }
}
