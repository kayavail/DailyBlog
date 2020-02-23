//jshint esversion: 6



// //Also works but longer
// module.exports.getDate = function () {
// let currentDay = new Date()
//   let options = {
//     weekday: "long",
//     month: "long",
//     day: "numeric",
//     year: "numeric"
//   }
//   return currentDay.toLocaleDateString("en-US", options)
// }

exports.getDate = function () {
  const options = {
    second: "numeric",
    minute: "numeric",
    hour : "numeric",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }
  return new Date().toLocaleDateString("en-US", options)
}


exports.greet = function () {
  // let greet
  const dayTime = new Date().getHours();

  if (dayTime < 12) {
    greet = `<h1 style='color: blue'>Good Morning</h1>`
  } else if (dayTime >= 12 && dayTime < 17) {
    greet = '<h1 style="color:yellow">Good Afternoon</h1>'
  } else {
    greet = "<h1 style='color:orange'>Good Evening</h1>"
  }
  return greet
};
