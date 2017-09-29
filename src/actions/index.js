import axios from 'axios';
import { browserHistory } from 'react-router';
import { 
  AUTH_LOGIN, 
  UNAUTH_LOGIN, 
  AUTH_REGISTER, 
  FETCH_AIRLINE_SHIPMENT,
  FETCH_QUERY_AIRLINE_CHART,
  FETCH_AIRLINE_NAME } from './types';
const ROOT_URL = `http://202.183.213.177/api`;

export function getToken(){
  return localStorage.getItem('token') || '';
}

export function getUsername() {
  return localStorage.getItem('username') || '';
}

export function checkIsAuth() {
  return function(dispatch) {
    const token = getToken();
    axios.get(`${ROOT_URL}/isauth?token=${token}`)
    .then(resp => {
      console.log(resp);
    })
  }
}

export function authLogin({ username, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/authenticate`, { Username: username, Password: password})
      .then(response => {
        if(response.data) {
          
          var { auth, user } = response.data;
          
          if (auth.authenticated) {
            dispatch({
              type: AUTH_LOGIN,
              payload: user.Fullname
            })
            localStorage.setItem('token', auth.token)
            localStorage.setItem('authenticated', auth.authenticated)
            localStorage.setItem('username',username);
            localStorage.setItem('fullname', user.Fullname)
            browserHistory.push('/airline')
          }
        }
      })
      .catch(response => dispatch(authError(response.data.error)))
  }
}

export function authRegister(props) {
  return function(dispatch) {
    const { username, password, taxno, company, fullname } = props;    
    axios.post(`${ROOT_URL}/user`, {
      Username: username,
      UPassword: password,
      Fullname: fullname,
      UserType: 0,
      TaxNo: taxno,
      CompanyName: company,
      Email: username
    })
    .then(response => {
      browserHistory.push('/login')
    })
    .catch((error)=> {
      dispatch(authError('Username is duplicate'))
    })
  }
}

export function authLogout() {
  return function(dispatch) {
    localStorage.clear();
    dispatch({
      type: UNAUTH_LOGIN
    })
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function fetchAirlineShipment({period}) {
  return function(dispatch) {
    const token = getToken();

    axios.get(`${ROOT_URL}/airlineshipments/${period}?token=${token}`)
      .then(response => {
        try{
            const monthOfYear = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
            const airlineName = response.data.map(function(a){return a.AirlineCode});
            const totalOfMonth = function(month) {
              let total = 0;
              for(var i = 0; i < response.data.length; i++) {
                var item = response.data[i];
                for(var key in item){
                  if (key == month)
                  {
                    total += item[key];
                  }
                }
              }
              return total;
            }
            const totalOfMonthByAirline = function(month, name){
                for(var i = 0; i < response.data.length; i++){
                  var item = response.data[i];
                  if (item.AirlineCode == name){
                    for(var key in item) {
                      if (key == month){
                        return item[key]
                      }
                    }
                  }
                }
              return 0;
            }

            const data = [];

            for(var i = 0; i < monthOfYear.length;i++){
              const monthName = monthOfYear[i];
              let jsonText = `{"name":"${monthName}",`;
              
              let nameCollection = "";
              for(var j = 0; j < airlineName.length;j++){
                  const airline = airlineName[j];
                  const total = totalOfMonthByAirline(monthName,airline);
                  
                  if (j == (airlineName.length - 1)){
                    nameCollection += `"${airline}":${total}`;
                  }else{
                    nameCollection += `"${airline}":${total},`;
                  }
              }
              
              const totalAmount = totalOfMonth(monthName);
              jsonText = `${jsonText}${nameCollection}, "amount":${totalAmount}}`
              const objAirline = JSON.parse(jsonText);
              data.push(objAirline);
            }

            const airlineData = [];
            const strokeColor = ["#DD461D","#DDDA1D","#1DDDCE","#1DBDDD","#1D9ADD","#B11DDD","#DD1DDD","#DFEC6B", "#F5C2EB", "#BBB1B9"];
            for(var i = 0; i < airlineName.length; i++) {
                airlineData.push({
                  name: airlineName[i],
                  color: strokeColor[i]
                })
            }

            // console.log(response.data);
            
            // localStorage.setItem('airlineNames', JSON.stringify(airlineData));
            // localStorage.setItem('airlineShipments', JSON.stringify(data));
            dispatch({type: FETCH_QUERY_AIRLINE_CHART, payload: data})            
            dispatch({type: FETCH_AIRLINE_SHIPMENT, payload: response.data})
            dispatch({type: FETCH_AIRLINE_NAME, payload: airlineData})

        }catch(err){
          dispatch({type: FETCH_QUERY_AIRLINE_CHART, payload: []})                      
          dispatch({type: FETCH_AIRLINE_SHIPMENT, payload: []})
          dispatch({type: FETCH_AIRLINE_NAME, payload: []})
        }
      })
  }
}

export function fetchShipmentCache(){
  return function(dispatch) {
    try{
       let shipments = JSON.parse(localStorage.getItem('shipments'));
       if (shipments == undefined){
         shipments = []
       }
       dispatch({type:UPDATE_SHIPMENT, payload: shipments})
    }catch(err){
    }
  }
}

export function resetShipmentCache() {
  return function(dispatch) {
    try{
      localStorage.setItem('shipments', JSON.stringify([]));
      dispatch({type:UPDATE_SHIPMENT, payload: []})
    }catch (err){}
  }
}

export function editOrder(shipment) {
  return function(dispatch) {
    dispatch({type: EDIT_ORDER, payload: shipment})
  }
}

