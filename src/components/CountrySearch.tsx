import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useLazyQuery, gql } from '@apollo/client';
import { Country } from '../types/CountryTypes';
import ReactCountryFlag from 'react-country-flag';
import WeatherInfo from './WeatherInfo';

const SEARCH_COUNTRIES = gql`
  query SearchCountries($name: String!) {
    countries(filter: { name: { regex: $name } }) {
      code
      name
      capital
      emoji
      continent {
        name
      }
      languages {
        name
      }
      currency
    }
  }
`;

const CountrySearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCountries, { data, loading, error }] = useLazyQuery(SEARCH_COUNTRIES);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [selectedCapital, setSelectedCapital] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState("");

  const handleSearch = () => {
    setShowWeather(false);
    if (searchTerm) {
      const changedSearchItem = searchTerm.replace(searchTerm.charAt(0), searchTerm.charAt(0).toLocaleUpperCase());
      searchCountries({ variables: { name: changedSearchItem } });
      setSearchInitiated(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (!e.target.value) {
      setSearchInitiated(false);
    }
  };

  const handleSortChange = (event: React.ChangeEvent<any>) => {
    const selectedValue = event.target.value as 'asc' | 'desc';
    setSortOrder(selectedValue);
  };

  const handleWeatherClick = (capital: string, currentCountryCode: string) => {
    if (!showWeather || currentCountryCode === countryCode) {
      setShowWeather(!showWeather);
    }
    setCountryCode(currentCountryCode);
    setSelectedCapital(capital);
  };

  const filteredCountries = searchInitiated && searchTerm
    ? data?.countries?.filter((country: Country) => {
      const countryName = country.name.toLowerCase();
      const lowerSearchTerm = searchTerm.toLowerCase();
      return countryName.includes(lowerSearchTerm);
    })
    : [];

  const sortedCountries = filteredCountries
    ? [...filteredCountries].sort((a: Country, b: Country) => {
      return sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    })
    : [];

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <Container>
      <h1 className="text-center my-4">Countries Explorer</h1>
      <Form>
        <Form.Group>
          <Form.Label>Search Country</Form.Label>
          <Form.Control
            type="text"
            id='searchInput'
            placeholder="Enter country name"
            defaultValue={searchTerm}
            onKeyDown={handleKeyUp}
            onChange={handleInputChange}
          />
        </Form.Group>

        {searchTerm ? (
          <Button
            variant="primary"
            onClick={handleSearch}
            className="mt-3"
          >
            Search
          </Button>
        ) : (
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip-disabled">
                Please enter country name
              </Tooltip>
            }
          >
            <span className="d-inline-block">
              <Button
                variant="primary"
                onClick={handleSearch}
                disabled={!searchTerm}
                className="mt-3"
              >
                Search
              </Button>
            </span>
          </OverlayTrigger>
        )}
      </Form>

      {data && searchInitiated && data.countries?.length > 0 && searchTerm && (
        <Form.Group className="mt-3">
          <Form.Label>Sort by:</Form.Label>
          <Form.Control
            as="select"
            value={sortOrder}
            onChange={handleSortChange}
            style={{ width: '200px', height: '50px' }}
          >
            <option value="asc">Country Name (A-Z)</option>
            <option value="desc">Country Name (Z-A)</option>
          </Form.Control>
        </Form.Group>
      )}
      <Row className="mt-4">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {sortedCountries.length > 0 && searchTerm ? (
          sortedCountries.map((country: Country) => (
            <Col key={country.code} md={4}>
              <Card className="mb-3 shadow" style={{ cursor: 'pointer', paddingBottom: "0" }}>
                <Card.Body>
                  <Card.Title style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {country.name}
                    <ReactCountryFlag
                      countryCode={country.code}
                      style={{
                        width: '2em',
                        height: '2em',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        borderRadius: '4px',
                      }}
                      svg
                      cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                      cdnSuffix="svg"
                    />
                  </Card.Title>
                  <Card.Text><strong>Capital:</strong> {country.capital ? country.capital : 'N/A'}</Card.Text>
                  <Card.Text><strong>Region:</strong> {country.continent ? country.continent.name : 'N/A'}</Card.Text>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="language-tooltip">
                        {country.languages && country.languages.length > 0
                          ? country.languages.map((lang: { name: string }) => lang.name).join(', ')
                          : 'N/A'}
                      </Tooltip>
                    }
                  ><Card.Text style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'block'
                  }}>
                      <strong>Languages:</strong> {country.languages && country.languages.length > 0
                        ? country.languages.map((lang: { name: string }) => lang.name).join(', ')
                        : 'N/A'}
                    </Card.Text></OverlayTrigger>
                  <Card.Text><strong>Currency:</strong> {country.currency ? country.currency : 'N/A'}</Card.Text>
                  {showWeather && country.capital == selectedCapital && (
                    <div className="mt-3">
                      <WeatherInfo capital={selectedCapital} />
                    </div>
                  )}
                  <div
                    id='searchCountryBtn'
                    onClick={() => handleWeatherClick(country.capital, country.code)}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "30px"
                    }}
                  >
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        showWeather && country.capital == selectedCapital ?
                          <Tooltip id="tooltip-wheather">
                            Hide Wheather Details
                          </Tooltip> :
                          <Tooltip id="tooltip-wheather">
                            See Wheather Details Below
                          </Tooltip>
                      }
                    >
                      {showWeather && country.capital == selectedCapital ? <span style={{ color: "#0d6efd" }}>&#x25B2;</span> : <span style={{ color: "#0d6efd" }}>&#x25BC;</span>}
                    </OverlayTrigger>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : searchInitiated ? (
          <p>No countries found.</p>
        ) : (
          <p>Please enter a country to search.</p>
        )}
      </Row>
    </Container>
  );
};

export default CountrySearch;
