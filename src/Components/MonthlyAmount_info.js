import React from 'react';
import "../Assets/MonthlyAmount_info.css"

export default function MonthlyAmount_info(props) {
  return (
    <div className="MonthlyAmount_info">
    <div className="white-bg"></div>
        <div className="MonthlyAmount">
            <div className="MonthlyAmountc">
                <p>Distance</p>
            </div>
            <div className="Amount">
                 <p>{props.final}</p>
            </div>
        </div>
        <div className="Detail">
        <div className="gray-bg"></div>
            <div className="Breakdown">
                <p>The distance between <strong>{props.originplace}</strong> and <strong>{props.destinationplace}</strong> is <strong>{props.final}</strong>.</p>
            </div>
        </div>
    </div>
  )
}
