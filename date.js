const dateOpts = {
  weekday: "long",
  day: "numeric",
  month: "long"
}

exports.getDateInfo = function () {
  const today = new Date(); 
  const dayReadable = today.toLocaleString('en-US', dateOpts);
  const isWeekend = (today.getDay() == 6 || today.getDay() == 0) ? true : false;

  return { dayReadable, isWeekend };
};
