const url_temp1 = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const url_temp2 = ',br&appid=c6ddb1e39b35c06f08d4359645428546';
function tempo(nome,estado) {
    const local = `${nome},${estado}`;
    return fetch(url_temp1 + local + url_temp2)
    .then((res) => res.json())
    .then((json) => {
        return (json.main.temp);
    })
    .catch((err) => console.log(err));
} 
