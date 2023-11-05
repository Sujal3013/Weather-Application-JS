const WEATHER_API_KEY='91af9f646f0def7b4a7d4c85e1d670ac';
const FREE_API_KEY='414ddb5774b04eb69b254244230511';
export const setLocationObject=(locationObj,coordsObj)=>{
    const {lat,lon,name,unit}=coordsObj;
    locationObj.setLat(lat);
    locationObj.setLon(lon);
    locationObj.setName(name);
    if(unit){
        locationObj.setUnit(unit);
    }
};

export const getHomeLocation=()=>{
    return localStorage.getItem("defaultWeatherLocation");
};

export const getWeatherFromCoords=async(locationObj)=>{
    const lat=locationObj.getLat();
    const lon=locationObj.getLon();
    const units=locationObj.getUnit();
    // const url=`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${units}&appid=${WEATHER_API_KEY}`;
    const url=`https://api.weatherapi.com/v1/forecast.json?key=${FREE_API_KEY}&q=${lat},${lon}&days=6&aqi=no&alerts=no`;

    try{
        const weatherStream=await fetch(url);
        const weatherJson=await weatherStream.json();
        return weatherJson;
    } catch(err){
        console.error(err);
    }
}

export const getCoordsFromApi=async (entryText,units)=>{
    const regex=/^\d+$/g;
    const flag=regex.test(entryText)?"zip":"q";
    const url=`https://api.openweathermap.org/data/2.5/weather?${flag}=${entryText}&units=${units}&appid=${WEATHER_API_KEY}`;
    const encodeUrl=encodeURI(url);
    try{
        const dataStream=await fetch(encodeUrl);
        const jsonData =await dataStream.json();
        // console.log(jsonData);
        return jsonData;
    }catch(err){
        console.log(err.stack);
    }
}

export const cleanText=(text)=>{
    const regex= / {2,}/g;
    const entryText=text.replaceAll(regex," ").trim();
    return entryText;
};