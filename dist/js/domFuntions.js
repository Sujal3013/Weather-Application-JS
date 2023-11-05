export const setPlaceHolderText = () => {
  const input = document.getElementById("searchBar_text");
  window.innerWidth < 400
    ? (input.placeholder = "City, State, Country")
    : (input.placeholder = "City, State, Country or Zip Code");
};

export const addSpinner = (element) => {
  animateButton(element);
  setTimeout(animateButton, 1000, element);
};

const animateButton = (element) => {
  element.classList.toggle("none");
  element.nextElementSibling.classList.toggle("block");
  element.nextElementSibling.classList.toggle("none");
};

export const displayError = (headerMsg, srMsg) => {
  updateWeatherLocationHeader(headerMsg);
  updateScreenReaderConfirmation(srMsg);
};

export const displayApiError = (statusCode) => {
  const properMsg = toProperCase(statusCode.message);
  updateWeatherLocationHeader(properMsg);
  updateScreenReaderConfirmation(`${properMsg}.Please try again.`);
};

const toProperCase = (text) => {
  const words = text.split(" ");
  const properWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return properWords.join(" ");
};

const updateWeatherLocationHeader = (message) => {
  const h1 = document.getElementById("currentForecast_location");
  h1.textContent = message;
};

export const updateScreenReaderConfirmation = (message) => {
  document.getElementById("confirmation").textContent = message;
};

export const updateDisplay = (weatherJson, locationObj) => {
  fadeDisplay();
  clearDisplay();
  const weatherClass = getWeatherClass(weatherJson.current.condition.code,current.is_day);
  setBGImage(weatherClass);
  const screenReaderWeather=buildScreenReaderWeather(weatherJson,locationObj);
  updateScreenReaderConfirmation(screenReaderWeather);
  updateWeatherLocationHeader(locationObj.getName());
  // current conditions
  const ccArray=createCurrentConditionsDivs(weatherJson,locationObj.getUnit());
  // six day forecast
  setFocusOnSearch();
  fadeDisplay();
};

const fadeDisplay = () => {
  const cc = document.getElementById("currentForecast");
  cc.classList.toggle("zero-vis");
  cc.classList.toggle("fade-in");

  const sixDay = document.getElementById("dailyForecast");
  sixDay.classList.toggle("zero-vis");
  sixDay.classList.toggle("fade-in");
};

const clearDisplay = () => {
  const currentConditions = document.getElementById(
    "currentForecast_conditions"
  );
  deleteContents(currentConditions);
  const sixDayForecast = document.getElementById("dailyForecast_contents");
  deleteContents(sixDayForecast);
};

const deleteContents = (parentElement) => {
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};

const getWeatherClass = (icon,is_day) => {
  const weatherLookup = {
    1000: "day",
    1003: "clouds",
    1006: "clouds",
    1009: "clouds",
    1030: "fog",
    1063: "rain",
    1066: "snow",
    1069: "snow",
    1072: "rain",
    1087: "rain",
    1114: "snow",
    1117: "snow",
    1135: "fog",
    1147: "fog",
    1150: "rain",
    1153: "rain",
    1171: "rain",
    1180: "rain",
    1183: "rain",
    1186: "rain",
    1189: "rain",
    1192: "rain",
    1195: "rain",
    1201: "rain",
    1204: "snow",
    1207: "snow",
    1210: "snow",
    1213: "snow",
    1216: "snow",
    1219: "snow",
    1222: "snow",
    1225: "snow",
    1237: "snow",
    1240: "rain",
    1243: "rain",
    1246: "rain",
    1249: "rain",
    1252: "rain",
    1255: "snow",
    1258: "snow",
    1261: "snow",
    1264: "snow",
    1276: "rain",
    1279: "snow",
    1282: "snow",
  };
  let weatherClass;
  if (weatherLookup[icon]) {
    weatherClass = weatherLookup[icon];
  }else if(is_day==1){
    weatherClass="day";
  }else{
    weatherClass="night";
  }
  return weatherClass;
};

const setBGImage=(weatherClass)=>{
  document.documentElement.classList.add(weatherClass);
  document.documentElement.classList.forEach(img=>{
    if(img!=weatherClass)document.documentElement.classList.remove(img);
  });
}

const buildScreenReaderWeather=(weatherJson,locationObj)=>{
  const location=locationObj.getName();
  const unit=locationObj.getUnit();
  const tempUnit=unit==="imperial"?"F":"C";
  const temp=unit==="imperial"?weatherJson.current.temp_f:weatherJson.current.temp_f;
  return `${weatherJson.current.condition.text} and ${Math.round(Number(temp))}°${tempUnit} in ${location}`;
}

const setFocusOnSearch=()=>{
  document.getElementById("searchBar_text").focus();
}

const createCurrentConditionsDivs=(weatherObj,unit)=>{
  const tempUnit=unit==="imperial"?"F":"C";
}