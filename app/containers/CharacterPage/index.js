/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';

import messages from './messages';
import CardCharacter from '../CharactersPage/CardCharacter';

const myHeaders = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded',
});

const myInit = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
};

export default class CharacterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      character: null,
    };
  }

  componentDidMount() {
    this.handleCallCharacter(this.props.match.params.id);
  }

  handleCallCharacter = id => {
    const url = `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=1463d9de25ae8945603bef68e10285bd`;
    fetch(url, myInit)
      .then(response => response.json())
      .then(json => {
        const data = json.data.results[0];
        this.setState({
          character: data,
        });
      })
      .catch(error => console.log(error))
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Character Page</title>
          <meta
            name="description"
            content="Character page of React.js Boilerplate application"
          />
        </Helmet>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        {this.state.character ? (
          <CardCharacter char={this.state.character} />
        ) : (
          <div />
        )}
      </div>
    );
  }
}
