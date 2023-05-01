import React, { useEffect, useState } from 'react';
import { Spinner, InputGroup, Button, Container} from 'react-bootstrap';
import { ClearButton, Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import '../styles.css';
import Papa from 'papaparse';


const SearchBar = (props) => {
  const [csvData, setCsvData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/stocks.csv');
      const utf8Decoder = new TextDecoder('euc-kr');
      const { data } = Papa.parse(utf8Decoder.decode(new Uint8Array(await response.arrayBuffer())), { header: true });

      const options = data.map(row => {
        const { code, name_kor, name_eng, type } = row;
        const label = `${code} - ${name_kor} (${name_eng} / ${type})`;
        return { label, code };
      });

      setCsvData(options);
    };
    fetchData();
  }, []);

  const handleSelected = (selected) => {
    selected.forEach((option) => {
      if (option && option.code) {
        // 유효한 옵션인 경우 처리
        console.log(`Selected option: ${option.code} - ${option.label}`);
    
        setSearchTerm(selected[0].code);
      }
    });
  };
  const handleSearchClick = async () => {
    props.onSearchTermChange(searchTerm);
  }

  const handleClearButtonClick = () => {
    setSearchTerm("");
  }

  return (
    <Container style={{ paddingTop: '10px', paddingBottom: '10px'}}>
    <div>
    <InputGroup> 
        <Typeahead
          id="stock-typeahead"
          options={csvData}
          labelKey="label"
          placeholder="Search for a stock..."
          onChange={handleSelected}
          inputProps={{ maxLength: 60 }}
          //onInputChange={handleSearchInputChange}
          ClearButton
        />
    {({ onClear, selected }) => (
      <div className="rbt-aux">
        {!!selected.length && <ClearButton onClick={onClear} />}
        {!selected.length && <Spinner animation="grow" size="sm" />}
      </div>
    )}
        <Button variant="dark" onClick={handleSearchClick}>Search</Button> 
        </InputGroup>
    </div>
    </Container>
  );
};

export default SearchBar;