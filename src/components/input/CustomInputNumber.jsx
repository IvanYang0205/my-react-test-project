import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';

const Buttoncnt = styled.button`
  width: 48px;
  height: 48px;
  margin: 0px 4px;
  cursor: pointer;
  border-radius: 5px;
  background-color: transparent;
  color: #1a8ed1;
  border: 1px solid #1a8ed1;

  &:hover,
  &:active {
    background-color: #1ac5d1;
    border-color: #1ac5d1;
    color: white;
  }

  &:disabled,
  &[disabled] {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
  }
`;

const InputNumber = styled.input.attrs(() => ({
  type: 'number',
}))`
  width: 48px;
  height: 48px;
  margin: 0px 4px;
  border-radius: 5px;
  font-size: 16px;
  text-align: center;
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const CustomInputNumber = (props) => {
  const {
    min,
    max,
    step = 1,
    name,
    value = 0,
    disabled = false,
    setPeople,
    id,
    ...rest
  } = props;

  const [count, setCount] = useState(value);
  const [timeId, setTimeId] = useState();

  const handleOnChange = (e) => {
    const value = Math.max(min, Math.min(max, +e.target.value));
    setCount(+value);
  };
  const handleOnMouseDown = (isPlus) => {
    if (isPlus ? count >= max : count <= min) return;
    setCount((prev) =>
      isPlus
        ? prev + step > max
          ? max
          : prev + step
        : prev - step < min
          ? min
          : prev - step
    );

    const time = new Date();
    setTimeId(
      setInterval(() => {
        const nowTime = new Date();
        if (nowTime.getTime() - time.getTime() > 500) {
          setCount((prev) =>
            isPlus
              ? prev < max
                ? prev + step > max
                  ? max
                  : prev + step
                : prev
              : prev > min
                ? prev - step < min
                  ? min
                  : prev - step
                : prev
          );
        }
      }, 100)
    );
  };
  const handleOnMouseUp = () => {
    window.clearInterval(timeId);
  };

  useEffect(() => {
    setPeople(count, id, name);
  }, [count, id, name]);

  return (
    <>
      <Buttoncnt
        disabled={disabled}
        onMouseDown={() => handleOnMouseDown(false)}
        onMouseUp={() => handleOnMouseUp(false)}
      >
        <i className='fa fa-minus'></i>
      </Buttoncnt>
      <InputNumber
        {...rest}
        min={_.toString(min)}
        max={_.toString(max)}
        step={_.toString(step)}
        name={name}
        value={_.toString(count)}
        disabled={disabled}
        onChange={(e) => handleOnChange(e)}
      />
      <Buttoncnt
        disabled={disabled}
        onMouseDown={() => handleOnMouseDown(true)}
        onMouseUp={() => handleOnMouseUp(true)}
      >
        <i className='fa fa-plus'></i>
      </Buttoncnt>
    </>
  );
};

export default CustomInputNumber;
