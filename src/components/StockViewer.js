import { useState, useEffect } from 'react';
import GetStockInfo from '../utils/GetStockInfo';
import { Container, Row, Col, Card } from "react-bootstrap";

function StockViewer({ code }) {
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (code) {
      setLoading(true);
      GetStockInfo(code)
        .then((apiResult) => setResult(apiResult))
        .finally(() => setLoading(false));
    }
  }, [code]);

  if (loading) {
    return  <Container><div>Loading...</div></Container>;
  }

  if (Object.keys(result).length !== 0){
    
    const resultColor = result.vs > 0 ? 'red' : (result.vs < 0 ? 'blue' : 'black');
    const formattedDate = result.basDt.replace(/(\d{4})(\d{2})(\d{2})/, "$1.$2.$3");

      return (
        <Container >
          <Row>
            <Col>
            <Card>
                <Card.Header className="text-center bg-dark text-white" >
                <h3>{result.itmsNm}({result.srtnCd}) <span style={{fontSize: '1rem', fontWeight: 'normal'}}> 기준일자: {formattedDate }</span></h3>
                </Card.Header >
                <Card.Body>
                  <Row>
                    <Col xs={6} sm={6} md={6} lg={6}>
                      <h4>시세 정보</h4>
                      <hr />
                      <p>기준일자: {formattedDate }</p>
                      <p>종가: <span style={{color: resultColor}}>{result.clpr}</span></p>
                      <p>전일대비: <span style={{color: resultColor}}>{result.vs}</span></p>
                      <p>등락률: <span style={{color:resultColor}}>{Number(result.fltRt).toFixed(2)}</span></p>
                      <p>시가: {result.mkp}</p>
                      <p>고가: <span style={{color: 'red'}}>{result.hipr}</span></p>
                      <p>저가: <span style={{color: 'blue'}}>{result.lopr}</span></p>
                      <p>거래량: {result.trqu}</p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      );
    }
  }



export default StockViewer;