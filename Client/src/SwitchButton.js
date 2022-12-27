import React from "react";

function SwitchButton(props) {
  return (
    <div>
      <button  onClick={props.onClick} >  

      <img src="./images/arrow.png" alt="arrow"   width={50} height={50}/>
      
        switch</button>

    </div>
  );
}
export default SwitchButton;
