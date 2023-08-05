import React, { useEffect, useState } from 'react';
import CustomInputNumber from './input/CustomInputNumber';
import _ from 'lodash';
import styled from 'styled-components';

const DivRow = styled.div.attrs(() => ({
  className: 'row',
}))`
  margin: 10px 0px;
`;
const DivUnAllocated = styled.div`
  background-color: #dbf8f8;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
  border: 1px solid #b0d3d5;
  margin: 10px;
`;
const SpanGray = styled.span`
  color: #a9a9a9;
`;

const defaultData = {
  adult: 1, // 至少為1大人
  child: 0,
};
const roomPeopleMax = 4; // 4人房

const RoomAllocation = (props) => {
  const { guest, room, onChange } = props;
  const defaultRoomData = _.times(room, (i) => {
    return {
      ...defaultData,
      id: i,
      total: defaultData.adult + defaultData.child,
    };
  });
  const [roomData, setRoomData] = useState(defaultRoomData);

  const handleSetPeople = (count, id, name) => {
    const newData = _.map(roomData, (data) => {
      if (data.id !== id) return data;
      return {
        ...data,
        [name]: count,
        total: data.total - data[name] + count,
      };
    });
    setRoomData(newData);
  };

  useEffect(() => {
    const returnData = _.map(roomData, (data) => {
      return {
        adult: data.adult,
        child: data.child,
      };
    });
    onChange(returnData);
  }, [roomData]);

  const unAllocatedPeople = guest - _.sumBy(roomData, 'total');
  return (
    <>
      <div className='container'>
        <DivRow>
          <div className='col-sm-12 col-md-12 col-lg-6 fw-bold'>
            住客人數： {guest} 人 / {room} 房
          </div>
        </DivRow>
      </div>
      <div className='container'>
        <DivRow>
          <DivUnAllocated className='col-sm-12 col-md-12 col-lg-6'>
            尚未分配人數： {unAllocatedPeople} 人
          </DivUnAllocated>
        </DivRow>
      </div>
      {_.map(roomData, (data) => (
        <div key={data.id}>
          <div className='container'>
            <DivRow>
              <div className='col-sm-6 col-md-6 col-lg-3 fw-bold'>
                房間： {data.total} 人
              </div>
            </DivRow>
          </div>
          <div className='container'>
            <DivRow>
              <div className='col-sm-6 col-md-6 col-lg-3'>
                <span className='fw-bold'>大人</span>
                <br />
                <SpanGray>年齡 20+</SpanGray>
              </div>
              <div className='col-sm-6 col-md-6 col-lg-3'>
                <CustomInputNumber
                  name='adult'
                  min={defaultData.adult}
                  max={
                    unAllocatedPeople >= roomPeopleMax ||
                    data.adult + unAllocatedPeople > roomPeopleMax - data.child
                      ? roomPeopleMax - data.child
                      : data.adult + unAllocatedPeople
                  }
                  value={data.adult}
                  id={data.id}
                  setPeople={handleSetPeople}
                  disabled={guest === room}
                />
              </div>
            </DivRow>
            <DivRow>
              <div className='col-sm-6 col-md-6 col-lg-3'>
                <span className='fw-bold'>小孩</span>
              </div>
              <div className='col-sm-6 col-md-6 col-lg-3'>
                <CustomInputNumber
                  name='child'
                  min={defaultData.child}
                  max={
                    unAllocatedPeople >= roomPeopleMax ||
                    data.child + unAllocatedPeople > roomPeopleMax - data.adult
                      ? roomPeopleMax - data.adult
                      : data.child + unAllocatedPeople
                  }
                  value={data.child}
                  id={data.id}
                  setPeople={handleSetPeople}
                  disabled={guest === room}
                />
              </div>
            </DivRow>
          </div>
          <div className='container'>
            <DivRow>
              <div className='col-sm-12 col-md-12 col-lg-6'>
                <hr />
              </div>
            </DivRow>
          </div>
        </div>
      ))}
    </>
  );
};

export default RoomAllocation;
