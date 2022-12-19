import React, { useState } from 'react';

function withHOC(Component) {
  return function Wrapper(props) {
    const dateNow = new Date();
    const dateVideo = new Date(props.date);
    const dateDiff = ((dateNow - dateVideo) / 1000 / 60 / 60).toFixed(1);
    let currentDate;

    if (dateDiff < 1) {
      currentDate = '12 минут назад'
    } else if (dateDiff < 24) {
      currentDate = '5 часов назад'
    } else {
      currentDate = `${(dateDiff / 24).toFixed()} дней назад`
    }

    return (
      <Component date={currentDate} />
    )
  }
}

function DateTime(props) {
  return (
    <p className="date">{props.date}</p>
  )
}

const DateTimePretty = withHOC(DateTime);

function Video(props) {
  return (
    <div className="video">
      <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      <DateTimePretty date={props.date} />
    </div>
  )
}

function VideoList(props) {
  return props.list.map(item => <Video url={item.url} date={item.date} />);
}

export default function App() {
  const [list, setList] = useState([
    {
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      date: new Date()
    },
    {
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2021-10-05 20:10:00'
    },
    {
      url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2021-10-04 23:20:00'
    },
    {
      url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-03 12:10:00'
    },
    {
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-01 16:17:00'
    },
    {
      url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-12-02 05:24:00'
    },
  ]);

  return (
    <VideoList list={list} />
  );
}