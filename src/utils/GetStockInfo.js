// utils.js
import axios from 'axios';

export const GetStockInfo = async (code) => {
  try {
    const response = await axios.get(process.env.REACT_APP_DOMAIN, {
      params: {
        serviceKey: process.env.REACT_APP_SERVICEKEY,
        numOfRows: 1,
        pageNo: 1,
        likeSrtnCd: code
      },
      responseType: 'text'
    });
    const parser = new DOMParser();
    const xml = parser.parseFromString(response.data, 'text/xml');
    const items = xml.getElementsByTagName('item');
    if (items.length === 1) {
      const item = items[0];
      const result = {
        srtnCd: item.getElementsByTagName('srtnCd')[0].textContent,
        itmsNm: item.getElementsByTagName('itmsNm')[0].textContent,
        mrktCtg: item.getElementsByTagName('mrktCtg')[0].textContent,
        clpr: item.getElementsByTagName('clpr')[0].textContent,
        vs: item.getElementsByTagName('vs')[0].textContent,
        fltRt: item.getElementsByTagName('fltRt')[0].textContent,
        basDt: item.getElementsByTagName('basDt')[0].textContent,
        mkp: item.getElementsByTagName('mkp')[0].textContent,
        hipr: item.getElementsByTagName('hipr')[0].textContent,
        lopr: item.getElementsByTagName('lopr')[0].textContent,
        trqu: item.getElementsByTagName('trqu')[0].textContent
      };
      return result;
    } else if (items.length >= 2) {
      const resultList = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const result = {
          srtnCd: item.getElementsByTagName('srtnCd')[0].textContent,
          itmsNm: item.getElementsByTagName('itmsNm')[0].textContent,
          mrktCtg: item.getElementsByTagName('mrktCtg')[0].textContent,
          clpr: item.getElementsByTagName('clpr')[0].textContent,
          vs: item.getElementsByTagName('vs')[0].textContent,
          fltRt: item.getElementsByTagName('fltRt')[0].textContent,
          basDt: item.getElementsByTagName('basDt')[0].textContent,
          mkp: item.getElementsByTagName('mkp')[0].textContent,
          hipr: item.getElementsByTagName('hipr')[0].textContent,
          lopr: item.getElementsByTagName('lopr')[0].textContent,
          trqu: item.getElementsByTagName('trqu')[0].textContent
        };
        resultList.push(result);
      }
      return resultList;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
export default GetStockInfo;