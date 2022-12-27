import React from "react";
import "antd/dist/antd.min.css"; // import date-time component
import { DatePicker } from "antd"; // https://ant.design/components/date-picker/#header

// date-time-picker event handler

function DateTime(props) {
  function onChange(value, dateString) {
    props.onChangeHours(value._d.getHours());
    props.onChangeMinutes(value._d.getMinutes());
    props.onChangeDateTime(false);

    console.log("Selected Hours: ", value._d.getHours());
    console.log("Selected Minutes: ", value._d.getMinutes());
    console.log("Formatted Selected Time: ", dateString);
    console.log("State: ", props.isClickedPlannerButtonState);
  }

  return (
    <DatePicker
      showTime
      onChange={onChange}
      placeholder="Kies vertrektijd ..."
      format="DD-MM-YYYY  -  HH:mm"
    />
  );
}

export default DateTime;
