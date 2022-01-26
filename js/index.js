let data = [];
const elementEvent = document.querySelector('#Event');

const init = () => {
  getData();
  // renderEventTime();
}
const getData = async() => {
  try {
    const res = await fetch('./activity.json');
    data = await res.json();  
    console.log(data);
  }
  catch (err) {
    console.log(err);
  }
}

const renderEventTime = () => {
  const time = new Date(data.endTime).getTime();
  const now = new Date().getTime();
  console.log(time - now); 
}

init();