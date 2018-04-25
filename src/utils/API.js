const catImageAPI = 'http://thecatapi.com/api/images/get?format=xml&results_per_page=25';
const catFactAPI = 'http://cors-proxy.htmldriven.com/?url=https://catfact.ninja/facts?limit=25';

let catArray = [];
let imageArray = [];

export default {
  callAPIs: (req, res) => {
    return fetch(catImageAPI)
      .then(res => res.text())
      .then(result => (new window.DOMParser()).parseFromString(result, 'text/xml'))
      .then(data => {
        // the number 25 is hard-coded for the demonstration from the given API
        // let perPage = catImageAPI.query.results_per_page;
        // console.log(perPage);
        for (let i = 0; i < 25; i++) {
          imageArray.push(
            (data.getElementsByTagName('image')[i].childNodes[1].innerHTML)
          );
        }
      }, (error) => {
        console.log('error:', error);
      })
      .then(
        fetch(catFactAPI)
          .then(res => res.json())
          .then(result => {
            let factArray = JSON.parse(result.body).data;
            for (let i = 0; i < factArray.length; i++) {
              let catObj = {};
              catObj['image'] = imageArray[i];
              catObj['fact'] = factArray[i].fact;
              catObj['favorited'] = false;
              catArray.push(catObj);
            }
            // console.log(catArray);
            // return catArray;
            // this.setState({cats: catArray});
          }, (error) => {
            console.log('error:', error);
          })
          .then(catArray => res.send(catArray))
      );
      // .then(response => res.send(catArray));
  }
};
